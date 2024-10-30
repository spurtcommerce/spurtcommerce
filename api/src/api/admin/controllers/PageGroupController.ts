/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Put,
    Delete,
    Get,
    Post,
    JsonController,
    Authorized,
    Res,
    Req,
    QueryParam,
    Param, BodyParam
} from 'routing-controllers';
import { PageGroup } from '../../core/models/PageGroup';
import { PageGroupService } from '../../core/services/PageGroupService';
import { PageService } from '../../core/services/PageService';

@JsonController('/page-group')
export class PageGroupController {
    constructor(private pageGroupService: PageGroupService, private pageService: PageService) {
    }

    // Create Page Group API
    /**
     * @api {post} /api/page-group Add Page group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pageGroupName
     * @apiParam (Request body) {Number} status
     * @apiParamExample {json} Input
     * {
     *      "pageGroupName" : "",
     *      "status" : "",
     *      "data": {
     *          "groupName": "",
     *          "isActive": 1,
     *          "createdDate": "",
     *          "groupId": 1
     *       }
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group
     * @apiErrorExample {json} Page group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'add-page-group'])
    public async addAttributeGroup(@BodyParam('pageGroupName') pageGroupName: string, @BodyParam('status') status: number, @Res() response: any): Promise<any> {
        const newPageGroup = new PageGroup();
        newPageGroup.groupName = pageGroupName;
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

    // Page Group List API
    /**
     * @api {get} /api/page-group Page Group list API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} groupName groupName
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Page Group list API",
     *      "data":[
     *                  {
     *                      "groupId" : "",
     *                      "pageGroupName" : "",
     *                      "isActive": 1
     *                  }
     *              ]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async PageGrouplist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @QueryParam('keyword') keyword: string, @QueryParam('groupName') groupName: string, @Res() response: any): Promise<any> {
        const select = [];
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
        const WhereConditions = [];
        const relations = [];
        const pageGroupList = await this.pageGroupService.list(limit, offset, select, search, relations, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the group list.',
            data: pageGroupList,
        };
        return response.status(200).send(successResponse);
    }
    // Page Group Count API
    /**
     * @api {get} /api/page-group/pagegroup-count Page Group Count API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page group count",
     *      "data": {
     *                 "totalPage": 18,
     *                 "activePage": 7,
     *                 "inActivePage": 11
     *              },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/pagegroup-count
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/pagegroup-count')
    @Authorized()
    public async pageGroupCount(@Res() response: any): Promise<any> {
        const pageGroup: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [];
        const relations = [];
        const allPageGroupCount = await this.pageGroupService.list(0, 0, select, relations, search, WhereConditions, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const activePageGroupCount = await this.pageGroupService.list(0, 0, select, relations, search, whereConditionsActive, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'where',
                value: 0,
            },
        ];
        const inActivePageGroupCount = await this.pageGroupService.list(0, 0, select, relations, search, whereConditionsInActive, 1);
        pageGroup.totalPage = allPageGroupCount;
        pageGroup.activePage = activePageGroupCount;
        pageGroup.inActivePage = inActivePageGroupCount;
        return response.status(200).send({
            status: 1,
            message: 'Successfully got the page group count',
            data: pageGroup,
        });
    }
    // update Attribute Group
    /**
     * @api {put} /api/page-group/:id Update Page Group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pageGroupName pageGroupName
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "pageGroupName" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated page group.",
     *      "status": "1"
     *      "data": {
     *                 "createdBy": 1,
     *                 "createdDate": "",
     *                 "modifiedBy": 1,
     *                 "modifiedDate": "",
     *                 "groupId": 1,
     *                 "groupName": "",
     *                 "isActive": 1
     *               }
     * }
     * @apiSampleRequest /api/page-group/:id
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'Edit-page-group'])
    public async updatePageGroup(@Param('id') id: number, @BodyParam('pageGroupName') pageGroupName: string, @BodyParam('status') status: number, @Res() response: any): Promise<any> {

        const group = await this.pageGroupService.findOne({
            where: {
                groupId: id,
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
        const page = await this.pageService.findOne({ where: { pageGroupId: id } });
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

    // delete Page Group API
    /**
     * @api {delete} /api/page-group/:id Delete Page group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/:id
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'page-group-delete'])
    public async deletePageGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const pageGroup = await this.pageGroupService.findOne({
            where: {
                groupId: id,
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
            where: {
                pageGroupId: id,
            },
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

    //   Get Page Group API
    /**
     * @api {get} /api/page-group/get-page-group/:id Get Page Group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page Group",
     *      "status": "1",
     *      "data": {
     *                   "createdBy": 1,
     *                   "createdDate": "",
     *                   "modifiedBy": 1,
     *                   "modifiedDate": "",
     *                   "groupId": 1,
     *                   "groupName": "",
     *                   "isActive": 1
     *               }
     * }
     * @apiSampleRequest /api/page-group/get-page-group/:id
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-page-group/:id')
    @Authorized()
    public async getPageGroup(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const page = await this.pageGroupService.findOne({ where: { groupId: id } });
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
