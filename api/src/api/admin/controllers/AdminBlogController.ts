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
import { CreateBlog } from '../../../../src/api/admin/controllers/requests/CreateBlogRequest';
import { DeleteBlog } from '../../../../src/api/admin/controllers/requests/DeleteBlogRequest';
import { S3Service } from '../../../../src/api/core/services/S3Service';
import { ImageService } from '../../../../src/api/core/services/ImageService';
import { BlogRelatedService } from '../../core/services/BlogRelatedService';
import { BlogRelated } from '../../core/models/BlogRelated';
import { BlogCategoryService } from '../../core/services/BlogCategoryService';
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
import { Service } from 'typedi';

@Service()
// @UseBefore(CheckAddonMiddleware)
@JsonController('/blog')
export class AdminBlogController {
    constructor(
        private blogService: BlogService,
        private s3Service: S3Service,
        private blogRelatedService: BlogRelatedService,
        private blogCategortService: BlogCategoryService,
        private imageService: ImageService) {
    }

    // Create Blog
    /**
     * @api {post} /api/blog Add Blog API
     * @apiGroup Blog
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {Number} categoryId category id
     * @apiParam (Request body) {String} description description
     * @apiParam (Request body) {String} [image] image
     * @apiParam (Request body) {Number} status status/isActive
     * @apiParam (Request body) {String} relatedBlogId relatedBlogId
     * @apiParam (Request body) {String} blogSlug blogSlug
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "categoryId" : 1,
     *      "description" : ""
     *      "image" : "",
     *      "status" : "",
     *      "relatedBlogId" : "1",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New blog is created successfully",
     *      "status": "1",
     *      "data": {
     *         "image": "",
     *         "imagePath": "",
     *         "title": "",
     *         "categoryId": 1,
     *         "description": "",
     *         "isActive": "",
     *         "createdBy": "",
     *         "blogSlug": "",
     *         "createdDate": "",
     *         "modifiedBy": "",
     *         "modifiedDate": "",
     *         "id": 1
     *       }
     * }
     * @apiSampleRequest /api/blog
     * @apiErrorExample {json} Add Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'create-blogs'])
    public async createBlog(@Body({ validate: true }) blogParam: CreateBlog, @Req() request: any, @Res() response: any): Promise<any> {
        const category = blogParam.categoryId;
        const getcategory = await this.blogCategortService.findOne({ where: { category } });
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
    // Blog List
    /**
     * @api {get} /api/blog Blog List API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog list",
     *      "data": [
     *         {
     *        "createdDate": "",
     *        "id": 1,
     *        "title": "",
     *        "categoryId": 1,
     *        "description": "",
     *        "image": "",
     *        "imagePath": "",
     *        "isActive": "",
     *        "blogSlug": "",
     *        "categoryName": ""
     *          }
     *           ]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog
     * @apiErrorExample {json} Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'list-blogs'])
    public async BlogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('title') title: string, @QueryParam('categoryId') categoryId: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
        const getBlogList: any = await this.blogService.list(limit, offset, select, search, [], [], count);
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
                message: 'Successfully got blog list',
                data: results,
            };
            return response.status(200).send(successResponse);
        }
    }
    // Update Blog
    /**
     * @api {put} /api/blog/:id Update Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {Number} categoryId category id
     * @apiParam (Request body) {String} description description
     * @apiParam (Request body) {String} [image] image
     * @apiParam (Request body) {Number} status status/isActive
     * @apiParam (Request body) {String} relatedBlogId relatedBlogId
     * @apiParam (Request body) {String} blogSlug blogSlug
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "categoryId" : 1,
     *      "description" : ""
     *      "image" : "",
     *      "status" : "",
     *      "relatedBlogId" : "1",
     *      "blogSlug" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated blog.",
     *      "status": "1",
     *      "data": {
     *                     "createdDate": "",
     *                     "modifiedBy": "",
     *                     "modifiedDate": "",
     *                     "id": 1,
     *                     "title": "",
     *                     "categoryId": "1",
     *                     "description": "",
     *                     "image": "",
     *                     "imagePath": "",
     *                     "isActive": 1,
     *                     "blogSlug": ""
     *               }
     * }
     * @apiSampleRequest /api/blog/:id
     * @apiErrorExample {json} Update Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-blogs'])
    public async updateBlog(@Param('id') blogId: number, @Body({ validate: true }) blogParam: CreateBlog, @Res() response: any, @Req() request: any): Promise<any> {
        const blog = await this.blogService.findOne({ where: { blogId } });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid blog Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const category = blogParam.categoryId;
        const getcategory = await this.blogCategortService.findOne({ where: { category } });
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
    // Delete Blog API
    /**
     * @api {delete} /api/blog/:id Delete Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} id  id
     * @apiParamExample {json} Input
     * {
     * "id" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Blog.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/blog/:id
     * @apiErrorExample {json} Delete Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'delete-blogs'])
    public async deleteBlog(@Param('id') blogId: number, @Res() response: any, @Req() request: any): Promise<any> {

        const dataId = await this.blogService.findOne({ where: { id: blogId } });
        if (!dataId) {
            const errorResponse: any = {
                status: 0,
                message: 'Please choose a blog that you want to delete. ',
            };
            return response.status(400).send(errorResponse);
        } else {
            await this.blogService.delete(dataId);
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Blog',
            };
            return response.status(200).send(successResponse);
        }
    }
    // Delete Multiple Blog API
    /**
     * @api {post} /api/blog/delete-multiple-blog Delete Multiple Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam {Number} blogId Blog Id
     * @apiParamExample {json} Input
     * {
     *   "BlogId" : "1"
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Blog.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/blog/delete-multiple-blog
     * @apiErrorExample {json} Delete multiple Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-multiple-blog')
    @Authorized()
    public async deleteMultipleBlog(@Body({ validate: true }) deleteBlog: DeleteBlog, @Res() response: any, @Req() request: any): Promise<any> {
        const blogData = deleteBlog.blogId.toString();
        const blog: any = blogData.split(',');
        const data: any = blog.map(async (id: any) => {
            const dataId = await this.blogService.findOne({ where: { id } });
            if (!dataId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Blog Id.',
                };
                return response.status(400).send(errorResponse);
            } else {
                await this.blogService.delete(dataId);
            }
        });
        const deleteBlogs = await Promise.all(data);
        if (deleteBlogs) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted blog.',
            };
            return response.status(200).send(successResponse);
        }
    }

    // Blog Detail
    /**
     * @api {get} /api/blog/blog-detail Blog Detail API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} blogId Blog Id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog detail",
     *      "data": {
     *                  "createdBy": "",
     *                  "createdDate": "",
     *                  "modifiedBy": "",
     *                  "modifiedDate": "",
     *                  "id": 1,
     *                  "title": "",
     *                  "categoryId": 1,
     *                  "description": "",
     *                  "image": "",
     *                  "imagePath": "",
     *                  "isActive": "",
     *                  "blogSlug": "",
     *                  "categoryName": "",
     *                  "blogRelated": [
     *                                   {
     *                                       "id": 1,
     *                                       "title": "",
     *                                       "image": "",
     *                                       "imagePath": ""
     *                                   }
     *                                 ]
     *               }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog/blog-detail
     * @apiErrorExample {json} Blog Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog-detail')
    @Authorized()
    public async BlogDetail(@QueryParam('blogId') blogId: number, @Res() response: any): Promise<any> {
        const blog = await this.blogService.findOne({
            where: {
                id: blogId,
            },
        });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Blog Id',
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
            message: 'Successfully got blog list',
            data: blog,
        };

        return response.status(200).send(successResponse);
    }

    // Blog Count API
    /**
     * @api {get} /api/blog/blog-count Blog Count API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog count",
     *      "data": {
     *                    "totalBlog": "1",
     *                    "activeBlog": "1",
     *                    "inActiveBlog": "1"
     *               },
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog/blog-count
     * @apiErrorExample {json} Blog Count error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog-count')
    @Authorized()
    public async blogCount(@Res() response: any): Promise<any> {
        const blog: any = {};

        const allBlogCount = await this.blogService.list(0, 0, [], [], [], [], 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const activeBlogCount = await this.blogService.list(0, 0, [], [], whereConditionsActive, [], 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 0,
            },
        ];
        const inActiveBlogCount = await this.blogService.list(0, 0, [], [], whereConditionsInActive, [], 1);
        blog.totalBlog = allBlogCount;
        blog.activeBlog = activeBlogCount;
        blog.inActiveBlog = inActiveBlogCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the blog count.',
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
