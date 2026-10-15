/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { JsonController, Res, Post, Authorized, Get, QueryParam, Param, Body, Req } from 'routing-controllers';
import { MSeoMetaService } from '../../core/services/MSeoMetaService';
import { MSeoMeta } from '../../core/models/MSeoMetaModel';
import { AddSeoRequest } from '../../../../src/api/vendor/controllers/requests/CreateSeoRequest';
import { BlogService } from '../../core/services/BlogService';
import { BlogCategoryService } from '../../core/services/BlogCategoryService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-blog-seo')
export class VendorSeoBlogController {
    constructor(
        private blogService: BlogService,
        private mSeoMetaService: MSeoMetaService,
        private blogCategoryService: BlogCategoryService
    ) { }

    /**
     * @api {get} /api/vendor-blog-seo Blog SEO List
     * @apiGroup Blog SEO
     * @apiName VendorBlogSeoList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword for blog title
     * @apiQuery {String} [categoryId]       Filter by blog category ID
     * @apiQuery {Number} [status]           Filter by status (1: Active, 0: Inactive)
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got Blog list",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "title": "Blog Title",
     *                 "categoryId": "1",
     *                 "description": "Content description",
     *                 "image": "blog.jpg",
     *                 "imagePath": "blog/",
     *                 "isActive": 1,
     *                 "blogSlug": "blog-title"
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-seo
     */
    @Get()
    @Authorized(['vendor', 'seo-blog'])
    public async blogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('categoryId') categoryId: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'blogSlug', 'createdDate'];
        const search = [
            {
                name: 'categoryId',
                op: 'like',
                value: categoryId,
            },
        ];
        if (keyword) {
            search.push(
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                }
            );
        }
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        if (status === 1 || status === 0) {
            whereConditions.push({
                name: 'isActive',
                value: status,
            });
        }
        if (categoryId) {
            whereConditions.push({
                name: 'categoryId',
                value: categoryId,
            });
        }
        const blogLists: any = await this.blogService.list(limit, offset, select, search, whereConditions, [], count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got blog count.',
                data: blogLists,
            };
            return response.status(200).send(successResponse);
        } else {
            const blogList = blogLists.map(async (val: any) => {
                const datas: any = val;
                const getCategoryName = await this.blogCategoryService.findOne({
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
     * @api {post} /api/vendor-blog-seo/:blogId Update Blog SEO
     * @apiGroup Blog SEO
     * @apiName UpdateBlogSeo
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} blogId      Blog ID
     *
     * @apiBody {String} [metaTagTitle]       Meta tag title (max 140 chars)
     * @apiBody {String} [metaTagDescription] Meta tag description (max 160 chars)
     * @apiBody {String} [metaTagKeyword]     Meta tag keywords (max 255 chars)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "SEO Updated successfully",
     *         "data": {
     *             "id": 1,
     *             "referenceId": 1,
     *             "route": "blog-details/blog-slug",
     *             "metaTitle": "Title",
     *             "metaDescription": "Description",
     *             "metaKeyword": "Keywords"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Blog:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Blog. "
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-seo/:blogId
     */
    @Post('/:blogId')
    @Authorized(['vendor', 'seo-blog'])
    public async updateSeo(@Param('blogId') blogId: number, @Body({ validate: true }) seo: AddSeoRequest, @Res() response: any): Promise<any> {

        const Blog = await this.blogService.findOne({ where: { id: blogId } });
        if (!Blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Blog. ',
            };
            return response.status(400).send(errorResponse);
        }

        const updateSeo = await this.mSeoMetaService.findOne({
            where: {
                refId: blogId,
                seoType: 'blogs',
            },
        });
        if (updateSeo) {
            updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : Blog.title;
            updateSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            updateSeo.metaTagKeyword = seo.metaTagKeyword;
            updateSeo.refId = blogId;
            updateSeo.seoType = 'blogs';

            await this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
            const successResponse: any = {
                status: 1,
                message: 'SEO Updated successfully',
            };
            return response.status(200).send(successResponse);
        }

        const NewSeo = new MSeoMeta();

        NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : Blog.title;
        NewSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
        NewSeo.metaTagKeyword = seo.metaTagKeyword;
        NewSeo.refId = blogId;
        NewSeo.seoType = 'blogs';

        const createSeo = await this.mSeoMetaService.create(NewSeo);
        if (createSeo) {
            const successResponse: any = {
                status: 1,
                message: 'Seo created Successfully.',
                data: createSeo,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create SEO.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/vendor-blog-seo/:blogId Get Blog SEO Detail
     * @apiGroup Blog SEO
     * @apiName GetBlogSeoDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} blogId      Blog ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got SEO detail.",
     *         "data": {
     *             "id": 1,
     *             "referenceId": 1,
     *             "route": "blog-details/blog-slug",
     *             "metaTitle": "Title",
     *             "metaDescription": "Description",
     *             "metaKeyword": "Keywords"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Blog:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Blog."
     *     }
     *
     * @apiSampleRequest /api/vendor-blog-seo/:blogId
     */
    @Get('/:blogId')
    @Authorized(['vendor', 'seo-blog'])
    public async seoDetail(@Param('blogId') blogId: number, @Res() response: any): Promise<any> {
        const blog = await this.blogService.findOne({ where: { id: blogId } });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Blog.',
            };
            return response.status(400).send(errorResponse);
        }

        blog.seo = await this.mSeoMetaService.findOne({ where: { refId: blogId, seoType: 'blogs' } });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got SEO detail.',
            data: blog,
        };
        return response.status(200).send(successResponse);
    }
}
