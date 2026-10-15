/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Post, Body, JsonController, Authorized, Res, Put, Req, Delete, QueryParam, Get, Param, BodyParam } from 'routing-controllers';
import { BlogCategory } from '../../core/models/BlogCategory';
import { BlogCategoryService } from '../../core/services/BlogCategoryService';
import { AddBlogCategory } from '../../../../src/api/vendor/controllers/requests/AddBlogCategoryRequest';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-blog-category')
export class VendorBlogCategoryController {
    constructor(
        private blogCategoryService: BlogCategoryService
    ) {
    }

    /**
     * @api {post} /api/vendor-blog-category Create Blog Category
     * @apiGroup Blog Category
     * @apiName CreateBlogCategory
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} name                Blog category name
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created new blog category.",
     *         "data": {
     *             "blogCategoryId": 1,
     *             "name": "E-Commerce Tips",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Create-Failed:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to create the blog category."
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-category
     */
    @Post()
    @Authorized(['vendor', 'create-blogs'])
    public async addCategory(@Body({ validate: true }) category: AddBlogCategory, @Req() request: any, @Res() response: any): Promise<BlogCategory> {
        const newCategory = new BlogCategory();
        newCategory.name = category.name;
        newCategory.isActive = 1;
        newCategory.tenantId = request.user.tenantId;
        const categorySave = await this.blogCategoryService.create(newCategory);
        if (categorySave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new blog category.',
                data: categorySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the blog category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {put} /api/vendor-blog-category/:id Update Blog Category
     * @apiGroup Blog Category
     * @apiName UpdateBlogCategory
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Blog Category ID
     *
     * @apiBody {String} name                Updated blog category name
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated blog category.",
     *         "data": {
     *             "blogCategoryId": 1,
     *             "name": "Updated Category",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Category:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid category ID."
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-category/:id
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-blogs'])
    public async updateCategory(@Param('id') id: number, @BodyParam('name') name: string, @Res() response: any, @Req() request: any): Promise<BlogCategory> {
        const blogCategoryData = await this.blogCategoryService.findOne({
            where: {
                blogCategoryId: id,
            },
        });
        if (!blogCategoryData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid category ID.',
            };
            return response.status(400).send(errorResponse);
        }
        blogCategoryData.name = name;
        blogCategoryData.modifiedBy = request.user.tenantId;
        const categorySave = await this.blogCategoryService.create(blogCategoryData);
        if (categorySave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated blog category.',
                data: categorySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the blog category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    /**
     * @api {delete} /api/vendor-blog-category/:id Delete Blog Category
     * @apiGroup Blog Category
     * @apiName DeleteBlogCategory
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Blog Category ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted blog category."
     *     }
     *
     * @apiErrorExample {json} Invalid-Category:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid category Id."
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-category/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-blogs'])
    public async deleteCategory(@Param('id') blogCategoryId: number, @Res() response: any): Promise<BlogCategory> {
        const categoryId = await this.blogCategoryService.findOne({
            where: {
                blogCategoryId,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid category Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteCategory = await this.blogCategoryService.delete(categoryId.blogCategoryId);
        if (deleteCategory) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted blog category.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the blog category.',
            };
            return response.status(400).send(errorResponse);
        }
    }
    /**
     * @api {get} /api/vendor-blog-category Blog Category List
     * @apiGroup Blog Category
     * @apiName BlogCategoryList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [status]           Filter by status
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got the blog category list.",
     *         "data": [
     *             {
     *                 "blogCategoryId": 1,
     *                 "name": "E-Commerce",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-category
     */
    @Get()
    @Authorized(['vendor', 'list-blogs'])
    public async categorylist(@QueryParam('keyword') keyword: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['blogCategoryId', 'name', 'isActive', 'createdDate'];
        const whereConditions = [
            {
                name: 'tenantId',
                op: 'where',
                value: request.user.tenantId,
            },
        ];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
        ];
        if (status || status === '0') {
            whereConditions.push({
                name: 'isActive',
                op: 'where',
                value: +status,
            });
        }
        const sort = {
            createdDate: 'DESC',
        };
        const blogCategoryList = await this.blogCategoryService.list(limit, offset, select, search, whereConditions, sort, false);
        if (count) {
            const blogCategoryCount = await this.blogCategoryService.list(limit, offset, select, search, whereConditions, {}, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the blog category count',
                data: blogCategoryCount,
            });
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the blog category list.',
            data: blogCategoryList,
        };
        return response.status(200).send(successResponse);
    }
    /**
     * @api {get} /api/vendor-blog-category/blog-category-detail Get Blog Category Detail
     * @apiGroup Blog Category
     * @apiName GetBlogCategoryDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} blogCategoryId     Blog Category ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got blog category detail",
     *         "data": {
     *             "blogCategoryId": 1,
     *             "name": "E-Commerce",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Category:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Blog Category Id"
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-category/blog-category-detail
     */
    @Get('/blog-category-detail')
    @Authorized(['vendor', 'list-blogs'])
    public async CategoryDetail(@QueryParam('blogCategoryId') blogCategoryId: number, @Res() response: any): Promise<any> {
        const category = await this.blogCategoryService.findOne({
            where: {
                blogCategoryId,
            },
        });
        if (!category) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Blog Category Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got blog category detail',
            data: category,
        };
        return response.status(200).send(successResponse);
    }

    public async validate_slug($slug: string, $id: number = 0, $count: number = 0): Promise<string> {
        const slugCount = await this.blogCategoryService.checkSlug($slug, $id, $count);
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
