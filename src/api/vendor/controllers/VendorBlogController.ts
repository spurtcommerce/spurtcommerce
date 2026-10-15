/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Put, Post, Delete, Body, QueryParam, Param, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { Blog } from '../../core/models/Blog';
import { BlogService } from '../../core/services/BlogService';
import { env } from '../../../../src/env';
import { CreateBlog } from '../../../../src/api/vendor/controllers/requests/CreateBlogRequest';
import { S3Service } from '../../../../src/api/core/services/S3Service';
import { ImageService } from '../../../../src/api/core/services/ImageService';
import { BlogRelatedService } from '../../core/services/BlogRelatedService';
import { BlogRelated } from '../../core/models/BlogRelated';
import { BlogCategoryService } from '../../core/services/BlogCategoryService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-blog')
export class VendorBlogController {
    constructor(
        private blogService: BlogService,
        private s3Service: S3Service,
        private blogRelatedService: BlogRelatedService,
        private blogCategortService: BlogCategoryService,
        private imageService: ImageService
    ) {
        // --
    }

    /**
     * @api {post} /api/vendor-blog Create Vendor Blog
     * @apiGroup Vendor Blog
     * @apiName CreateVendorBlog
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiBody {String} title Blog title (max 255 chars)
     * @apiBody {Number} categoryId Blog category ID
     * @apiBody {String} [description] Blog content description
     * @apiBody {String} [image] Base64 encoded blog image
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     * @apiBody {Number[]} [relatedBlogId] Array of related blog IDs
     * @apiBody {String} [blogSlug] Custom blog slug name
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created new blog.",
     *         "data": {
     *             "id": 1,
     *             "title": "Blog Title",
     *             "categoryId": 1,
     *             "description": "Blog description",
     *             "isActive": 1,
     *             "blogSlug": "blog-title"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Category:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Category Id."
     *     }
     *
     * @apiSampleRequest /api/vendor-blog
     */
    @Post()
    @Authorized(['vendor', 'create-blogs'])
    public async createBlog(@Body({ validate: true }) blogParam: CreateBlog, @Req() request: any, @Res() response: any): Promise<any> {
        const category = blogParam.categoryId;
        const getcategory = await this.blogCategortService.findOne({ where: { blogCategoryId: category } });
        if (!getcategory) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Category Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const image = blogParam.image;
        const newBlog = new Blog();
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'blog/';
            const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            newBlog.image = name;
            newBlog.imagePath = path;
        }
        newBlog.title = blogParam.title;
        newBlog.categoryId = blogParam.categoryId;
        newBlog.description = blogParam.description ?? '';
        newBlog.isActive = blogParam.status;
        newBlog.createdBy = request.user.userId;
        const metaTagTitle = blogParam.blogSlug ? blogParam.blogSlug : blogParam.title;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        newBlog.blogSlug = await this.validate_slug(data);
        newBlog.tenantId = request.user.tenantId;
        const blogSave = await this.blogService.create(newBlog);
        // Add related blog
        if (blogParam.relatedBlogId) {
            const relatedBlog: any = blogParam.relatedBlogId;
            for (const relatedblog of relatedBlog) {
                const newBlogRelated: any = new BlogRelated();
                newBlogRelated.blogId = blogSave.id;
                newBlogRelated.relatedBlogId = relatedblog;
                newBlogRelated.isActive = 1;
                await this.blogRelatedService.create(newBlogRelated);
            }
        }
        if (blogSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new blog.',
                data: blogSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create new blog. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    /**
     * @api {get} /api/vendor-blog List Vendor Blogs
     * @apiGroup Vendor Blog
     * @apiName VendorBlogList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [keyword] Keyword search for blog title
     * @apiQuery {String} [title] Filter by blog title
     * @apiQuery {String} [categoryId] Filter by blog category ID
     * @apiQuery {String} [status] Filter by active status
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got blog list.",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "title": "Blog Title",
     *                 "categoryId": 1,
     *                 "description": "Blog description",
     *                 "isActive": 1,
     *                 "blogSlug": "blog-title",
     *                 "categoryName": "Tech"
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-blog
     */
    @Get()
    @Authorized(['vendor', 'list-blogs'])
    public async BlogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('title') title: string, @QueryParam('categoryId') categoryId: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'blogSlug', 'createdDate'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
            {
                name: 'categoryId',
                op: 'like',
                value: categoryId,
            },
            {
                name: 'isActive',
                op: 'where',
                value: status,
            },
        ];
        if (title?.trim()) {
            search.push(
                {
                    name: 'title',
                    op: 'like',
                    value: title,
                }
            );
        }
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        const getBlogList: any = await this.blogService.list(limit, offset, select, search, whereConditions, [], count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got blog count',
                data: getBlogList,
            };
            return response.status(200).send(successResponse);
        } else {
            const blogList = getBlogList.map(async (val: any) => {
                const datas: any = val;
                const getCategoryName = await this.blogCategortService.findOne({
                    where: { blogCategoryId: val.categoryId },
                    select: ['name'],
                });
                if (getCategoryName) {
                    datas.categoryName = getCategoryName.name;
                }
                return datas;
            });
            const results = await Promise.all(blogList);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got blog list.',
                data: results,
            };
            return response.status(200).send(successResponse);
        }
    }
    /**
     * @api {put} /api/vendor-blog/:id Update Vendor Blog
     * @apiGroup Vendor Blog
     * @apiName UpdateVendorBlog
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Blog ID
     *
     * @apiBody {String} title Blog title (max 255 chars)
     * @apiBody {Number} categoryId Blog category ID
     * @apiBody {String} [description] Blog content description
     * @apiBody {String} [image] Base64 encoded blog image
     * @apiBody {Number} status Active status (1: Active, 0: Inactive)
     * @apiBody {Number[]} [relatedBlogId] Array of related blog IDs
     * @apiBody {String} [blogSlug] Custom blog slug name
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated blog.",
     *         "data": {
     *             "id": 1,
     *             "title": "Updated Blog Title",
     *             "categoryId": 1,
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Blog-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid blog Id."
     *     }
     *
     * @apiSampleRequest /api/vendor-blog/:id
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-blogs'])
    public async updateBlog(@Param('id') blogId: number, @Body({ validate: true }) blogParam: CreateBlog, @Res() response: any, @Req() request: any): Promise<any> {
        const blog = await this.blogService.findOne({ where: { id: blogId } });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid blog Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const category = blogParam.categoryId;
        const getcategory = await this.blogCategortService.findOne({ where: { blogCategoryId: category } });
        if (!getcategory) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Category Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const image = blogParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'blog/';
            const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            blog.image = name;
            blog.imagePath = path;
        }
        blog.title = blogParam.title;
        blog.categoryId = blogParam.categoryId;
        blog.description = blogParam.description;
        blog.isActive = blogParam.status;
        blog.createdBy = request.user.userId;
        const metaTagTitle = blogParam.blogSlug ? blogParam.blogSlug : blogParam.title;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        blog.blogSlug = await this.validate_slug(data);
        const blogSave = await this.blogService.create(blog);

        const findBlog: any = await this.blogRelatedService.findOne({
            where: {
                blogId: blogSave.id,
            },
        });
        if (findBlog) {

            // delete previous related blog
            this.blogRelatedService.delete({ blogId: blogSave.id });

            // update related blog
            if (blogParam.relatedBlogId) {
                const relatedBlog: any = blogParam.relatedBlogId;
                for (const relatedblog of relatedBlog) {
                    const value = await this.blogService.findOne({ where: { id: relatedblog } });
                    const newRelatedBlog: any = new BlogRelated();
                    newRelatedBlog.blogId = blogSave.id;
                    newRelatedBlog.relatedBlogId = relatedblog;
                    newRelatedBlog.isActive = value.isActive;
                    await this.blogRelatedService.create(newRelatedBlog);
                }
            }
        } else {
            // update related blog
            if (blogParam.relatedBlogId) {
                const relatedBlogs: any = blogParam.relatedBlogId;
                for (const relatedblog of relatedBlogs) {
                    const value = await this.blogService.findOne({ where: { id: relatedblog } });
                    const newRelatedBlog: any = new BlogRelated();
                    newRelatedBlog.blogId = blogSave.id;
                    newRelatedBlog.relatedBlogId = relatedblog;
                    newRelatedBlog.isActive = value.isActive;
                    await this.blogRelatedService.create(newRelatedBlog);
                }
            }
        }

        if (blogSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated blog.',
                data: blogSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the blog.',
            };
            return response.status(400).send(errorResponse);
        }
    }
    /**
     * @api {delete} /api/vendor-blog/:id Delete Vendor Blog
     * @apiGroup Vendor Blog
     * @apiName DeleteVendorBlog
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Blog ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted Blog"
     *     }
     *
     * @apiErrorExample {json} Blog-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Please choose a blog that you want to delete. "
     *     }
     *
     * @apiSampleRequest /api/vendor-blog/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-blogs'])
    public async deleteBlog(@Param('id') blogId: number, @Res() response: any): Promise<any> {

        const blog = await this.blogService.findOne({ where: { id: blogId } });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Please choose a blog that you want to delete. ',
            };
            return response.status(400).send(errorResponse);
        } else {
            await this.blogService.delete(blog.id);
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Blog',
            };
            return response.status(200).send(successResponse);
        }
    }

    /**
     * @api {get} /api/vendor-blog/blog-detail Get Vendor Blog Detail
     * @apiGroup Vendor Blog
     * @apiName GetVendorBlogDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} blogId Blog ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got blog list.",
     *         "data": {
     *             "id": 1,
     *             "title": "Blog Title",
     *             "categoryId": 1,
     *             "description": "Blog description",
     *             "categoryName": "Technology",
     *             "blogRelated": []
     *         }
     *     }
     *
     * @apiErrorExample {json} Blog-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Blog ID"
     *     }
     *
     * @apiSampleRequest /api/vendor-blog/blog-detail
     */
    @Get('/blog-detail')
    @Authorized(['vendor', 'list-blogs'])
    public async BlogDetail(@QueryParam('blogId') blogId: number, @Res() response: any): Promise<any> {
        const blog = await this.blogService.findOne({
            where: {
                id: blogId,
            },
        });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Blog ID',
            };
            return response.status(400).send(errorResponse);
        }
        const category = await this.blogCategortService.findOne({
            where: {
                blogCategoryId: blog.categoryId,
            },
        });
        if (category) {
            blog.categoryName = category.name;
        }
        blog.blogRelated = await this.blogRelatedService.findAll({ where: { blogId: blog.id } }).then((val) => {
            const relatedBlog = val.map(async (value: any) => {
                const idBlog = value.relatedBlogId;
                const blogDetail = await this.blogService.findOne({
                    select: ['id', 'title', 'image', 'imagePath'],
                    where: { id: idBlog },
                });
                return (blogDetail);
            });
            const resultData = Promise.all(relatedBlog);
            return resultData;
        });

        blog.description = blog.description ?? '';

        const successResponse: any = {
            status: 1,
            message: 'Successfully got blog list.',
            data: blog,
        };
        return response.status(200).send(successResponse);
    }

    public async validate_slug($slug: string, $id: number = 0, $count: number = 0): Promise<string> {
        const slugCount = await this.blogService.checkSlug($slug, $id, $count);
        if (slugCount) {
            if (!$count) {
                $count = 1;
            } else {
                $count++;
            }
            return await this.validate_slug($slug, $id, $count);
        } else {
            if ($count > 0) {
                $slug = $slug + $count;
            }
            return $slug;
        }
    }
}
