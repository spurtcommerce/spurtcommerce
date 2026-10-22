/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, QueryParam, JsonController, Authorized, Res, Req, UseBefore, Param, Body, Put } from 'routing-controllers';
import { CustomerPermissionModuleGroupService } from '../../core/services/CustomerPermissionModuleGroupService';
import { CustomerPermissionModuleService } from '../../core/services/CustomerPermissionModuleService';
import { CustomerUsersService } from '../../core/services/CustomerUsersService';
import { CustomerUserGroupService } from '../../core/services/CustomerUserGroupService';
import { CheckCustomerMiddleware } from '../../../../src/api/core/middlewares/checkTokenMiddleware';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';
import { Service } from 'typedi';
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';

@Service()
// @UseBefore(CheckAddonMiddleware)
@UseBefore(TenantValidationMiddleware)
@UseBefore(CheckCustomerMiddleware)
@JsonController('/customer-permission-module')
export class CustomerPermissionModuleController {
    constructor(
        private customerPermissionModuleGroupService: CustomerPermissionModuleGroupService,
        private customerPermissionModuleService: CustomerPermissionModuleService,
        private customerUsersService: CustomerUsersService,
        private customerUserGroupService: CustomerUserGroupService
    ) { }

    // Permission List API
    /**
     * @api {get} /api/customer-permission-module Permission Module List API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully get page list",
     *      "data": [
     *          {
     *              "id": 61,
     *              "name": "Settings Delivery Location",
     *              "slugName": "settings-delivery-location",
     *              "sortOrder": 1,
     *              "customerPermissionModule": [
     *                {
     *                  "id": 210,
     *                  "name": "Add Delivery Location",
     *                  "slugName": "add-delivery-location",
     *                  "moduleGroupId": 61
     *                }
     *              ]
     *          }
     *      ],
     * }
     * @apiSampleRequest /api/customer-permission-module
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    public async permissionModuleList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        if (count) {
            const customerPermissionModuleGroupCount = await this.customerPermissionModuleGroupService.count();
            return response.status(200).send({
                status: 1,
                message: 'Successfully got customer permission module group list count',
                data: customerPermissionModuleGroupCount,
            });
        }
        const customerPermissionModuleGroupList = await this.customerPermissionModuleGroupService.find({
            select: ['id', 'name', 'slugName', 'sortOrder', 'description'],
            take: limit,
            skip: offset,
        });
        const result = customerPermissionModuleGroupList.map(async (permissionModuleGroup: any) => {
            const customerPermissionModuleList: any = await this.customerPermissionModuleService.findAll({
                select: ['id', 'moduleGroupId', 'name', 'slugName', 'isListed'],
                where: { moduleGroupId: permissionModuleGroup.id },
                orderBy: { sortOrder: 'ASC' },
            });

            // const customerPermissionModule = customerPermissionModuleList.filter((permissionModule: any) => {
            //     permissionModule.isList = permissionModule.slugName.includes('list');
            //     return true;
            // });

            const customerPermissionModule = customerPermissionModuleList.filter((permissionModule: any) => {
                // permissionModule.isList = false;
                return true;
            });

            const temp: any = { ...permissionModuleGroup };
            temp.customerPermissionModule = customerPermissionModule;
            return temp;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got customer permission module group list',
            data: await Promise.all(result),
        };
        return response.status(200).send(successResponse);
    }

    // Add Permission API
    /**
     * @api {put} /api/customer-permission-module/group/:id Add Permission API
     * @apiGroup Permission Module
     * @apiHeader {String} Authorization
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
     * @apiSampleRequest /api/customer-permission-module/group/:id
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/group/:id')
    public async addPermission(@Param('id') roleId: number, @Body({ validate: true }) payload: any, @Res() response: any, @Req() request: any): Promise<any> {
        const customerUser = await this.customerUsersService.findOne({
            where: {
                id: request.user.id,
                deleteFlag: 0,
            },
        });
        const customerUserGroup = await this.customerUserGroupService.findOne({ where: { id: roleId } });
        if (!customerUserGroup) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Role Id',
            });
        }
        if (customerUser?.customerUserGroupId === customerUserGroup.id) {
            const errorResponse = {
                status: 0,
                message: 'You cannot update the role as currently the user is mapped to it',
            };
            return response.status(400).send(errorResponse);
        }
        const permissions: any = {};
        const userPermissions: any = payload.permission ? JSON.parse(payload.permission) : {};
        const customerPermissionModuleList: any = await this.customerPermissionModuleService.find({});
        customerPermissionModuleList.forEach(element => {
            if (userPermissions.indexOf(element.slugName) !== -1) {
                permissions[element.slugName] = true;
            } else {
                permissions[element.slugName] = false;
            }
        });
        customerUserGroup.permission = JSON.stringify(permissions);
        const updateCustomerUserOrGroup = await this.customerUserGroupService.update(roleId, customerUserGroup);

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the customer permission',
            data: updateCustomerUserOrGroup,
        };
        return response.status(200).send(successResponse);
    }

    // Permission List API
    /**
     * @api {get} /api/customer-permission-module/group/:id/permission Get Permission API
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
     * @apiSampleRequest /api/customer-permission-module/group/:id/permission
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/group/:id/permission')
    public async getPermissionModule(@Param('id') roleId: number, @Res() response: any): Promise<any> {
        const customerUserGroup = await this.customerUserGroupService.findOne({ where: { id: roleId } });
        if (!customerUserGroup) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid role ID.',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got permission list',
            data: { permission: JSON.parse(customerUserGroup.permission) || {} },
        };
        return response.status(200).send(successResponse);
    }

    // Permission for current customer user API
    /**
     * @api {get} /api/customer-permission-module Permission for current customer user API
     * @apiGroup Customer Permission Module
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got permission for user",
     *      "data":{
     *         "permission": {},
     *      }
     * }
     * @apiSampleRequest /api/customer-permission-module/permission-me
     * @apiErrorExample {json} permission-module error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/permission-me')
    @Authorized('customer')
    public async permissionModuleMe(@Req() request: any, @Res() response: any): Promise<any> {
        const customerUser = await this.customerUsersService.findOne({
            where: {
                id: request.user.id,
                deleteFlag: 0,
            }, relations: ['customerUserGroups'],
        });
        if (customerUser) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got permission list for current user',
                data: { permission: JSON.parse(customerUser.customerUserGroups.permission) || {} },
            };
            return response.status(200).send(successResponse);
        }

        const errorResponse: any = {
            status: 0,
            message: 'List not founded.',
        };
        return response.status(400).send(errorResponse);
    }
}
