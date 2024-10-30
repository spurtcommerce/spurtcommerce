/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    QueryParam,
    Param,
    BodyParam
} from 'routing-controllers';
import { In, Not } from 'typeorm';
import { OrderStatus } from '../../core/models/OrderStatus';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { CreateOrderStatus } from './requests/CreateOrderStatusRequest';
import { UpdateFullfillmentStatus } from './requests/UpdateFullfillmentStatus';
import { OrderFullfillmentStatusService } from '../../core/services/OrderFullfillmentStatusService';
import { OrderFullfillmentStatus } from '../../core/models/OrderFullfillmentStatus';
import { OrderStatusToFullfillmentService } from '../../../../src/api/core/services/OrderStatusToFullfillmentService';
import { OrderStatusToFullfillment } from '../../../api/core/models/OrderStatusToFullfillment';

@JsonController('/order-status')
export class OrderStatusController {
    constructor(
        private orderStatusService: OrderStatusService,
        private orderProductService: OrderProductService,
        private orderFullfillmentStatusService: OrderFullfillmentStatusService,
        private orderStatusToFullfillmentService: OrderStatusToFullfillmentService
    ) {
        // --
    }

    // Create Order Status API
    /**
     * @api {post} /api/order-status/create-order-status Create OrderStatus API
     * @apiGroup OrderStatus
     * @apiParam (Request body) {String{..32}} name name
     * @apiParam (Request body) {String{..255}} colorCode colorCode
     * @apiParam (Request body) {Number} [priority] priority
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} [parentId] parentId
     * @apiParam (Request body) {Number} [isAdmin] isAdmin
     * @apiParam (Request body) {Number} [isVendor] isVendor
     * @apiParam (Request body) {Number} [isBuyer] isBuyer
     * @apiParam (Request body) {Number} [isApi] isApi
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "colorCode" : "",
     *      "priority" : "",
     *      "status" : "",
     *      "parentId" : "",
     *      "isAdmin" : "",
     *      "isVendor" : "",
     *      "isBuyer" : "",
     *      "isApi" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New OrderStatus is created successfully",
     *      "status": "1",
     *      "data": {
     *       "name": "",
     *       "colorCode":"",
     *       "priority": "",
     *       "isActive": "",
     *       "parentId": "",
     *       "isAdmin": "",
     *       "isVendor": "",
     *       "isBuyer": "",
     *       "isApi": "",
     *       "createdDate": "",
     *       "orderStatusId": ""
     *          }
     * }
     * @apiSampleRequest /api/order-status/create-order-status
     * @apiErrorExample {json} createOrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-order-status')
    @Authorized(['admin', 'create-order-status'])
    public async createOrderStatus(@Body({ validate: true }) orderStatusParam: CreateOrderStatus, @Res() response: any): Promise<any> {
        const existOrder = await this.orderStatusService.findOne({ where: { name: orderStatusParam.name, parentId: orderStatusParam.parentId } });
        if (existOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this name',
            };
            return response.status(400).send(errorResponse);
        }
        const newOrderStatus = new OrderStatus();
        newOrderStatus.name = orderStatusParam.name;
        newOrderStatus.colorCode = orderStatusParam.colorCode;
        newOrderStatus.priority = orderStatusParam.priority ? orderStatusParam.priority : 1;
        newOrderStatus.isActive = orderStatusParam.status;
        newOrderStatus.parentId = orderStatusParam.parentId ? orderStatusParam.parentId : 0;
        newOrderStatus.isAdmin = orderStatusParam.isAdmin;
        newOrderStatus.isVendor = orderStatusParam.isVendor;
        newOrderStatus.isBuyer = orderStatusParam.isBuyer;
        newOrderStatus.isApi = orderStatusParam.isApi;
        newOrderStatus.defaultStatus = orderStatusParam.isFullfillment ? 2 : 0;

        const orderStatusSave = await this.orderStatusService.create(newOrderStatus);
        if (orderStatusSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new order status',
                data: orderStatusSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the Order Status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    @Post('/fullfillment')
    @Authorized(['admin', 'create-order-status'])
    public async createOrderStatusFullfillment(@Body({ validate: true }) orderStatusParam: CreateOrderStatus, @Res() response: any): Promise<any> {
        const existOrder = await this.orderFullfillmentStatusService.findOne({ where: { name: orderStatusParam.name } });
        if (existOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this name',
            };
            return response.status(400).send(errorResponse);
        }
        const newOrderStatus = new OrderFullfillmentStatus();
        newOrderStatus.name = orderStatusParam.name;
        newOrderStatus.colorCode = orderStatusParam.colorCode;
        newOrderStatus.priority = orderStatusParam.priority ? orderStatusParam.priority : 1;
        newOrderStatus.isActive = orderStatusParam.status;
        // newOrderStatus.parentId = orderStatusParam.parentId ? orderStatusParam.parentId : 0;
        newOrderStatus.isAdmin = orderStatusParam.isAdmin;
        newOrderStatus.isVendor = orderStatusParam.isVendor;
        newOrderStatus.isBuyer = orderStatusParam.isBuyer;
        newOrderStatus.isApi = orderStatusParam.isApi;
        newOrderStatus.defaultStatus = 0;

        const orderStatusSave = await this.orderFullfillmentStatusService.create(newOrderStatus);

        const sucessResponse: any = {
            status: 1,
            message: 'Successfully created full-fillment status',
            data: orderStatusSave,
        };

        return response.status(200).send(sucessResponse);

    }

    // update Order Status API
    /**
     * @api {put} /api/order-status/update-order-status/:id Update OrderStatus API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..32}} name OrderStatus name
     * @apiParam (Request body) {String{..255}} colorCode colorCode
     * @apiParam (Request body) {Number} [priority] priority
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} [parentId] parentId
     * @apiParam (Request body) {Number} [isAdmin] isAdmin
     * @apiParam (Request body) {Number} [isVendor] isVendor
     * @apiParam (Request body) {Number} [isBuyer] isBuyer
     * @apiParam (Request body) {Number} [isApi] isApi
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "colorCode" : "",
     *      "priority" : "",
     *      "status" : "",
     *      "parentId" : "",
     *      "isAdmin" : "",
     *      "isVendor" : "",
     *      "isBuyer" : "",
     *      "isApi" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the order status.",
     *      "status": "1",
     *      "data": {
     *              "name": "",
     *              "colorCode":"",
     *              "priority": "",
     *              "isActive": "",
     *              "parentId": "",
     *              "isAdmin": "",
     *              "isVendor": "",
     *              "isBuyer": "",
     *              "isApi": "",
     *              "createdDate": "",
     *              "orderStatusId": ""
     *          }
     * }
     * @apiSampleRequest /api/order-status/update-order-status/:id
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-order-status/:id')
    @Authorized(['admin', 'edit-order-status'])
    public async updateOrderStatus(@Body({ validate: true }) orderStatusParams: CreateOrderStatus, @Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const orderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: id,
            },
        });
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Status Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existOrder = await this.orderStatusService.findOne({ where: { name: orderStatusParams.name, orderStatusId: Not(orderStatus.orderStatusId), parentId: orderStatusParams.parentId } });
        if (existOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this name',
            };
            return response.status(400).send(errorResponse);
        }
        orderStatus.name = orderStatusParams.name;
        orderStatus.colorCode = orderStatusParams.colorCode;
        orderStatus.priority = orderStatusParams.priority ? orderStatusParams.priority : 1;
        orderStatus.isActive = orderStatusParams.status;
        orderStatus.parentId = orderStatusParams.parentId ? orderStatusParams.parentId : orderStatus.parentId;
        orderStatus.isAdmin = orderStatusParams.isAdmin;
        orderStatus.isVendor = orderStatusParams.isVendor;
        orderStatus.isBuyer = orderStatusParams.isBuyer;
        orderStatus.isApi = orderStatusParams.isApi;
        const orderStatusSave = await this.orderStatusService.create(orderStatus);
        if (orderStatusSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the order status',
                data: orderStatusSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the Order Status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Order Status Fullfillment API
    /**
     * @api {delete} /api/order-status/fullfillment/assign Update OrderStatus Fullfillment API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "orderIds" : [],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Updated Order Status..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/fullfillment/assign
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/fullfillment/assign')
    @Authorized()
    public async mapParentForOrderStatus(@BodyParam('orderStatuses') orderStatuses: Array<{ orderStatusId: number, fullfillmentStatusIds: number[] }>, @Req() request: any, @Res() response: any): Promise<any> {

        for (const orderStatus of orderStatuses) {

            const orderStatusExist = await this.orderStatusService.findOne({
                where: {
                    orderStatusId: orderStatus.orderStatusId,
                },
            });

            if (!orderStatusExist) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid order Status Id',
                };
                return response.status(400).send(errorResponse);
            }

            await this.orderStatusToFullfillmentService.delete({ orderStatusId: orderStatus.orderStatusId });

            for (const fullfillmentStatusId of orderStatus.fullfillmentStatusIds) {
                const orderToFullfillment = new OrderStatusToFullfillment();
                orderToFullfillment.orderStatusId = orderStatus.orderStatusId;
                orderToFullfillment.orderFulfillmentStatusId = fullfillmentStatusId;
                await this.orderStatusToFullfillmentService.create(orderToFullfillment);
            }
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated order status',
        };

        return response.status(200).send(successResponse);
    }

    @Put('/fullfillment/:id')
    @Authorized()
    public async updateOrderFullfilllmentStatus(@Body({ validate: false }) orderStatusParams: CreateOrderStatus, @Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const orderStatus = await this.orderFullfillmentStatusService.findOne({
            where: {
                id,
            },
        });
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Status Id',
            };
            return response.status(400).send(errorResponse);
        }
        const existOrder = await this.orderFullfillmentStatusService.findOne({ where: { name: orderStatusParams.name, id: Not(orderStatus.id) } });
        if (existOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this name',
            };
            return response.status(400).send(errorResponse);
        }
        orderStatus.name = orderStatusParams.name;
        orderStatus.colorCode = orderStatusParams.colorCode;
        orderStatus.priority = orderStatusParams.priority;
        orderStatus.isAdmin = orderStatusParams.isAdmin;
        orderStatus.isVendor = orderStatusParams.isVendor;
        orderStatus.isBuyer = orderStatusParams.isBuyer;
        orderStatus.isApi = orderStatusParams.isApi;
        orderStatus.isActive = orderStatusParams.status ? 1 : orderStatusParams.status === 0 ? 0 : orderStatus.isActive;

        const orderStatusSave = await this.orderFullfillmentStatusService.create(orderStatus);

        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the order status',
            data: orderStatusSave,
        };
        return response.status(200).send(successResponse);

    }

    // Update Fullfillment Order Status API
    /**
     * @api {put} /api/order-status/update-order-fullfillment-status/:id Update Fullfillment OrderStatus API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated orderStatus.",
     *      "status": "1",
     *      "data": {
     *        "createdBy": "",
     *        "createdDate": "",
     *        "modifiedBy": "",
     *        "modifiedDate": "",
     *        "orderStatusId": "",
     *        "name": "",
     *        "isActive": "",
     *        "priority": "",
     *        "parentId": "",
     *        "defaultStatus": "",
     *        "isAdmin": "",
     *        "isVendor": "",
     *        "isBuyer": "",
     *        "isApi": ',
     *        "colorCode": ""
     *     }
     * }
     * @apiSampleRequest /api/order-status/update-order-fullfillment-status/:id
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-order-fullfillment-status/:id')
    @Authorized()
    public async updateOrderFullfillmentStatus(@Body({ validate: true }) param: UpdateFullfillmentStatus, @Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const orderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: id,
            },
        });
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Status Id',
            };
            return response.status(400).send(errorResponse);
        }
        orderStatus.isActive = +param.status;
        const fullfillmentStatus = await this.orderStatusService.create(orderStatus);
        return response.status(200).send({
            status: 1,
            message: 'Successfully updated order fullfillment status',
            data: fullfillmentStatus,
        });
    }

    // Order Fullfillment Status List API
    /**
     * @api {get} /api/order-status/order-fullfillment-status-list Order Fullfillment Status List API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get order fullfillmet status list",
     *      "data":"{
     *              "orderStatusId": 6,
     *              "name": "Default",
     *              "isActive": 1,
     *              "priority": "",
     *              "defaultStatus": 1,
     *              "colorCode": 1,
     *              "orderStatus": [
     *                {
     *                  "createdBy": 1,
     *                  "createdDate": "2024-07-16T07:11:55.000Z",
     *                  "modifiedBy": 1,
     *                  "modifiedDate": "2024-07-16T07:12:03.000Z",
     *                  "orderStatusId": 8,
     *                  "name": "test",
     *                  "isActive": 1,
     *                  "priority": 1,
     *                  "parentId": 6,
     *                  "defaultStatus": 0,
     *                  "isAdmin": 1,
     *                  "isVendor": 1,
     *                  "isBuyer": 1,
     *                  "isApi": 1,
     *                  "colorCode": "#c22424"
     *                }]
     *              }"
     * }
     * @apiSampleRequest /api/order-status/order-fullfillment-status-list
     * @apiErrorExample {json} OrderFullFillmentStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/order-fullfillment-status-list')
    @Authorized(['admin'])
    public async orderFullfillmentStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const search = [];
        const WhereConditions = [];
        const orderStatusList = await this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);

        const list = orderStatusList.map(async (value: any) => {
            const temp: any = value;
            const fullFillmentStatusIds = (await this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: value.orderStatusId } })).map((status) => status.orderFulfillmentStatusId);
            temp.fullfillmentStatus = await this.orderFullfillmentStatusService.findAll({ where: { id: In(fullFillmentStatusIds) } });
            return temp;
        });

        const results = await Promise.all(list);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete Order full-fillment status list',
            data: results,
        };
        return response.status(200).send(successResponse);

    }

    @Get('/fullfillment')
    @Authorized(['admin'])
    public async orderFullfillmentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const search = [];
        const WhereConditions = [];
        const orderStatusList = await this.orderFullfillmentStatusService.list(limit, offset, select, search, WhereConditions, count);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete Order full-fillment status list',
            data: orderStatusList,
        };
        return response.status(200).send(successResponse);

    }
    // Getting A Child Order Status List Based On Parent List API
    /**
     * @api {get} /api/order-status/order-status-list-based-on-parent Getting A Child Order Status List Based On Parent List API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} parentId parentId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order status list based on parent",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/order-status-list-based-on-parent
     * @apiErrorExample {json} OrderStatusListBasedOnParent error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/order-status-list-based-on-parent')
    @Authorized()
    public async orderStatusListBasedOnParent(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('parentId') parentId: number, @Res() response: any): Promise<any> {
        const WhereConditions = [];
        WhereConditions.push(
            {
                name: 'parentId',
                value: parentId,
            },
            {
                name: 'isActive',
                value: 1,
            }
        );
        const orderStatusList = await this.orderStatusService.list(limit, offset, [], [], WhereConditions, false);
        if (orderStatusList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got order status list based on parent',
                data: orderStatusList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get order status list based on parent',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Order Status List API
    /**
     * @api {get} /api/order-status/order-status-list OrderStatus List API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get orderStatus list",
     *      "data":"[{
     *               "orderStatusId": 6,
     *               "name": "Default",
     *               "isActive": 1,
     *               "priority": 1,
     *               "colorCode": 1
     *              }]"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/order-status-list
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/order-status-list')
    @Authorized()
    public async orderStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive', 'defaultStatus', 'isAdmin', 'isVendor', 'isBuyer', 'isApi', 'createdDate', 'modifiedDate'];
        const search = [];
        const WhereConditions = [
            {
                name: 'isAdmin',
                value: 1,
            },
        ];
        if (keyword) {
            search.push(
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }
            );
        }
        if (status) {
            search.push(
                {
                    name: 'isActive',
                    op: 'like',
                    value: status ? +status : 1,
                }
            );
        }
        const orderStatusList = await this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);

        if (!count) {
            const orderStatusWithFullFillmentStatusList = await Promise.all(orderStatusList.map(async (orderStatus) => {
                const fullFillmentStatusIds = (await this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: orderStatus.orderStatusId } })).map((orderToFullfillmentStatus) => orderToFullfillmentStatus.orderFulfillmentStatusId);
                orderStatus.fullfillmentStatus = await this.orderFullfillmentStatusService.findAll({ where: { id: In(fullFillmentStatusIds), isActive: status ? +status : 1 } });
                return orderStatus;
            }));

            return response.status(200).send({
                status: 1,
                message: 'Successfully got the complete order status list',
                data: orderStatusWithFullFillmentStatusList,
            });
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order status count',
            data: orderStatusList,
        };

        return response.status(200).send(successResponse);

    }

    // Delete Order Status API
    /**
     * @api {delete} /api/order-status/:id Delete OrderStatus API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "orderStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted orderStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/:id
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['admin', 'delete-order-status'])
    public async deleteOrderStatus(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const orderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: id,
            },
        });
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Status Id',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProduct = await this.orderProductService.findOne({
            where: {
                orderStatusId: id,
            },
        });
        if (orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Status is mapped with order product, so you cant delete it',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteOrderStatus = await this.orderStatusService.delete(orderStatus);
        if (deleteOrderStatus) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the order status',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the order Status.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    @Delete('/fullfillment/:id')
    @Authorized(['admin'])
    public async deleteOrderFullfillmentStatus(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const orderStatus = await this.orderFullfillmentStatusService.findOne({
            where: {
                id,
            },
        });
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order status Id',
            };
            return response.status(400).send(errorResponse);
        }
        await this.orderFullfillmentStatusService.delete(id);

        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted the order status',
        };
        return response.status(200).send(successResponse);

    }

}
