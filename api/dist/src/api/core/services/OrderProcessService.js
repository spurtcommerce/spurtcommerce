"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
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
const VendorPayment_1 = require("../models/VendorPayment");
const VendorProducts_1 = require("../models/VendorProducts");
const Vendor_1 = require("../models/Vendor");
const VendorGlobalSettings_1 = require("../models/VendorGlobalSettings");
const VendorOrders_1 = require("../models/VendorOrders");
const VendorInvoice_1 = require("../models/VendorInvoice");
const VendorInvoiceItem_1 = require("../models/VendorInvoiceItem");
const Customer_1 = require("../models/Customer");
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
            const vendorPaymentRepository = (0, typeorm_1.getManager)().getRepository(VendorPayment_1.VendorPayment);
            const VendorProductsRepository = (0, typeorm_1.getManager)().getRepository(VendorProducts_1.VendorProducts);
            const VendorRepository = (0, typeorm_1.getManager)().getRepository(Vendor_1.Vendor);
            const VendorGlobalSettingRepository = (0, typeorm_1.getManager)().getRepository(VendorGlobalSettings_1.VendorGlobalSetting);
            const VendorOrdersRepository = (0, typeorm_1.getManager)().getRepository(VendorOrders_1.VendorOrders);
            const VendorInvoiceRepository = (0, typeorm_1.getManager)().getRepository(VendorInvoice_1.VendorInvoice);
            const VendorInvoiceItemRepository = (0, typeorm_1.getManager)().getRepository(VendorInvoiceItem_1.VendorInvoiceItem);
            const CustomerRepository = (0, typeorm_1.getManager)().getRepository(Customer_1.Customer);
            // ----
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
                    const vendorOrders = yield VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                    const vendorPayments = new VendorPayment_1.VendorPayment();
                    vendorPayments.vendorId = vendorProduct.vendorId;
                    vendorPayments.paymentItemId = payItem.paymentItemId;
                    vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                    vendorPayments.amount = orderProduct[i].total;
                    if (vendorProduct.vendorProductCommission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                    }
                    else if (vendor.commission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (vendor.commission / 100);
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
                    const vendorMailContent = {};
                    vendorMailContent.logo = logo;
                    vendorMailContent.emailContent = vendorMessage;
                    vendorMailContent.redirectUrl = vendorRedirectUrl;
                    vendorMailContent.productDetailData = vendorProductDetailData;
                    vendorMailContent.today = today;
                    vendorMailContent.orderData = orderData;
                    mail_services_1.MAILService.sendMail(vendorMailContent, customer.email, adminEmailContent.subject, false, false, '');
                }
            }
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