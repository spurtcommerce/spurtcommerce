/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, QueryParam, JsonController, Authorized, Res, Post, BodyParam, Req } from 'routing-controllers';
import { PermissionModuleService } from '../../core/services/PermissionModuleService';
import { PermissionModuleGroupService } from '../../core/services/PermissionModuleGroupService';
import { UserGroupService } from '../../core/services/UserGroupService';
import { UserService } from '../../core/services/UserService';

@JsonController('/permission-module')
export class AdminPermissionController {
    constructor(private permissionModuleService: PermissionModuleService, private permissionModuleGroupService: PermissionModuleGroupService, private userService: UserService, private userGroupService: UserGroupService) {
    }

    // Permission List API
    /**
     * @api {get} /api/permission-module/list Permission Module List API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "data": [{
     *              "moduleGroupId": 61,
     *              "name": "Settings Delivery Location",
     *              "slugName": "settings-delivery-location",
     *              "sortOrder": 1,
     *              "permissionModule": [
     *                {
     *                  "moduleId": 210,
     *                  "name": "Add Delivery Location",
     *                  "slugName": "add-delivery-location",
     *                  "moduleGroupId": 61
     *                }]
     *              }],
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/list
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/list')
    @Authorized()
    public async permissionList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['moduleGroupId', 'name', 'slugName', 'sortOrder'];
        const search = [];
        const WhereConditions = [];
        const permissionModuleGroupList = await this.permissionModuleGroupService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got permission module group list count',
                data: permissionModuleGroupList,
            };
            return response.status(200).send(successRes);
        }
        const promise = permissionModuleGroupList.map(async (result: any) => {
            const permissionModule: any = await this.permissionModuleService.findAll({ select: ['moduleId', 'moduleGroupId', 'name', 'slugName'], where: { moduleGroupId: result.moduleGroupId }, orderBy: { sortOrder: 'ASC' } });
            const temp: any = result;
            temp.permissionModule = permissionModule;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of pages',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Add Permission API
    /**
     * @api {post} /api/permission-module/add-permission Add Permission API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} refType 1->role 2->user
     * @apiParam (Request body) {Number} refId refId roleId | userId
     * @apiParam (Request body) {String} permission stringified data
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added permission",
     *      "data":{
     *      "pageId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/add-permission
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-permission')
    @Authorized()
    public async addPermission(@BodyParam('refType') refType: number, @BodyParam('refId') refId: number, @BodyParam('permission') permission: string, @Res() response: any, @Req() request: any): Promise<any> {
        const user = await this.userService.findOne({
            where: {
                userId: request.user.userId,
                deleteFlag: 0,
            }, relations: ['usergroup'],
        });
        const permissionModuleList: any = await this.permissionModuleService.list(0, 0, [], [], [], false);
        const permissions: any = {};
        const userPermissions: any = permission ? JSON.parse(permission) : {};
        permissionModuleList.forEach(element => {
            if (userPermissions.indexOf(element.slugName) !== -1) {
                permissions[element.slugName] = true;
            } else {
                permissions[element.slugName] = false;
            }
        });
        let saveResponse: any;
        if (refType && +refType === 1) {
            const roleDetail = await this.userGroupService.findOne({ where: { groupId: refId } });
            if (!roleDetail) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Reference Id',
                };
                return response.status(400).send(errorResponse);
            }
            if (user) {
                if (user.userGroupId === roleDetail.groupId) {
                    const errorResponse = {
                        status: 0,
                        message: 'You cannot update the role as currently the user is mapped to it',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            roleDetail.permission = JSON.stringify(permissions);
            saveResponse = await this.userGroupService.update(refId, roleDetail);
        } else if (refType && +refType === 2) {
            const userDetail = await this.userService.findOne({ where: { userId: refId } });
            if (!userDetail) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Reference Id',
                };
                return response.status(400).send(errorResponse);
            }
            if (request.user.userId !== refId) {
                const errorResponse = {
                    status: 0,
                    message: 'Permission denied to perform this action',
                };
                return response.status(400).send(errorResponse);
            }
            userDetail.permission = JSON.stringify(permissions);
            saveResponse = await this.userService.update(refId, userDetail);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the permission',
            data: saveResponse,
        };
        return response.status(200).send(successResponse);
    }

    // Permission List API
    /**
     * @api {get} /api/permission-module/get-permission Get Permission API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} refType 1->role 2->user
     * @apiParam (Request body) {Number} refId refId roleId | userId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got permission data",
     *      "data":{
     *      "pageId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/get-permission
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-permission')
    @Authorized()
    public async getPermission(@QueryParam('refType') refType: number, @QueryParam('refId') refId: number, @Res() response: any): Promise<any> {
        let permissionResponse: any;
        if (refType && +refType === 1) {
            const roleDetail = await this.userGroupService.findOne({ where: { groupId: refId } });
            if (!roleDetail) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Reference Id',
                };
                return response.status(400).send(errorResponse);
            }
            permissionResponse = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
        } else if (refType && +refType === 2) {
            const userDetail = await this.userService.findOne({ where: { userId: refId } });
            if (!userDetail) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Reference Id',
                };
                return response.status(400).send(errorResponse);
            }
            if (userDetail.permission) {
                permissionResponse = userDetail.permission ? JSON.parse(userDetail.permission) : {};
            } else {
                const roleDetail = await this.userGroupService.findOne({ where: { groupId: userDetail.userGroupId } });
                permissionResponse = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
            }
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got permission list',
            data: permissionResponse,
        };
        return response.status(200).send(successResponse);
    }

    // Permission for current admin user API
    /**
     * @api {get} /api/permission-module/permission-me Permission Me API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got permission for user",
     *      "data":{
     *      "pageId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/permission-module/permission-me
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/permission-me')
    @Authorized()
    public async permissionMe(@Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.userService.findOne({
            where: {
                userId: request.user.userId,
                deleteFlag: 0,
            }, relations: ['usergroup'],
        });
        if (user) {
            let permission: any = {};
            if (user.userGroupId !== 1) {
                const userDetail = await this.userService.findOne({ where: { userId: user.userId } });
                if (userDetail.permission) {
                    permission = JSON.parse(userDetail.permission);
                } else {
                    const roleDetail = await this.userGroupService.findOne({ where: { groupId: user.userGroupId } });
                    permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
                }
            }

            const successResponse: any = {
                status: 1,
                message: 'Successfully got permission list for current user',
                data: permission,
            };
            return response.status(200).send(successResponse);
        }

        const errorResponse: any = {
            status: 0,
            message: 'Invalid token ID',
        };
        return response.status(400).send(errorResponse);
    }

}
