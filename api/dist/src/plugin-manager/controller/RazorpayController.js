"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorPayController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Order_1 = require("../../api/core/models/Order");
const Plugin_1 = require("../models/Plugin");
const RazorpayOrder_1 = require("../models/RazorpayOrder");
const RazorpayOrderTransaction_1 = require("../models/RazorpayOrderTransaction");
const OrderProduct_1 = require("../../api/core/models/OrderProduct");
const EmailTemplate_1 = require("../../api/core/models/EmailTemplate");
const ProductModel_1 = require("../../api/core/models/ProductModel");
const ProductImage_1 = require("../../api/core/models/ProductImage");
const Setting_1 = require("../../api/core/models/Setting");
const Currency_1 = require("../../api/core/models/Currency");
const User_1 = require("../../api/core/models/User");
const mail_services_1 = require("../../auth/mail.services");
const env_1 = require("../../env");
const Payment_1 = require("../../api/core/models/Payment");
const PaymentItems_1 = require("../../api/core/models/PaymentItems");
const VendorPayment_1 = require("../../api/core/models/VendorPayment");
const VendorProducts_1 = require("../../api/core/models/VendorProducts");
const Vendor_1 = require("../../api/core/models/Vendor");
const VendorGlobalSettings_1 = require("../../api/core/models/VendorGlobalSettings");
const VendorOrders_1 = require("../../api/core/models/VendorOrders");
const moment = require("moment");
const VendorInvoice_1 = require("../../api/core/models/VendorInvoice");
const VendorInvoiceItem_1 = require("../../api/core/models/VendorInvoiceItem");
const Customer_1 = require("../../api/core/models/Customer");
const VendorGroup_1 = require("../../api/core/models/VendorGroup");
class RazorPayController {
    static razorPaySuccess(instance, paymentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                instance.payments.fetch(paymentId).then((response) => {
                    return resolve(response);
                }).catch((error) => {
                    return reject(error);
                });
            });
        });
    }
    constructor() {
        // ---
    }
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            res.render('pages/razorpay/form', {
                title: 'Razorpay',
                path: '../razorpay/form',
                clientId: paypalAdditionalInfo.clientId ? paypalAdditionalInfo.clientId : '',
                clientSecret: paypalAdditionalInfo.clientSecret ? paypalAdditionalInfo.clientSecret : '',
                isTest: paypalAdditionalInfo.isTest,
            });
        });
    }
    updateSettings(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.assert('clientId', 'Client Id cannot be blank').notEmpty();
            req.assert('clientSecret', 'Client Secret cannot be blank').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                req.flash('errors', errors);
                return res.redirect('paypal');
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            paypalAdditionalInfo.clientId = req.body.clientId;
            paypalAdditionalInfo.clientSecret = req.body.clientSecret;
            paypalAdditionalInfo.isTest = req.body.isTest;
            pluginDetail.pluginAdditionalInfo = JSON.stringify(paypalAdditionalInfo);
            const saveResponse = yield pluginRepository.save(pluginDetail);
            if (saveResponse) {
                req.flash('success', ['Razorpay settings updated successfully']);
                return res.redirect('home');
            }
            req.flash('errors', ['Unable to update the razorpay settings']);
            return res.redirect('home');
        });
    }
    process(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderPrefixId = req.params.orderPrefixId;
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const order = yield orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
            const orderId = order.orderId;
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
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
            instance.orders.create(params).then((response) => {
                // ---
                const paypalParams = new RazorpayOrder_1.RazorpayOrder();
                paypalParams.orderId = orderDetail.orderId;
                paypalParams.razorpayRefId = response.id;
                paypalParams.total = total.toString();
                paypalParams.status = 0;
                razorpayOrderRepository.save(paypalParams).then((val) => {
                    // ---
                    res.render('pages/razorpay/process', {
                        title: 'Razorpay',
                        orderRefId: response.id,
                        key: paypalAdditionalInfo.clientId,
                        amount: total,
                        orderId: orderDetail.orderPrefixId,
                        orderIncrementId: orderDetail.orderId,
                        description: val.id,
                        username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                        email: orderDetail.email,
                        contact: orderDetail.telephone,
                        layout: 'pages/layouts/auth',
                    });
                }).catch((err) => {
                    throw err;
                });
            }).catch((error) => {
                // ---
                throw error;
            });
        });
    }
    success(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const EmailTemplateRepository = (0, typeorm_1.getManager)().getRepository(EmailTemplate_1.EmailTemplate);
            const orderProductRepository = (0, typeorm_1.getManager)().getRepository(OrderProduct_1.OrderProduct);
            const productImageRepository = (0, typeorm_1.getManager)().getRepository(ProductImage_1.ProductImage);
            const productRepository = (0, typeorm_1.getManager)().getRepository(ProductModel_1.Product);
            const settingRepository = (0, typeorm_1.getManager)().getRepository(Setting_1.Settings);
            const currencyRepository = (0, typeorm_1.getManager)().getRepository(Currency_1.Currency);
            const userRepository = (0, typeorm_1.getManager)().getRepository(User_1.User);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const razorpayOrderTransactionRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrderTransaction_1.RazorpayOrderTransaction);
            const paymentRepository = (0, typeorm_1.getManager)().getRepository(Payment_1.Payment);
            const paymentItemsRepository = (0, typeorm_1.getManager)().getRepository(PaymentItems_1.PaymentItems);
            const vendorPaymentRepository = (0, typeorm_1.getManager)().getRepository(VendorPayment_1.VendorPayment);
            const VendorProductsRepository = (0, typeorm_1.getManager)().getRepository(VendorProducts_1.VendorProducts);
            const VendorRepository = (0, typeorm_1.getManager)().getRepository(Vendor_1.Vendor);
            const VendorGroupRepository = (0, typeorm_1.getManager)().getRepository(VendorGroup_1.VendorGroup);
            const VendorGlobalSettingRepository = (0, typeorm_1.getManager)().getRepository(VendorGlobalSettings_1.VendorGlobalSetting);
            const VendorOrdersRepository = (0, typeorm_1.getManager)().getRepository(VendorOrders_1.VendorOrders);
            const VendorInvoiceRepository = (0, typeorm_1.getManager)().getRepository(VendorInvoice_1.VendorInvoice);
            const VendorInvoiceItemRepository = (0, typeorm_1.getManager)().getRepository(VendorInvoiceItem_1.VendorInvoiceItem);
            const CustomerRepository = (0, typeorm_1.getManager)().getRepository(Customer_1.Customer);
            const queryParams = req.query;
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const paymentDetails = yield RazorPayController.razorPaySuccess(instance, queryParams.razorpay_payment_id);
            const razorpayDetail = yield razorpayOrderRepository.findOne({
                where: {
                    razorpayRefId: paymentDetails.order_id,
                },
            });
            if (!razorpayDetail) {
                req.flash('errors', ['Invalid Payment Details']);
                return res.redirect('error');
            }
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(razorpayDetail.orderId);
            if (!orderData) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const setting = yield settingRepository.findOne();
            const currencySymbol = yield currencyRepository.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
            const orderStatus = yield orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                req.flash('errors', ['Already Paid for this Order']);
                return res.redirect('error');
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
                const paymentParams = new Payment_1.Payment();
                paymentParams.orderId = razorpayDetail.orderId;
                const date = new Date();
                paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                paymentParams.paymentNumber = paymentDetails.id;
                paymentParams.paymentAmount = orderData.total;
                paymentParams.paymentInformation = JSON.stringify(paymentDetails);
                const payments = yield paymentRepository.save(paymentParams);
                const productDetailData = [];
                let i;
                const orderProduct = yield orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
                for (i = 0; i < orderProduct.length; i++) {
                    const paymentItems = new PaymentItems_1.PaymentItems();
                    paymentItems.paymentId = payments.paymentId;
                    paymentItems.orderProductId = orderProduct[i].orderProductId;
                    paymentItems.totalAmount = orderProduct[i].total;
                    paymentItems.productName = orderProduct[i].name;
                    paymentItems.productQuantity = orderProduct[i].quantity;
                    paymentItems.productPrice = orderProduct[i].productPrice;
                    const payItem = yield paymentItemsRepository.save(paymentItems);
                    const vendorProduct = yield VendorProductsRepository.findOne({ where: { productId: orderProduct[i].productId } });
                    if (vendorProduct) {
                        const vendor = yield VendorRepository.findOne({ where: { vendorId: vendorProduct.vendorId } });
                        const vendorGroup = yield VendorGroupRepository.findOne({
                            where: {
                                groupId: vendor.vendorGroupId,
                            },
                        });
                        const vendorOrders = yield VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                        const vendorPayments = new VendorPayment_1.VendorPayment();
                        vendorPayments.vendorId = vendorProduct.vendorId;
                        vendorPayments.paymentItemId = payItem.paymentItemId;
                        vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                        vendorPayments.amount = orderProduct[i].total;
                        if (vendorProduct.vendorProductCommission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                        }
                        else if (vendorGroup !== undefined && +vendorGroup.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
                        }
                        else {
                            const defaultCommission = yield VendorGlobalSettingRepository.findOne();
                            const defCommission = defaultCommission.defaultCommission;
                            vendorPayments.commissionAmount = vendorPayments.amount * (defCommission / 100);
                        }
                        yield vendorPaymentRepository.save(vendorPayments);
                    }
                    const productInformation = yield orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountedAmount', 'discountAmount', 'couponDiscountAmount', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                    const productImageData = yield productRepository.findOne(productInformation.productId);
                    let productImageDetail;
                    productImageDetail = yield productImageRepository.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                    productImageData.productInformationData = productInformation;
                    productImageData.productImage = productImageDetail;
                    productDetailData.push(productImageData);
                }
                const emailContent = yield EmailTemplateRepository.findOne(5);
                const adminEmailContent = yield EmailTemplateRepository.findOne(6);
                const nowDate = new Date();
                const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const logo = yield settingRepository.findOne();
                const vendorInvoice = yield VendorInvoiceRepository.find({ where: { orderId: orderData.orderId } });
                if (vendorInvoice.length > 0) {
                    for (const vendInvoice of vendorInvoice) {
                        const vendorProductDetailData = [];
                        const vendor = yield VendorRepository.findOne({ where: { vendorId: vendInvoice.vendorId } });
                        const customer = yield CustomerRepository.findOne({ where: { id: vendor.customerId } });
                        const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                        const vendorInvoiceItem = yield VendorInvoiceItemRepository.find({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                        for (const vendInvoiceItem of vendorInvoiceItem) {
                            const vendorProductInformation = yield orderProductRepository.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                            const vendorProductImageData = yield productRepository.findOne(vendorProductInformation.productId);
                            let vendorProductImageDetail;
                            vendorProductImageDetail = yield productImageRepository.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                            vendorProductImageData.productInformationData = vendorProductInformation;
                            vendorProductImageData.productImage = vendorProductImageDetail;
                            vendorProductDetailData.push(vendorProductImageData);
                        }
                        const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                        const mailContent = {};
                        mailContent.logo = logo;
                        mailContent.emailContent = vendorMessage;
                        mailContent.redirectUrl = vendorRedirectUrl;
                        mailContent.productDetailData = vendorProductDetailData;
                        mailContent.today = today;
                        mailContent.orderData = orderData;
                        mail_services_1.MAILService.sendMail(mailContent, customer.email, adminEmailContent.subject, false, false, '');
                    }
                }
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                const adminMailContents = {};
                adminMailContents.logo = logo;
                adminMailContents.emailContent = adminMessage;
                adminMailContents.redirectUrl = adminRedirectUrl;
                adminMailContents.productDetailData = productDetailData;
                adminMailContents.today = today;
                adminMailContents.orderData = orderData;
                mail_services_1.MAILService.sendMail(adminMailContents, adminId, adminEmailContent.subject, false, false, '');
                const storeRedirectUrl = env_1.env.storeRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = customerMessage;
                mailContents.orderData = orderData;
                mailContents.productDetailData = productDetailData;
                mailContents.today = today;
                mailContents.redirectUrl = storeRedirectUrl;
                mail_services_1.MAILService.sendMail(mailContents, orderData, emailContent.subject, false, false, '');
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
            res.render('pages/paypal/success', {
                title: 'Paypal',
                storeUrl: env_1.env.storeUrl,
                layout: 'pages/layouts/auth',
            });
        });
    }
    cancel(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/razorpay/cancel', {
                title: 'Razorpay',
                layout: 'pages/layouts/auth',
                storeUrl: env_1.env.cancelUrl,
            });
        });
    }
    proceed(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.orderId;
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const params = {
                amount: +orderDetail.total,
                receipt: orderDetail.orderPrefixId,
                currency: 'INR',
                payment_capture: true,
            };
            instance.orders.create(params).then((response) => {
                // ---
                const paypalParams = new RazorpayOrder_1.RazorpayOrder();
                paypalParams.orderId = orderDetail.orderId;
                paypalParams.razorpayRefId = response.id;
                paypalParams.total = params.amount.toString();
                paypalParams.status = 0;
                razorpayOrderRepository.save(paypalParams).then((val) => {
                    // ---
                    res.render('pages/razorpay/proceed', {
                        title: 'Razorpay',
                        orderRefId: response.id,
                        key: paypalAdditionalInfo.clientId,
                        amount: orderDetail.total,
                        orderId: orderDetail.orderPrefixId,
                        orderIncrementId: orderDetail.orderId,
                        description: val.id,
                        username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                        email: orderDetail.email,
                        contact: orderDetail.telephone,
                        layout: 'pages/layouts/auth',
                    });
                }).catch((err) => {
                    throw err;
                });
            }).catch((error) => {
                // ---
                throw error;
            });
        });
    }
    processAPI(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.orderPrefixId;
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const orderDetail = yield orderRepository.findOne({ where: { orderPrefixId: orderId } });
            if (!orderDetail) {
                return res.status(400).send({
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
                return res.status(400).send({
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
            instance.orders.create(params).then((response) => {
                // ---
                const paypalParams = new RazorpayOrder_1.RazorpayOrder();
                paypalParams.orderId = orderDetail.orderId;
                paypalParams.razorpayRefId = response.id;
                paypalParams.total = params.amount.toString();
                paypalParams.status = 0;
                razorpayOrderRepository.save(paypalParams).then((val) => {
                    // ---
                    const successResponse = {
                        status: 1,
                        message: 'payment made successful',
                        data: {
                            title: 'Razorpay',
                            orderRefId: response.id,
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
                    return res.status(200).send(successResponse);
                }).catch((err) => {
                    return res.status(400).send({
                        status: 0,
                        message: 'You not install this plugin. or problem in installation',
                    });
                });
            }).catch((error) => {
                // ---
                return res.status(400).send({
                    status: 0,
                    message: 'You not install this plugin. or problem in installation',
                });
            });
        });
    }
    successAPI(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const EmailTemplateRepository = (0, typeorm_1.getManager)().getRepository(EmailTemplate_1.EmailTemplate);
            const orderProductRepository = (0, typeorm_1.getManager)().getRepository(OrderProduct_1.OrderProduct);
            const productImageRepository = (0, typeorm_1.getManager)().getRepository(ProductImage_1.ProductImage);
            const productRepository = (0, typeorm_1.getManager)().getRepository(ProductModel_1.Product);
            const settingRepository = (0, typeorm_1.getManager)().getRepository(Setting_1.Settings);
            const currencyRepository = (0, typeorm_1.getManager)().getRepository(Currency_1.Currency);
            const userRepository = (0, typeorm_1.getManager)().getRepository(User_1.User);
            const razorpayOrderRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrder_1.RazorpayOrder);
            const razorpayOrderTransactionRepository = (0, typeorm_1.getManager)().getRepository(RazorpayOrderTransaction_1.RazorpayOrderTransaction);
            const paymentRepository = (0, typeorm_1.getManager)().getRepository(Payment_1.Payment);
            const paymentItemsRepository = (0, typeorm_1.getManager)().getRepository(PaymentItems_1.PaymentItems);
            const vendorPaymentRepository = (0, typeorm_1.getManager)().getRepository(VendorPayment_1.VendorPayment);
            const VendorProductsRepository = (0, typeorm_1.getManager)().getRepository(VendorProducts_1.VendorProducts);
            const VendorRepository = (0, typeorm_1.getManager)().getRepository(Vendor_1.Vendor);
            const VendorGroupRepository = (0, typeorm_1.getManager)().getRepository(VendorGroup_1.VendorGroup);
            const VendorGlobalSettingRepository = (0, typeorm_1.getManager)().getRepository(VendorGlobalSettings_1.VendorGlobalSetting);
            const VendorOrdersRepository = (0, typeorm_1.getManager)().getRepository(VendorOrders_1.VendorOrders);
            const queryParams = req.query;
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                return res.status(400).send({
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
            const paymentDetails = yield RazorPayController.razorPaySuccess(instance, queryParams.razorpay_payment_id);
            const razorpayDetail = yield razorpayOrderRepository.findOne({
                where: {
                    razorpayRefId: paymentDetails.order_id,
                },
            });
            if (!razorpayDetail) {
                return res.status(400).send({
                    status: 0,
                    message: 'Invalid Payment Details',
                });
            }
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(razorpayDetail.orderId);
            if (!orderData) {
                return res.status(400).send({
                    status: 0,
                    message: 'Invalid Order Id',
                });
            }
            const setting = yield settingRepository.findOne();
            const currencySymbol = yield currencyRepository.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
            const orderStatus = yield orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                return res.status(400).send({
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
                const paymentParams = new Payment_1.Payment();
                paymentParams.orderId = razorpayDetail.orderId;
                const date = new Date();
                paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                paymentParams.paymentNumber = paymentDetails.id;
                paymentParams.paymentAmount = orderData.total;
                paymentParams.paymentInformation = JSON.stringify(paymentDetails);
                const payments = yield paymentRepository.save(paymentParams);
                const productDetailData = [];
                let i;
                const orderProduct = yield orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
                for (i = 0; i < orderProduct.length; i++) {
                    const paymentItems = new PaymentItems_1.PaymentItems();
                    paymentItems.paymentId = payments.paymentId;
                    paymentItems.orderProductId = orderProduct[i].orderProductId;
                    paymentItems.totalAmount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                    paymentItems.productName = orderProduct[i].name;
                    paymentItems.productQuantity = orderProduct[i].quantity;
                    paymentItems.productPrice = orderProduct[i].productPrice;
                    const payItem = yield paymentItemsRepository.save(paymentItems);
                    const vendorProduct = yield VendorProductsRepository.findOne({ where: { productId: orderProduct[i].productId } });
                    if (vendorProduct) {
                        const vendor = yield VendorRepository.findOne({ where: { vendorId: vendorProduct.vendorId } });
                        const vendorGroup = yield VendorGroupRepository.findOne({
                            where: {
                                groupId: vendor.vendorGroupId,
                            },
                        });
                        const vendorOrders = yield VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                        const vendorPayments = new VendorPayment_1.VendorPayment();
                        vendorPayments.vendorId = vendorProduct.vendorId;
                        vendorPayments.paymentItemId = payItem.paymentItemId;
                        vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                        vendorPayments.amount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                        if (vendorProduct.vendorProductCommission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                        }
                        else if (vendorGroup !== undefined && +vendorGroup.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
                        }
                        else {
                            const defaultCommission = yield VendorGlobalSettingRepository.findOne();
                            const defCommission = defaultCommission.defaultCommission;
                            vendorPayments.commissionAmount = vendorPayments.amount * (defCommission / 100);
                        }
                        yield vendorPaymentRepository.save(vendorPayments);
                    }
                    const productInformation = yield orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
                    const productImageData = yield productRepository.findOne(productInformation.productId);
                    const productImageDetail = yield productImageRepository.findOne({ where: { productId: productInformation.productId } });
                    productImageData.productInformationData = productInformation;
                    productImageData.productImage = productImageDetail;
                    productDetailData.push(productImageData);
                }
                const emailContent = yield EmailTemplateRepository.findOne(5);
                const adminEmailContent = yield EmailTemplateRepository.findOne(6);
                const nowDate = new Date();
                const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const logo = yield settingRepository.findOne();
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                const adminMailContents = {};
                adminMailContents.logo = logo;
                adminMailContents.redirectUrl = adminRedirectUrl;
                adminMailContents.emailContent = adminMessage;
                adminMailContents.productDetailData = productDetailData;
                adminMailContents.today = today;
                adminMailContents.orderData = orderData;
                mail_services_1.MAILService.sendMail(adminMailContents, adminId, adminEmailContent.subject, false, false, '');
                const storeRedirectUrl = env_1.env.storeRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = customerMessage;
                mailContents.orderData = orderData;
                mailContents.productDetailData = productDetailData;
                mailContents.today = today;
                mailContents.redirectUrl = storeRedirectUrl;
                mail_services_1.MAILService.sendMail(mailContents, orderData, emailContent.subject, false, false, '');
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
            return res.status(200).send(successResponse);
        });
    }
}
exports.RazorPayController = RazorPayController;
//# sourceMappingURL=RazorpayController.js.map