/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Post, Body, JsonController, Authorized, Res, Put, Req, Delete, QueryParam, Get, Param, BodyParam } from 'routing-controllers';
import { BlogCategory } from '../../../api/core/models/BlogCategory';
import { BlogCategoryService } from '../../core/services/BlogCategoryService';
import { AddBlogCategory } from './requests/AddBlogCategoryRequest';
// import { CheckAddonMiddleware } from '../../core/middlewares/AddonValidationMiddleware';
import { BlogService } from '../../../api/core/services/BlogService';
import { Service } from 'typedi';

@Service()
// @UseBefore(CheckAddonMiddleware)
@JsonController('/blog-category')
export class BlogCategoryController {
    constructor(
        private blogCategoryService: BlogCategoryService,
        private blogService: BlogService
    ) {
    }

    // create Blog Category API
    /**
     * @api {post} /api/blog-category Add Blog Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name Category name
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Category.",
     *      "status": "1",
     *      "data": {
     *                   "name": "",
     *                   "createdDate": "",
     *                   "blogCategoryId": "1"
     *              }
     * }
     * @apiSampleRequest /api/blog-category
     * @apiErrorExample {json} AddCategory error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized()
    public async addCategory(@Body({ validate: true }) category: AddBlogCategory, @Res() response: any): Promise<BlogCategory> {
        const newCategory = new BlogCategory();
        newCategory.name = category.name;
        newCategory.isActive = 0;
        const categorySave = await this.blogCategoryService.create(newCategory);
        if (categorySave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new category.',
                data: categorySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Update Blog Category API
    /**
     * @api {put} /api/blog-category/:id Update Blog Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name BlogCategory name
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category.",
     *      "status": "1",
     *      "data":  {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "blogCategoryId": "1",
     *            "name": "",
     *            "image": "",
     *            "imagePath": "",
     *            "parentInt": "",
     *            "sortOrder": "",
     *            "metaTagTitle": "",
     *            "metaTagDescription": "",
     *            "metaTagKeyword": "",
     *            "categorySlug": "",
     *            "isActive": 1,
     *            "categoryDescription": ""
     *   }
     * }
     * @apiSampleRequest /api/blog-category/:id
     * @apiErrorExample {json} UpdateCategory error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized()
    public async updateCategory(@Param('id') id: number, @BodyParam('name') name: string, @Res() response: any, @Req() request: any): Promise<BlogCategory> {
        const categoryId = await this.blogCategoryService.findOne({
            where: {
                blogCategoryId: id,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid category Id.',
            };
            return response.status(400).send(errorResponse);
        }
        categoryId.name = name;
        const categorySave = await this.blogCategoryService.create(categoryId);
        if (categorySave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated category.',
                data: categorySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // delete Blog Category API
    /**
     * @api {delete} /api/blog-category/:id Delete Blog Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} blogCategoryId blogCategory blogCategoryId
     * @apiParamExample {json} Input
     * {
     *      "blogCategoryId" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted category.",
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog-category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized()
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
        const deleteCategory = await this.blogCategoryService.delete(categoryId);
        if (deleteCategory) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted category.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Blog Category List API
    /**
     * @api {get} /api/blog-category Blog Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the blog category list. (or) Successfully got the blog category count",
     *      "data": [
     *      {
     *       "createdDate": "",
     *       "blogCategoryId": 1,
     *       "name": "",
     *       "isActive": 1
     *      }
     *   ]
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog-category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async categorylist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['blogCategoryId', 'name', 'isActive', 'createdDate'];
        const whereConditions = [];
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
        const blogCategoryList = await this.blogCategoryService.list(limit, offset, select, [], whereConditions, sort, false);
        if (count) {
            const blogCategoryCount = await this.blogCategoryService.list(limit, offset, select, [], whereConditions, {}, true);
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
    // Blog category Detail
    /**
     * @api {get} /api/blog-category/blog-category-detail Blog Category Detail API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} blogCategoryId blogCategoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog Category detail",
     *      "data": {
     *                  "createdBy": "1",
     *                  "createdDate": "",
     *                  "modifiedBy": "1",
     *                  "modifiedDate": "",
     *                  "id": "1",
     *                  "name": "",
     *                  "image": "",
     *                  "imagePath": "",
     *                  "parentInt": "",
     *                  "sortOrder": "",
     *                  "metaTagTitle": "",
     *                  "metaTagDescription": "",
     *                  "metaTagKeyword": "",
     *                  "categorySlug": "",
     *                  "isActive": "1",
     *                  "categoryDescription": ""
     *                }
     *       "status": 1
     * }
     * @apiSampleRequest /api/blog-category/blog-category-detail
     * @apiErrorExample {json} CategoryDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog-category-detail')
    @Authorized()
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

    /**
     * @api {get} /api/blog-category/category-count blog Category Count API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} status status
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete blog category count.",
     *      "data":"{
     *                  "categoryCount": "1"
     *              }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog-category/category-count
     * @apiErrorExample {json} CategoryCount error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-count')
    @Authorized()
    public async categorycount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('status') status: string, @Res() response: any): Promise<any> {
        const blogCategoryCount = await this.blogCategoryService.categoryCount(limit, offset, keyword, sortOrder, status, 0);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got blog category Count',
            data: {
                categoryCount: blogCategoryCount?.categoryCount,
            },
        };
        return response.status(200).send(successResponse);
    }
    // Update Blog Category status API
    /**
     * @api {put} /api/blog-category/update-blog-category-status/:id Update Blog Category status API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} status
     * @apiParamExample {json} Input
     * {
     *      "status" : "1",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated blog category status.",
     *      "status": "1",
     *      "data": {
     *                  "isActive": "1",
     *              }
     * }
     * @apiSampleRequest /api/blog-category/update-blog-category-status/:id
     * @apiErrorExample {json} Update BlogCategoryStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-blog-category-status/:id')
    @Authorized()
    public async updateBlogCategoryStatus(@Param('id') id: number, @BodyParam('status') status: number, @Res() response: any, @Req() request: any): Promise<any> {
        const blogCategory = await this.blogCategoryService.findOne({
            where: {
                blogCategoryId: id,
            },
        });
        if (!blogCategory) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid blog category Id',
            });
        }
        const blog = await this.blogService.findOne({ where: { categoryId: id } });
        if (blog) {
            return response.status(400).send({
                status: 0,
                message: `Can't inactive categories, mapped with blog's`,
            });
        }
        blogCategory.isActive = status;
        const categorySave = await this.blogCategoryService.create(blogCategory);
        if (categorySave) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully updated blog category status',
                data: categorySave,
            });
        } else {
            return response.status(400).send({
                status: 1,
                message: 'Unable to update blog category status',
            });
        }
    }
}
