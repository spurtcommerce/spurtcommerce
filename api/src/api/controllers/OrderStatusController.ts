/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
import {OrderStatus} from '../models/OrderStatus';
import {OrderStatusService} from '../services/OrderStatusService';
import {CreateOrderStatus} from './requests/CreateOrderStatusRequest';

@JsonController('/order-status')
export class OrderStatusController {
    constructor(private orderStatusService: OrderStatusService) {
    }

    // Create Order Status API
    /**
     * @api {post} /api/order-status/create-order-status Create OrderStatus API
     * @apiGroup OrderStatus
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} colorCode colorCode
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "colorCode" : "",
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
    @Authorized()
    public async createOrderStatus(@Body({validate: true}) orderStatusParam: CreateOrderStatus, @Res() response: any): Promise<any> {

        const newOrderStatus = new OrderStatus();
        newOrderStatus.name = orderStatusParam.name;
        newOrderStatus.colorCode = orderStatusParam.colorCode;
        newOrderStatus.isActive = orderStatusParam.status;

        const orderStatusSave = await this.orderStatusService.create(newOrderStatus);
        if (orderStatusSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'successfully created a new order status.',
                data: orderStatusSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create OrderStatus',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Order Status API
    /**
     * @api {put} /api/order-status/update-order-status/:id Update OrderStatus API
     * @apiGroup OrderStatus
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name OrderStatus name
     * @apiParam (Request body) {String} colorCode colorCode
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "colorCode" : "",
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
    @Authorized()
    public async updateOrderStatus(@Body({validate: true}) orderStatusParams: CreateOrderStatus, @Param('id')id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const orderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: id,
            },
        });
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid orderStatusId',
            };
            return response.status(400).send(errorResponse);
        }
        orderStatus.name = orderStatusParams.name;
        orderStatus.colorCode = orderStatusParams.colorCode;
        orderStatus.isActive = orderStatusParams.status;
        const orderStatusSave = await this.orderStatusService.create(orderStatus);
        console.log('orderStatus' + orderStatusSave);
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
                message: 'unable to update OrderStatus.',
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
     * @apiParam (Request body) {Number} status status
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
    public async orderStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {

        const select = ['orderStatusId', 'name', 'colorCode', 'isActive'];
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
    @Authorized()
    public async deleteOrderStatus(@Param('id')id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const orderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: id,
            },
        });
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid orderStatusId.',
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
                message: 'unable to delete orderStatus.',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
