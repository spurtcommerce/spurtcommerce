"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
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
const OrderFullfillmentStatusService_1 = require("../../core/services/OrderFullfillmentStatusService");
const OrderFullfillmentStatus_1 = require("../../core/models/OrderFullfillmentStatus");
const OrderStatusToFullfillmentService_1 = require("../../../../src/api/core/services/OrderStatusToFullfillmentService");
const OrderStatusToFullfillment_1 = require("../../../api/core/models/OrderStatusToFullfillment");
let OrderStatusController = class OrderStatusController {
    constructor(orderStatusService, orderProductService, orderFullfillmentStatusService, orderStatusToFullfillmentService) {
        this.orderStatusService = orderStatusService;
        this.orderProductService = orderProductService;
        this.orderFullfillmentStatusService = orderFullfillmentStatusService;
        this.orderStatusToFullfillmentService = orderStatusToFullfillmentService;
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
    createOrderStatus(orderStatusParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existOrder = yield this.orderStatusService.findOne({ where: { name: orderStatusParam.name, parentId: orderStatusParam.parentId } });
            if (existOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'You have already added this name',
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
            newOrderStatus.defaultStatus = orderStatusParam.isFullfillment ? 2 : 0;
            const orderStatusSave = yield this.orderStatusService.create(newOrderStatus);
            if (orderStatusSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created a new order status',
                    data: orderStatusSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create the Order Status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    createOrderStatusFullfillment(orderStatusParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existOrder = yield this.orderFullfillmentStatusService.findOne({ where: { name: orderStatusParam.name } });
            if (existOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'You have already added this name',
                };
                return response.status(400).send(errorResponse);
            }
            const newOrderStatus = new OrderFullfillmentStatus_1.OrderFullfillmentStatus();
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
            const orderStatusSave = yield this.orderFullfillmentStatusService.create(newOrderStatus);
            const sucessResponse = {
                status: 1,
                message: 'Successfully created full-fillment status',
                data: orderStatusSave,
            };
            return response.status(200).send(sucessResponse);
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
                    message: 'Invalid order Status Id',
                };
                return response.status(400).send(errorResponse);
            }
            const existOrder = yield this.orderStatusService.findOne({ where: { name: orderStatusParams.name, orderStatusId: (0, typeorm_1.Not)(orderStatus.orderStatusId), parentId: orderStatusParams.parentId } });
            if (existOrder) {
                const errorResponse = {
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
            const orderStatusSave = yield this.orderStatusService.create(orderStatus);
            if (orderStatusSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the order status',
                    data: orderStatusSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the Order Status',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    mapParentForOrderStatus(orderStatuses, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const orderStatus of orderStatuses) {
                const orderStatusExist = yield this.orderStatusService.findOne({
                    where: {
                        orderStatusId: orderStatus.orderStatusId,
                    },
                });
                if (!orderStatusExist) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid order Status Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                yield this.orderStatusToFullfillmentService.delete({ orderStatusId: orderStatus.orderStatusId });
                for (const fullfillmentStatusId of orderStatus.fullfillmentStatusIds) {
                    const orderToFullfillment = new OrderStatusToFullfillment_1.OrderStatusToFullfillment();
                    orderToFullfillment.orderStatusId = orderStatus.orderStatusId;
                    orderToFullfillment.orderFulfillmentStatusId = fullfillmentStatusId;
                    yield this.orderStatusToFullfillmentService.create(orderToFullfillment);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated order status',
            };
            return response.status(200).send(successResponse);
        });
    }
    updateOrderFullfilllmentStatus(orderStatusParams, id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderStatus = yield this.orderFullfillmentStatusService.findOne({
                where: {
                    id,
                },
            });
            if (!orderStatus) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Status Id',
                };
                return response.status(400).send(errorResponse);
            }
            const existOrder = yield this.orderFullfillmentStatusService.findOne({ where: { name: orderStatusParams.name, id: (0, typeorm_1.Not)(orderStatus.id) } });
            if (existOrder) {
                const errorResponse = {
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
            const orderStatusSave = yield this.orderFullfillmentStatusService.create(orderStatus);
            const successResponse = {
                status: 1,
                message: 'Successfully updated the order status',
                data: orderStatusSave,
            };
            return response.status(200).send(successResponse);
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
                    message: 'Invalid order Status Id',
                };
                return response.status(400).send(errorResponse);
            }
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
    orderFullfillmentStatusList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            const list = orderStatusList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const fullFillmentStatusIds = (yield this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: value.orderStatusId } })).map((status) => status.orderFulfillmentStatusId);
                temp.fullfillmentStatus = yield this.orderFullfillmentStatusService.findAll({ where: { id: (0, typeorm_1.In)(fullFillmentStatusIds) } });
                return temp;
            }));
            const results = yield Promise.all(list);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete Order full-fillment status list',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    orderFullfillmentList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [];
            const WhereConditions = [];
            const orderStatusList = yield this.orderFullfillmentStatusService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete Order full-fillment status list',
                data: orderStatusList,
            };
            return response.status(200).send(successResponse);
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
            }, {
                name: 'isActive',
                value: 1,
            });
            const orderStatusList = yield this.orderStatusService.list(limit, offset, [], [], WhereConditions, false);
            if (orderStatusList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got order status list based on parent',
                    data: orderStatusList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get order status list based on parent',
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
    orderStatusList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive', 'defaultStatus', 'isAdmin', 'isVendor', 'isBuyer', 'isApi', 'createdDate', 'modifiedDate'];
            const search = [];
            const WhereConditions = [
                {
                    name: 'isAdmin',
                    value: 1,
                },
            ];
            if (keyword) {
                search.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            if (status) {
                search.push({
                    name: 'isActive',
                    op: 'like',
                    value: status ? +status : 1,
                });
            }
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            if (!count) {
                const orderStatusWithFullFillmentStatusList = yield Promise.all(orderStatusList.map((orderStatus) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const fullFillmentStatusIds = (yield this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: orderStatus.orderStatusId } })).map((orderToFullfillmentStatus) => orderToFullfillmentStatus.orderFulfillmentStatusId);
                    orderStatus.fullfillmentStatus = yield this.orderFullfillmentStatusService.findAll({ where: { id: (0, typeorm_1.In)(fullFillmentStatusIds), isActive: status ? +status : 1 } });
                    return orderStatus;
                })));
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the complete order status list',
                    data: orderStatusWithFullFillmentStatusList,
                });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order status count',
                data: orderStatusList,
            };
            return response.status(200).send(successResponse);
        });
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
                    message: 'Invalid order Status Id',
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
                    message: 'Status is mapped with order product, so you cant delete it',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteOrderStatus = yield this.orderStatusService.delete(orderStatus);
            if (deleteOrderStatus) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the order status',
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
    deleteOrderFullfillmentStatus(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderStatus = yield this.orderFullfillmentStatusService.findOne({
                where: {
                    id,
                },
            });
            if (!orderStatus) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order status Id',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.orderFullfillmentStatusService.delete(id);
            const successResponse = {
                status: 1,
                message: 'Successfully deleted the order status',
            };
            return response.status(200).send(successResponse);
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
    (0, routing_controllers_1.Post)('/fullfillment'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-order-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateOrderStatusRequest_1.CreateOrderStatus, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "createOrderStatusFullfillment", null);
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
    (0, routing_controllers_1.Put)('/fullfillment/assign'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('orderStatuses')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "mapParentForOrderStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/fullfillment/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: false })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateOrderStatusRequest_1.CreateOrderStatus, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "updateOrderFullfilllmentStatus", null);
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
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "orderFullfillmentStatusList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/fullfillment'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "orderFullfillmentList", null);
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
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-order-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "deleteOrderStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/fullfillment/:id'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatusController.prototype, "deleteOrderFullfillmentStatus", null);
OrderStatusController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/order-status'),
    tslib_1.__metadata("design:paramtypes", [OrderStatusService_1.OrderStatusService,
        OrderProductService_1.OrderProductService,
        OrderFullfillmentStatusService_1.OrderFullfillmentStatusService,
        OrderStatusToFullfillmentService_1.OrderStatusToFullfillmentService])
], OrderStatusController);
exports.OrderStatusController = OrderStatusController;
//# sourceMappingURL=OrderStatusController.js.map