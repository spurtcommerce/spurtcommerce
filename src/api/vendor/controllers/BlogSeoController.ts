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
import { Service } from 'typedi';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

@Service()
@JsonController('/vendor-blog-seo')
export class VendorSeoBlogController {
    constructor(
        private mSeoMetaService: MSeoMetaService
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
        try {
            const qb = getDataSource().createQueryBuilder()
                .select([
                    'blog.id AS id',
                    'blog.title AS title',
                    'blog.category_id AS categoryId',
                    'blog.description AS description',
                    'blog.image AS image',
                    'blog.image_path AS imagePath',
                    'blog.is_active AS isActive',
                    'blog.blog_slug AS blogSlug',
                    'blog.created_date AS createdDate',
                    'category.name AS categoryName',
                ])
                .from('blog', 'blog')
                .leftJoin('blog_category', 'category', 'category.blog_category_id = blog.category_id')
                .where('blog.tenant_id = :tenantId', { tenantId: request.user.tenantId });

            if (categoryId) {
                qb.andWhere('blog.category_id = :categoryId', { categoryId });
            }
            if (status === 1 || status === 0) {
                qb.andWhere('blog.is_active = :status', { status });
            }
            if (keyword) {
                qb.andWhere('blog.title LIKE :keyword', { keyword: `%${keyword}%` });
            }

            if (count) {
                const totalCount = await qb.getCount();
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got blog count.',
                    data: totalCount,
                });
            }

            if (limit) {
                qb.limit(limit);
            }
            if (offset) {
                qb.offset(offset);
            }

            const results = await qb.getRawMany();
            return response.status(200).send({
                status: 1,
                message: 'Successfully got blog list.',
                data: results,
            });
        } catch (err) {
            return response.status(400).send({
                status: 0,
                message: 'Blog addon is not installed or enabled.',
            });
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
        try {
            const Blog: any = await getDataSource().createQueryBuilder()
                .select(['blog.id AS id', 'blog.title AS title'])
                .from('blog', 'blog')
                .where('blog.id = :blogId', { blogId })
                .getRawOne();

            if (!Blog) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Blog. ',
                });
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
                return response.status(200).send({
                    status: 1,
                    message: 'SEO Updated successfully',
                });
            }

            const NewSeo = new MSeoMeta();
            NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : Blog.title;
            NewSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            NewSeo.metaTagKeyword = seo.metaTagKeyword;
            NewSeo.refId = blogId;
            NewSeo.seoType = 'blogs';

            const createSeo = await this.mSeoMetaService.create(NewSeo);
            if (createSeo) {
                return response.status(200).send({
                    status: 1,
                    message: 'Seo created Successfully.',
                    data: createSeo,
                });
            } else {
                return response.status(400).send({
                    status: 0,
                    message: 'Unable to create SEO.',
                });
            }
        } catch (err) {
            return response.status(400).send({
                status: 0,
                message: 'Blog addon is not installed or enabled.',
            });
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
        try {
            const blog: any = await getDataSource().createQueryBuilder()
                .select([
                    'blog.id AS id',
                    'blog.title AS title',
                    'blog.blog_slug AS blogSlug',
                ])
                .from('blog', 'blog')
                .where('blog.id = :blogId', { blogId })
                .getRawOne();

            if (!blog) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Blog.',
                });
            }

            blog.seo = await this.mSeoMetaService.findOne({ where: { refId: blogId, seoType: 'blogs' } });
            return response.status(200).send({
                status: 1,
                message: 'Successfully got SEO detail.',
                data: blog,
            });
        } catch (err) {
            return response.status(400).send({
                status: 0,
                message: 'Blog addon is not installed or enabled.',
            });
        }
    }
}
