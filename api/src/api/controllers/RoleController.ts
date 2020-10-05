/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Put, Param, QueryParam, Get, Delete, Req
} from 'routing-controllers';

import { DeleteRoleRequest as DeleteRoleRequest } from './requests/DeleteRoleRequest';
import { CreateRole as CreateRoleRequest } from './requests/CreateRoleRequest';
import { UserGroupService } from '../services/UserGroupService';
import { UserService } from '../services/UserService';
import {UserGroup} from '../models/UserGroup';

@JsonController('/role')
export class RoleController {

    constructor(
        private userGroupService: UserGroupService, private userService: UserService) {
    }

    // Create Role API
    /**
     * @api {post} /api/role/create-role Create Role API
     * @apiGroup Role
     * @apiParam (Request body) {String} name roleName
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Role is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/role/create-role
     * @apiErrorExample {json} createRole error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-role')
    @Authorized()
    public async createRole(@Body({ validate: true }) createRoleParam: CreateRoleRequest, @Res() response: any): Promise<any> {
        console.log(createRoleParam);
        const role = await this.userGroupService.findOne({
            where: {
                name: createRoleParam.name,
            },
        });
        console.log(role);
        if (role) {
            const errorResponse: any = {
                status: 0,
                message: 'this role already exist',
            };
            return response.status(400).send(errorResponse);
        }

        const newRoleParams: any = new UserGroup();
        newRoleParams.name = createRoleParam.name;
        newRoleParams.isActive = createRoleParam.status;
        const userGroupSaveResponse = await this.userGroupService.create(newRoleParams);
        if (userGroupSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'Role saved successfully',
                data: userGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to save Role',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Update Role API
    /**
     * @api {put} /api/role/update-role/:id Update Role API
     * @apiGroup Role
     * @apiParam (Request body) {String} name roleName
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "slug" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Role is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/role/update-role/:id
     * @apiErrorExample {json} updateRole error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-role/:id')
    @Authorized()
    public async updateRole(@Param('id') id: number, @Body({ validate: true }) createRoleParam: CreateRoleRequest, @Res() response: any): Promise<any> {
        console.log(createRoleParam);
        const role = await this.userGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        console.log(role);
        if (!role) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid roleId',
            };
            return response.status(400).send(errorResponse);
        }

        const newRoleParams: any = new UserGroup();
        newRoleParams.name = createRoleParam.name;
        newRoleParams.isActive = createRoleParam.status;
        const userGroupSaveResponse = await this.userGroupService.update(id, newRoleParams);
        if (userGroupSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'Role updated successfully',
                data: userGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Role',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Role List API
    /**
     * @api {get} /api/role/rolelist Role List API
     * @apiGroup Role
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get role list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/role/rolelist
     * @apiErrorExample {json} role error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get ('/rolelist')
    @Authorized()
    public async roleList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        console.log(keyword);
        const select = ['groupId', 'name', 'isActive'];
        const whereConditions = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];

        const roleList = await this.userGroupService.list(limit, offset, select, whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all role List',
            data: roleList,
        };
        return response.status(200).send(successResponse);
    }
    // delete Role API
    /**
     * @api {delete} /api/role/delete-role/:id Delete Role API
     * @apiGroup Role
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiParamExample {json} Input
     * {
     *      "roleId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Role.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/role/delete-role/:id
     * @apiErrorExample {json} Role error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-role/:id')
    @Authorized()
    public async deleteRole(@Body({validate: true}) role: DeleteRoleRequest, @Res() response: any, @Req() request: any): Promise<any> {

        const roleId = await this.userGroupService.findOne({
            where: {
                groupId: role.groupId,
            },
        });
        if (!roleId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid roleId',
            };
            return response.status(400).send(errorResponse);
        }

        const defaultRoleId = await this.userGroupService.findOne({
            where: {
                groupId: role.groupId,
                name: 'Admin',
            },
        });

        if (defaultRoleId) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete default role',
            };
            return response.status(400).send(errorResponse);
        }

        const finduser = await this.userService.findOne({
            where: {
                userGroupId: role.groupId,
            },
        });

        if (finduser) {
            const errorResponse: any = {
                status: 0,
                message: 'Users are mapped for this role, So you cannot delete this role',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteRole = await this.userGroupService.delete(role.groupId);
        console.log('role' + deleteRole);
        if (deleteRole) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted role',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete role',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
