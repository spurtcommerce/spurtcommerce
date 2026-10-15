/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Put, Delete, Get, Post, JsonController, Authorized, Res, Req, QueryParam, Param, BodyParam } from 'routing-controllers';
import { PageGroup } from '../../core/models/PageGroup';
import { PageGroupService } from '../../core/services/PageGroupService';
import { PageService } from '../../core/services/PageService';
import { Service } from 'typedi';

@Service()
@JsonController('/page-group')
export class PageGroupController {
    constructor(
        private pageGroupService: PageGroupService,
        private pageService: PageService
    ) {
    }

    /**
     * @api {post} /api/page-group Create Page Group
     * @apiGroup Page Group
     * @apiName CreatePageGroup
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} groupName           Page group name (max 255 characters)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created new page group.",
     *         "data": {
     *             "groupId": 1,
     *             "groupName": "Company Information",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiSampleRequest /api/page-group
     */
    @Post()
    @Authorized(['vendor', 'create-page-group'])
    public async addAttributeGroup(@BodyParam('pageGroupName') pageGroupName: string, @BodyParam('status') status: number, @Res() response: any, @Req() request: any): Promise<any> {
        const newPageGroup = new PageGroup();
        newPageGroup.groupName = pageGroupName;
        newPageGroup.tenantId = request.user.tenantId;
        newPageGroup.isActive = status;
        const PageGroupSaved = await this.pageGroupService.create(newPageGroup);
        if (PageGroupSaved) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added Page Group.',
                data: PageGroupSaved,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create Page Group.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/page-group Page Group List
     * @apiGroup Page Group
     * @apiName PageGroupList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [status]           Status filter
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {String} [groupName]        Group name filter
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got page group list.",
     *         "data": [
     *             {
     *                 "groupId": 1,
     *                 "groupName": "Company Info",
     *                 "isActive": 1
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/page-group
     */
    @Get()
    @Authorized(['vendor', 'list-page-group'])
    public async PageGrouplist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @QueryParam('keyword') keyword: string, @QueryParam('groupName') groupName: string, @Res() response: any, @Req() request: any): Promise<any> {
        const search = [
            {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        if (keyword?.trim()) {
            search.push({
                name: 'groupName',
                op: 'like',
                value: keyword,
            });
        }
        if (groupName?.trim()) {
            search.push({
                name: 'groupName',
                op: 'like',
                value: groupName,
            });
        }
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        const pageGroupList = await this.pageGroupService.list(limit, offset, [], search, [], whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the group list.',
            data: pageGroupList,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {put} /api/page-group/:id Update Page Group
     * @apiGroup Page Group
     * @apiName UpdatePageGroup
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Page Group ID
     *
     * @apiBody {String} groupName           Updated page group name
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated page group.",
     *         "data": {
     *             "groupId": 1,
     *             "groupName": "Company Info Updated",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Page-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid page group Id"
     *     }
     *
     * @apiSampleRequest /api/page-group/:id
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-page-group'])
    public async updatePageGroup(@Param('id') id: number, @BodyParam('pageGroupName') pageGroupName: string, @BodyParam('status') status: number, @Res() response: any, @Req() request: any): Promise<any> {

        const group = await this.pageGroupService.findOne({
            where: {
                groupId: id,
                tenantId: request.user.tenantId,
            },
        });
        if (!group) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group Id.',
            };
            return response.status(400).send(errorResponse);
        }
        group.groupName = pageGroupName;
        const page = await this.pageService.findOne({ pageGroupId: id } );
        if (page) {
            if (status === 0) {
                const errorResponse: any = {
                    status: 0,
                    message: `Can't inactive page group, mapped with page's`,
                };
                return response.status(400).send(errorResponse);
            }
        }
        group.isActive = status;
        const groupSave = await this.pageGroupService.create(group);
        if (groupSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the Page group',
                data: groupSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the Page group',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {delete} /api/page-group/:id Delete Page Group
     * @apiGroup Page Group
     * @apiName DeletePageGroup
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Page Group ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted page group."
     *     }
     *
     * @apiErrorExample {json} Invalid-Page-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid page group Id"
     *     }
     *
     * @apiSampleRequest /api/page-group/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-page-group'])
    public async deletePageGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const pageGroup = await this.pageGroupService.findOne({
            where: {
                groupId: id,
                tenantId: request.user.tenantId,
            },
        });
        if (!pageGroup) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid page Id',
            };
            return response.status(400).send(errorResponse);
        }
        const page = await this.pageService.findOne({
            pageGroupId: id,
        });
        if (page) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this group as pages are mapped to it',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteGroup = await this.pageGroupService.delete(id);
        if (deleteGroup) {
            const successResponse: any = {
                status: 1,
                message: 'Successfullly deleted the group',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the group',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/page-group/get-page-group/:id Get Page Group Detail
     * @apiGroup Page Group
     * @apiName GetPageGroupDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Page Group ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got page group details.",
     *         "data": {
     *             "groupId": 1,
     *             "groupName": "Company Info",
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Page-Group:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid page group Id"
     *     }
     *
     * @apiSampleRequest /api/page-group/get-page-group/:id
     */
    @Get('/get-page-group/:id')
    @Authorized(['vendor', 'list-page-group'])
    public async getPageGroup(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const page = await this.pageGroupService.findOne({ where: { groupId: id, tenantId: request.user.tenantId } });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully Got page group',
            data: page,
        };
        return response.status(200).send(successResponse);
    }
}
