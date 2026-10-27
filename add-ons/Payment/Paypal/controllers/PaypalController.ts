/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Controller, Res, Param, Req } from 'routing-controllers';
import * as path from 'path';
import { PaypalOrder } from '../models/PaypalOrder';
import { PaypalOrderTransaction } from '../models/PaypalOrderTransaction';
import * as paypal from 'paypal-rest-sdk';
import { Payment, Item, ConfigureOptions } from 'paypal-rest-sdk';
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
@Controller('/paypal-payment')
export class PayPalController {
    constructor(
        private orderProcessService: OrderProcessService
    ) {
        // ---
    }

    // Process PayPal Payment API
    /**
     * @api {get} /api/paypal-payment/process/:id Process PayPal Payment API
     * @apiGroup PayPal
     * @apiHeader {number} orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/paypal-payment/process/:id
     * @apiErrorExample {json} paypal error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/process/:id')
    public async processRoute(@Param('id') orderPrefixId: string, @Res() response: any): Promise<any> {

        const orderRepository = getDataSource().getRepository(Order);
        const order = await orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
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
        const html = ejs.render(fileContent, { orderId, baseUrl: env.baseUrl });
        return response.send(html);
    }

    // proceed PayPal Payment API
    /**
     * @api {get} /api/paypal-payment/proceed/:id Proceed PayPal Payment API
     * @apiGroup PayPal
     * @apiHeader {number} orderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/paypal-payment/proceed/:id
     * @apiErrorExample {json} paypal error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/proceed/:id')
    public async proceed(@Param('id') orderId: string, @Res() response: any): Promise<any> {
        const orderRepository = getDataSource().getRepository(Order);
        const paypalOrderRepository = getDataSource().getRepository(PaypalOrder);
        const orderProductRepository = getDataSource().getRepository(OrderProduct);
        const productRepository = getDataSource().getRepository(Product);
        const orderDetail = await orderRepository.findOne({ where: { orderId: +orderId } });
        if (!orderDetail) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Order Id',
            });
        }

        const pluginRepository = getDataSource().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
            mode: paypalAdditionalInfo.isTest ? 'sandbox' : 'live', // sandbox or live
            client_id: paypalAdditionalInfo.clientId,
            client_secret: paypalAdditionalInfo.clientSecret,
        });
        const product = await orderProductRepository.find({ where: { orderId: orderDetail.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName'] });

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
        const items: Item[] = [];
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
        const create_payment_json: Payment = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: env.baseUrl + paypalAdditionalInfo.successRoute,
                cancel_url: env.baseUrl + paypalAdditionalInfo.cancelRoute,
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
        const paypalVal: any = await this.payPalcreate(create_payment_json);
        if (paypalVal) {
            const paypalParams = new PaypalOrder();
            paypalParams.orderId = orderDetail.orderId;
            paypalParams.paypalRefId = paypalVal.id;
            paypalParams.total = orderAmount.toString();
            paypalParams.status = 0;
            await paypalOrderRepository.save(paypalParams);
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
    }

    // Success PayPal Payment API
    /**
     * @api {get} /api/paypal-payment/success success PayPal Payment API
     * @apiGroup PayPal
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/paypal-payment/success
     * @apiErrorExample {json} paypal error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/success')
    public async success(@Req() request: any, @Res() response: any): Promise<any> {
        // ----

        const paypalOrderRepository = getDataSource().getRepository(PaypalOrder);
        const paypalOrderTransactionRepository = getDataSource().getRepository(PaypalOrderTransaction);
        const orderRepository = getDataSource().getRepository(Order);
        const vendorPluginRepository = getDataSource().getRepository(VendorPlugin);
        const pluginRepository = getDataSource().getRepository(Plugins);

        const pluginDetail = await pluginRepository.findOne({
            where: {
                pluginName: 'paypal',
                pluginStatus: 1,
            },
        });

        if (!pluginDetail) {
            return response.status(400).send({
                status: 1,
                message: 'You not install this plugin. or problem in installation',
            });
        }

        const paypalDetail = await paypalOrderRepository.findOne({
            where: {
                paypalRefId: request.query.paymentId,
            },
        });

        if (!paypalDetail) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Payment Details',
            });
        }

        const orderData = await orderRepository.findOne({ where: { orderId: paypalDetail.orderId } });

        if (!orderData) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Order Id',
            });
        }
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        const config: ConfigureOptions = {
            mode: paypalAdditionalInfo.isTest ? 'sandbox' : 'live', // sandbox or live
            client_id: paypalAdditionalInfo.clientId,
            client_secret: paypalAdditionalInfo.clientSecret,
        };

        const paymentDetails = await this.payPalSuccess(config, request.query.PayerID, request.query.paymentId);

        const orderStatus = await orderRepository.findOne({ where: { orderId: orderData.orderId, paymentFlag: 1 } });

        if (orderStatus) {
            return response.status(400).send({
                status: 1,
                message: 'Already Paid for this Order',
            });
        }

        const paidDetails = paymentDetails.transactions[0].related_resources[0];
        const intvalue = Math.round(paidDetails.sale.amount.total);
        if (paidDetails.sale.state === 'completed' && intvalue === +paypalDetail.total) {
            const transactionsParams = new PaypalOrderTransaction();
            transactionsParams.paymentType = paidDetails.sale.payment_mode;
            transactionsParams.paypalOrderId = paypalDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 1;
            await paypalOrderTransactionRepository.save(transactionsParams);
            paypalDetail.status = 1;
            await paypalOrderRepository.save(paypalDetail);
            orderData.paymentFlag = 1;
            orderData.paymentStatus = 1;
            orderData.paymentProcess = 1;
            orderData.paymentType = 'paypal';
            orderData.paymentDetails = paymentDetails.id;
            await orderRepository.save(orderData);
            const giftCardDetail = await vendorPluginRepository.findOne({
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
                const importPath = process.cwd() + '/../../../../add-ons/GiftCard';
                const giftCard = await require(importPath);

                await giftCard.activateGiftCard(
                    orderData.orderId,
                    orderData.customerId
                );
            }
            await this.orderProcessService.processOrder(paypalDetail.orderId, paymentDetails);
        } else {
            const transactionsParams = new PaypalOrderTransaction();
            transactionsParams.paymentType = 'FAILURE';
            transactionsParams.paypalOrderId = paypalDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 2;
            await paypalOrderTransactionRepository.save(transactionsParams);
            paypalDetail.status = 2;
            await paypalOrderRepository.save(paypalDetail);
            orderData.paymentFlag = 2;
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

    // cancel PayPal Payment API
    /**
     * @api {get} /api/paypal-payment/cancel Cancel PayPal Payment API
     * @apiGroup PayPal
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/paypal-payment/cancel
     * @apiErrorExample {json} paypal error
     * HTTP/1.1 500 Internal Server Error
     */
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

    public async payPalSuccess(config: ConfigureOptions, payerId: string, paymentId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            paypal.configure(config);
            const execute_payment_json = {
                payer_id: payerId,
            };
            paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
                if (error) {
                    return reject(error);
                } else {
                    return resolve(payment);
                }
            });
        });
    }

    public async payPalcreate(val: any): Promise<any> {
        return new Promise((resolve, reject) => {
            paypal.payment.create(val, (error, payment) => {
                if (error) {
                    return reject(error);
                } else {
                    return resolve(payment);
                }
            });
        });
    }
}
