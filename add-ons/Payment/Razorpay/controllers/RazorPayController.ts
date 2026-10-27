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
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { RazorpayOrder } from '../models/RazorpayOrder';
import { Order } from '../../../../src/api/core/models/Order';
import { Plugins } from '../../../../src/api/core/models/Plugin';
import { env } from '../../../../src/env';
import { RazorpayOrderTransaction } from '../models/RazorpayOrderTransaction';
import { OrderProcessService } from '../../../../src/api/core/services/OrderProcessService';
import { VendorPlugin } from '../../../../src/api/core/models/VendorPlugin';
import { Service } from 'typedi';

@Service()
@Controller('/razorpay-payment')
export class RazorPayController {
    constructor(
        private orderProcessService: OrderProcessService
    ) {
        // ---
    }

    // Process razorpay Payment API
    /**
     * @api {get} /api/razorpay-payment/process/:id Process razorpay Payment API
     * @apiGroup razorpay
     * @apiHeader {number} orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/razorpay-payment/process/:id
     * @apiErrorExample {json} razorpay error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/process/:id')
    public async processRoute(@Param('id') orderPrefixId: string, @Res() response: any): Promise<any> {

        const orderRepository = getDataSource().getRepository(Order);
        const razorpayOrderRepository = getDataSource().getRepository(RazorpayOrder);
        const order = await orderRepository.findOne({
            where: { orderPrefixId },
            select: ['orderId'],
        });
        if (!order) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Order Id',
            });
        }
        const orderId = order.orderId;
        const orderDetail = await orderRepository.findOne({
            where: { orderId },
        });
        if (!orderDetail) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Order Id',
            });
        }
        const pluginRepository = getDataSource().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
        if (!paypalAdditionalInfo.clientId || !paypalAdditionalInfo.clientSecret) {
            return response.status(400).send({
                status: 0,
                message: 'Razorpay credentials are missing for this vendor',
            });
        }
        const razorPay = require('razorpay');
        const instance = new razorPay({
            key_id: paypalAdditionalInfo.clientId,
            key_secret: paypalAdditionalInfo.clientSecret,
        });
        const total = Number(orderDetail.total);
        if (!Number.isFinite(total) || total <= 0) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid order amount',
            });
        }
        const amountPaise = Math.round(total * 100);
        const params: any = {
            amount: amountPaise,
            receipt: orderDetail.orderPrefixId,
            currency: 'INR',
            payment_capture: true,
        };
        const result = await instance.orders.create(params);
        // ---
        const paypalParams = new RazorpayOrder();
        paypalParams.orderId = orderDetail.orderId;
        paypalParams.razorpayRefId = result.id;
        paypalParams.total = total.toString();
        paypalParams.status = 0;
        const val = await razorpayOrderRepository.save(paypalParams);

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
            baseUrl: env.baseUrl,
        });
        return response.send(html);
    }

    // Success razorPay Payment API
    /**
     * @api {get} /api/razorpay-payment/success/:id Success razorpay Payment API
     * @apiGroup razorpay
     * @apiHeader {number} orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/razorpay-payment/success/:id
     * @apiErrorExample {json} razorpay error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/success')
    public async success(@QueryParam('paymentId') paymentId: string, @Req() request: any, @Res() response: any): Promise<any> {
        // ----

        const pluginRepository = getDataSource().getRepository(Plugins);
        const razorpayOrderRepository = getDataSource().getRepository(RazorpayOrder);
        const razorpayOrderTransactionRepository = getDataSource().getRepository(RazorpayOrderTransaction);
        const orderRepository = getDataSource().getRepository(Order);
        const vendorpluginRepository = getDataSource().getRepository(VendorPlugin);

        const queryParams = request.query;
        const razorpayOrderId = queryParams.razorpay_order_id;
        if (!queryParams.razorpay_payment_id) {
            return response.status(400).send({
                status: 0,
                message: 'Razorpay Payment ID is missing',
            });
        }
        const pluginDetail = await pluginRepository.findOne({
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

        const razorpayOrderDetail = await razorpayOrderRepository.findOne({
            where: {
                razorpayRefId: razorpayOrderId,
            },
        });
        if (!razorpayOrderDetail) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Razorpay Order',
            });
        }
        const orderdetails = await orderRepository.findOne({ where: { orderId: razorpayOrderDetail.orderId } });

        if (!orderdetails) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Order Id',
            });
        }
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        if (!paypalAdditionalInfo.clientId || !paypalAdditionalInfo.clientSecret) {
            return response.status(400).send({
                status: 0,
                message: 'Razorpay credentials are missing for this vendor',
            });
        }
        const razorPay = require('razorpay');
        const instance = new razorPay({
            key_id: paypalAdditionalInfo.clientId,
            key_secret: paypalAdditionalInfo.clientSecret,
        });
        const paymentDetails = await this.razorPaySuccess(instance, queryParams.razorpay_payment_id);
        if (paymentDetails.order_id !== razorpayOrderDetail.razorpayRefId) {
            return response.status(400).send({
                status: 0,
                message: 'Payment does not match the Razorpay order',
            });
        }
        const razorpayDetail = razorpayOrderDetail;
        if (!razorpayDetail) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid Payment Details',
            });
        }

        const orderData: any = await orderRepository.findOne({
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

        const orderStatus = await orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
        if (orderStatus) {
            return response.status(400).send({
                status: 1,
                message: 'Already Paid for this Order',
            });
        }

        const intvalue = Math.round(paymentDetails.amount);
        const intVal = intvalue / 100;
        if (paymentDetails.status === 'captured' && intVal === +razorpayDetail.total) {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = paymentDetails.method;
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 1;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 1;
            await razorpayOrderRepository.save(razorpayDetail);
            orderData.paymentFlag = 1;
            orderData.paymentStatus = 1;
            orderData.paymentProcess = 1;
            orderData.paymentType = 'razorpay';
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
            await this.orderProcessService.processOrder(razorpayDetail.orderId, paymentDetails);
        } else {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = 'FAILURE';
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 2;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 2;
            await razorpayOrderRepository.save(razorpayDetail);
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
        const html = ejs.render(fileContent, { storeUrl: env.storeUrl + orderData.orderPrefixId });
        return response.send(html);
    }

    // cancel RazorPay Payment API
    /**
     * @api {get} /api/razorpay-payment/cancel Cancel RazorPay Payment API
     * @apiGroup razorpay
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/razorpay-payment/cancel
     * @apiErrorExample {json} razorpay error
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
    // Success razorPay Payment API
    /**
     * @api {get} /api/razorpay-payment/process-api/:orderPrefixId  Razorpay Payment Process API
     * @apiGroup razorpay
     * @apiHeader {number} orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *       "message": "payment made successful"
     * }
     * @apiSampleRequest /api/razorpay-payment/process-api/:orderPrefixId
     * @apiErrorExample {json} razorpay error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/process-api/:orderPrefixId')
    public async processAPI(@Req() request: any, @Res() response: any): Promise<any> {
        const orderId = request.params.orderPrefixId;
        const orderRepository = getDataSource().getRepository(Order);
        const razorpayOrderRepository = getDataSource().getRepository(RazorpayOrder);
        const vendorpluginRepository = getDataSource().getRepository(VendorPlugin);

        const orderDetail = await orderRepository.findOne({ where: { orderPrefixId: orderId } });
        if (!orderDetail) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Order Id',
            });
        }

        const pluginRepository = getDataSource().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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

        const vendorPluginDetails = await vendorpluginRepository.findOne({
            where: {
                pluginId: pluginDetail.id,
                vendorId: orderDetail.tenantId,
                isActive: true,
            },
        });
        if (!vendorPluginDetails) {
            return response.status(400).send({
                status: 1,
                message: 'Plugin not activated',
            });
        }

        const paypalAdditionalInfo = vendorPluginDetails.pluginAdditionalInfo ? (vendorPluginDetails.pluginAdditionalInfo) : {};
        const razorPay = require('razorpay');
        const instance = new razorPay({
            key_id: paypalAdditionalInfo.clientId,
            key_secret: paypalAdditionalInfo.clientSecret,
        });
        const params: any = {
            amount: +orderDetail.total * 100,
            receipt: orderDetail.orderPrefixId,
            currency: 'INR',
            payment_capture: true,
        };

        const responsee = await instance.orders.create(params);
        // ---
        const paypalParams = new RazorpayOrder();
        paypalParams.orderId = orderDetail.orderId;
        paypalParams.razorpayRefId = responsee.id;
        paypalParams.total = params.amount.toString();
        paypalParams.status = 0;
        const val = await razorpayOrderRepository.save(paypalParams);
        // ---
        const successResponse: any = {
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
                successURL: env.baseUrl + paypalAdditionalInfo.successAPIRoute,
                cancelURL: env.baseUrl + paypalAdditionalInfo.cancelAPIRoute,
                failureURL: env.baseUrl + paypalAdditionalInfo.failureAPIRoute,
                layout: 'pages/layouts/auth',
            },
        };
        return response.status(200).send(successResponse);
    }
    // Success razorPay Payment API
    /**
     * @api {get} /api/razorpay-payment/process-api/:orderPrefixId  Payment SuccessAPI
     * @apiGroup razorpay
     * @apiHeader {number} orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {    "message": "payment made successful",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/razorpay-payment/process-api/:orderPrefixId
     * @apiErrorExample {json} razorpay error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/success-api')
    public async successAPI(@QueryParam('paymentId') paymentId: string, @Req() request: any, @Res() response: any): Promise<any> {
        // const pluginRepository = getDataSource().getRepository(Plugins);
        // const razorpayOrderRepository = getDataSource().getRepository(RazorpayOrder);
        // const razorpayOrderTransactionRepository = getDataSource().getRepository(RazorpayOrderTransaction);
        // const vendorpluginRepository = getDataSource().getRepository(VendorPlugin);
        // const orderRepository = getDataSource().getRepository(Order);

        // const queryParams = request.query;
        // const pluginDetail = await pluginRepository.findOne({
        //     where: {
        //         pluginName: 'razorpay',
        //     },
        // });
        // if (!pluginDetail) {
        //     return response.status(400).send({
        //         status: 0,
        //         message: 'You not install this plugin. or problem in installation',
        //     });
        // }

        // const razorpayOrderDetail = await razorpayOrderRepository.findOne({
        //     where: {
        //         stripeRefId: paymentId,
        //     },
        // });
        // const orderdetails = await orderRepository.findOne({ where: { orderId: razorpayOrderDetail.orderId } });

        // if (!orderdetails) {
        //     return response.status(400).send({
        //         status: 1,
        //         message: 'Invalid Order Id',
        //     });
        // }

        // const vendorPluginDetails = await vendorpluginRepository.findOne({
        //     where: {
        //         pluginId: pluginDetail.id,
        //         vendorId: orderdetails.tenantId,
        //         isActive: 1,
        //     },
        // });
        // if (!vendorPluginDetails) {
        //     return response.status(400).send({
        //         status: 1,
        //         message: 'Plugin Not Activated',
        //     });
        // }

        // const paypalAdditionalInfo = vendorPluginDetails.pluginAdditionalInfo ? JSON.parse(vendorPluginDetails.pluginAdditionalInfo) : {};
        // const razorPay = require('razorpay');
        // const instance = new razorPay({
        //     key_id: paypalAdditionalInfo.clientId,
        //     key_secret: paypalAdditionalInfo.clientSecret,
        // });
        // const paymentDetails = await this.razorPaySuccess(instance, queryParams.razorpay_payment_id);
        // const razorpayDetail = await razorpayOrderRepository.findOne({
        //     where: {
        //         razorpayRefId: paymentDetails.order_id,
        //     },
        // });
        // if (!razorpayDetail) {
        //     return response.status(400).send({
        //         status: 0,
        //         message: 'Invalid Payment Details',
        //     });
        // }

        // const orderData: any = await orderRepository.findOne({
        //     where: {
        //         orderId: razorpayDetail.orderId,
        //     },
        // });
        // if (!orderData) {
        //     return response.status(400).send({
        //         status: 0,
        //         message: 'Invalid Order Id',
        //     });
        // }

        // const orderStatus = await orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
        // if (orderStatus) {
        //     return response.status(400).send({
        //         status: 0,
        //         message: 'Already Paid for this Order',
        //     });
        // }

        // const intvalue = Math.round(paymentDetails.amount);
        // if (paymentDetails.status === 'captured' && intvalue === +razorpayDetail.total) {
        //     const transactionsParams = new RazorpayOrderTransaction();
        //     transactionsParams.paymentType = paymentDetails.method;
        //     transactionsParams.razorpayOrderId = razorpayDetail.id;
        //     transactionsParams.paymentData = JSON.stringify(paymentDetails);
        //     transactionsParams.paymentStatus = 1;
        //     await razorpayOrderTransactionRepository.save(transactionsParams);
        //     razorpayDetail.status = 1;
        //     await razorpayOrderRepository.save(razorpayDetail);
        //     orderData.paymentFlag = 1;
        //     orderData.paymentStatus = 1;
        //     orderData.paymentProcess = 1;
        //     orderData.paymentType = 'razorpay';
        //     orderData.paymentDetails = paymentDetails.id;
        //     await orderRepository.save(orderData);
        //     await this.orderProcessService.processOrder(razorpayDetail.orderId, paymentDetails);
        // } else {
        //     const transactionsParams = new RazorpayOrderTransaction();
        //     transactionsParams.paymentType = 'FAILURE';
        //     transactionsParams.razorpayOrderId = razorpayDetail.id;
        //     transactionsParams.paymentData = JSON.stringify(paymentDetails);
        //     transactionsParams.paymentStatus = 2;
        //     await razorpayOrderTransactionRepository.save(transactionsParams);
        //     razorpayDetail.status = 2;
        //     await razorpayOrderRepository.save(razorpayDetail);
        //     orderData.paymentFlag = 2;
        //     await orderRepository.save(orderData);
        // }
        const successResponse: any = {
            status: 1,
            message: 'payment made successful',
        };
        return response.status(200).send(successResponse);
    }

    public async razorPaySuccess(instance: any, paymentId: any): Promise<any> {
        return new Promise((resolve, reject) => {
            instance.payments.fetch(paymentId).then((response) => {
                return resolve(response);
            }).catch((error) => {
                return reject(error);
            });
        });
    }
}
