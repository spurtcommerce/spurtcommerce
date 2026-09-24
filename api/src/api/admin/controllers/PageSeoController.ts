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
import { PageService } from '../../../../src/api/core/services/PageService';
import { PageGroupService } from '../../../../src/api/core/services/PageGroupService';
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
import { Service } from 'typedi';

@Service()
// @UseBefore(CheckAddonMiddleware)
@JsonController('/page-seo')
export class SeoPageController {

    constructor(
        private pageService: PageService,
        private mSeoMetaService: MSeoMetaService,
        private pageGroupService: PageGroupService
    ) { }

    // Seo Page List
    /**
     * @api {Get} /api/page-seo Seo Page List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete list of pages.",
     *      "data": "[{
     *      "pageId": 1,
     *      "title": "",
     *      "pageGroupId": 1,
     *      "content": "",
     *      "isActive": 1,
     *      "slugName": "",
     *       }]"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-seo
     * @apiErrorExample {json} page List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'pages-seo'])
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['pageId', 'title', 'pageGroupId', 'content', 'isActive', 'slugName'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];

        const pageList = await this.pageService.list(limit, offset, select, [], search, [], count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got pages count',
                data: pageList,
            };
            return response.status(200).send(successRes);
        }
        const promise = pageList.map(async (result: any) => {
            const data: any = await this.pageGroupService.findOne({ where: { groupId: result.pageGroupId } });
            const temp: any = result;
            if (data) {
                temp.pageGroupName = data.groupName;
            } else {
                temp.pageGroupName = '';
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of pages.',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Create/Update Seo  API
    /**
     * @api {Post} /api/page-seo/:pageId Create/Update Seo API
     * @apiGroup Seo
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {Number} pageId pageId
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
     * @apiSampleRequest /api/page-seo/:pageId
     * @apiErrorExample {json} Update Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/:pageId')
    @Authorized(['admin', 'pages-seo'])
    public async updateSeo(@Param('pageId') pageId: number, @Body({ validate: true }) seo: AddSeoRequest, @Res() response: any): Promise<any> {

        const page = await this.pageService.findOne({ where: { pageId } });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Page. ',
            };
            return response.status(400).send(errorResponse);
        }

        const updateSeo = await this.mSeoMetaService.findOne({
            where: {
                refId: pageId,
                seoType: 'pages',
            },
        });
        if (updateSeo) {

            updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : page.title;
            updateSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            updateSeo.metaTagKeyword = seo.metaTagKeyword;
            updateSeo.refId = pageId;
            updateSeo.seoType = 'pages';

            await this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
            const successResponse: any = {
                status: 1,
                message: 'SEO Updated successfully',
            };
            return response.status(200).send(successResponse);
        }

        const NewSeo = new MSeoMeta();

        NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : page.title;
        NewSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
        NewSeo.metaTagKeyword = seo.metaTagKeyword;
        NewSeo.refId = pageId;
        NewSeo.seoType = 'pages';

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
     * @api {Get} /api/page-seo/:pageId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pageId pageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got SEO details. ",
     *    "data": {
     *     "pageId": 1,
     *     "pageTitle": "",
     *     "pageContent": "",
     *     "seo": {
     *       "seoId": 1,
     *       "metaTagTitle": "",
     *       "metaTagDescription": "",
     *       "metaTagKeyword": ",
     *       "refId": 1,
     *       "seoType": ""
     *     }
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/page-seo/:pageId
     * @apiErrorExample {json} seoDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:pageId')
    @Authorized(['admin', 'pages-seo'])
    public async seoDetail(@Param('pageId') pageId: number, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({ where: { pageId } });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page. ',
            };
            return response.status(400).send(errorResponse);
        }

        // page.seo = await this.mSeoMetaService.findOne({ where: { refId: pageId, seoType: 'pages' } });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got SEO details. ',
            data: page,
        };
        return response.status(200).send(successResponse);
    }
}
