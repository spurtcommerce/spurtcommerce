"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayPalController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const path = tslib_1.__importStar(require("path"));
const typeorm_1 = require("typeorm");
const PaypalOrder_1 = require("../models/PaypalOrder");
const PaypalOrderTransaction_1 = require("../models/PaypalOrderTransaction");
const paypal = tslib_1.__importStar(require("paypal-rest-sdk"));
const Order_1 = require("../../../../src/api/core/models/Order");
const OrderProduct_1 = require("../../../../src/api/core/models/OrderProduct");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
const ProductModel_1 = require("../../../../src/api/core/models/ProductModel");
const OrderProcessService_1 = require("../../../../src/api/core/services/OrderProcessService");
const env_1 = require("../../../../src/env");
let PayPalController = class PayPalController {
    constructor(orderProcessService) {
        this.orderProcessService = orderProcessService;
        // ---
    }
    processRoute(orderPrefixId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const order = yield orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
            const orderId = order.orderId;
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid Order Id',
                });
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
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
            const html = ejs.render(fileContent, { orderId, baseUrl: env_1.env.baseUrl });
            return response.send(html);
        });
    }
    proceed(orderId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const paypalOrderRepository = (0, typeorm_1.getManager)().getRepository(PaypalOrder_1.PaypalOrder);
            const orderProductRepository = (0, typeorm_1.getManager)().getRepository(OrderProduct_1.OrderProduct);
            const productRepository = (0, typeorm_1.getManager)().getRepository(ProductModel_1.Product);
            const orderDetail = yield orderRepository.findOne({ where: { orderId } });
            if (!orderDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid Order Id',
                });
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            paypal.configure({
                mode: paypalAdditionalInfo.isTest ? 'sandbox' : 'live',
                client_id: paypalAdditionalInfo.clientId,
                client_secret: paypalAdditionalInfo.clientSecret,
            });
            const product = yield orderProductRepository.find({ where: { orderId: orderDetail.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName'] });
            const productVal = product.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productDetail = yield productRepository.findOne({
                    where: { productId: value.productId },
                    select: ['name', 'quantity', 'minimumQuantity', 'image',
                        'imagePath', 'shipping', 'price', 'dateAvailable', 'amount', 'rating', 'discount', 'isActive'],
                });
                const tempVal = value;
                tempVal.productDetail = productDetail;
                return tempVal;
            }));
            const results = yield Promise.all(productVal);
            const items = [];
            results.forEach((element) => {
                const price = (Math.round(element.total * 100) / 100) / +element.quantity;
                items.push({
                    name: element.name,
                    price: price.toString(),
                    currency: orderDetail.currencyCode,
                    quantity: element.quantity,
                });
            });
            const total = orderDetail.total;
            const orderAmount = Math.round(total * 100) / 100;
            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                redirect_urls: {
                    return_url: env_1.env.baseUrl + paypalAdditionalInfo.successRoute,
                    cancel_url: env_1.env.baseUrl + paypalAdditionalInfo.cancelRoute,
                },
                transactions: [{
                        item_list: {
                            items,
                        },
                        amount: {
                            currency: orderDetail.currencyCode,
                            total: orderAmount.toString(),
                        },
                        description: 'Product you ordered',
                    }],
            };
            const paypalVal = yield this.payPalcreate(create_payment_json);
            if (paypalVal) {
                const paypalParams = new PaypalOrder_1.PaypalOrder();
                console.log(paypalVal + 'paypalVal');
                paypalParams.orderId = orderDetail.orderId;
                paypalParams.paypalRefId = paypalVal.id;
                paypalParams.total = orderAmount.toString();
                paypalParams.status = 0;
                paypalOrderRepository.save(paypalParams);
                // ---
                for (const item of paypalVal.links) {
                    // Redirect user to this endpoint for redirect url
                    if (item.rel === 'approval_url') {
                        return new Promise(() => {
                            response.redirect(item.href);
                        });
                    }
                }
            }
        });
    }
    success(req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const config = {
                mode: paypalAdditionalInfo.isTest ? 'sandbox' : 'live',
                client_id: paypalAdditionalInfo.clientId,
                client_secret: paypalAdditionalInfo.clientSecret,
            };
            const paymentDetails = yield this.payPalSuccess(config, req.query.PayerID, req.query.paymentId);
            const paypalOrderRepository = (0, typeorm_1.getManager)().getRepository(PaypalOrder_1.PaypalOrder);
            const paypalOrderTransactionRepository = (0, typeorm_1.getManager)().getRepository(PaypalOrderTransaction_1.PaypalOrderTransaction);
            const paypalDetail = yield paypalOrderRepository.findOne({
                where: {
                    paypalRefId: paymentDetails.id,
                },
            });
            if (!paypalDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid Payment Details',
                });
            }
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(paypalDetail.orderId);
            if (!orderData) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid Order Id',
                });
            }
            const orderStatus = yield orderRepository.findOne({ where: { orderId: paypalDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                return response.status(400).send({
                    status: 1,
                    message: 'Already Paid for this Order',
                });
            }
            const paidDetails = paymentDetails.transactions[0].related_resources[0];
            const intvalue = Math.round(paidDetails.sale.amount.total);
            if (paidDetails.sale.state === 'completed' && intvalue === +paypalDetail.total) {
                const transactionsParams = new PaypalOrderTransaction_1.PaypalOrderTransaction();
                transactionsParams.paymentType = paidDetails.sale.payment_mode;
                transactionsParams.paypalOrderId = paypalDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                yield paypalOrderTransactionRepository.save(transactionsParams);
                paypalDetail.status = 1;
                yield paypalOrderRepository.save(paypalDetail);
                orderData.paymentFlag = 1;
                orderData.paymentStatus = 1;
                orderData.paymentProcess = 1;
                orderData.paymentType = 'paypal';
                orderData.paymentDetails = paymentDetails.id;
                yield orderRepository.save(orderData);
                yield this.orderProcessService.processOrder(paypalDetail.orderId, paymentDetails);
            }
            else {
                const transactionsParams = new PaypalOrderTransaction_1.PaypalOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.paypalOrderId = paypalDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                yield paypalOrderTransactionRepository.save(transactionsParams);
                paypalDetail.status = 2;
                yield paypalOrderRepository.save(paypalDetail);
                orderData.paymentFlag = 2;
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
    payPalSuccess(config, payerId, paymentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                paypal.configure(config);
                const execute_payment_json = {
                    payer_id: payerId,
                };
                paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
                    if (error) {
                        return reject(error);
                    }
                    else {
                        return resolve(payment);
                    }
                });
            });
        });
    }
    payPalcreate(val) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                paypal.payment.create(val, (error, payment) => {
                    if (error) {
                        return reject(error);
                    }
                    else {
                        return resolve(payment);
                    }
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
], PayPalController.prototype, "processRoute", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/proceed/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PayPalController.prototype, "proceed", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/success'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PayPalController.prototype, "success", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/cancel'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PayPalController.prototype, "cancel", null);
PayPalController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/paypal-payment'),
    tslib_1.__metadata("design:paramtypes", [OrderProcessService_1.OrderProcessService])
], PayPalController);
exports.PayPalController = PayPalController;
//# sourceMappingURL=PaypalController.js.map