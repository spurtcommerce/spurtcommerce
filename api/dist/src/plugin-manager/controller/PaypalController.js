"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../models/Plugin");
const Order_1 = require("../../api/core/models/Order");
const OrderProduct_1 = require("../../api/core/models/OrderProduct");
const EmailTemplate_1 = require("../../api/core/models/EmailTemplate");
const ProductModel_1 = require("../../api/core/models/ProductModel");
const ProductImage_1 = require("../../api/core/models/ProductImage");
const PaypalOrder_1 = require("../models/PaypalOrder");
const Setting_1 = require("../../api/core/models/Setting");
const Currency_1 = require("../../api/core/models/Currency");
const User_1 = require("../../api/core/models/User");
const Payment_1 = require("../../api/core/models/Payment");
const PaymentItems_1 = require("../../api/core/models/PaymentItems");
const VendorPayment_1 = require("../../api/core/models/VendorPayment");
const VendorProducts_1 = require("../../api/core/models/VendorProducts");
const Vendor_1 = require("../../api/core/models/Vendor");
const VendorOrders_1 = require("../../api/core/models/VendorOrders");
const VendorGlobalSettings_1 = require("../../api/core/models/VendorGlobalSettings");
const PaypalOrderTransaction_1 = require("../models/PaypalOrderTransaction");
const env_1 = require("../../env");
const mail_services_1 = require("../../auth/mail.services");
const paypal = tslib_1.__importStar(require("paypal-rest-sdk"));
const moment = require("moment");
const VendorInvoice_1 = require("../../api/core/models/VendorInvoice");
const VendorInvoiceItem_1 = require("../../api/core/models/VendorInvoiceItem");
const Customer_1 = require("../../api/core/models/Customer");
const VendorGroup_1 = require("../../api/core/models/VendorGroup");
class PaypalController {
    static payPalSuccess(config, payerId, paymentId) {
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
    constructor() {
        // ---
    }
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            res.render('pages/paypal/form', {
                title: 'Paypal',
                path: '../paypal/form',
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
                    pluginName: 'paypal',
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
                req.flash('success', ['Paypal settings updated successfully']);
                return res.redirect('home');
            }
            req.flash('errors', ['Unable to update the paypal settings']);
            return res.redirect('home');
        });
    }
    process(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderPrefixId = req.params.orderPrefixId;
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
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
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            res.render('pages/paypal/process', {
                title: 'Paypal',
                orderId,
                layout: 'pages/layouts/auth',
            });
        });
    }
    proceed(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.orderId;
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const paypalOrderRepository = (0, typeorm_1.getManager)().getRepository(PaypalOrder_1.PaypalOrder);
            const orderProductRepository = (0, typeorm_1.getManager)().getRepository(OrderProduct_1.OrderProduct);
            const productRepository = (0, typeorm_1.getManager)().getRepository(ProductModel_1.Product);
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
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
            paypal.payment.create(create_payment_json, (error, payment) => {
                if (error) {
                    throw error;
                }
                else {
                    const paypalParams = new PaypalOrder_1.PaypalOrder();
                    paypalParams.orderId = orderDetail.orderId;
                    paypalParams.paypalRefId = payment.id;
                    paypalParams.total = orderAmount.toString();
                    paypalParams.status = 0;
                    paypalOrderRepository.save(paypalParams).then((val) => {
                        // ---
                        for (const item of payment.links) {
                            // Redirect user to this endpoint for redirect url
                            if (item.rel === 'approval_url') {
                                res.redirect(item.href);
                            }
                        }
                    }).catch((err) => {
                        throw err;
                    });
                }
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
            const paymentRepository = (0, typeorm_1.getManager)().getRepository(Payment_1.Payment);
            const paymentItemsRepository = (0, typeorm_1.getManager)().getRepository(PaymentItems_1.PaymentItems);
            const vendorPaymentRepository = (0, typeorm_1.getManager)().getRepository(VendorPayment_1.VendorPayment);
            const VendorProductsRepository = (0, typeorm_1.getManager)().getRepository(VendorProducts_1.VendorProducts);
            const VendorRepository = (0, typeorm_1.getManager)().getRepository(Vendor_1.Vendor);
            const VendorGroupRepository = (0, typeorm_1.getManager)().getRepository(VendorGroup_1.VendorGroup);
            const VendorOrdersRepository = (0, typeorm_1.getManager)().getRepository(VendorOrders_1.VendorOrders);
            const VendorGlobalSettingRepository = (0, typeorm_1.getManager)().getRepository(VendorGlobalSettings_1.VendorGlobalSetting);
            const VendorInvoiceRepository = (0, typeorm_1.getManager)().getRepository(VendorInvoice_1.VendorInvoice);
            const VendorInvoiceItemRepository = (0, typeorm_1.getManager)().getRepository(VendorInvoiceItem_1.VendorInvoiceItem);
            const CustomerRepository = (0, typeorm_1.getManager)().getRepository(Customer_1.Customer);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const config = {
                mode: paypalAdditionalInfo.isTest ? 'sandbox' : 'live',
                client_id: paypalAdditionalInfo.clientId,
                client_secret: paypalAdditionalInfo.clientSecret,
            };
            const paymentDetails = yield PaypalController.payPalSuccess(config, req.query.PayerID, req.query.paymentId);
            const paypalOrderRepository = (0, typeorm_1.getManager)().getRepository(PaypalOrder_1.PaypalOrder);
            const paypalOrderTransactionRepository = (0, typeorm_1.getManager)().getRepository(PaypalOrderTransaction_1.PaypalOrderTransaction);
            const paypalDetail = yield paypalOrderRepository.findOne({
                where: {
                    paypalRefId: paymentDetails.id,
                },
            });
            if (!paypalDetail) {
                req.flash('errors', ['Invalid Payment Details']);
                return res.redirect('error');
            }
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(paypalDetail.orderId);
            if (!orderData) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const setting = yield settingRepository.findOne();
            const currencySymbol = yield currencyRepository.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
            const orderStatus = yield orderRepository.findOne({ where: { orderId: paypalDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                req.flash('errors', ['Already Paid for this Order']);
                return res.redirect('error');
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
                const paymentParams = new Payment_1.Payment();
                paymentParams.orderId = paypalDetail.orderId;
                const date = new Date();
                paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                paymentParams.paymentNumber = paymentDetails.id;
                paymentParams.paymentAmount = orderData.total;
                paymentParams.paymentInformation = JSON.stringify(paymentDetails);
                const payments = yield paymentRepository.save(paymentParams);
                const productDetailData = [];
                let i;
                const orderProduct = yield orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'basePrice'] });
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
                    const productInformation = yield orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'discountAmount', 'discountedAmount', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId', 'couponDiscountAmount'] });
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
                mailContents.redirectUrl = storeRedirectUrl;
                mailContents.today = today;
                mail_services_1.MAILService.sendMail(mailContents, orderData, emailContent.subject, false, false, '');
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
            res.render('pages/paypal/success', {
                title: 'Paypal',
                storeUrl: env_1.env.storeUrl,
                layout: 'pages/layouts/auth',
            });
        });
    }
    cancel(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/paypal/cancel', {
                title: 'Paypal',
                layout: 'pages/layouts/auth',
            });
        });
    }
}
exports.PaypalController = PaypalController;
//# sourceMappingURL=PaypalController.js.map