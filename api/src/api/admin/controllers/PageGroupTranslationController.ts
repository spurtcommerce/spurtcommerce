/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Post, Body, Param, JsonController, Res, Authorized, QueryParam } from 'routing-controllers';
import { CreatePageGroupTranslationDTO } from './requests/PageGroupTranslationRequest';
import { PageGroupService } from '../../core/services/PageGroupService';
import { PageGroupTranslationService } from '../../core/services/PageGroupTranslationService';
import { PageGroupTranslation } from '../../core/models/PageGroupTranslation';
import { FindManyOptions, Like } from 'typeorm';
import { PageGroup } from '../../core/models/PageGroup';

@JsonController('/page-group-translation')
export class PageGroupTranslationController {
    constructor(
        private pageGroupService: PageGroupService,
        private pageGroupTranslationService: PageGroupTranslationService
    ) {
    }

    // Create Page Group Translation
    /**
     * @api {post} /api/page-group-translation/page-group/:id Add Page Group Translation API
     * @apiGroup Page-Group-Translation
     * @apiParam (Request body) {Number} languageId language id
     * @apiParam (Request body) {String{..255}} groupName group name
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageGroupTranslation": [
     *          {
     *              "languageId" : "",
     *              "groupName" : ""
     *          }
     *       ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page group translation is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group-translation/page-group/:id
     * @apiErrorExample {json} Add Page Group Translation Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/page-group/:id')
    @Authorized(['admin'])
    public async createPageGroupTranslation(@Body({ validate: true }) payload: CreatePageGroupTranslationDTO, @Param('id') GroupId: number, @Res() response: any): Promise<any> {
        const getPageGroup = await this.pageGroupService.findOne(GroupId);
        if (!getPageGroup) {

            const errorResponse: any = {
                status: 0,
                message: 'Invalid page group id',
            };
            return response.status(400).send(errorResponse);
        }
        for (const data of payload.pageGroupTranslation) {
            const getPageGroupTranslation = await this.pageGroupTranslationService.findOne({
                where: {
                    pageGroupId: GroupId,
                    languageId: data.languageId,
                },
            });
            const newPageGroupTranslation = new PageGroupTranslation();

            if (getPageGroupTranslation) {
                newPageGroupTranslation.id = getPageGroupTranslation.id;
            }

            newPageGroupTranslation.pageGroupId = GroupId;
            newPageGroupTranslation.languageId = data.languageId;
            newPageGroupTranslation.groupName = data.groupName;
            await this.pageGroupTranslationService.create(newPageGroupTranslation);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully created new page group translation',
        };
        return response.status(200).send(successResponse);

    }

    // Page Group Translation List
    /**
     * @api {get} /api/page-group-translation/page-group Page Group Translation List API
     * @apiGroup Page-Group-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page group translation list",
     *      "data": " [{
     *                  "groupId": 26,
     *                  "groupName": "New page Group",
     *                  "isActive": 0
     *                  }]"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group-translation/page-group
     * @apiErrorExample {json} Page Group List Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/page-group')
    @Authorized(['admin'])
    public async PageGroupTranslationList(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<PageGroup> = {};

        condition.relations = ['pageGroupTranslation'];

        if (keyword?.trim()) {
            condition.where = {
                groupName: Like(`%${keyword}%`),
            };
        }

        if (limit) {
            condition.take = limit;
            if (offset) {
                condition.skip = offset;
            }
        }
        condition.order = { createdDate: 'DESC' };
        const getPageGroupTranslation = await this.pageGroupService.findAll(condition);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got page group translation list',
            data: count ? getPageGroupTranslation.length : getPageGroupTranslation.map((pageGroup: any) => {
                pageGroup.lastModifieDate = new Date(Math.max(...pageGroup.pageGroupTranslation.map(e => new Date(e.modifiedDate))));
                return pageGroup;
            }),
        };
        return response.status(200).send(successResponse);
    }

    // Page Group Translation Detail
    /**
     * @api {get} /api/page-group-translation/page-group/:id Page Group Translation Detail API
     * @apiGroup Page-Group-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got page group translation detail",
     *      "data": "{
     *               "createdBy": null,
     *               "createdDate": "2023-11-23T13:36:31.000Z",
     *               "modifiedBy": null,
     *               "modifiedDate": "2024-05-22T05:59:54.000Z",
     *               "groupId": 1,
     *               "groupName": "Policy",
     *               "isActive": 0,
     *               "pageGroupTranslation": [
     *                 {
     *                   "createdBy": null,
     *                   "createdDate": "2024-05-17T12:49:08.000Z",
     *                   "modifiedBy": null,
     *                   "modifiedDate": "2024-05-17T12:49:08.000Z",
     *                   "id": 1,
     *                   "groupName": "Policy",
     *                   "pageGroupId": 1,
     *                   "languageId": 57
     *                 }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group-translation/page-group/:id
     * @apiErrorExample {json} Page Group Translation Detail Rrror
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/page-group/:id')
    @Authorized(['admin'])
    public async PageGroupTranslationDetail(@Param('id') groupId: number, @Res() response: any): Promise<any> {
        const getPageGroupTranslation = await this.pageGroupService.findOne({
            where: {
                groupId: `${groupId}`,
            },
            relations: ['pageGroupTranslation'],
        });
        if (!getPageGroupTranslation) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page group id',
            };
            return response.status(400).send(errorResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got page Group translation detail',
            data: getPageGroupTranslation,
        };
        return response.status(200).send(successResponse);
    }
}
