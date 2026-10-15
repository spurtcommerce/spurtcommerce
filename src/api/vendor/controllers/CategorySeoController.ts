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
import { CategoryPathService } from '../../../../src/api/core/services/CategoryPathService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-category-seo')
export class VendorSeoCategoryController {
    constructor(
        private categoryPathService: CategoryPathService,
        private mSeoMetaService: MSeoMetaService,
        private categoryService: CategoryService
    ) { }

    /**
     * @api {get} /api/vendor-category-seo Category SEO List
     * @apiGroup Category SEO
     * @apiName VendorCategorySeoList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {Number} [sortOrder]        Sort order
     * @apiQuery {String} [status]           Filter by status
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got category list.",
     *         "data": [
     *             {
     *                 "categoryId": 1,
     *                 "name": "Electronics",
     *                 "categorySlug": "electronics",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-category-seo
     */
    @Get()
    @Authorized(['vendor', 'seo-category'])
    public async categoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.name as name',
            'category.image as image',
            'category.imagePath as imagePath',
            'category.isActive as isActive',
            'category.createdDate as createdDate',
            'category.categorySlug as categorySlug',
            'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
        ];

        const relations = [
            {
                tableName: 'CategoryPath.category',
                aliasName: 'category',
            },
            {
                tableName: 'CategoryPath.path',
                aliasName: 'path',
            },
        ];
        const groupBy = [
            {
                name: 'CategoryPath.category_id',
            },
        ];

        const whereConditions = [
            {
                name: 'category.tenantId',
                op: 'or',
                value: request.user.tenantId,
            },
        ];
        if (status || status === '0') {
            whereConditions.push({
                name: 'category.isActive',
                op: 'or',
                value: +status,
            });
        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['category.name'],
                value: keyword,
            });
        }

        const sort = [];
        if (sortOrder) {
            sort.push({
                name: 'sortOrder',
                order: sortOrder === 2 ? 'DESC' : 'ASC',
            });
        } else {
            sort.push({
                name: 'createdDate',
                order: 'DESC',
            });
        }
        const categoryList: any = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        if (count) {
            const successResponses: any = {
                status: 1,
                message: 'Successfully got category list.',
                data: categoryList.length,
            };
            return response.status(200).send(successResponses);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got category list.',
            data: categoryList,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {post} /api/vendor-category-seo/:categoryId Update Category SEO
     * @apiGroup Category SEO
     * @apiName UpdateCategorySeo
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} categoryId  Category ID
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
     *             "route": "category-details/electronics",
     *             "metaTitle": "Title",
     *             "metaDescription": "Description",
     *             "metaKeyword": "Keywords"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Category:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Category. "
     *     }
     *
     * @apiSampleRequest /api/vendor-category-seo/:categoryId
     */
    @Post('/:categoryId')
    @Authorized(['vendor', 'seo-category'])
    public async updateSeo(@Param('categoryId') categoryId: number, @Body({ validate: true }) seo: AddSeoRequest, @Res() response: any): Promise<any> {

        const category = await this.categoryService.findOne({ where: { categoryId } });
        if (!category) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Category. ',
            };
            return response.status(400).send(errorResponse);
        }

        const updateSeo = await this.mSeoMetaService.findOne({
            where: {
                refId: categoryId,
                seoType: 'category',
            },
        });
        if (updateSeo) {

            updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : category.name;
            updateSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            updateSeo.metaTagKeyword = seo.metaTagKeyword;
            updateSeo.refId = categoryId;
            updateSeo.seoType = 'category';

            await this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
            const successResponse: any = {
                status: 1,
                message: 'SEO Updated successfully',
            };
            return response.status(200).send(successResponse);
        }

        const NewSeo = new MSeoMeta();

        NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : category.name;
        NewSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
        NewSeo.metaTagKeyword = seo.metaTagKeyword;
        NewSeo.refId = categoryId;
        NewSeo.seoType = 'category';

        const createSeo = await this.mSeoMetaService.create(NewSeo);
        if (createSeo) {
            const successResponse: any = {
                status: 1,
                message: 'SEO created Successfully. ',
                data: createSeo,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create SEO. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/vendor-category-seo/:categoryId Get Category SEO Detail
     * @apiGroup Category SEO
     * @apiName GetCategorySeoDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} categoryId  Category ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got SEO details. ",
     *         "data": {
     *             "id": 1,
     *             "referenceId": 1,
     *             "route": "category-details/electronics",
     *             "metaTitle": "Title",
     *             "metaDescription": "Description",
     *             "metaKeyword": "Keywords"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Category:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid category. "
     *     }
     *
     * @apiSampleRequest /api/vendor-category-seo/:categoryId
     */
    @Get('/:categoryId')
    @Authorized(['vendor', 'seo-category'])
    public async seoDetail(@Param('categoryId') categoryId: number, @Res() response: any): Promise<any> {
        const category = await this.categoryService.findOne({ where: { categoryId } });
        if (!category) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid category. ',
            };
            return response.status(400).send(errorResponse);
        }

        category.seo = await this.mSeoMetaService.findOne({ where: { refId: categoryId, seoType: 'category' } });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got SEO details. ',
            data: category,
        };
        return response.status(200).send(successResponse);
    }
}
