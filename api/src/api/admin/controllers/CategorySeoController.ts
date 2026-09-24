/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {
    JsonController, Res, Post, Authorized, Get, QueryParam, Param, Body,
} from 'routing-controllers';
import { MSeoMetaService } from '../../core/services/MSeoMetaService';
import { MSeoMeta } from '../../core/models/MSeoMetaModel';
import { AddSeoRequest } from '../../../../src/api/admin/controllers/requests/CreateSeoRequest';
import { CategoryPathService } from '../../../../src/api/core/services/CategoryPathService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
import { Service } from 'typedi';

@Service()
// @UseBefore(CheckAddonMiddleware)
@JsonController('/category-seo')
export class SeoCategoryController {

    constructor(
        private categoryPathService: CategoryPathService,
        private mSeoMetaService: MSeoMetaService,
        private categoryService: CategoryService
    ) { }

    // Seo Category List
    /**
     * @api {Get} /api/category-seo Seo Category List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got category list.",
     *      "data": {
     *      "categoryId": "",
     *      "sortOrder": "",
     *      "parentInt": "",
     *      "name": "",
     *      "image": "",
     *      "imagePath": "",
     *      "isActive": "",
     *      "createdDate": "",
     *      "categorySlug": "",
     *         }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-seo
     * @apiErrorExample {json} category List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'category-seo'])
    public async categoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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

        const whereConditions = [];
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

    // Create/Update Seo  API
    /**
     * @api {Post} /api/category-seo/:categoryId Create/Update Seo API
     * @apiGroup Seo
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "metaTagTitle" : "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "SEO Updated successfully",
     *      "data": {
     *       "seoId": 1,
     *       "metaTagTitle": "",
     *       "metaTagDescription": "",
     *       "metaTagKeyword": "",
     *       "refId": 1,
     *       "seoType": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-seo/:categoryId
     * @apiErrorExample {json} Update Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/:categoryId')
    @Authorized(['admin', 'category-seo'])
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

    // Seo Detail API
    /**
     * @api {Get} /api/category-seo/:categoryId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get SEO Detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/category-seo/:categoryId
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:categoryId')
    @Authorized(['admin', 'category-seo'])
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
