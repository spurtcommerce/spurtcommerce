"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorPayController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const path = tslib_1.__importStar(require("path"));
const typeorm_1 = require("typeorm");
const RazorpayOrder_1 = require("../models/RazorpayOrder");
const Order_1 = require("../../../../src/api/core/models/Order");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
const env_1 = require("../../../../src/env");
const RazorpayOrderTransaction_1 = require("../models/RazorpayOrderTransaction");
const OrderProcessService_1 = require("../../../../src/api/core/services/OrderProcessService");
let RazorPayController = class RazorPayController {
    constructor(orderProcessService) {
        this.orderProcessService = orderProcessService;
        // ---
    }
    processRoute(orderPrefixId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const order = yield orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
            const orderId = order.orderId;
            const orderDetail = yield orderRepository.findOne({
                where: {
                    orderId,
                },
            });
            if (!orderDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid Order Id',
                });
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            console.log('pluginDetail', pluginDetail);
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const total = orderDetail.total;
            const params = {
                amount: +total * 100,
                receipt: orderDetail.orderPrefixId,
                currency: 'INR',
                payment_capture: true,
            };
            const result = yield instance.orders.create(params);
            // ---
            const paypalParams = new RazorpayOrder_1.RazorpayOrder();
            paypalParams.orderId = orderDetail.orderId;
            paypalParams.razorpayRefId = result.id;
            paypalParams.total = total.toString();
            paypalParams.status = 0;
            const val = yield razorpayOrderRepository.save(paypalParams);
            // get filesystem module
            const fs = require('fs');
            // using the readFileSync() function
            // and passing the path to the file
            const buffer = fs.readFileSync(path.resolve(__dirname, '../template/process.ejs'));
            // use the toString() method to convert
            // Buffer into String
            const fileContent = buffer.toString();
            // ----
            const ejs = require('ejs');
            const html = ejs.render(fileContent, {
                title: 'Razorpay',
                orderRefId: result.id,
                key: paypalAdditionalInfo.clientId,
                amount: total,
                orderId: orderDetail.orderPrefixId,
                orderIncrementId: orderDetail.orderId,
                description: val.id,
                username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                email: orderDetail.email,
                contact: orderDetail.telephone,
                baseUrl: env_1.env.baseUrl,
            });
            return response.send(html);
        });
    }
    success(req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const razorpayOrderTransactionRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrderTransaction_1.RazorpayOrderTransaction);
            const queryParams = req.query;
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const paymentDetails = yield this.razorPaySuccess(instance, queryParams.razorpay_payment_id);
            const razorpayDetail = yield razorpayOrderRepository.findOne({
                where: {
                    razorpayRefId: paymentDetails.order_id,
                },
            });
            if (!razorpayDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid Payment Details',
                });
            }
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne({
                where: {
                    orderId: razorpayDetail.orderId,
                },
            });
            if (!orderData) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid Order Id',
                });
            }
            const orderStatus = yield orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                return response.status(400).send({
                    status: 1,
                    message: 'Already Paid for this Order',
                });
            }
            const intvalue = Math.round(paymentDetails.amount);
            const intVal = intvalue / 100;
            if (paymentDetails.status === 'captured' && intVal === +razorpayDetail.total) {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = paymentDetails.method;
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 1;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 1;
                orderData.paymentStatus = 1;
                orderData.paymentProcess = 1;
                orderData.paymentType = 'razorpay';
                orderData.paymentDetails = paymentDetails.id;
                yield orderRepository.save(orderData);
                yield this.orderProcessService.processOrder(razorpayDetail.orderId, paymentDetails);
            }
            else {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 2;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 2;
                orderData.paymentStatus = 2;
                yield orderRepository.save(orderData);
            }
            // get filesystem module
            const fs = require('fs');
            // using the readFileSync() function
            // and passing the path to the file
            const buffer = fs.readFileSync(path.resolve(__dirname, '../template/success.ejs'));
            // use the toString() method to convert
            // Buffer into String
            const fileContent = buffer.toString();
            // ----
            const ejs = require('ejs');
            const html = ejs.render(fileContent, { storeUrl: env_1.env.storeUrl + orderData.orderPrefixId });
            return response.send(html);
        });
    }
    cancel(req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
            // get filesystem module
            const fs = require('fs');
            // using the readFileSync() function
            // and passing the path to the file
            const buffer = fs.readFileSync(path.resolve(__dirname, '../template/cancel.ejs'));
            // use the toString() method to convert
            // Buffer into String
            const fileContent = buffer.toString();
            // ----
            const ejs = require('ejs');
            const html = ejs.render(fileContent, { storeUrl: env_1.env.cancelUrl });
            return response.send(html);
        });
    }
    processAPI(req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.orderPrefixId;
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const orderDetail = yield orderRepository.findOne({ where: { orderPrefixId: orderId } });
            if (!orderDetail) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Order Id',
                });
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 0,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const params = {
                amount: +orderDetail.total * 100,
                receipt: orderDetail.orderPrefixId,
                currency: 'INR',
                payment_capture: true,
            };
            const responsee = yield instance.orders.create(params);
            // ---
            const paypalParams = new RazorpayOrder_1.RazorpayOrder();
            paypalParams.orderId = orderDetail.orderId;
            paypalParams.razorpayRefId = responsee.id;
            paypalParams.total = params.amount.toString();
            paypalParams.status = 0;
            const val = yield razorpayOrderRepository.save(paypalParams);
            // ---
            const successResponse = {
                status: 1,
                message: 'payment made successful',
                data: {
                    title: 'Razorpay',
                    orderRefId: responsee.id,
                    key: paypalAdditionalInfo.clientId,
                    amount: +orderDetail.total * 100,
                    orderId: orderDetail.orderPrefixId,
                    orderIncrementId: orderDetail.orderId,
                    description: val.id,
                    username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                    email: orderDetail.email,
                    contact: orderDetail.telephone,
                    successURL: env_1.env.baseUrl + paypalAdditionalInfo.successAPIRoute,
                    cancelURL: env_1.env.baseUrl + paypalAdditionalInfo.cancelAPIRoute,
                    failureURL: env_1.env.baseUrl + paypalAdditionalInfo.failureAPIRoute,
                    layout: 'pages/layouts/auth',
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    successAPI(req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const razorpayOrderTransactionRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrderTransaction_1.RazorpayOrderTransaction);
            const queryParams = req.query;
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 0,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const paymentDetails = yield this.razorPaySuccess(instance, queryParams.razorpay_payment_id);
            const razorpayDetail = yield razorpayOrderRepository.findOne({
                where: {
                    razorpayRefId: paymentDetails.order_id,
                },
            });
            if (!razorpayDetail) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Payment Details',
                });
            }
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne({
                where: {
                    orderId: razorpayDetail.orderId,
                },
            });
            if (!orderData) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Order Id',
                });
            }
            const orderStatus = yield orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                return response.status(400).send({
                    status: 0,
                    message: 'Already Paid for this Order',
                });
            }
            const intvalue = Math.round(paymentDetails.amount);
            if (paymentDetails.status === 'captured' && intvalue === +razorpayDetail.total) {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = paymentDetails.method;
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 1;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 1;
                orderData.paymentStatus = 1;
                orderData.paymentProcess = 1;
                orderData.paymentType = 'razorpay';
                orderData.paymentDetails = paymentDetails.id;
                yield orderRepository.save(orderData);
                yield this.orderProcessService.processOrder(razorpayDetail.orderId, paymentDetails);
            }
            else {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 2;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 2;
                yield orderRepository.save(orderData);
            }
            const successResponse = {
                status: 1,
                message: 'payment made successful',
            };
            return response.status(200).send(successResponse);
        });
    }
    razorPaySuccess(instance, paymentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                instance.payments.fetch(paymentId).then((response) => {
                    console.log('pyment', response);
                    return resolve(response);
                }).catch((error) => {
                    return reject(error);
                });
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/process/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RazorPayController.prototype, "processRoute", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/success'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RazorPayController.prototype, "success", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/cancel'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RazorPayController.prototype, "cancel", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/process-api/:orderPrefixId'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RazorPayController.prototype, "processAPI", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/success-api'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RazorPayController.prototype, "successAPI", null);
RazorPayController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/razorpay-payment'),
    tslib_1.__metadata("design:paramtypes", [OrderProcessService_1.OrderProcessService])
], RazorPayController);
exports.RazorPayController = RazorPayController;
//# sourceMappingURL=RazorPayController.js.map