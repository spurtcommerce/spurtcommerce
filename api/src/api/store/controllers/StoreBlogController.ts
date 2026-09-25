/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Req, QueryParam, Param, UseBefore } from 'routing-controllers';
import { BlogService } from '../../core/services/BlogService';
import { BlogRelatedService } from '../../core/services/BlogRelatedService';
import { BlogCategoryService } from '../../core/services/BlogCategoryService';
// import { BlogCategoryTranslationService } from '../../core/services/BlogCategoryTranslationService';
// import { BlogTranslationService } from '../../core/services/BlogTranslationService';
import { TranslationMiddleware } from '../../../../src/api/core/middlewares/TranslationMiddleware';
import { VendorUsersService } from '../../../../src/api/core/services/VendorUsersService';
import { Service } from 'typedi';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/list')
export class StoreBlogListController {
    constructor(
        private blogService: BlogService,
        private blogRelatedService: BlogRelatedService,
        private blogCategoryService: BlogCategoryService,
        // private blogCategoryTranslationService: BlogCategoryTranslationService,
        // private blogTranslationService: BlogTranslationService,
        private vendorUsersService: VendorUsersService
    ) {
    }
    // Related Blog Showing API
    /**
     * @api {get} /api/list/related-blog-list Related Blog List
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiHeader {number} languageId
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} blogSlug Blog Slug
     * @apiParam (Request body) {Number} count
     * @apiParamExample {json} Input
     * {
     *      "blogSlug" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Blog List Showing Successfully..!",
     *      "status": "1",
     *      "data":   {
     *       "createdBy":1 ,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "relatedId": 1,
     *       "blogId": 1,
     *       "relatedBlogId": 1,
     *       "isActive": 1,
     *       "categoryName": "",
     *       "categoryTranslationName": "",
     *       "relatedBlog": {
     *           "createdDate": "",
     *           "id": 1,
     *           "title": "",
     *           "categoryId": 1,
     *           "description": "",
     *           "image": "",
     *           "imagePath": "",
     *           "isActive": ,
     *           "blogSlug": "",
     *           "relatedBlogTranslation": {}
     *       }
     *   }
     * }
     * @apiSampleRequest /api/list/related-blog-list
     * @apiErrorExample {json} Related Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Blog List Function
    @Get('/related-blog-list')
    @UseBefore(TranslationMiddleware)
    public async relatedBlogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('blogSlug') blogSlug: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const blogDetail: any = await this.blogService.findOne({
            where: {
                blogSlug,
            },
        });
        // have to check
        if (!blogDetail) {
            return response.status(200).send({
                status: 1,
                message: 'Related blog list is successfully being shown.',
                data: [],
            });
        }
        const whereConditions = [
            {
                name: 'blogId',
                value: blogDetail.id,
            },
            {
                name: 'isActive',
                value: 1,
            },
        ];
        const relatedData = await this.blogRelatedService.list(limit, offset, [], [], whereConditions, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Related blog list is successfully being shown. ',
                data: relatedData,
            };
            return response.status(200).send(Response);
        }
        const promises = relatedData.map(async (results: any) => {
            const temp: any = results;
            const blog = await this.blogService.findOne({
                select: ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'blogSlug', 'createdDate'],
                where: { id: temp.relatedBlogId, isActive: 1 },
            });

            if (blog) {
                const category = await this.blogCategoryService.findOne({ select: ['blogCategoryId', 'name'], where: { blogCategoryId: blog.categoryId } });
                temp.categoryName = category ? category?.name : '';

                // const categoryTranslation = await this.blogCategoryTranslationService.findOne({ select: ['name'], where: { blogCategoryId: category.blogCategoryId, languageId: request.languageId } });
                // temp.categoryTranslationName = categoryTranslation?.name ?? '';
            }

            // const blogTranslation = await this.blogTranslationService.findOne({
            //     where: {
            //         blogId: blog.id,
            //         languageId: request.languageId ?? 0,
            //     },
            // });
            temp.relatedBlog = blog;
            // temp.relatedBlog.relatedBlogTranslation = blogTranslation ?? {};
            return temp;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Related blog list is successfully being shown. ',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // get Blog Detail API
    /**
     * @api {get} /api/list/blog/blog-detail/:blogSlug Blog Detail API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog Detail",
     *      "data" : {
     *      "createdBy": 1,
     *      "createdDate": "",
     *      "modifiedBy": 1,
     *      "modifiedDate": "",
     *      "id": 1,
     *      "title": "",
     *      "categoryId": 1,
     *      "description": "",
     *      "imagePath": "",
     *      "isActive": 1,
     *      "blogSlug": "",
     *      "categoryName": "",
     *      "categoryTranslationName": "",
     *      "createdByName": "",
     *      "createdByImage": "",
     *      "createdByImagePath": ""
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-detail/:blogSlug
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog/blog-detail/:blogSlug')
    @UseBefore(TranslationMiddleware)
    public async BlogDetail(@Param('blogSlug') blogSlug: string, @Req() request: any, @Res() response: any): Promise<any> {
        const whereConditions = [
            {
                name: 'blog.isActive',
                op: 'where',
                value: '1',
            },
        ];
        const search = [];
        const relations = [];
        if (request.languageId) {
            relations.push(
                {
                    tableName: 'blog.blogTranslation',
                    aliasName: 'blogTranslation',
                    op: 'left',
                }
            );
        }
        if (blogSlug && blogSlug !== '') {
            whereConditions.push({
                name: 'blog.blogSlug',
                op: 'and',
                value: `"${blogSlug}"`,
            }, {
                name: 'blog.tenantId',
                op: 'and',
                value: request.tenantId,
            });
        }

        const getBlogDetail = await this.blogService.listByQueryBuilder(0, 0, [], whereConditions, search, relations, [], [], false, false);

        if (!getBlogDetail) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid blog',
            };
            return response.status(200).send(errorResponse);
        }

        const blogDetail = getBlogDetail.map(async (val: any) => {
            const data: any = val;

            if (request.languageId) {
                data.blogTranslation = val.blogTranslation.find((item) => item.languageId === request.languageId) ?? {};
            }
            const getCategoryName = await this.blogCategoryService.findOne({
                where: { blogCategoryId: val.categoryId },
                select: ['blogCategoryId', 'name'],
            });

            if (getCategoryName) {
                data.categoryName = getCategoryName.name;
            }

            // const getCategoryTranslation = await this.blogCategoryTranslationService.findOne({
            //     where: {
            //         blogCategoryId: getCategoryName.blogCategoryId,
            //         languageId: request.languageId ?? 0,
            //     },
            //     select: ['name'],
            // });

            // data.categoryTranslationName = getCategoryTranslation?.name ?? '';

            const getUser = await this.vendorUsersService.findOne({
                where: { id: val.createdBy },
                select: ['firstName', 'avatar', 'avatarPath'],
            });

            if (getUser) {
                data.createdByName = getUser.firstName;
                data.createdByImage = getUser.avatar;
                data.createdByImagePath = getUser.avatarPath;
            }

            data.description = data.description ?? '';

            return data;
        });
        const results: any = await Promise.all(blogDetail);

        if (blogDetail) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get blog details.',
                data: results,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get blog details.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Blog List API
    /**
     * @api {get} /api/list/blog/blog-list Blog List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog list",
     *      "data" : {
     *      "createdBy": 1,
     *      "createdDate": "",
     *      "modifiedBy": 1,
     *      "modifiedDate": "",
     *      "id": 1,
     *      "title": "",
     *      "categoryId": 1,
     *      "description": "",
     *      "imagePath": "",
     *      "isActive": 1,
     *      "blogSlug": "",
     *      "categoryName": "",
     *      "categoryTranslationName": "",
     *      "createdByName": "",
     *      "createdByImage": "",
     *      "createdByImagePath": ""
     *   },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-list
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog/blog-list')
    @UseBefore(TranslationMiddleware)
    public async BlogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('isActive') isActive: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const search = [
            {
                name: ['blog.isActive'],
                value: '1',
            },
        ];
        if (keyword && keyword !== '') {
            if (request.languageId) {
                search.push({
                    name: ['blog.title', 'blogTranslation.title'],
                    value: keyword,
                });
            } else {
                search.push({
                    name: ['blog.title'],
                    value: keyword,
                });
            }
        }

        const relations = [];
        if (request.languageId) {
            relations.push(
                {
                    tableName: 'blog.blogTranslation',
                    aliasName: 'blogTranslation',
                    op: 'left',
                }
            );
        }
        const whereConditions = [{
            name: 'blog.tenantId',
            op: 'where',
            value: request.tenantId,
        }];
        const getBlogList = await this.blogService.listByQueryBuilder(limit, offset, [], whereConditions, search, relations, [], [], false, false);

        if (count) {
            const getBlogCount = await this.blogService.listByQueryBuilder(limit, offset, [], whereConditions, search, relations, [], [], true, false);

            const successResponse: any = {
                status: 1,
                message: 'Successfully get all blog count',
                data: getBlogCount,
            };
            return response.status(200).send(successResponse);
        } else {
            const blogList = getBlogList.map(async (val: any) => {
                const data: any = val;
                if (request.languageId) {
                    data.blogTranslation = val.blogTranslation.find((item) => item.languageId === request.languageId) ?? {};
                }
                const getCategoryName = await this.blogCategoryService.findOne({
                    where: { blogCategoryId: val.categoryId },
                    select: ['blogCategoryId', 'name'],
                });

                if (getCategoryName) {
                    data.categoryName = getCategoryName.name;
                }

                // const getCategoryTranslation = await this.blogCategoryTranslationService.findOne({
                //     where: {
                //         blogCategoryId: getCategoryName.blogCategoryId,
                //         languageId: request.languageId ?? 0,
                //     },
                //     select: ['name'],
                // });

                // data.categoryNameTranslation = getCategoryTranslation?.name ?? '';

                const getUser = await this.vendorUsersService.findOne({
                    where: { id: val.createdBy },
                    select: ['firstName', 'avatar', 'avatarPath'],
                });

                if (getUser) {
                    data.createdByName = getUser.firstName;
                    data.createdByImage = getUser.avatar;
                    data.createdByImagePath = getUser.avatarPath;
                }
                return data;
            });
            const results: any = await Promise.all(blogList);
            const featuredPost = results[0];
            results.shift();
            if (blogList) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully get blog list',
                    data: { results, featuredPost },
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'unable to list blog',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }
}
