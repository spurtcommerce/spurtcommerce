/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Put, Param, QueryParam, Get, Delete, Req
} from 'routing-controllers';

import { DeleteRoleRequest as DeleteRoleRequest } from './requests/DeleteRoleRequest';
import { CreateRole as CreateRoleRequest } from './requests/CreateRoleRequest';
import { UserGroupService } from '../../core/services/UserGroupService';
import { UserService } from '../../core/services/UserService';
import { UserGroup } from '../../core/models/UserGroup';
import { Not } from 'typeorm';

@JsonController('/role')
export class RoleController {

    constructor(
        private userGroupService: UserGroupService, private userService: UserService) {
    }

    // Create Role API
    /**
     * @api {post} /api/role/create-role Create Role API
     * @apiGroup Role
     * @apiParam (Request body) {String{..64}} name roleName
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
     *      "message": "Role saved successfully.",
     *      "status": "1"
     *      "data": {
     *              "name": "",
     *              "isActive": "",
     *              "slug": "",
     *              "createdDate": "",
     *              }
     * }
     * @apiSampleRequest /api/role/create-role
     * @apiErrorExample {json} createRole error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-role')
    @Authorized(['admin', 'create-role'])
    public async createRole(@Body({ validate: true }) createRoleParam: CreateRoleRequest, @Res() response: any): Promise<any> {
        const slugName = createRoleParam.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const role = await this.userGroupService.findOne({
            where: {
                slug: slugName,
            },
        });
        if (role) {
            const errorResponse: any = {
                status: 0,
                message: 'This role already exists',
            };
            return response.status(400).send(errorResponse);
        }

        const newRoleParams: any = new UserGroup();
        newRoleParams.name = createRoleParam.name;
        newRoleParams.isActive = createRoleParam.status;
        newRoleParams.slug = slugName;
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
                message: 'Unable to save the role',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Update Role API
    /**
     * @api {put} /api/role/update-role/:id Update Role API
     * @apiGroup Role
     * @apiParam (Request body) {String{..64}} name roleName
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
     *      "status": "1",
     *      "data": {
     *              "name": "",
     *              "isActive": "",
     *              "slug": "",
     *              "createdDate": "",
     *              "groupId": ""
     *            }
     * }
     * @apiSampleRequest /api/role/update-role/:id
     * @apiErrorExample {json} updateRole error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-role/:id')
    @Authorized(['admin', 'edit-role'])
    public async updateRole(@Param('id') id: number, @Body({ validate: true }) createRoleParam: CreateRoleRequest, @Res() response: any): Promise<any> {
        const role = await this.userGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        if (!role) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid role Id.',
            };
            return response.status(400).send(errorResponse);
        }
        // const checkRole = await this.userGroupService.findOne({where: {name: }})

        const newRoleParams: any = new UserGroup();
        const slugName = createRoleParam.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const checkRole = await this.userGroupService.findOne({
            where: {
                slug: slugName, groupId: Not(id),
            },
        });
        if (checkRole) {
            const errorResponse: any = {
                status: 0,
                message: 'This role already exists',
            };
            return response.status(400).send(errorResponse);
        }
        if (role.slug !== 'admin') {
            newRoleParams.name = createRoleParam.name;
            newRoleParams.isActive = createRoleParam.status;
            newRoleParams.slug = slugName;
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
                    message: 'Unable to update the Role',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            return response.status(400).send({
                status: 0,
                message: 'Cannot update admin',
            });
        }
    }

    // Role List API
    /**
     * @api {get} /api/role/rolelist Role List API
     * @apiGroup Role
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get role list",
     *    "data": [{
     *       "groupId": "",
     *       "name": "",
     *       "isActive": ""
     *          }]
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/role/rolelist
     * @apiErrorExample {json} role error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/rolelist')
    @Authorized(['admin', 'list-role'])
    public async roleList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
            message: 'Successfully get all role list',
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
    @Authorized(['admin', 'delete-role'])
    public async deleteRole(@Body({ validate: true }) role: DeleteRoleRequest, @Res() response: any, @Req() request: any): Promise<any> {

        const roleId = await this.userGroupService.findOne({
            where: {
                groupId: role.groupId,
            },
        });
        if (!roleId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid role Id',
            };
            return response.status(400).send(errorResponse);
        }

        const defaultRoleId = await this.userGroupService.findOne({
            where: {
                groupId: role.groupId,
                slug: 'admin',
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
                deleteFlag: 0,
            },
        });

        if (finduser) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this role, as users are mapped to this role',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteRole = await this.userGroupService.delete(role.groupId);
        if (deleteRole) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the role',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the role',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
