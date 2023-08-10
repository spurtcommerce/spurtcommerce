/*
 * spurtcommerce API
 * version 4.8.2
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
        const orderProduct = await orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice'] });
        for (i = 0; i < orderProduct.length; i++) {
            const paymentItems = new PaymentItems();
            paymentItems.paymentId = payments.paymentId;
            paymentItems.orderProductId = orderProduct[i].orderProductId;
            paymentItems.totalAmount = orderProduct[i].total;
            paymentItems.productName = orderProduct[i].name;
            paymentItems.productQuantity = orderProduct[i].quantity;
            paymentItems.productPrice = orderProduct[i].productPrice;
            await paymentItemsRepository.save(paymentItems);
            const productInformation = await orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
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
