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
import { PageService } from '../../../../src/api/core/services/PageService';
import { PageGroupService } from '../../../../src/api/core/services/PageGroupService';
import { Service } from 'typedi';
import { Like } from 'typeorm';

@Service()
@JsonController('/vendor-page-seo')
export class VendorSeoPageController {
    constructor(
        private pageService: PageService,
        private mSeoMetaService: MSeoMetaService,
        private pageGroupService: PageGroupService
    ) { }

    /**
     * @api {get} /api/vendor-page-seo Page SEO List
     * @apiGroup Page SEO
     * @apiName VendorPageSeoList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {String} [status]           Status filter
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got page list.",
     *         "data": [
     *             {
     *                 "pageId": 1,
     *                 "title": "About Us",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-page-seo
     */
    @Get()
    @Authorized(['vendor', 'seo-pages'])
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['pageId', 'title', 'pageGroupId', 'content', 'isActive', 'slugName', 'link', 'position'];
        // const search = [
        //     { name: 'title', op: 'like', value: keyword },
        //     { name: 'isActive', op: 'like', value: status },
        // ];
        const searchConditions = [];

        if (keyword?.trim()) {
            searchConditions.push({
                name: ['page_group.groupName'],
                value: `%${keyword.toLowerCase()}%`,
            });
        }

        const whereConditions = [
            { name: 'tenantId', value: request.user.tenantId },
        ];
        const pageGroups = await this.pageGroupService.findAll({
            select: ['groupId', 'groupName', 'position', 'isActive'],
            where: {
              tenantId: request.user.tenantId,
              ...(keyword ? { groupName: Like(`%${keyword}%`) } : {}),
            },
          });
        const pageGroupList = await this.pageGroupService.list(limit, offset, [], searchConditions, [], whereConditions, count);
        const pageList = await this.pageService.list(0, 0, select, [], [], whereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got pages count.',
                data: pageGroupList,
            };
            return response.status(200).send(successRes);
        }
        const promise = pageList.map(async (result: any) => {
            const data: any = await this.pageGroupService.findOne({
                select: ['groupId', 'groupName', 'position', 'isActive'],
                where: { groupId: result.pageGroupId },
            });

            const temp: any = result;
            if (data) {
                temp.pageGroupName = data.groupName;
                temp.pageGroupPosition = data.position;
            } else {
                temp.pageGroupName = '';
                temp.pageGroupPosition = null;
            }
            return temp;
        });

        const value = await Promise.all(promise);

        const groupedResult: any = {};

        for (const group of pageGroups) {
            groupedResult[group.groupName] = {
                pageGroupId: group.groupId,
                menuName: group.groupName,
                menuItem: '',
                position: group.position ?? 0,
                isActive: group.isActive,
            };
        }

        for (const item of value) {
            const groupName = item.pageGroupName;

            if (groupedResult[groupName] && item.isActive === 1) {
                groupedResult[groupName].menuItem +=
                    (groupedResult[groupName].menuItem ? ', ' : '') + item.title;
            }
        }

        const finalResponse = Object.values(groupedResult).sort(
            (a: any, b: any) => a.position - b.position
        );
        if (count) {
            return response.status(200).send({
              status: 1,
              message: 'Successfully got pages count.',
              data: finalResponse.length,
            });
          }
          const paginatedResult = finalResponse.slice(
            offset,
            offset + limit
          );
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of pages.',
            data: paginatedResult,
        };
        return response.status(200).send(successResponse);
    }
    /**
     * @api {post} /api/vendor-page-seo/:pageId Update Page SEO
     * @apiGroup Page SEO
     * @apiName UpdatePageSeo
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} pageId      Page ID
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
     *             "route": "page-details/about-us",
     *             "metaTitle": "About Us",
     *             "metaDescription": "Description",
     *             "metaKeyword": "Keywords"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Page:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid page. "
     *     }
     *
     * @apiSampleRequest /api/vendor-page-seo/:pageId
     */
    @Post('/:pageId')
    @Authorized(['vendor', 'seo-pages'])
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

        const newSeo = new MSeoMeta();
        newSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : page.title;
        newSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
        newSeo.metaTagKeyword = seo.metaTagKeyword;
        newSeo.refId = pageId;
        newSeo.seoType = 'pages';
        const createSeo = await this.mSeoMetaService.create(newSeo);

        if (createSeo) {
            const successResponse: any = {
                status: 1,
                message: 'SEO created Successfully.',
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
     * @api {get} /api/vendor-page-seo/:groupId Page SEO List by Group ID
     * @apiGroup Page SEO
     * @apiName VendorPageSeoListByGroupId
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} groupId     Page Group ID
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {String} [status]           Status filter
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got page list.",
     *         "data": [
     *             {
     *                 "pageId": 1,
     *                 "title": "About Us",
     *                 "pageGroupId": 1,
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/vendor-page-seo/:groupId
     */
    @Get('/:groupId')
    @Authorized(['vendor', 'seo-pages'])
    public async pageListByGroupId(
        @Param('groupId') groupId: number,
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('status') status: string,
        @QueryParam('count') count: number | boolean,
        @Res() response: any,
        @Req() request: any
    ): Promise<any> {

        const select = ['pageId', 'title', 'pageGroupId', 'content', 'isActive', 'slugName', 'link', 'position'];

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

        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
            {
                name: 'pageGroupId',
                value: groupId,
            },
            {
                name: 'isActive',
                value: 1,
            },
        ];

        const pageList = await this.pageService.list(limit, offset, select, [], search, whereConditions, count);

        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got pages count by group.',
                data: pageList,
            });
        }
        const grpId = Number(groupId);

        if (!grpId) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid group id',
            });
        }

        const groupData = await this.pageGroupService.find({
            groupId: grpId,
        });

        const finalResponse = {
            menuName: groupData ? groupData.groupName : '',
            position: groupData ? groupData.position : 0,
            isActive: groupData ? groupData.isActive : 0,
            pages: pageList,
        };

        return response.status(200).send({
            status: 1,
            message: 'Successfully got pages by group id.',
            data: finalResponse,
        });
    }

}
