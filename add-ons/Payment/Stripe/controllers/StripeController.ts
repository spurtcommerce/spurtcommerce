/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Controller, Res, Param, Req, QueryParam } from 'routing-controllers';
import * as path from 'path';
import { StripeOrder } from '../models/StripeOrder';
import { StripeOrderTransaction } from '../models/StripeOrderTransaction';
import { Order } from '../../../../src/api/core/models/Order';
import { OrderProduct } from '../../../../src/api/core/models/OrderProduct';
import { Plugins } from '../../../../src/api/core/models/Plugin';
import { Product } from '../../../../src/api/core/models/ProductModel';
import { OrderProcessService } from '../../../../src/api/core/services/OrderProcessService';
import { env } from '../../../../src/env';
import { VendorPlugin } from '../../../../src/api/core/models/VendorPlugin';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
@Controller('/stripe-payment')
export class StripeController {
    constructor(
        private orderProcessService: OrderProcessService
    ) {
        // ---
    }

    // Process stripe Payment API
    /**
     * @api {get} /api/stripe-payment/process/:id Process Stripe Payment API
     * @apiGroup stripe
     * @apiHeader {string} orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/stripe-payment/process/:id
     * @apiErrorExample {json} stripe error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/process/:id')
    public async processRoute(@Param('id') orderPrefixId: string, @Res() response: any): Promise<any> {

        const orderRepository = getDataSource().getRepository(Order);
        const orderProductRepository = getDataSource().getRepository(OrderProduct);
        const productRepository = getDataSource().getRepository(Product);
        const stripeOrderRepository = getDataSource().getRepository(StripeOrder);
        const order = await orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
        if (!order) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Order Id',
            });
        }
        const orderId = order.orderId;
        const orderDetail = await orderRepository.findOne({ where: { orderId } });
        if (!orderDetail) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Order Id',
            });
        }
        const pluginRepository = getDataSource().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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

        const product = await orderProductRepository.find({ where: { orderId: orderDetail.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountedAmount', 'discountAmount'] });

        const productVal = product.map(async (value: any) => {
            const productDetail = await productRepository.findOne({
                where: { productId: value.productId },
                select: ['name', 'quantity', 'minimumQuantity', 'image',
                    'imagePath', 'shipping', 'price', 'dateAvailable', 'amount', 'rating', 'discount', 'isActive'],
            });
            const tempVal: any = value;
            tempVal.productDetail = productDetail;
            return tempVal;
        });
        const results = await Promise.all(productVal);
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
            success_url: env.baseUrl + stripeAdditionalInfo.successRoute + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: env.baseUrl + stripeAdditionalInfo.cancelRoute,
        };
        const stripe = require('stripe')(stripeAdditionalInfo.clientSecret);
        const session = await stripe.checkout.sessions.create(create_payment_json);
        if (session) {
            const stripeParams = new StripeOrder();
            stripeParams.orderId = orderDetail.orderId;
            stripeParams.stripeRefId = session.id;
            stripeParams.total = orderAmount.toString();
            stripeParams.status = 0;
            await stripeOrderRepository.save(stripeParams);
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
    }
    // Success stripe Payment API
    /**
     * @api {get} /api/stripe-payment/process-api/:orderPrefixId  Payment SuccessAPI
     * @apiGroup stripe
     * @apiHeader {number} orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *      "status": "1"
     * }
     * @apiSampleRequest /api/stripe-payment/process-api/:orderPrefixId
     * @apiErrorExample {json} stripe error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/success')
    public async success(@QueryParam('paymentId') paymentId: string, @Req() request: any, @Res() response: any): Promise<any> {
        // ----

        const queryParams = request.query;
        const pluginRepository = getDataSource().getRepository(Plugins);
        const stripeOrderRepository = getDataSource().getRepository(StripeOrder);
        const stripeOrderTransactionRepository = getDataSource().getRepository(StripeOrderTransaction);
        const orderRepository = getDataSource().getRepository(Order);
        const vendorpluginRepository = getDataSource().getRepository(VendorPlugin);

        const pluginDetail = await pluginRepository.findOne({
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

        const getStripeDetail = await stripeOrderRepository.findOne({
            where: {
                stripeRefId: paymentId,
            },
        });
        const orderData = await orderRepository.findOne({ where: { orderId: getStripeDetail.orderId } });

        if (!orderData) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Order Id',
            });
        }
        const stripeAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        const stripe = require('stripe')(stripeAdditionalInfo.clientSecret);
        const session = await stripe.checkout.sessions.retrieve(queryParams.session_id);
        if (session) {
            const paymentDetails = await stripe.paymentIntents.retrieve(session.payment_intent);
            const stripeDetail = await stripeOrderRepository.findOne({
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

            const orderStatus = await orderRepository.findOne({ where: { orderId: stripeDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                return response.status(400).send({
                    status: 1,
                    message: 'Already Paid for this Order',
                });
            }
            const intvalue = Math.round(paymentDetails.amount_received);
            if (paymentDetails.status === 'succeeded' && intvalue === +stripeDetail.total) {
                const transactionsParams = new StripeOrderTransaction();
                transactionsParams.paymentType = paymentDetails.method;
                transactionsParams.stripeOrderId = stripeDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                await stripeOrderTransactionRepository.save(transactionsParams);
                stripeDetail.status = 1;
                await stripeOrderRepository.save(stripeDetail);
                orderData.paymentFlag = 1;
                orderData.paymentStatus = 1;
                orderData.paymentProcess = 1;
                orderData.paymentType = 'stripe';
                orderData.paymentDetails = paymentDetails.id;
                await orderRepository.save(orderData);
                const giftCardDetail = await vendorpluginRepository.findOne({
                    where: {
                        vendorId: orderData.tenantId,
                        isActive: true,
                        plugins: {
                            pluginName: 'gift-card',
                            pluginStatus: 1,
                        },
                    },
                });

                if (giftCardDetail) {
                    const importPath = process.cwd() + '/../../../../add-ons/GiftCard/';
                    const giftCard = await require(importPath);

                    await giftCard.activateGiftCard(
                        orderData.orderId,
                        orderData.customerId
                    );
                }
                await this.orderProcessService.processOrder(stripeDetail.orderId, paymentDetails);
            } else {
                const transactionsParams = new StripeOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.stripeOrderId = stripeDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                await stripeOrderTransactionRepository.save(transactionsParams);
                stripeDetail.status = 2;
                await stripeOrderRepository.save(stripeDetail);
                orderData.paymentFlag = 2;
                orderData.paymentStatus = 2;
                await orderRepository.save(orderData);
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
            const html = ejs.render(fileContent, { storeUrl: env.storeRedirectUrl + orderData.orderPrefixId });
            return response.send(html);
        }
    }

    @Get('/cancel')
    public async cancel(@Res() response: any): Promise<any> {
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
        const html = ejs.render(fileContent, { storeUrl: env.cancelUrl });
        return response.send(html);
    }
}
