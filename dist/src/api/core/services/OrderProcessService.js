"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProcessService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Currency_1 = require("../models/Currency");
const EmailTemplate_1 = require("../models/EmailTemplate");
const Order_1 = require("../models/Order");
const OrderProduct_1 = require("../models/OrderProduct");
const PaymentItems_1 = require("../models/PaymentItems");
const ProductModel_1 = require("../models/ProductModel");
const CustomerCart_1 = require("../models/CustomerCart");
const Setting_1 = require("../models/Setting");
const User_1 = require("../models/User");
const Payment_1 = require("../models/Payment");
const ProductImage_1 = require("../models/ProductImage");
const env_1 = require("../../../../src/env");
const moment_1 = tslib_1.__importDefault(require("moment"));
const mail_services_1 = require("../../../auth/mail.services");
class OrderProcessService {
    constructor() {
        // -----
    }
    // create order
    processOrder(orderId, transactionsParams) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const EmailTemplateRepository = (0, typeorm_1.getManager)().getRepository(EmailTemplate_1.EmailTemplate);
            const orderProductRepository = (0, typeorm_1.getManager)().getRepository(OrderProduct_1.OrderProduct);
            const productImageRepository = (0, typeorm_1.getManager)().getRepository(ProductImage_1.ProductImage);
            const productRepository = (0, typeorm_1.getManager)().getRepository(ProductModel_1.Product);
            const settingRepository = (0, typeorm_1.getManager)().getRepository(Setting_1.Settings);
            const currencyRepository = (0, typeorm_1.getManager)().getRepository(Currency_1.Currency);
            const userRepository = (0, typeorm_1.getManager)().getRepository(User_1.User);
            const paymentRepository = (0, typeorm_1.getManager)().getRepository(Payment_1.Payment);
            const paymentItemsRepository = (0, typeorm_1.getManager)().getRepository(PaymentItems_1.PaymentItems);
            const CustomerCartRepository = (0, typeorm_1.getManager)().getRepository(CustomerCart_1.CustomerCart);
            const orderRepository = (0, typeorm_1.getManager)().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(orderId);
            if (!orderData) {
                return {
                    status: 1,
                    message: 'Invalid Order Id',
                };
            }
            const setting = yield settingRepository.findOne();
            const currencySymbol = yield currencyRepository.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
            const paymentParams = new Payment_1.Payment();
            paymentParams.orderId = orderId;
            const date = new Date();
            paymentParams.paidDate = (0, moment_1.default)(date).format('YYYY-MM-DD HH:mm:ss');
            paymentParams.paymentNumber = transactionsParams.id;
            paymentParams.paymentAmount = orderData.total;
            paymentParams.paymentInformation = JSON.stringify(transactionsParams);
            const payments = yield paymentRepository.save(paymentParams);
            const productDetailData = [];
            let i;
            const orderProduct = yield orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice'] });
            for (i = 0; i < orderProduct.length; i++) {
                const paymentItems = new PaymentItems_1.PaymentItems();
                paymentItems.paymentId = payments.paymentId;
                paymentItems.orderProductId = orderProduct[i].orderProductId;
                paymentItems.totalAmount = orderProduct[i].total;
                paymentItems.productName = orderProduct[i].name;
                paymentItems.productQuantity = orderProduct[i].quantity;
                paymentItems.productPrice = orderProduct[i].productPrice;
                yield paymentItemsRepository.save(paymentItems);
                const productInformation = yield orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                const productImageData = yield productRepository.findOne(productInformation.productId);
                let productImageDetail;
                productImageDetail = yield productImageRepository.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                productDetailData.push(productImageData);
                const cart = yield CustomerCartRepository.findOne({ where: { productId: orderProduct[i].productId, customerId: orderData.customerId } });
                if (cart !== undefined) {
                    yield CustomerCartRepository.delete(cart.id);
                }
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
            const adminRedirectUrl = env_1.env.adminRedirectUrl;
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = adminMessage;
            mailContents.redirectUrl = adminRedirectUrl;
            mailContents.productDetailData = productDetailData;
            mailContents.today = today;
            mailContents.orderData = orderData;
            mail_services_1.MAILService.sendMail(mailContents, adminId, adminEmailContent.subject, false, false, '');
            const storeRedirectUrl = env_1.env.storeRedirectUrl;
            const storeMailContents = {};
            storeMailContents.logo = logo;
            storeMailContents.emailContent = customerMessage;
            storeMailContents.productDetailData = productDetailData;
            storeMailContents.today = today;
            storeMailContents.redirectUrl = storeRedirectUrl;
            storeMailContents.orderData = orderData;
            mail_services_1.MAILService.sendMail(storeMailContents, orderData.email, emailContent.subject, false, false, '');
            return {
                status: 1,
                message: 'Success',
            };
        });
    }
}
exports.OrderProcessService = OrderProcessService;
//# sourceMappingURL=OrderProcessService.js.map