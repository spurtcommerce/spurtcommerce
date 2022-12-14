/*
 * spurtcommerce API
 * version 4.8.0
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
    Param
} from 'routing-controllers';
import { Not } from 'typeorm';
import { OrderStatus } from '../../core/models/OrderStatus';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { CreateOrderStatus } from './requests/CreateOrderStatusRequest';
import { UpdateFullfillmentStatus } from './requests/UpdateFullfillmentStatus';

@JsonController('/order-status')
export class OrderStatusController {
    constructor(private orderStatusService: OrderStatusService, private orderProductService: OrderProductService) {
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
     *      "isBuyer" : "",
     *      "isApi" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New OrderStatus is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/create-order-status
     * @apiErrorExample {json} createOrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-order-status')
    @Authorized(['admin', 'create-order-status'])
    public async createOrderStatus(@Body({ validate: true }) orderStatusParam: CreateOrderStatus, @Res() response: any): Promise<any> {
        const existOrder = await this.orderStatusService.findOne({ where: {name: orderStatusParam.name, parentId: orderStatusParam.parentId}});
        if (existOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this name.',
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
        newOrderStatus.isBuyer = orderStatusParam.isBuyer;
        newOrderStatus.isApi = orderStatusParam.isApi;

        const orderStatusSave = await this.orderStatusService.create(newOrderStatus);
        if (orderStatusSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new order status.',
                data: orderStatusSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the Order Status.',
            };
            return response.status(400).send(errorResponse);
        }
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
     *      "isBuyer" : "",
     *      "isApi" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated orderStatus.",
     *      "status": "1"
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
                message: 'Invalid order Status Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const existOrder = await this.orderStatusService.findOne({ where: {name: orderStatusParams.name, orderStatusId: Not(orderStatus.orderStatusId), parentId: orderStatusParams.parentId }});
        if (existOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'You have already added this name.',
            };
            return response.status(400).send(errorResponse);
        }
        orderStatus.name = orderStatusParams.name;
        orderStatus.colorCode = orderStatusParams.colorCode;
        orderStatus.priority = orderStatusParams.priority ? orderStatusParams.priority : 1;
        orderStatus.isActive = orderStatusParams.status;
        orderStatus.parentId = orderStatusParams.parentId ? orderStatusParams.parentId : 0;
        orderStatus.isAdmin = orderStatusParams.isAdmin;
        orderStatus.isBuyer = orderStatusParams.isBuyer;
        orderStatus.isApi = orderStatusParams.isApi;
        const orderStatusSave = await this.orderStatusService.create(orderStatus);
        if (orderStatusSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the order status.',
                data: orderStatusSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update the Order Status.',
            };
            return response.status(400).send(errorResponse);
        }
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
     *      "status": "1"
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
                 message: 'Invalid order Status Id.',
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
     *      "message": "Successfully get order fullfillmet status list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/order-fullfillment-status-list
     * @apiErrorExample {json} OrderFullFillmentStatus error
     * HTTP/1.1 500 Internal Server Error
     */
     @Get('/order-fullfillment-status-list')
     @Authorized(['admin', 'list-order-status'])
     public async orderFullfillmentStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
         const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive', 'defaultStatus'];
         const search = [
             {
                 name: 'parentId',
                 op: 'where',
                 value: 0,
             },
            ];
         const WhereConditions = [];
         const orderStatusList = await this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
         const list = orderStatusList.map(async (value: any) => {
             const temp: any = value;
             const data = await this.orderStatusService.findAll({ where: {parentId: value.orderStatusId}});
             if (data) {
                 temp.orderStatus = data;
             } else {
                 temp.orderStatus = [];
             }
             return temp;
         });
         const results = await Promise.all(list);
         if (results) {
             const successResponse: any = {
                 status: 1,
                 message: 'Successfully got the complete Order fullfillment status list.',
                 data: orderStatusList,
             };
             return response.status(200).send(successResponse);
         } else {
             const errorResponse: any = {
                 status: 0,
                 message: 'unable to get Order fullfillment status list.',
             };
             return response.status(400).send(errorResponse);
         }
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
         WhereConditions.push({
             name: 'parentId',
             value: parentId,
         });
         const orderStatusList = await this.orderStatusService.list(limit, offset, [], [], WhereConditions, false);
         if (orderStatusList) {
             const successResponse: any = {
                 status: 1,
                 message: 'Successfully got order status list based on parent.',
                 data: orderStatusList,
             };
             return response.status(200).send(successResponse);
         } else {
             const errorResponse: any = {
                 status: 0,
                 message: 'unable to get order status list based on parent.',
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
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/order-status-list
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/order-status-list')
    @Authorized()
    public async orderStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },

        ];
        const WhereConditions = [];
        const orderStatusList = await this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
        if (orderStatusList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete order status list.',
                data: orderStatusList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get OrderStatus.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Order Status API
    /**
     * @api {delete} /api/order-status/delete-order-status/:id Delete OrderStatus API
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
     * @apiSampleRequest /api/order-status/delete-order-status/:id
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-order-status/:id')
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
                message: 'Invalid order Status Id.',
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
                message: 'Status is mapped with order product, so you cant delete it.',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteOrderStatus = await this.orderStatusService.delete(orderStatus);
        if (deleteOrderStatus) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the order status.',
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
}
