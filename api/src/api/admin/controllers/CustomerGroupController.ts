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

import { CreateCustomerGroup } from './requests/CreateCustomerGroupRequest';
import { CustomerGroupService } from '../../core/services/CustomerGroupService';
import { CustomerService } from '../../core/services/CustomerService';
import { CustomerGroup } from '../../core/models/CustomerGroup';

@JsonController('/customer-group')
export class CustomerGroupController {

    constructor(
        private customerGroupService: CustomerGroupService, private customerService: CustomerService) {
    }

    // Create Customer Group API
    /**
     * @api {post} /api/customer-group Create customer group API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {String{..30}} name groupName
     * @apiParam (Request body) {String} [description] groupDescription
     * @apiParam (Request body) {String} colorcode colorcode
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "description" : "",
     *      "status" : "",
     *      "colorcode": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Customer group is created successfully",
     *      "status": "1",
     *      "data": {
     *              "name": "",
     *              "description": "",
     *              "colorCode": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "groupId": ""
     *      }
     * }
     * @apiSampleRequest /api/customer-group
     * @apiErrorExample {json} createCustomer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'create-customer-group'])
    public async createCustomerGroup(@Body({ validate: true }) createCustomerGroup: CreateCustomerGroup, @Res() response: any): Promise<any> {
        const customer = await this.customerGroupService.findOne({
            where: {
                name: createCustomerGroup.name,
            },
        });
        if (customer) {
            const errorResponse: any = {
                status: 0,
                message: 'This Customer Group already exists',
            };
            return response.status(400).send(errorResponse);
        }
        const newGroupParams: any = new CustomerGroup();
        newGroupParams.name = createCustomerGroup.name;
        newGroupParams.description = createCustomerGroup.description;
        newGroupParams.colorCode = createCustomerGroup.colorcode;
        newGroupParams.isActive = createCustomerGroup.status;
        const customerGroupSaveResponse = await this.customerGroupService.create(newGroupParams);
        if (customerGroupSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'Customer Group Created Successfully',
                data: customerGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to save Customer Group',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Update Customer Group API
    /**
     * @api {put} /api/customer-group/:id Update Customer Group API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {String{..30}} name groupName
     * @apiParam (Request body) {String} [description] groupDescription
     * @apiParam (Request body) {String} colorcode colorcode
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "description" : "",
     *      "colorcode" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Customer Group is updated successfully",
     *      "status": "1",
     *      "data": {
     *              "name": "",
     *              "description": "",
     *              "colorCode": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "groupId": ""
     *              }
     * }
     * @apiSampleRequest /api/customer-group/:id
     * @apiErrorExample {json} update-customer-group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-customer-group'])
    public async updateCustomerRole(@Param('id') id: number, @Body({ validate: true }) createRoleParam: CreateCustomerGroup, @Res() response: any): Promise<any> {
        const customer = await this.customerGroupService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }

        const newCustomerGroup: any = new CustomerGroup();
        newCustomerGroup.name = createRoleParam.name;
        newCustomerGroup.description = createRoleParam.description;
        newCustomerGroup.colorCode = createRoleParam.colorcode;
        newCustomerGroup.isActive = createRoleParam.status;
        const customerGroupSaveResponse = await this.customerGroupService.update(id, newCustomerGroup);
        if (customerGroupSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'Customer Group updated successfully',
                data: customerGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the Customer Group',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Customer Group List API
    /**
     * @api {get} /api/customer-group customergroup-list API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} groupName groupName
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get customer group list",
     *    "status": "1"
     *    "data":{
     *           "groupId": "",
     *           "name": "",
     *           "description": "",
     *           "colorCode": "",
     *           "isActive": ""
     *    },
     *  }
     * @apiSampleRequest /api/customer-group
     * @apiErrorExample {json} customergroup error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async customergroupList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('groupName') groupName: string, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'name', 'description', 'colorCode', 'isActive', 'createdDate', 'modifiedDate'];
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

        if (groupName) {
            whereConditions.push({
                name: 'name',
                op: 'like',
                value: groupName,
            });
        }

        const customerGroupList = await this.customerGroupService.list(limit, offset, select, whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got all customer group List',
            data: customerGroupList,
        };
        return response.status(200).send(successResponse);
    }
    // delete Customer Group API
    /**
     * @api {delete} /api/customer-group/:id Delete Customer Group API
     * @apiGroup CustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiParamExample {json} Input
     * {
     *      "groupId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted customerGroup.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-group/:id
     * @apiErrorExample {json} CustomerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'delete-customer-group'])
    public async deleteGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const groupId = await this.customerGroupService.findOne({
            where: {
                id,
            },
        });
        if (!groupId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }

        const defaultGroupId = await this.customerGroupService.findOne({
            where: {
                id,
                name: 'default',
            },
        });

        if (defaultGroupId) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this customer group',
            };
            return response.status(400).send(errorResponse);
        }

        const findCustomer = await this.customerService.findOne({
            where: {
                customerGroupId: id,
                deleteFlag: 0,
            },
        });

        if (findCustomer) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this Customer group as Users are mapped to it',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteGroup = await this.customerGroupService.delete(id);
        if (deleteGroup) {
            const successResponse: any = {
                status: 1,
                message: 'Group deleted successfully',
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

    // Detail Customer Group API
    /**
     * @api {delete} /api/customer-group/:id Detail Customer Group API
     * @apiGroup CustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Got Customer Group",
     *      "status": "1",
     *      "data":{
     *           "name": "",
     *           "description": "",
     *           "colorCode": "",
     *           "isActive": ""
     *            },
     * }
     * @apiSampleRequest /api/customer-group/:id
     * @apiErrorExample {json} CustomerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized('admin')
    public async detailGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const group = await this.customerGroupService.findOne({
            where: {
                id,
            },
        });
        if (!group) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }
        return response.status(400).send({
            status: 0,
            message: 'Successfully Got Customer Group',
            data: group,
        });
    }
}
