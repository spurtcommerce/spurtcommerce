/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, QueryParam, Param, JsonController, Req, Res, UseBefore } from 'routing-controllers';
import { PageService } from '../../core/services/PageService';
import { PageGroupService } from '../../core/services/PageGroupService';
import { TranslationMiddleware } from '../../core/middlewares/TranslationMiddleware';
import { TenantValidationMiddleware } from '../../../api/core/middlewares/TenantValidationMiddleware';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/pages')
export class StorePageController {
    constructor(
        private pageService: PageService,
        private pageGroupService: PageGroupService
    ) {
    }

    // Page List API
    /**
     * @api {get} /api/pages Page List API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiHeader {number} languageId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "status": "1",
     *      "data": [
     *                {
     *                  "createdBy": "",
     *                  "createdDate": "",
     *                  "modifiedBy": "",
     *                  "modifiedDate": "",
     *                  "groupId": "",
     *                  "groupName": "",
     *                  "isActive": "",
     *                  "page": [
     *                      {
     *                         "createdBy": ,
     *                         "createdDate": "",
     *                         "modifiedBy": "",
     *                         "modifiedDate": "",
     *                         "pageId": "",
     *                         "title": "",
     *                         "intro": "",
     *                         "content": "",
     *                         "pageGroupId": "",
     *                         "sortOrder": "",
     *                         "slugName": "",
     *                         "viewPageCount": "",
     *                         "isActive": "",
     *                         "pageTranslation": {}
     *                      }
     *                   ],
     *                   "groupNameTrans": ""
     *              }
     *          ]
     * }
     * @apiSampleRequest /api/pages
     * @apiErrorExample {json} pageFront error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @UseBefore(TranslationMiddleware)
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @Req() request: any, @Res() response: any): Promise<any> {
        const search = [
            {
                name: ['pageGroup.isActive'],
                value: '1',
            },
            {
                name: ['page.isActive'],
                value: '1',
            },
            {
                name: ['page.tenantId'],
                value: request.tenantId,
            },
            {
                name: ['pageGroup.tenantId'],
                value: request.tenantId,
            },
        ];
        if (keyword) {
            search.push({
                name: ['page.title'],
                value: keyword,
            });
        }

        const relations = [
            {
                tableName: 'pageGroup.page',
                aliasName: 'page',
                op: 'left',
            },
        ];
        const pageGroupList = await this.pageGroupService.listByQueryBuilder(limit, offset, [], [], search, relations, [], [], false, false);

        const promise = pageGroupList.map(async (result: any) => {
            const temp: any = result;

            temp.page.map(async (item) => {
                item.content = undefined;
                return item.pageTranslation;
            });
            return temp;
        });

        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the group list.',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Get Page Detail API
    /**
     * @api {get} /api/:slugName Page Details API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiHeader {number} languageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page Details",
     *      "data": {
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "pageId": "",
     *                "title": "",
     *                "intro": "",
     *                "content": "",
     *                "pageGroupId": "",
     *                "sortOrder": "",
     *                "slugName": "",
     *                "viewPageCount": "",
     *                "isActive": "",
     *                "pageTranslation": {}
     *             }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/pages/:slugName
     * @apiErrorExample {json} page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:slugName')
    @UseBefore(TranslationMiddleware)
    public async pageDetails(@Param('slugName') slugName: string, @Req() request: any, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOneBy({
            where: {
                slugName,
                isActive: 1,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page.',
            };
            return response.status(200).send(errorResponse);
        }
        const whereConditions = [
            {
                name: 'page.pageId',
                op: 'where',
                value: page.pageId,
            },
        ];
        const relations = [];
        const pageDetail = await this.pageService.listByQueryBuilder(0, 0, [], whereConditions, [], relations, [], [], false, false);
        if (pageDetail) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get page details.',
                data: pageDetail,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to get page details.',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
