"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const path = tslib_1.__importStar(require("path"));
const typeorm_1 = require("typeorm");
const StripeOrder_1 = require("../models/StripeOrder");
const StripeOrderTransaction_1 = require("../models/StripeOrderTransaction");
const Order_1 = require("../../../../src/api/core/models/Order");
const OrderProduct_1 = require("../../../../src/api/core/models/OrderProduct");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
const ProductModel_1 = require("../../../../src/api/core/models/ProductModel");
const OrderProcessService_1 = require("../../../../src/api/core/services/OrderProcessService");
const env_1 = require("../../../../src/env");
let StripeController = class StripeController {
    constructor(orderProcessService) {
        this.orderProcessService = orderProcessService;
        // ---
    }
    processRoute(orderPrefixId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderProductRepository = (0, typeorm_1.getManager)().getRepository(OrderProduct_1.OrderProduct);
            const productRepository = (0, typeorm_1.getManager)().getRepository(ProductModel_1.Product);
            const stripeOrderRepository = (0, typeorm_1.getManager)().getRepository(StripeOrder_1.StripeOrder);
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
                    pluginName: 'stripe',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const stripeAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const product = yield orderProductRepository.find({ where: { orderId: orderDetail.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountedAmount', 'discountAmount'] });
            const productVal = product.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productDetail = yield productRepository.findOne({
                    where: { productId: value.productId },
                    select: ['name', 'quantity', 'minimumQuantity', 'image',
                        'imagePath', 'shipping', 'price', 'dateAvailable', 'amount', 'rating', 'discount', 'isActive']
                });
                const tempVal = value;
                tempVal.productDetail = productDetail;
                return tempVal;
            }));
            const results = yield Promise.all(productVal);
            const items = [];
            results.forEach((element) => {
                const price = (Math.round(element.total * 100) / +element.quantity);
                items.push({
                    price_data: {
                        currency: orderDetail.currencyCode,
                        product_data: {
                            name: element.name,
                        },
                        unit_amount_decimal: price,
                    },
                    quantity: element.quantity,
                });
            });
            const orderAmount = Math.round(orderDetail.total * 100);
            const create_payment_json = {
                mode: 'payment',
                line_items: items,
                success_url: env_1.env.baseUrl + stripeAdditionalInfo.successRoute + '?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: env_1.env.baseUrl + stripeAdditionalInfo.cancelRoute,
            };
            const stripe = require('stripe')(stripeAdditionalInfo.clientSecret);
            const session = yield stripe.checkout.sessions.create(create_payment_json);
            if (session) {
                const stripeParams = new StripeOrder_1.StripeOrder();
                stripeParams.orderId = orderDetail.orderId;
                stripeParams.stripeRefId = session.id;
                stripeParams.total = orderAmount.toString();
                stripeParams.status = 0;
                yield stripeOrderRepository.save(stripeParams);
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
                const html = ejs.render(fileContent, { sessionId: session.id, publishKey: stripeAdditionalInfo.clientId });
                return response.send(html);
            }
        });
    }
    success(req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
            const queryParams = req.query;
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const stripeOrderRepository = (0, typeorm_1.getManager)().getRepository(StripeOrder_1.StripeOrder);
            const stripeOrderTransactionRepository = (0, typeorm_1.getManager)().getRepository(StripeOrderTransaction_1.StripeOrderTransaction);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'stripe',
                },
            });
            if (!pluginDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const stripeAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const stripe = require('stripe')(stripeAdditionalInfo.clientSecret);
            const session = yield stripe.checkout.sessions.retrieve(queryParams.session_id);
            if (session) {
                const paymentDetails = yield stripe.paymentIntents.retrieve(session.payment_intent);
                const stripeDetail = yield stripeOrderRepository.findOne({
                    where: {
                        stripeRefId: queryParams.session_id,
                    },
                });
                if (!stripeDetail) {
                    return response.status(400).send({
                        status: 1,
                        message: 'Invalid Payment Details',
                    });
                }
                const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
                const orderData = yield orderRepository.findOne(stripeDetail.orderId);
                if (!orderData) {
                    return response.status(400).send({
                        status: 1,
                        message: 'Invalid Order Id',
                    });
                }
                const orderStatus = yield orderRepository.findOne({ where: { orderId: stripeDetail.orderId, paymentFlag: 1 } });
                if (orderStatus) {
                    return response.status(400).send({
                        status: 1,
                        message: 'Already Paid for this Order',
                    });
                }
                const intvalue = Math.round(paymentDetails.amount_received);
                if (paymentDetails.status === 'succeeded' && intvalue === +stripeDetail.total) {
                    const transactionsParams = new StripeOrderTransaction_1.StripeOrderTransaction();
                    transactionsParams.paymentType = paymentDetails.method;
                    transactionsParams.stripeOrderId = stripeDetail.id;
                    transactionsParams.paymentData = JSON.stringify(paymentDetails);
                    transactionsParams.paymentStatus = 1;
                    yield stripeOrderTransactionRepository.save(transactionsParams);
                    stripeDetail.status = 1;
                    yield stripeOrderRepository.save(stripeDetail);
                    orderData.paymentFlag = 1;
                    orderData.paymentStatus = 1;
                    orderData.paymentProcess = 1;
                    orderData.paymentType = 'stripe';
                    orderData.paymentDetails = paymentDetails.id;
                    yield orderRepository.save(orderData);
                    yield this.orderProcessService.processOrder(stripeDetail.orderId, paymentDetails);
                }
                else {
                    const transactionsParams = new StripeOrderTransaction_1.StripeOrderTransaction();
                    transactionsParams.paymentType = 'FAILURE';
                    transactionsParams.stripeOrderId = stripeDetail.id;
                    transactionsParams.paymentData = JSON.stringify(paymentDetails);
                    transactionsParams.paymentStatus = 2;
                    yield stripeOrderTransactionRepository.save(transactionsParams);
                    stripeDetail.status = 2;
                    yield stripeOrderRepository.save(stripeDetail);
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
            }
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
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/process/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StripeController.prototype, "processRoute", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/success'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StripeController.prototype, "success", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/cancel'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StripeController.prototype, "cancel", null);
StripeController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/stripe-payment'),
    tslib_1.__metadata("design:paramtypes", [OrderProcessService_1.OrderProcessService])
], StripeController);
exports.StripeController = StripeController;
//# sourceMappingURL=StripeController.js.map