/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { getManager } from 'typeorm';

import { Currency } from '../models/Currency';
import { EmailTemplate } from '../models/EmailTemplate';
import { Order } from '../models/Order';
import { OrderProduct } from '../models/OrderProduct';
import { PaymentItems } from '../models/PaymentItems';
import { Product } from '../models/ProductModel';
import { CustomerCart } from '../models/CustomerCart';
import { Settings } from '../models/Setting';
import { User } from '../models/User';
import { Payment as Payments } from '../models/Payment';
import { ProductImage } from '../models/ProductImage';
import { env } from '../../../../src/env';
import moment from 'moment';
import { MAILService } from '../../../auth/mail.services';
import { VendorPayment } from '../models/VendorPayment';
import { VendorProducts } from '../models/VendorProducts';
import { Vendor } from '../models/Vendor';
import { VendorGlobalSetting } from '../models/VendorGlobalSettings';
import { VendorOrders } from '../models/VendorOrders';
import { VendorInvoice } from '../models/VendorInvoice';
import { VendorInvoiceItem } from '../models/VendorInvoiceItem';
import { Customer } from '../models/Customer';

export class OrderProcessService {

    constructor() {
        // -----
    }

    // create order
    public async processOrder(orderId: number, transactionsParams: any): Promise<any> {

        const EmailTemplateRepository = getManager().getRepository(EmailTemplate);
        const orderProductRepository = getManager().getRepository(OrderProduct);
        const productImageRepository = getManager().getRepository(ProductImage);
        const productRepository = getManager().getRepository(Product);
        const settingRepository = getManager().getRepository(Settings);
        const currencyRepository = getManager().getRepository(Currency);
        const userRepository = getManager().getRepository(User);
        const paymentRepository = getManager().getRepository(Payments);
        const paymentItemsRepository = getManager().getRepository(PaymentItems);
        const CustomerCartRepository = getManager().getRepository(CustomerCart);
        const vendorPaymentRepository = getManager().getRepository(VendorPayment);
        const VendorProductsRepository = getManager().getRepository(VendorProducts);
        const VendorRepository = getManager().getRepository(Vendor);
        const VendorGlobalSettingRepository = getManager().getRepository(VendorGlobalSetting);
        const VendorOrdersRepository = getManager().getRepository(VendorOrders);
        const VendorInvoiceRepository = getManager().getRepository(VendorInvoice);
        const VendorInvoiceItemRepository = getManager().getRepository(VendorInvoiceItem);
        const CustomerRepository = getManager().getRepository(Customer);
        // ----
        const orderRepository = getManager().getRepository(Order);
        const orderData: any = await orderRepository.findOne(orderId);
        if (!orderData) {
            return {
                status: 1,
                message: 'Invalid Order Id',
            };
        }
        const setting = await settingRepository.findOne();
        const currencySymbol = await currencyRepository.findOne(setting.storeCurrencyId);
        orderData.currencyRight = currencySymbol.symbolRight;
        orderData.currencyLeft = currencySymbol.symbolLeft;

        const paymentParams = new Payments();
        paymentParams.orderId = orderId;
        const date = new Date();
        paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        paymentParams.paymentNumber = transactionsParams.id;
        paymentParams.paymentAmount = orderData.total;
        paymentParams.paymentInformation = JSON.stringify(transactionsParams);
        const payments = await paymentRepository.save(paymentParams);
        const productDetailData = [];
        let i;
        const orderProduct = await orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'basePrice'] });
        for (i = 0; i < orderProduct.length; i++) {
            const paymentItems = new PaymentItems();
            paymentItems.paymentId = payments.paymentId;
            paymentItems.orderProductId = orderProduct[i].orderProductId;
            paymentItems.totalAmount = orderProduct[i].total;
            paymentItems.productName = orderProduct[i].name;
            paymentItems.productQuantity = orderProduct[i].quantity;
            paymentItems.productPrice = orderProduct[i].productPrice;
            const payItem = await paymentItemsRepository.save(paymentItems);
            const vendorProduct = await VendorProductsRepository.findOne({ where: { productId: orderProduct[i].productId } });
            if (vendorProduct) {
                const vendor = await VendorRepository.findOne({ where: { vendorId: vendorProduct.vendorId } });
                const vendorOrders = await VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                const vendorPayments = new VendorPayment();
                vendorPayments.vendorId = vendorProduct.vendorId;
                vendorPayments.paymentItemId = payItem.paymentItemId;
                vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                vendorPayments.amount = orderProduct[i].total;
                if (vendorProduct.vendorProductCommission > 0) {
                    vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                } else if (vendor.commission > 0) {
                    vendorPayments.commissionAmount = vendorPayments.amount * (vendor.commission / 100);
                } else {
                    const defaultCommission = await VendorGlobalSettingRepository.findOne();
                    const defCommission = defaultCommission.defaultCommission;
                    vendorPayments.commissionAmount = vendorPayments.amount * (defCommission / 100);
                }
                await vendorPaymentRepository.save(vendorPayments);
            }
            const productInformation = await orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'discountAmount', 'discountedAmount', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId', 'couponDiscountAmount'] });
            const productImageData: any = await productRepository.findOne(productInformation.productId);
            let productImageDetail;
                productImageDetail = await productImageRepository.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            productDetailData.push(productImageData);
            const cart = await CustomerCartRepository.findOne({ where: { productId: orderProduct[i].productId, customerId: orderData.customerId } });
            if (cart !== undefined) {
                await CustomerCartRepository.delete(cart.id);
            }
        }
        const emailContent = await EmailTemplateRepository.findOne(5);
        const adminEmailContent = await EmailTemplateRepository.findOne(6);
        const nowDate = new Date();
        const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
        const customerFirstName = orderData.shippingFirstname;
        const customerLastName = orderData.shippingLastname;
        const customerName = customerFirstName + ' ' + customerLastName;
        const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
        const customerMessage = emailContent.content.replace('{name}', customerName);
        const adminId: any = [];
        const adminUser = await userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
        for (const user of adminUser) {
            const val = user.username;
            adminId.push(val);
        }
        const logo = await settingRepository.findOne();
        const vendorInvoice = await VendorInvoiceRepository.find({ where: { orderId: orderData.orderId } });
        if (vendorInvoice.length > 0) {
            for (const vendInvoice of vendorInvoice) {
                const vendorProductDetailData = [];
                const vendor = await VendorRepository.findOne({ where: { vendorId: vendInvoice.vendorId } });
                const customer = await CustomerRepository.findOne({ where: { id: vendor.customerId } });
                const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const vendorInvoiceItem = await VendorInvoiceItemRepository.find({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                for (const vendInvoiceItem of vendorInvoiceItem) {
                    const vendorProductInformation = await orderProductRepository.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                    const vendorProductImageData: any = await productRepository.findOne(vendorProductInformation.productId);
                    let vendorProductImageDetail;
                        vendorProductImageDetail = await productImageRepository.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                    vendorProductImageData.productInformationData = vendorProductInformation;
                    vendorProductImageData.productImage = vendorProductImageDetail;
                    vendorProductDetailData.push(vendorProductImageData);

                }
                const vendorRedirectUrl = env.vendorRedirectUrl;
                const vendorMailContent: any = {};
                vendorMailContent.logo = logo;
                vendorMailContent.emailContent = vendorMessage;
                vendorMailContent.redirectUrl = vendorRedirectUrl;
                vendorMailContent.productDetailData = vendorProductDetailData;
                vendorMailContent.today = today;
                vendorMailContent.orderData = orderData;
                MAILService.sendMail(vendorMailContent, customer.email, adminEmailContent.subject, false, false, '');
            }
        }
        const adminRedirectUrl = env.adminRedirectUrl;
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = adminMessage;
        mailContents.redirectUrl = adminRedirectUrl;
        mailContents.productDetailData = productDetailData;
        mailContents.today = today;
        mailContents.orderData = orderData;
        MAILService.sendMail(mailContents, adminId, adminEmailContent.subject, false, false, '');
        const storeRedirectUrl = env.storeRedirectUrl;
        const storeMailContents: any = {};
        storeMailContents.logo = logo;
        storeMailContents.emailContent = customerMessage;
        storeMailContents.productDetailData = productDetailData;
        storeMailContents.today = today;
        storeMailContents.redirectUrl = storeRedirectUrl;
        storeMailContents.orderData = orderData;
        MAILService.sendMail(storeMailContents, orderData.email, emailContent.subject, false, false, '');
        return {
            status: 1,
            message: 'Success',
        };
    }
}
