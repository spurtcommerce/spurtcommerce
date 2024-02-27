"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const OrderStatus_1 = require("../../core/models/OrderStatus");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const CreateOrderStatusRequest_1 = require("./requests/CreateOrderStatusRequest");
const UpdateFullfillmentStatus_1 = require("./requests/UpdateFullfillmentStatus");
let OrderStatusController = class OrderStatusController {
    constructor(orderStatusService, orderProductService) {
        this.orderStatusService = orderStatusService;
        this.orderProductService = orderProductService;
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/create-order-status
     * @apiErrorExample {json} createOrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    createOrderStatus(orderStatusParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existOrder = yield this.orderStatusService.findOne({ where: { name: orderStatusParam.name, parentId: orderStatusParam.parentId } });
            if (existOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'You have already added this name.',
                };
                return response.status(400).send(errorResponse);
            }
            const newOrderStatus = new OrderStatus_1.OrderStatus();
            newOrderStatus.name = orderStatusParam.name;
            newOrderStatus.colorCode = orderStatusParam.colorCode;
            newOrderStatus.priority = orderStatusParam.priority ? orderStatusParam.priority : 1;
            newOrderStatus.isActive = orderStatusParam.status;
            newOrderStatus.parentId = orderStatusParam.parentId ? orderStatusParam.parentId : 0;
            newOrderStatus.isAdmin = orderStatusParam.isAdmin;
            newOrderStatus.isVendor = orderStatusParam.isVendor;
            newOrderStatus.isBuyer = orderStatusParam.isBuyer;
            newOrderStatus.isApi = orderStatusParam.isApi;
            const orderStatusSave = yield this.orderStatusService.create(newOrderStatus);
            if (orderStatusSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created a new order status.',
                    data: orderStatusSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create the Order Status.',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
     *      "message": "Successfully updated orderStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order-status/update-order-status/:id
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    updateOrderStatus(orderStatusParams, id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderStatus = yield this.orderStatusService.findOne({
                where: {
                    orderStatusId: id,
                },
            });
            if (!orderStatus) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Status Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const existOrder = yield this.orderStatusService.findOne({ where: { name: orderStatusParams.name, orderStatusId: (0, typeorm_1.Not)(orderStatus.orderStatusId), parentId: orderStatusParams.parentId } });
            if (existOrder) {
                const errorResponse = {
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
            orderStatus.isVendor = orderStatusParams.isVendor;
            orderStatus.isBuyer = orderStatusParams.isBuyer;
            orderStatus.isApi = orderStatusParams.isApi;
            const orderStatusSave = yield this.orderStatusService.create(orderStatus);
            if (orderStatusSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the order status.',
                    data: orderStatusSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update the Order Status.',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateOrderFullfillmentStatus(param, id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderStatus = yield this.orderStatusService.findOne({
                where: {
                    orderStatusId: id,
                },
            });
            if (!orderStatus) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Status Id.',
                };
                return response.status(400).send(errorResponse);
            }
            console.log('status:', param.status);
            orderStatus.isActive = +param.status;
            const fullfillmentStatus = yield this.orderStatusService.create(orderStatus);
            return response.status(200).send({
                status: 1,
                message: 'Successfully updated order fullfillment status',
                data: fullfillmentStatus,
            });
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
    orderFullfillmentStatusList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive', 'defaultStatus'];
            const search = [
                {
                    name: 'parentId',
                    op: 'where',
                    value: 0,
                },
            ];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            console.log('orderStatusList:', orderStatusList);
            const list = orderStatusList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const data = yield this.orderStatusService.findAll({ where: { parentId: value.orderStatusId } });
                if (data) {
                    temp.orderStatus = data;
                }
                else {
                    temp.orderStatus = [];
                }
                return temp;
            }));
            const results = yield Promise.all(list);
            if (results) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete Order fullfillment status list.',
                    data: orderStatusList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get Order fullfillment status list.',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    orderStatusListBasedOnParent(limit, offset, parentId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const WhereConditions = [];
            WhereConditions.push({
                name: 'parentId',
                value: parentId,
            });
            const orderStatusList = yield this.orderStatusService.list(limit, offset, [], [], WhereConditions, false);
            console.log('orderStatusList:', orderStatusList);
            if (orderStatusList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got order status list based on parent.',
                    data: orderStatusList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get order status list based on parent.',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    orderStatusList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            if (orderStatusList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete order status list.',
                    data: orderStatusList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get OrderStatus.',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteOrderStatus(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderStatus = yield this.orderStatusService.findOne({
                where: {
                    orderStatusId: id,
                },
            });
            if (!orderStatus) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Status Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderStatusId: id,
                },
            });
            if (orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Status is mapped with order product, so you cant delete it.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteOrderStatus = yield this.orderStatusService.delete(orderStatus);
            if (deleteOrderStatus) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the order status.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the order Status.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-order-status'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-order-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateOrderStatusRequest_1.CreateOrderStatus, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "createOrderStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-order-status/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-order-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateOrderStatusRequest_1.CreateOrderStatus, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "updateOrderStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-order-fullfillment-status/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateFullfillmentStatus_1.UpdateFullfillmentStatus, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "updateOrderFullfillmentStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-fullfillment-status-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-order-status']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "orderFullfillmentStatusList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-status-list-based-on-parent'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('parentId')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "orderStatusListBasedOnParent", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-status-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "orderStatusList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-order-status/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-order-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "deleteOrderStatus", null);
OrderStatusController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/order-status'),
    tslib_1.__metadata("design:paramtypes", [OrderStatusService_1.OrderStatusService, OrderProductService_1.OrderProductService])
], OrderStatusController);
exports.OrderStatusController = OrderStatusController;
//# sourceMappingURL=OrderStatusController.js.map