/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, JsonController, Req, Res, Get, QueryParam, Body, UseBefore, Put, Param, Authorized } from 'routing-controllers';
import { CheckTokenMiddlewares } from '../../core/middlewares/checkTokenMiddleware';
import { instanceToPlain } from 'class-transformer';
import { CustomerCheckoutRequest } from './requests/CustomerCheckoutRequest';
import { OrderCancelRequest } from './requests/OrderCancelRequest';
import { OrderService } from '../../core/services/OrderService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { OrderTotalService } from '../../core/services/OrderTotalService';
import { Order } from '../../core/models/Order';
import { OrderProduct } from '../../core/models/OrderProduct';
import { OrderTotal } from '../../core/models/OrderTotal';
import { CustomerService } from '../../core/services/CustomerService';
import { MAILService } from '../../../auth/mail.services';
import { ProductService } from '../../core/services/ProductService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { UserService } from '../../core/services/UserService';
import { Customer } from '../../core/models/Customer';
import { VendorOrders } from '../../core/models/VendorOrders';
import { VendorService } from '../../core/services/VendorService';
import { env } from '../../../env';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { OrderLogService } from '../../core/services/OrderLogService';
import { pluginModule } from '../../../loaders/pluginLoader';
import { VendorOrderLogService } from '../../core/services/VendorOrderLogService';
import { VendorOrderLog } from '../../core/models/VendorOrderLog';
import { VendorGlobalSettingService } from '../../core/services/VendorGlobalSettingService';
import { PdfService } from '../../core/services/PdfService';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { OrderProductLogService } from '../../core/services/OrderProductLogService';
import { CustomerCartService } from '../../core/services/CustomerCartService';
import { OrderCancelReasonService } from '../../core/services/OrderCancelReasonService';
import moment = require('moment');
import { ProductTirePriceService } from '../../core/services/ProductTirePriceService';
import { ProductSpecialService } from '../../core/services/ProductSpecialService';
import { ProductDiscountService } from '../../core/services/ProductDiscountService';
import { VendorInvoiceItemService } from '../../core/services/VendorInvoiceItemService';
import { VendorInvoiceService } from '../../core/services/VendorInvoiceService';
import { VendorInvoice } from '../../core/models/VendorInvoice';
import { VendorInvoiceItem } from '../../core/models/VendorInvoiceItem';
import { SkuService } from '../../core/services/SkuService';
import { CustomerBackorderRequest } from './requests/CustomerBackorderRequest';
import { CheckCustomerMiddleware, CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import * as fs from 'fs';
import { TranslationMiddleware } from '../../core/middlewares/TranslationMiddleware';
import { VendorGroupService } from '../../core/services/VendorGroupService';
import { TenantValidationMiddleware } from '../../core/middlewares/TenantValidationMiddleware';
import { ProductStockAlertService } from '../../core/services/ProductStockAlertService';
import { StockLogService } from '../../core/services/StockLogService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { VendorCountryService } from '../../core/services/VendorCountryService';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { PaymentRuleService } from '../../core/services/PaymentRuleService';
import { ZoneService } from '../../core/services/zoneService';
import { CurrencyService } from '../../core/services/CurrencyService';
import { Service } from 'typedi';
import { SettingService } from '../../core/services/SettingService';
import { CountryService } from '../../core/services/CountryService';
import { PluginService } from '../../core/services/PluginService';
import { TaxService } from '../../core/services/TaxService';
import { AddressService } from '../../core/services/AddressService';
import { StoreCategoryValidator } from '../../core/middlewares/StoreCategoryValidator';

interface CustomerCartCondition {
    productId: number;
    customerId: number;
    ip?: string;
}

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/orders')
export class CustomerOrderController {
    constructor(
        private orderService: OrderService,
        private orderProductService: OrderProductService,
        private orderTotalService: OrderTotalService,
        private vendorService: VendorService,
        private vendorGlobalSettingService: VendorGlobalSettingService,
        private customerService: CustomerService,
        private productService: ProductService,
        private productImageService: ProductImageService,
        private emailTemplateService: EmailTemplateService,
        private vendorProductService: VendorProductService,
        private orderLogService: OrderLogService,
        private vendorOrderService: VendorOrdersService,
        private userService: UserService,
        private vendorOrderLogService: VendorOrderLogService,
        private pdfService: PdfService,
        private zoneService: ZoneService,
        private s3Service: S3Service,
        private vendorGroupService: VendorGroupService,
        private orderStatusService: OrderStatusService,
        private orderProductLogService: OrderProductLogService,
        private customerCartService: CustomerCartService,
        private orderCancelReasonService: OrderCancelReasonService,
        private productTirePriceService: ProductTirePriceService,
        private productSpecialService: ProductSpecialService,
        private productDiscountService: ProductDiscountService,
        private vendorInvoiceService: VendorInvoiceService,
        private vendorInvoiceItemService: VendorInvoiceItemService,
        private imageService: ImageService,
        private skuService: SkuService,
        private productStockAlertService: ProductStockAlertService,
        private stockLogService: StockLogService,
        private vendorSettingsService: VendorSettingsService,
        private vendorCountryService: VendorCountryService,
        private currencyService: CurrencyService,
        private vendorPluginService: VendorPluginService,
        private vendorUsersService: VendorUsersService,
        private paymentRuleService: PaymentRuleService,
        private settingService: SettingService,
        private countryService: CountryService,
        private pluginService: PluginService,
        private taxService: TaxService,
        private addressService: AddressService
    ) {
        // --
    }

    // customer checkout
    /**
     * @api {post} /api/orders/customer-checkout Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {Number} paymentMethod paymentMethod
     * @apiParam (Request body) {String{1..32}} shippingFirstName Shipping First name
     * @apiParam (Request body) {String{..32}} [shippingLastName] Shipping Last Name
     * @apiParam (Request body) {String{..32}} [shippingCompany] Shipping Company
     * @apiParam (Request body) {String{..128}} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String{..128}} [shippingAddress_2] Shipping Address 2
     * @apiParam (Request body) {String{..128}} shippingCity Shipping City
     * @apiParam (Request body) {Number{..10}} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountryId ShippingCountryId
     * @apiParam (Request body) {String{..128}} shippingZone Shipping Zone
     * @apiParam (Request body) {String} [shippingAddressFormat] Shipping Address Format
     * @apiParam (Request body) {String{..32}} [paymentFirstName] Payment First name
     * @apiParam (Request body) {String{..32}} [PaymentLastName] Payment Last Name
     * @apiParam (Request body) {String{..32}} [PaymentCompany] Payment Company
     * @apiParam (Request body) {String{..128}} [paymentAddress_1] Payment Address 1
     * @apiParam (Request body) {String{..128}} [paymentAddress_2] Payment Address 2
     * @apiParam (Request body) {String{..10}} [paymentCity] Payment City
     * @apiParam (Request body) {Number{..10}} [paymentPostCode] Payment PostCode
     * @apiParam (Request body) {String} [paymentCountryId] PaymentCountryId
     * @apiParam (Request body) {String{..128}} [paymentZone] Payment Zone
     * @apiParam (Request body) {String{..15}} phoneNumber Customer Phone Number
     * @apiParam (Request body) {String{..96}} emailId Customer Email Id
     * @apiParam (Request body) {String} [password] Customer password
     * @apiParam (Request body) {String{..255}} [couponCode] couponCode
     * @apiParam (Request body) {Number} [couponDiscountAmount] couponDiscountAmount
     * @apiParam (Request body) {String} [couponData]
     * @apiParam (Request body) {String} [gstNo] gstNo
     * @apiParamExample {json} Input
     * {
     *      "productDetails" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      "skuName" : "",
     *      "vendorId" : "",
     *      "skuId":""
     *      }],
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountryId" : "",
     *      "shippingZone" : "",
     *      "paymentFirstName" : "",
     *      "paymentLastName" : "",
     *      "paymentRuleId": "",
     *      "paymentCompany" : "",
     *      "paymentAddress_1" : "",
     *      "paymentAddress_2" : "",
     *      "paymentCity" : "",
     *      "paymentPostCode" : "",
     *      "paymentCountryId" : "",
     *      "paymentZone" : "",
     *      "shippingAddressFormat" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "paymentMethod" : "",
     *      "vendorId" : "",
     *      "couponCode" : "",
     *      "couponDiscountAmount" : "",
     *      "couponData" : "",
     *      "orderSource":"",
     *      "quoteRequestId":"",
     *      "quoteId":""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1".
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "orderId": "",
     *              "customerId": "",
     *              "currencyId": "",
     *              "shippingZoneId": "",
     *              "paymentZoneId": "",
     *              "shippingCountryId": "",
     *              "paymentCountryId": "",
     *              "invoiceNo": "",
     *              "invoicePrefix": "",
     *              "firstname": "",
     *              "lastname": "",
     *              "email": "",
     *              "telephone": "",
     *              "fax": "",
     *              "shippingFirstname": "",
     *              "shippingLastname": "",
     *              "shippingCompany": "",
     *              "shippingAddress1": "",
     *              "shippingAddress2": "",
     *              "shippingCity": "",
     *              "shippingPostcode": "",
     *              "shippingCountry": "",
     *              "shippingZone": "",
     *              "shippingAddressFormat": "",
     *              "shippingMethod": "",
     *              "paymentFirstname": "",
     *              "paymentLastname": "",
     *              "paymentCompany": "",
     *              "paymentAddress1": "",
     *              "paymentAddress2": "",
     *              "paymentCity": "",
     *              "paymentPostcode": "",
     *              "paymentCountry": ,
     *              "paymentZone": "",
     *              "paymentAddressFormat": "",
     *              "paymentMethod": "",
     *              "comment": "",
     *              "couponCode": "",
     *              "discountAmount": "",
     *              "amount": "",
     *              "total": "",
     *              "reward": "",
     *              "orderStatusId": "",
     *              "orderPrefixId": "",
     *              "affiliateId": "",
     *              "commision": "",
     *              "currencyCode": "",
     *              "currencyValue": "",
     *              "currencySymbolLeft": "",
     *              "currencySymbolRight": "",
     *              "ip": "",
     *              "paymentFlag": "",
     *              "paymentStatus": "",
     *              "trackingUrl": "",
     *              "trackingNo": "",
     *              "orderName": "",
     *              "paymentType": "",
     *              "paymentProcess": "",
     *              "paymentDetails": "",
     *              "backOrders": "",
     *              "isActive": "",
     *              "customerGstNo": "",
     *              "productDetail": [
     *                {
     *                    "createdBy": "",
     *                    "createdDate": "",
     *                    "modifiedBy": "",
     *                    "modifiedDate": "",
     *                    "orderProductId": "",
     *                    "productId": "",
     *                    "orderProductPrefixId": "",
     *                    "orderId": "",
     *                    "name": "",
     *                    "model": "",
     *                    "quantity": ,
     *                    "productPrice": "",
     *                    "discountAmount": "",
     *                    "basePrice": "",
     *                    "taxType": "",
     *                    "taxValue": "",
     *                    "total": "",
     *                    "discountedAmount": "",
     *                    "orderStatusId": "",
     *                    "cancelRequestStatus": "",
     *                    "cancelReason": "",
     *                    "cancelReasonDescription": "",
     *                    "isActive": "",
     *                    "skuName": "",
     *                    "couponDiscountAmount": "",
     *                    "image": {
     *                        "createdBy": "",
     *                        "createdDate": "",
     *                        "modifiedBy": "",
     *                        "modifiedDate": "",
     *                        "productImageId": "",
     *                        "productId": "",
     *                        "image": "",
     *                        "containerName": "",
     *                        "sortOrder": "",
     *                        "defaultImage": "",
     *                        "isActive":""
     *                    }
     *                  }]
     *                }
     *  }
     * @apiSampleRequest /api/orders/customer-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */

    // Customer Checkout Function
    @UseBefore(CheckTokenMiddlewares)
    @UseBefore(StoreCategoryValidator)
    @Post('/customer-checkout')
    public async customerCheckout(@Body({ validate: true }) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {

        console.log('Before orderCreate');
        const currencyCode = request.headers['x-currency'] || 'INR';
        const orderResponse = await this.createOrder({
            checkoutPayload: checkoutParam,
            pluginModule,
            ipAddress: (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0],
            customerId: request.user?.customerId ?? 0,
            tenantId: request.tenantId,
            storeRedirectUrl: env.storeRedirectUrl,
            adminRedirectUrl: env.adminRedirectUrl,
            vendorRedirectUrl: env.vendorRedirectUrl,
            baseUrl: env.baseUrl,
            dirName: __dirname,
            siteId: request.store.Id,
            currencyCode,
            isShoppingCart: checkoutParam.isShoppingCart ?? false,
        });
        if (orderResponse.status && orderResponse.data.order) {
            const emailPayload = orderResponse.data.email;

            if (Object.keys(emailPayload.newCustomerMail).length) {
                const customerNew = emailPayload.newCustomerMail;
                MAILService.sendMail(
                    customerNew.mailContent,
                    customerNew.email,
                    customerNew.subject,
                    customerNew.bcc,
                    customerNew.isAttachment,
                    customerNew.attachmentDetails
                );
            }
            if (emailPayload?.stockNotifyMails) {
                if (Object.keys(emailPayload.stockNotifyMails).length) {
                    const notifyProduct = emailPayload.stockNotifyMails;
                    const mailContent = notifyProduct.vendorEmailContents;
                    mailContent.templateName = 'emailTemplates.ejs';
                    mailContent.productInfo = [];
                    MAILService.sendMail(
                        mailContent,
                        notifyProduct.vendorEmail,
                        notifyProduct.subject,
                        notifyProduct.bcc,
                        notifyProduct.isAttachment,
                        notifyProduct.attachmentDetails
                    );
                }
            }

            const adminEmail = emailPayload.codAdminMail;
            adminEmail.adminMailContents.templateName = 'invoice-order';
            MAILService.sendMail(adminEmail.adminMailContents, adminEmail.adminId, adminEmail.subject, adminEmail.bcc, adminEmail.isAttachment, adminEmail.attachmentDetails);

            if (emailPayload.codVendorMails.length) {
                for (const codVendorMail of emailPayload.codVendorMails) {
                    const vendorMail = codVendorMail;
                    vendorMail.vendorEmailContents.templateName = 'invoice-order';
                    MAILService.sendMail(vendorMail.vendorEmailContents, vendorMail.vendorEmail, vendorMail.subject, vendorMail.bcc, vendorMail.isAttachment, vendorMail.attachmentDetails);
                }
            }

            const customerEmail = emailPayload.codCustomerMail;
            customerEmail.storeMailContents.templateName = 'invoice-order';
            MAILService.sendMail(customerEmail.storeMailContents, customerEmail.email, customerEmail.subject, customerEmail.bcc, customerEmail.isAttachment, customerEmail.attachmentDetails);
        }

        return response.status(orderResponse.status ? 200 : 400).send({
            status: orderResponse.status,
            message: orderResponse.message,
            data: orderResponse.status ? (orderResponse.status === 1 ? orderResponse.data.order : orderResponse.data.route) : undefined,
        });
    }

    // customer  Back Order
    /**
     * @api {post} /api/orders/back-order-checkout Back Order Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {Number} [paymentMethod] paymentMethod
     * @apiParam (Request body) {String{1..32}} shippingFirstName Shipping First name
     * @apiParam (Request body) {String{..32}} shippingLastName Shipping Last Name
     * @apiParam (Request body) {String} shippingCompany Shipping Company
     * @apiParam (Request body) {String{..128}} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String{..128}} [shippingAddress_2] Shipping Address 2
     * @apiParam (Request body) {String{..128}} shippingCity Shipping City
     * @apiParam (Request body) {Number{..10}} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountryId ShippingCountryId
     * @apiParam (Request body) {String{..128}} shippingZone Shipping Zone
     * @apiParam (Request body) {String} shippingAddressFormat Shipping Address Format
     * @apiParam (Request body) {String} paymentFirstName Payment First name
     * @apiParam (Request body) {String} PaymentLastName Payment Last Name
     * @apiParam (Request body) {String} PaymentCompany Payment Company
     * @apiParam (Request body) {String} paymentAddress_1 Payment Address 1
     * @apiParam (Request body) {String} paymentAddress_2 Payment Address 2
     * @apiParam (Request body) {String} paymentCity Payment City
     * @apiParam (Request body) {Number} paymentPostCode Payment PostCode
     * @apiParam (Request body) {String} paymentCountryId PaymentCountryId
     * @apiParam (Request body) {String} paymentZone Payment Zone
     * @apiParam (Request body) {Number} phoneNumber Customer Phone Number
     * @apiParam (Request body) {String{..96}} emailId Customer Email Id
     * @apiParam (Request body) {String} password Customer password
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {Number} couponDiscountAmount couponDiscountAmount
     * @apiParam (Request body) {String} couponData
     * @apiParamExample {json} Input
     * {
     *      "productDetail" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      "skuName" : "",
     *      }],
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountryId" : "",
     *      "shippingZone" : "",
     *      "shippingAddressFormat" : "",
     *      "paymentFirstName" : "",
     *      "paymentLastName" : "",
     *      "paymentCompany" : "",
     *      "paymentAddress_1" : "",
     *      "paymentAddress_2" : "",
     *      "paymentCity" : "",
     *      "paymentPostCode" : "",
     *      "paymentCountryId" : "",
     *      "paymentZone" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "paymentMethod" : "",
     *      "vendorId" : "",
     *      "couponCode" : "",
     *      "couponDiscountAmount" : "",
     *      "couponData" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1"
     *      "data" : {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "orderId": "",
     *       "customerId": "",
     *       "currencyId": "",
     *       "shippingZoneId": "",
     *       "paymentZoneId": "",
     *       "shippingCountryId": "",
     *       "paymentCountryId": "",
     *       "invoiceNo": "",
     *       "invoicePrefix": "",
     *       "firstname": "",
     *       "lastname": "",
     *       "email": "",
     *       "telephone": "",
     *       "fax": "",
     *       "shippingFirstname": "",
     *       "shippingLastname": "",
     *       "shippingCompany": "",
     *       "shippingAddress1": "",
     *       "shippingAddress2": "",
     *       "shippingCity": "",
     *       "shippingPostcode": "",
     *       "shippingCountry": "",
     *       "shippingZone": "",
     *       "shippingAddressFormat": "",
     *       "shippingMethod": "",
     *       "paymentFirstname": "",
     *       "paymentLastname": "",
     *       "paymentCompany": "",
     *       "paymentAddress1": "",
     *       "paymentAddress2": "",
     *       "paymentCity": "",
     *       "paymentPostcode": "",
     *       "paymentCountry": "",
     *       "paymentZone": "",
     *       "paymentAddressFormat": "",
     *       "paymentMethod": "",
     *       "comment": "",
     *       "couponCode": "",
     *       "discountAmount": "",
     *       "amount": "",
     *       "total": "",
     *       "reward": "",
     *       "orderStatusId": "",
     *       "orderPrefixId": "",
     *       "affiliateId": "",
     *       "commision": "",
     *       "currencyCode": "",
     *       "currencyValue": "",
     *       "currencySymbolLeft": "",
     *       "currencySymbolRight": "",
     *       "ip": "",
     *       "paymentFlag": "",
     *       "paymentStatus": "",
     *       "trackingUrl": "",
     *       "trackingNo": "",
     *       "orderName": "",
     *       "paymentType": "",
     *       "paymentProcess": "",
     *       "paymentDetails": "",
     *       "backOrders": "",
     *       "isActive": "",
     *       "customerGstNo": "",
     *       "productDetail": [
     *       {
     *        "createdBy": "",
     *        "createdDate": "",
     *        "modifiedBy": "",
     *        "modifiedDate": "",
     *        "orderProductId": "",
     *        "productId": "",
     *        "orderProductPrefixId": "",
     *        "orderId": "",
     *        "name": "",
     *        "model": "",
     *        "quantity": "",
     *       "productPrice": "",
     *       "discountAmount": "",
     *       "basePrice": "",
     *       "taxType": "",
     *       "taxValue": "",
     *       "total": "",
     *       "discountedAmount": "",
     *       "orderStatusId": "",
     *       "trackingUrl": "",
     *       "trackingNo": "",
     *       "trace": "",
     *       "tax": "",
     *       "cancelRequest": "",
     *       "cancelRequestStatus": "",
     *       "cancelReason": "",
     *       "cancelReasonDescription": "",
     *       "isActive": "",
     *       "skuName": "",
     *       "couponDiscountAmount": "",
     *       "image": {
     *           "createdBy": "",
     *           "createdDate": "",
     *           "modifiedBy": "",
     *           "modifiedDate": "",
     *           "productImageId": "",
     *           "productId": "",
     *           "image": "",
     *           "containerName": "",
     *           "sortOrder": "",
     *           "defaultImage": "",
     *           "isActive": ""
     *       }
     *    }
     *   ]
     * }
     * }
     * @apiSampleRequest /api/orders/back-order-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Checkout Function
    @UseBefore(CheckTokenMiddleware)
    @Post('/back-order-checkout')
    public async backOrderCustomerCheckout(@Body({ validate: true }) checkoutParam: CustomerBackorderRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendorData = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
        const orderProducts: any = checkoutParam.productDetails;
        for (const val of orderProducts) {
            const product = await this.productService.findOne({ where: { productId: val.productId } });
            const sku = await this.skuService.findOne({ where: { skuName: val.skuName } });
            const orderProductForBackOrder = await this.orderProductService.listByQueryBuilder(
                0,
                0,
                [],
                [
                    { name: 'order.backOrders', op: 'where', value: 1 },
                    { name: 'OrderProduct.skuName', op: 'and', value: val.skuName },
                ],
                [],
                [{ tableName: 'OrderProduct.order', aliasName: 'order' }],
                [],
                [],
                false,
                false
            );
            const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            if (sku.backOrderStockLimit <= totalbackOrderQuantity) {
                const maxCart: any = {
                    status: 0,
                    message: 'Reached maximum Back order Limit',
                };
                return response.status(400).send(maxCart);
            }
            if (product.hasStock === 1) {
                if (!(sku.minQuantityAllowedCart <= +val.quantity)) {
                    const minCart: any = {
                        status: 0,
                        message: 'Quantity should greater than min Quantity.',
                    };
                    return response.status(400).send(minCart);
                } else if (!(sku.maxQuantityAllowedCart >= +val.quantity)) {
                    const maxCart: any = {
                        status: 0,
                        message: 'Reached maximum quantity limit',
                    };
                    return response.status(400).send(maxCart);
                }
            }
        }

        const vendorPluginData = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.tenantId,
                    plugins: {
                        id: checkoutParam.paymentMethod,
                    },
                },
                relations: ['plugins'],
            }
        );

        if (vendorPluginData === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Payment method is invalid',
            };
            return response.status(400).send(errorResponse);
        }
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        if (request.id) {
            let customerId;
            customerId = request.id;
            newOrder.customerId = customerId;
        } else {
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne({ where: { emailTemplateId: 1 } });
                    const message = emailContents.content.replace('{name}', resultDatas.firstName).replace('{siteName}', vendorSetting?.siteName ?? '');
                    const storeurl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
                    const mailContent: any = {};
                    mailContent.setting = { ...vendorSetting, ...vendorData };
                    mailContent.emailContent = message;
                    mailContent.redirectUrl = storeurl ?? '';
                    mailContent.productDetailData = undefined;
                    MAILService.sendMail(mailContent, resultDatas.email, emailContents.subject.replace('{siteName}', vendorSetting?.siteName ?? ''), false, false, '');
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, email already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.tenantId = request.tenantId;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingCountryId = checkoutParam.shippingCountryId;
        const vendorCountry = await this.vendorCountryService.findOne({
            where: {
                id: checkoutParam.shippingCountryId,
            },
            relations: ['country'],
        });
        if (vendorCountry) {
            newOrder.shippingCountry = vendorCountry?.country?.name;
        }
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentMethod = checkoutParam.paymentMethod;
        newOrder.isActive = 1;
        newOrder.backOrders = 1;
        const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        newOrder.orderStatusId = vendorSettings ? vendorSettings.orderStatus : 0;
        newOrder.invoicePrefix = vendorSettings ? vendorSettings.invoicePrefix : '';
        const vendorCurrency = await this.currencyService.findOne({ where: { currencyId: vendorSettings?.storeCurrencyId } });
        if (vendorCurrency) {
            newOrder.currencyCode = vendorCurrency?.code;
            newOrder.currencyValue = vendorCurrency?.value ?? 0;
            newOrder.currencySymbolLeft = vendorCurrency?.symbolLeft;
            newOrder.currencySymbolRight = vendorCurrency?.symbolRight;
            newOrder.currencyValue = vendorCurrency?.value;
        }
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        const orderExist = await this.orderService.create(newOrder);
        await this.orderLogService.create(orderExist);
        const vendorCurrencySymbol = await this.currencyService.findOne({ where: { currencyId: vendorSettings?.storeCurrencyId } });
        if (vendorCurrencySymbol) {
            orderExist.currencyRight = vendorCurrencySymbol?.symbolRight;
            orderExist.currencyLeft = vendorCurrencySymbol?.symbolLeft;
        }
        const nwDate = new Date();
        const orderDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
        orderProduct = checkoutParam.productDetails;
        let j = 1;
        for (i = 0; i < orderProduct.length; i++) {
            /// for find product price with tax , option price, special, discount and tire price /////
            let price: any;
            let taxType: any;
            let taxValue: any;
            let tirePrice: any;
            let priceWithTax: any;
            const productTire = await this.productService.findOne({ where: { productId: orderProduct[i].productId } });
            taxType = productTire.taxType;
            taxValue = productTire.taxValue;
            const sku = await this.skuService.findOne({ where: { skuName: orderProduct[i].skuName } });
            if (sku) {
                if (productTire.hasTirePrice === 1) {
                    const findWithQty = await this.productTirePriceService.findTirePrice(orderProduct[i].productId, sku.id, orderProduct[i].quantity);
                    if (findWithQty) {
                        tirePrice = findWithQty.price;
                    } else {
                        const dateNow = new Date();
                        const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                        const productDiscount = await this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                        if (productSpecial) {
                            tirePrice = productSpecial.price;
                        } else if (productDiscount) {
                            tirePrice = productDiscount.price;
                        } else {
                            tirePrice = sku.price;
                        }
                    }
                    if (taxType && taxType === 2) {
                        const percentVal = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +percentVal;
                    } else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +orderProduct[i].taxValue;
                    } else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                } else {
                    const dateNow = new Date();
                    const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                    if (productSpecial) {
                        tirePrice = productSpecial.price;
                    } else if (productDiscount) {
                        tirePrice = productDiscount.price;
                    } else {
                        tirePrice = sku.price;
                    }
                    if (taxType && taxType === 2) {
                        const perVal = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +perVal;
                    } else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +taxValue;
                    } else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                }
            } else {
                tirePrice = productTire.price;
                if (taxType && taxType === 2) {
                    const percentAmt = +tirePrice * (+taxValue / 100);
                    priceWithTax = +tirePrice + +percentAmt;
                } else if (taxType && taxType === 1) {
                    priceWithTax = +tirePrice + +taxValue;
                } else {
                    priceWithTax = +tirePrice;
                }
                price = priceWithTax;
            }
            const skuPrice = sku ? sku.price : productTire.price;
            ///// finding price from backend ends /////
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.orderProductPrefixId = orderExist.invoicePrefix.concat('-' + orderDate + orderExist.orderId) + j;
            productDetails.name = productTire.name;
            productDetails.orderId = orderExist.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = price;
            productDetails.basePrice = skuPrice;
            productDetails.discountAmount = parseFloat(skuPrice) - parseFloat(tirePrice);
            productDetails.discountedAmount = productDetails.discountAmount !== 0.00 ? tirePrice : '0.00';
            productDetails.taxType = taxType;
            productDetails.taxValue = taxValue;
            productDetails.total = +orderProduct[i].quantity * price;
            productDetails.model = productTire.name;
            productDetails.skuName = orderProduct[i].skuName ? orderProduct[i].skuName : '';
            productDetails.orderStatusId = 1;
            const productInformation = await this.orderProductService.createData(productDetails);
            await this.orderProductLogService.create(productInformation);
            // Remove product from Cart..!
            const customerCartCondition = {} as CustomerCartCondition;
            customerCartCondition.productId = orderProduct[i].productId;
            customerCartCondition.customerId = orderExist.customerId;
            const cart = await this.customerCartService.findOne({ where: customerCartCondition });
            if (cart) {
                await this.customerCartService.delete(cart.id);
            }
            // --
            const val = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
            if (val) {
                const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendororders = new VendorOrders();
                vendororders.subOrderId = orderExist.invoicePrefix.concat('-' + orderDate + orderExist.orderId) + val.vendorId + j;
                vendororders.vendorId = val.vendorId;
                vendororders.orderId = orderExist.orderId;
                vendororders.orderProductId = productInformation.orderProductId;
                vendororders.total = productDetails.total;
                vendororders.subOrderStatusId = 1;
                vendororders.commission = 0;
                const date = new Date();
                vendororders.modifiedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                const vendorGroup = vendor?.vendorGroupId ? await this.vendorGroupService.findOne({ where: { groupId: vendor.vendorGroupId, isActive: 1 } }) : null;
                if (val.vendorProductCommission > 0) {
                    vendororders.commission = val.vendorProductCommission;
                } else if (vendor && vendor.commission > 0) {
                    vendororders.commission = vendor.commission;
                } else if (vendorGroup && vendorGroup.commission > 0) {
                    vendororders.commission = vendorGroup.commission;
                } else {
                    const defaultCommission = await this.vendorGlobalSettingService.findOne({ where: { settingId: 1 } });
                    const defCommission = defaultCommission?.defaultCommission;
                    vendororders.commission = defCommission || 0;
                }
                const value = await this.vendorOrderService.create(vendororders);
                const vendorOrderLog = new VendorOrderLog();
                vendorOrderLog.vendorOrderId = value.vendorOrderId;
                vendorOrderLog.subOrderId = orderExist.invoicePrefix.concat('-' + orderDate + orderExist.orderId) + val.vendorId + j;
                vendorOrderLog.vendorId = val.vendorId;
                vendorOrderLog.orderId = orderExist.orderId;
                vendorOrderLog.subOrderStatusId = 1;
                await this.vendorOrderLogService.create(vendorOrderLog);

                const vendorInvoice = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderExist.orderId } });
                if (!vendorInvoice) {
                    const newVendorInvoice: any = new VendorInvoice();
                    newVendorInvoice.vendorId = val.vendorId;
                    newVendorInvoice.invoicePrefix = orderExist.invoicePrefix;
                    newVendorInvoice.orderId = orderExist.orderId;
                    newVendorInvoice.email = checkoutParam.emailId;
                    newVendorInvoice.total = 0;
                    newVendorInvoice.shippingFirstname = checkoutParam.shippingFirstName;
                    newVendorInvoice.shippingLastname = checkoutParam.shippingLastName;
                    await this.vendorInvoiceService.create(newVendorInvoice);
                }
                const vendorInvoiceData = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderExist.orderId } });
                vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
                const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                await this.vendorInvoiceService.create(vendorInvoiceData);

                const newVendorInvoiceItem = new VendorInvoiceItem();
                newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
                await this.vendorInvoiceItemService.create(newVendorInvoiceItem);
            }
            let productImageDetail;
            productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
            const productImageData = await this.productService.findOne({ where: { productId: productInformation.productId } });
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderExist.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
            j++;
        }
        newOrder.ip = (request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress).split(',')[0];
        newOrder.amount = totalAmount;
        newOrder.total = totalAmount;
        newOrder.invoiceNo = 'INV00'.concat(orderExist.orderId);
        newOrder.orderPrefixId = vendorSettings?.invoicePrefix.concat('-' + orderDate + orderExist.orderId);
        await this.orderService.update(orderExist.orderId, newOrder);
        newOrderTotal.orderId = orderExist.orderId;
        newOrderTotal.value = totalAmount;
        orderExist.orderPrefixId = newOrder.orderPrefixId;

        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        if (vendorPluginData.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 49 } });
            const adminEmailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 50 } });
            const today = ('0' + nwDate.getDate()).slice(-2) + '.' + ('0' + (nwDate.getMonth() + 1)).slice(-2) + '.' + nwDate.getFullYear();
            const customerFirstName = orderExist.shippingFirstname;
            const customerLastName = orderExist.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', 'Admin').replace('{customerName}', customerName).replace('{orderId}', orderExist.orderId).replace('{customerMail}', checkoutParam.emailId).replace('{quantity}', orderProduct[0].quantity).replace('{productName}', productDetailData[0].productInformationData.name);
            const customerMessage = emailContent.content.replace('{name}', customerName).replace('{productName}', productDetailData[0].productInformationData.name);
            const adminId: any = [];
            const vendorUser = await this.vendorUsersService.find({
                where: {
                    tenantId: request.tenantId,
                    deleteFlag: 0,
                    vendorUserGroup: {
                        slug: 'admin',
                    },
                },
                relations: ['vendorUserGroup'],
            });
            for (const user of vendorUser) {
                const value = user.username;
                adminId.push(value);
            }
            const vendorInvoice = await this.vendorInvoiceService.findAll({ where: { orderId: orderExist.orderId } });
            if (vendorInvoice.length > 0) {
                for (const vendInvoice of vendorInvoice) {
                    const vendorProductDetailData = [];
                    const vendor = await this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId }, relations: ['customer'] });
                    const vendorMessage = adminEmailContent.content.replace('{name}', vendor.customer.firstName).replace('{customerName}', customerName).replace('{orderId}', orderExist.orderId).replace('{customerMail}', checkoutParam.emailId).replace('{quantity}', orderProduct[0].quantity).replace('{productName}', productDetailData[0].productInformationData.name);
                    const vendorInvoiceItem = await this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                    for (const vendInvoiceItem of vendorInvoiceItem) {
                        const vendorProductInformation = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                        const vendorProductImageData: any = await this.productService.findOne({ where: { productId: vendorProductInformation.productId } });
                        let vendorProductImageDetail;
                        vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                        vendorProductImageData.productInformationData = vendorProductInformation;
                        vendorProductImageData.productImage = vendorProductImageDetail;
                        vendorProductDetailData.push(vendorProductImageData);

                    }
                    const vendorRedirectUrl = env.vendorRedirectUrl;
                    const mailContents: any = {};
                    mailContents.setting = { ...vendorSetting, ...vendorData };
                    mailContents.emailContent = vendorMessage;
                    mailContents.redirectUrl = vendorRedirectUrl;
                    mailContents.productDetailData = vendorProductDetailData;
                    mailContents.today = today;
                    mailContents.orderData = orderExist;
                    mailContents.templateName = 'invoice-order';
                    MAILService.sendMail(mailContents, vendor.companyEmailId, adminEmailContent.subject.replace('{productName}', productDetailData[0].productInformationData.name), false, false, '');
                }
            }
            const adminRedirectUrl = env.adminRedirectUrl;
            const adminMailContents: any = {};
            adminMailContents.setting = { ...vendorSetting, ...vendorData };
            adminMailContents.emailContent = adminMessage;
            adminMailContents.redirectUrl = adminRedirectUrl;
            adminMailContents.productDetailData = productDetailData;
            adminMailContents.today = today;
            adminMailContents.orderData = orderExist;
            adminEmailContent.templateName = 'invoice-order';
            MAILService.sendMail(adminMailContents, adminId, adminEmailContent.subject.replace('{productName}', productDetailData[0].productInformationData.name), false, false, '');
            const storeur = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            const storeMailContents: any = {};
            storeMailContents.setting = { ...vendorSetting, ...vendorData };
            storeMailContents.emailContent = customerMessage;
            storeMailContents.redirectUrl = storeur ?? '';
            storeMailContents.productDetailData = productDetailData;
            storeMailContents.today = today;
            storeMailContents.orderData = orderExist;
            storeMailContents.templateName = 'invoice-order';
            MAILService.sendMail(storeMailContents, checkoutParam.emailId, emailContent.subject.replace('{productName}', productDetailData[0].productInformationData.name), false, false, '');
            const order = await this.orderService.findOrder(orderExist.orderId);
            order.paymentType = vendorPluginData ? vendorPluginData.pluginName : '';
            order.productDetail = await this.orderProductService.find({ where: { orderId: orderExist.orderId } }).then((val) => {
                const productImage = val.map(async (value: any) => {
                    let image;
                    image = await this.productImageService.findOne({ where: { productId: value.productId } });
                    const temp: any = value;
                    temp.image = image;
                    return temp;
                });
                const results = Promise.all(productImage);
                return results;
            });
            const successResponse: any = {
                status: 1,
                message: 'You have successfully placed order. order details sent to your mail',
                data: order,
            };
            return response.status(200).send(successResponse);
        } else {

            const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);
            orderExist.paymentProcess = 0;
            await this.orderService.update(orderExist.orderId, orderExist);
            const route = env.baseUrl + pluginInfo.processRoute + '/' + orderExist.orderPrefixId;
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    // Customer Order List API
    /**
     * @api {get} /api/orders/order-list Get Order List API
     * @apiGroup Orders
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Query Param) {Number} limit Number of records to return
     * @apiParam (Query Param) {Number} offset Number of records to skip
     * @apiParam (Query Param) {String} keyword Keyword to search in order data
     * @apiParam (Query Param) {Number} count Flag to indicate if only count is needed (1 for count only)
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully shown the order list.",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/orders/order-list
     *
     * @apiErrorExample {json} Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Something went wrong."
     * }
     */
    // Order List Function
    @UseBefore(CheckCustomerMiddleware)
    @UseBefore(TranslationMiddleware)
    @Get('/order-list')
    @Authorized(['customer', 'view-order-history'])
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any ): Promise<any> {
        const select = [
            'Order.orderId as orderId',
            'Order.createdDate as createdDate',
            'Order.orderPrefixId as orderPrefixId',
            'Order.total as total',
            '(SELECT COUNT(order_id) FROM order_product WHERE order_id = orderId) AS itemCount',
        ];
        const whereConditions = [
            {
                name: 'Order.customerId',
                op: 'where',
                value: request.user.customerId,
            },
            {
                name: 'Order.tenantId',
                op: 'and',
                value: request.tenantId,
            },
        ];
        const searchConditions = [];

        if (keyword) {
            searchConditions.push({
            name: ['Order.orderPrefixId'],
            value: keyword.toLowerCase(),
            });
        }

        if (status) {
            searchConditions.push({
            name: ['OrderStatus.name'],
            value: status.toLowerCase(),
            });
        }
        const sort = [
            {
                name: 'Order.createdDate',
                order: 'DESC',
            },
        ];

        const relations = [
            {
               tableName: 'Order.orderStatus',
               aliasName: 'OrderStatus',
               op: 'left',
            },
        ];
        const orderList = await this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, count, true);

        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list. ',
            data: orderList,
        };
        return response.status(200).send(successResponse);
    }

    @UseBefore(CheckCustomerMiddleware)
    @Get('/failed')
    public async failedOrder(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const whereConditions = [];

        whereConditions.push(
            {
                name: 'Order.customerId',
                op: 'where',
                value: request.user.customerId,
                // value: 61,
            },
            {
                name: 'Order.paymentProcess',
                op: 'and',
                value: 0,
            }
        );

        const relations = [];

        const sort = [
            {
                name: 'Order.createdDate',
                order: 'DESC',
            },
        ];

        const orderList = await this.orderService.listByQueryBuilder(limit, offset, [], whereConditions, [], relations, [], sort, count ? true : false, false);

        return response.status(200).send({
            status: 1,
            message: `Successfully Got Failed Orders List ..!`,
            data: orderList,
        });
    }

    // Customer Order Detail API
    /**
     * @api {get} /api/orders/order-detail/:orderId Get Order Detail API
     * @apiGroup Orders
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Path Param) {Number} orderId Order ID to retrieve details
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully shown the order detail.",
     *   "data": {}
     * }
     *
     * @apiSampleRequest /api/orders/order-detail/:orderId
     *
     * @apiErrorExample {json} Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Something went wrong."
     * }
     */
    @Get('/order-detail/:orderId')
    @Authorized(['customer', 'view-order-history'])
    public async orderDetail(@Param('orderId') orderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderDetail = await this.orderService.findOne({ orderId });
        if (!orderDetail) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Id',
            };
            return response.status(400).send(errorResponse);
        }
        const orderStatus = await this.orderStatusService.findOne({ where: { orderStatusId: orderDetail.orderStatusId } });
        orderDetail.orderStatusName = orderStatus.name;
        orderDetail.orderStatusColorCode = orderStatus.colorCode;
        console.log('orderStatus');
        orderDetail.orderStatusDescription = orderStatus.description;
        const paymentMethod = await this.paymentRuleService.findOne({
            where: {
                id: orderDetail.paymentRuleId,
            },
        });

        const select = [
            'OrderProduct.productId as productId',
            'OrderProduct.orderProductId as orderProductId',
            'OrderProduct.name as name',
            'OrderProduct.quantity as quantity',
            'OrderProduct.productPrice as productPrice',
            'OrderProduct.discountAmount as discountAmount',
            'OrderProduct.taxType as taxType',
            'OrderProduct.taxValue as taxValue',
            'OrderProduct.total as total',
            'OrderProduct.skuName as skuName',
            'OrderProduct.basePrice as basePrice',
            'product.productSlug as productSlug',
            '(SELECT pi.image FROM product_image pi WHERE pi.product_id = OrderProduct.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.container_name FROM product_image pi WHERE pi.product_id = OrderProduct.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT sku.id FROM sku WHERE sku.sku_name = skuName LIMIT 1) as skuId',
        ];
        const whereConditions = [
            {
                name: 'OrderProduct.order',
                op: 'where',
                value: orderId,
            },
        ];
        const relations = [{
            tableName: 'OrderProduct.productInformationDetail',
            aliasName: 'product',
        }];
        const sort = [
            {
                name: 'OrderProduct.createdDate',
                order: 'DESC',
            },
        ];

        const orderProductData = await this.orderProductService.listByQueryBuilder(0, 0, select, whereConditions, [], relations, [], sort, false, true);
        orderDetail.orderProducts = orderProductData;

        orderDetail.paymentMethod = paymentMethod.name;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order detail. ',
            data: orderDetail,
        };
        return response.status(200).send(successResponse);
    }

    // Track Order Product API
    /**
     * @api {get} /api/orders/track-order-product Track Order
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Track Order..!!",
     *      "status": "1",
     *      "data": {
     *      "basePrice": "",
     *      "taxValue": "",
     *      "taxType": "",
     *      "orderProductId": "",
     *      "orderId": "",
     *      "productId": ,
     *      "orderProductPrefixId": "",
     *      "trackingId": "",
     *      "trackingUrl": "",
     *      "productName": "",
     *      "productNameTrans": "",
     *      "productDescriptionTrans": "",
     *      "productPrice": "",
     *      "discountAmount": "",
     *      "discountedAmount": "",
     *      "couponDiscountAmount": "",
     *      "skuName": "",
     *      "total": "",
     *      "orderStatusDate": "",
     *      "orderStatus": "",
     *      "productQuantity": ,
     *      "shippingAddress1": "",
     *      "shippingAddress2": "",
     *      "shippingCity": "",
     *      "shippingPostcode": "",
     *      "shippingZone": "",
     *      "currencySymbolLeft": "",
     *      "currencySymbolRight": "",
     *      "orderPrefixId": "",
     *      "productImage": "",
     *      "containerName": "",
     *      "deliveryStatus": [
     *       {
     *           "orderStatusId": "",
     *           "name": "",
     *           "createdDate": ""
     *       }]
     *   }
     * }
     * @apiSampleRequest /api/orders/track-order-product
     * @apiErrorExample {json} Track Order error
     * HTTP/1.1 500 Internal Server Error
     */
    // Track Order Function
    @UseBefore(CheckCustomerMiddleware)
    @UseBefore(TranslationMiddleware)
    @Get('/track-order-product')
    @Authorized(['customer', 'view-order-history'])
    public async trackOrder(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const obj: any = {};
        const orderProduct = await this.orderProductService.findOne({
            where: { orderProductId },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const product = await this.productImageService.findOne({
            select: ['image', 'containerName', 'productId'],
            where: { productId: orderProduct.productId, defaultImage: 1 },
        });
        const order = await this.orderService.findOrder({
            where: { orderId: orderProduct.orderId, customerId: request.user.customerId },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid order for this customer',
            };
            return response.status(400).send(errResponse);
        }
        const passingOrderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: orderProduct.orderStatusId,
            },
        });

        obj.basePrice = orderProduct.basePrice;
        obj.taxValue = orderProduct.taxValue;
        obj.taxType = orderProduct.taxType;
        obj.orderProductId = orderProduct.orderProductId;
        obj.orderId = orderProduct.orderId;
        obj.productId = orderProduct.productId;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        obj.trackingId = orderProduct.trackingNo;
        obj.trackingUrl = orderProduct.trackingUrl;
        obj.productName = orderProduct.name;
        obj.productPrice = orderProduct.productPrice;
        obj.discountAmount = orderProduct.discountAmount;
        obj.discountedAmount = orderProduct.discountedAmount;
        obj.couponDiscountAmount = orderProduct.couponDiscountAmount;
        obj.skuName = orderProduct.skuName;
        obj.total = orderProduct.total;
        if (orderProduct.modifiedDate) {
            obj.orderStatusDate = orderProduct.modifiedDate;
        } else {
            obj.orderStatusDate = orderProduct.createdDate;
        }
        if (passingOrderStatus) {
            obj.orderStatus = passingOrderStatus.name;
        }
        obj.productQuantity = orderProduct.quantity;
        obj.shippingAddress1 = order.shippingAddress1;
        obj.shippingAddress2 = order.shippingAddress2;
        obj.shippingCity = order.shippingCity;
        obj.shippingPostcode = order.shippingPostcode;
        obj.shippingZone = order.shippingZone;
        obj.currencySymbolLeft = order.currencySymbolLeft;
        obj.currencySymbolRight = order.currencySymbolRight;
        obj.orderPrefixId = order.orderPrefixId;
        obj.currencyCode = order.currencyCode;
        if (product) {
            obj.productImage = product.image;
            obj.containerName = product.containerName;
        }
        const orderStatus = await this.orderStatusService.findAll({
            select: ['orderStatusId', 'name'],
            where: {
                isActive: 1,
                tenantId: request.tenantId,
            },
        });
        const orderProductLog = await this.orderProductLogService.find({
            select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
            where: {
                orderProductId: orderProduct.orderProductId,
            },
        });
        const orderStatusDate = orderStatus.map(async (value: any) => {
            const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (date === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = date.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderStatusDate);
        obj.deliveryStatus = result;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the Track Order.',
            data: obj,
        };
        return response.status(200).send(successResponse);
    }

    //  Order Export PDF API
    /**
     * @api {get} /api/orders/order-export-pdf  Order Export PDF API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function

    @UseBefore(CheckCustomerMiddleware)
    @Get('/order-export-pdf')
    public async orderExportPdf(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid, customerId: request.user.customerId }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        if (!orderData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Id',
            };
            return response.status(400).send(errorResponse);
        }
        orderData.productList = await this.orderProductService.find({ where: { orderId: orderid }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] }).then((val) => {
            const productVal = val.map(async (value: any) => {
                const rating = undefined;
                const tempVal: any = value;
                tempVal.taxType = value.taxType;
                tempVal.taxValue = value.taxValue;
                if (value.taxType === 2) {
                    const price = value.discountAmount === '0.00' || value.discountAmount === null ? +value.basePrice : +value.discountedAmount;
                    tempVal.taxValueInAmount = (price * (+value.taxValue / 100)).toFixed(2);
                } else {
                    tempVal.taxValueInAmount = value.taxValue;
                }
                if (rating) {
                    tempVal.rating = rating.rating;
                    tempVal.review = rating.review;
                } else {
                    tempVal.rating = 0;
                    tempVal.review = '';
                }
                return tempVal;
            });
            const results = Promise.all(productVal);
            return results;
        });
        const vendorSettings: any = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendorCountryData: any = await this.vendorCountryService.findOne({ where: { id: vendorSettings.countryId }, relations: ['country'] });
        const vendorZoneData: any = await this.zoneService.findOne({ where: { zoneId: vendorSettings.zoneId } });
        orderData.settingDetails = vendorSettings;
        orderData.zoneData = (vendorZoneData) ?? ' ';
        orderData.countryData = (vendorCountryData) ? vendorCountryData?.country : ' ';
        orderData.currencyCode = orderData.currencyCode;
        orderData.symbolLeft = orderData.currencySymbolLeft;
        orderData.symbolRight = orderData.currencySymbolRight;
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.orderStatusId },
            select: ['name', 'colorCode'],
        });
        if (orderStatusData) {
            orderData.orderStatusName = orderStatusData.name;
            orderData.statusColorCode = orderStatusData.colorCode;
        }
        let image: any;
        try {
            if (env.imageserver === 's3') {
                image = await this.s3Service.imageBase64(vendorSettings.invoiceLogoName, vendorSettings.invoiceLogoPath);
                const error = image?.name || '';
                if (error.toLowerCase() === 'error') {
                    return response.status(400).json({
                        status: 0,
                        message: 'Invalid image in S3 bucket',
                    });
                }
            } else {
                image = await this.imageService.imageBase64(vendorSettings.invoiceLogoPath + vendorSettings.invoiceLogoName);
            }
        } catch (error: any) {
            return response.status(400).send({
                data: vendorSettings.invoiceLogo,
                error: error.message,
            });
        }
        orderData.logo = image;
        const htmlData = await this.pdfService.readHtmlToString('invoice', orderData);
        const pathName = `./Invoice_${orderData.invoicePrefix + orderData.invoiceNo}.pdf`;
        await this.pdfService.htmlToPdf(htmlData, pathName);
        return new Promise((resolve, reject) => {
            response.download(pathName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(pathName);
                    return response.end();
                }
            });
        });
    }

    public decrypt(text: any): any {
        const crypto = require('crypto');
        const ENCRYPTION_KEY = '@##90kdu(**^$!!hj((&$2jhn^5$%9@q';
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    // Order Cancel Reason List
    /**
     * @api {get} /api/orders/order-cancel-reason-list Order Cancel Reason List
     * @apiGroup Store order
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Listed..!",
     *      "status": "1",
     *      "data": {
     *      "id": "",
     *      "reason": ""
     *      }
     * }
     * @apiSampleRequest /api/orders/order-cancel-reason-list
     * @apiErrorExample {json} order cancel reason List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Abuse Reason list Function
    @UseBefore(CheckCustomerMiddleware)
    @Get('/order-cancel-reason-list')
    public async reasonList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'reason'];
        const ReasonList: any = await this.orderCancelReasonService.list(limit, offset, select, 0, 0, count).then(async (value) => {
            const mapping = await value.map((data) => {
                const temp = data;
                const reasonData = temp.reason;
                const resultData = reasonData.charAt(0).toUpperCase() + reasonData.slice(1);
                temp.reason = resultData;
                return data;
            });
            const result = await Promise.all(mapping);
            return result;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Order Cancel Reason list',
            data: ReasonList,
        };
        return response.status(200).send(successResponse);
    }

    // order cancel Request API
    /**
     * @api {post} /api/orders/order-cancel-request Order Cancel Request API
     * @apiGroup Store order
     * @apiParam (Request body) {String} [description]
     * @apiParam (Request body) {Number} orderProductId
     * @apiParam (Request body) {Number} reasonId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "description" : "",
     *      "orderProductId" : "",
     *      "reasonId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully posted your cancel request",
     *      "status": "1",
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "orderProductId": "",
     *              "productId": '"",
     *              "orderProductPrefixId": "",
     *              "orderId": "",
     *              "name": "",
     *              "model": "",
     *              "quantity": "",
     *              "productPrice": "",
     *              "discountAmount": "",
     *              "basePrice": "",
     *              "taxType": "",
     *              "taxValue": "",
     *              "total": "",
     *              "discountedAmount": "",
     *              "orderStatusId": "",
     *              "trackingUrl": "",
     *              "trackingNo": "",
     *              "trace": "",
     *              "tax": "",
     *              "cancelRequest": "",
     *              "cancelRequestStatus": "",
     *              "cancelReason": "",
     *              "cancelReasonDescription": " ",
     *              "isActive": "",
     *              "skuName": "",
     *              "couponDiscountAmount": ""
     *  }
     * }
     * @apiSampleRequest /api/orders/order-cancel-request
     * @apiErrorExample {json} Order Cancel Request error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckCustomerMiddleware)
    @Post('/order-cancel-request')
    public async createOrderCancel(@Body({ validate: true }) orderCancelParam: OrderCancelRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const orderProduct = await this.orderProductService.findOne({
            where: { orderProductId: orderCancelParam.orderProductId },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const reason = await this.orderCancelReasonService.findOne({
            where: { id: orderCancelParam.reasonId },
        });
        if (!reason) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid reasonId',
            };
            return response.status(400).send(errorResponse);
        }
        const order = await this.orderService.findOrder({
            where: { orderId: orderProduct.orderId, customerId: request.user.customerId },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid request for this user',
            };
            return response.status(400).send(errResponse);
        }
        orderProduct.cancelReason = reason.reason;
        orderProduct.cancelReasonDescription = orderCancelParam.description;
        orderProduct.cancelRequest = 1;
        const orderStatus = await this.orderStatusService.findOne({
            where: { name: 'order cancelled' },
        });
        orderProduct.orderStatusId = orderStatus ? orderStatus.orderStatusId : 4;
        orderProduct.cancelRequestStatus = 1;
        const orderProductUpdated = await this.orderProductService.createData(orderProduct);
        if (orderProductUpdated) {
            const successResponse: any = {
                status: 1,
                message: 'Order cancelled',
                data: orderProductUpdated,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Order cannot be cancelled',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Get Order Status API
    /**
     * @api {get} /api/orders/get-order-payment-status Get Payment Status
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderPrefixId orderPrefixId
     * @apiParamExample {json} Input
     * {
     *      "orderPrefixId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order payment status..!!",
     *      "status": "1",
     *      "data": {
     *      "orderPrefixId": "",
     *      "paymentStatus": "",
     *      "paymentType": ""
     *      }
     * }
     * @apiSampleRequest /api/orders/get-order-payment-status
     * @apiErrorExample {json} Store order error
     * HTTP/1.1 500 Internal Server Error
     */
    // Track Order Function
    @Get('/get-order-payment-status')
    public async getOrderPayment(@QueryParam('orderPrefixId') orderPrefixId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const order = await this.orderService.findOrder({
            select: ['paymentStatus', 'orderPrefixId', 'paymentType'],
            where: { orderPrefixId },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid order for this customer',
            };
            return response.status(400).send(errResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment',
            data: order,
        };
        return response.status(200).send(successResponse);
    }

    // Retry Payment API
    /**
     * @api {put} /api/orders/retry-payment Put Retry Payment
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderPrefixId orderPrefixId
     * @apiParam (Request body) {String} paymentPluginId paymentPluginId
     * @apiParam (Request body) {String} isMobile isMobile
     * @apiParamExample {json} Input
     * {
     *      "orderPrefixId" : "",
     *      "paymentPluginId" : "",
     *      "isMobile": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Redirect to this url",
     *      "status": "1",
     *      "data": {
     *          "route": "",
     *      }
     * }
     * @apiSampleRequest /api/orders/retry-payment
     * @apiErrorExample {json} Store order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/retry-payment')
    public async retryPaymentOrder(@Body({ validate: true }) payload: { orderPrefixId: number, paymentPluginId: number, isMobile: number }, @Res() response: any, @Req() request: any): Promise<any> {

        const orderExist = await this.orderService.findOrder({ where: { orderPrefixId: payload.orderPrefixId } });
        if (orderExist.paymentProcess === 1 && orderExist.paymentStatus === 1) {
            return response.status(400).send({
                status: 0,
                message: `Order Already Paid`,
            });
        }

        const vendorPluginData = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        id: payload.paymentPluginId,
                        pluginType: 'Payment',
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            }
        );

        if (!vendorPluginData) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Payment Plugin Id`,
            });
        }

        if (!this.checkDateFromColumn(orderExist.createdDate)) {
            return response.status(400).send({
                status: 0,
                message: `Retry Expired`,
            });
        }
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendorData = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });

        if (vendorPluginData.pluginName === 'CashOnDelivery') {
            orderExist.paymentProcess = 1;
            await this.orderService.update(orderExist.orderId, orderExist);
            const productDetailData = [];
            const orderProducts = await this.orderProductService.find({ where: { orderId: orderExist.orderId } });
            for (const orderProduct of orderProducts) {
                const productImageDetail = await this.productImageService.findOne({ where: { productId: orderProduct.productId, defaultImage: 1 } });
                const product = await this.productService.findOne({ where: { productId: orderProduct.productId } });
                product.productInformationData = orderProduct;
                product.productImage = productImageDetail;
                productDetailData.push(product);
            }

            const emailContent: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 5 } });
            const adminEmailContent: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 6 } });
            // const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderExist.shippingFirstname;
            const customerLastName = orderExist.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderExist.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser: any = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const vendorInvoice: any[] = await this.vendorInvoiceService.findAll({ where: { orderId: orderExist.orderId } });
            if (vendorInvoice.length > 0) {
                for (const vendInvoice of vendorInvoice) {
                    const vendorProductDetailData = [];
                    const vendor: any = await this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                    const customer: any = await this.customerService.findOne({ where: { id: vendor.customerId } });
                    const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderExist.orderId);
                    const vendorInvoiceItem: any[] = await this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                    for (const vendInvoiceItem of vendorInvoiceItem) {
                        const vendorProductInformation: any = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                        const vendorProductImageData: any = await this.productService.findOne({ where: { productId: vendorProductInformation.productId } });
                        let vendorProductImageDetail;
                        vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                        vendorProductImageData.productInformationData = vendorProductInformation;
                        vendorProductImageData.productImage = vendorProductImageDetail;
                        vendorProductDetailData.push(vendorProductImageData);

                    }
                    const vendorRedirectUrl = env.vendorRedirectUrl;
                    const mailContents: any = {};
                    mailContents.setting = { ...vendorSetting, ...vendorData };
                    mailContents.emailContent = vendorMessage;
                    mailContents.redirectUrl = vendorRedirectUrl;
                    mailContents.productDetailData = vendorProductDetailData;
                    mailContents.today = orderExist.createdDate;
                    mailContents.orderExist = orderExist;
                    MAILService.sendMail(mailContents, customer.email, adminEmailContent.subject.replace('{orderId}', orderExist.orderId), false, false, '');
                }
            }
            const adminRedirectUrl = env.adminRedirectUrl;
            const adminMailContents: any = {};
            adminMailContents.setting = { ...vendorSetting, ...vendorData };
            adminMailContents.emailContent = adminMessage;
            adminMailContents.redirectUrl = adminRedirectUrl;
            adminMailContents.productDetailData = productDetailData;
            adminMailContents.today = orderExist.createdDate;
            adminMailContents.orderExist = orderExist;
            MAILService.sendMail(adminMailContents, adminId, adminEmailContent.subject.replace('{orderId}', orderExist.orderId), false, false, '');
            const store = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            const storeMailContents: any = {};
            storeMailContents.setting = { ...vendorSetting, ...vendorData };
            storeMailContents.emailContent = customerMessage;
            storeMailContents.redirectUrl = store ?? '';
            storeMailContents.productDetailData = productDetailData;
            storeMailContents.today = orderExist.createdDate;
            storeMailContents.orderExist = orderExist;
            MAILService.sendMail(storeMailContents, adminId, emailContent.subject, false, false, '');

            return response.status(200).send({
                status: 1,
                message: 'You have successfully placed order. order details sent to your mail',
            });
        }

        const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);

        const route = env.baseUrl + pluginInfo.processRoute + '/' + payload.orderPrefixId;
        return response.status(200).send({
            status: 3,
            message: 'Redirect to this url',
            data: { route },
        });

    }

    @UseBefore(CheckCustomerMiddleware)
    @UseBefore(TranslationMiddleware)
    @Get('/:orderId/order-products')
    public async orderProductByOrderId(@Param('orderId') orderId: number, @Req() request: any, @Res() response: any, @QueryParam('count') count: number | boolean): Promise<any> {

        const select = [
            'order.createdDate as createdDate',
            'order.orderPrefixId as orderPrefixId',
            'order.orderId as orderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingAddress1 as shippingAddress1',
            'order.shippingAddress2 as shippingAddress2',
            'order.shippingZone as shippingZone',
            'order.shippingZone as shippingPostcode',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'OrderProduct.orderProductId as orderProductId',
            'OrderProduct.orderStatusId as orderProductStatusId',
            'OrderProduct.productId as productId',
            'OrderProduct.name as name',
            'OrderProduct.total as total',
            'OrderProduct.orderProductPrefixId as orderProductPrefixId',
            'OrderProduct.productPrice as productPrice',
            'OrderProduct.quantity as quantity',
            'OrderProduct.tax as tax',
            'OrderProduct.taxType as taxType',
            'OrderProduct.taxValue as taxValue',
            'OrderProduct.cancelRequest as cancelRequest',
            'OrderProduct.cancelRequestStatus as cancelRequestStatus',
            'OrderProduct.discountAmount as discountAmount',
            'OrderProduct.discountedAmount as discountedAmount',
            'OrderProduct.couponDiscountAmount as couponDiscountAmount',
            'OrderProduct.priceGroupDetailId as priceGroupDetailId',
            'OrderProduct.basePrice as basePrice',
            'OrderProduct.skuName as skuName',
            'orderStatus.orderStatusId as orderStatusId',
            'orderStatus.name as name',
        ];

        const relations: any[] = [
            {
                tableName: 'OrderProduct.order',
                aliasName: 'order',
            },
            {
                tableName: 'order.orderStatus',
                aliasName: 'orderStatus',
            },
        ];

        const groupBy = [];

        const searchConditions = [];
        const searchParams = [];

        if (request.languageId) {
            select.push(...['MAX(productTranslation.name) as productNameTrans', 'MAX(productTranslation.description) as productDescriptionTrans']);
            relations.push(
                {
                    tableName: 'OrderProduct.productInformationDetail',
                    aliasName: 'productInformationDetail',
                },
                {
                    tableName: 'productInformationDetail.productTranslation',
                    op: 'left-cond',
                    cond: 'productTranslation.languageId = :condLanguageId',
                    condParams: { condLanguageId: request.languageId },
                    aliasName: 'productTranslation',
                }
            );
            groupBy.push(
                {
                    name: 'OrderProduct.orderProductId',
                },
                {
                    name: 'productTranslation.languageId',
                }
            );
            searchParams.push(...['productTranslation.name', 'order.orderPrefixId', 'OrderProduct.orderProductPrefixId']);
        } else {
            searchParams.push(...['OrderProduct.name', 'order.orderPrefixId', 'OrderProduct.orderProductPrefixId']);
        }

        const whereConditions = [];

        whereConditions.push(
            {
                name: 'order.orderId',
                op: 'where',
                value: orderId,
            },
            {
                name: 'order.customerId',
                op: 'and',
                value: request.user.customerId,
                // value: 61,
            }
        );

        const sort = [
            {
                name: 'OrderProduct.createdDate',
                order: 'DESC',
            },
        ];

        const orderList: any = await this.orderProductService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, count ? true : false, true);
        const promises = orderList.map(async (results: any) => {
            const temp = results;
            const productImage = await this.productImageService.findOne({
                where: { productId: results.productId, defaultImage: 1 },
                select: ['image', 'containerName'],
            });
            if (productImage) {
                temp.image = productImage.image;
                temp.containerName = productImage.containerName;
            } else {
                temp.image = '';
                temp.containerName = '';
            }
            const passingOrderStatus = await this.orderStatusService.findOne({
                where: {
                    orderStatusId: results.orderProductStatusId,
                },
            });
            if (passingOrderStatus) {
                temp.orderStatusName = passingOrderStatus.name;
                temp.orderStatusColorCode = passingOrderStatus.colorCode;
            }
            const products = await this.productService.findOne({
                where: { productId: results.productId },
                select: ['productId', 'productSlug', 'name'], relations: ['productTranslation'],
            });
            if (products) {
                temp.productNameTrans = '';
                if (products.productTranslation.length > 0) {
                    temp.productNameTrans = (products.productTranslation.find((val) => val.languageId === request.languageId)?.name) ?? '';
                }
                temp.productSlug = products.productSlug;
                temp.productName = products.name;
            }
            const orderStatus = await this.orderProductLogService.findOne({
                where: {
                    orderStatusId: 5,
                    orderProductId: results.orderProductId,
                },
            });
            if (orderStatus) {
                temp.deliveryDate = orderStatus.createdDate;
            }
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list',
            data: instanceToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    private checkDateFromColumn(dateFromColumn: string): boolean {
        const currentDate = new Date(); // Get the current date
        const columnDate = new Date(dateFromColumn); // Convert the date from the column to a Date object

        // Calculate the difference between the current date and the column date in milliseconds
        const diffInTime = columnDate.getTime() - currentDate.getTime();

        // Convert the time difference to days
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        // Return false if the date is more than 1 day away, true otherwise
        return diffInDays <= 1;
    }

        private async createOrder(payload: any): Promise<any> {
        const checkoutParam = payload.checkoutPayload;
        const logo = await this.settingService.findOne({ where: {} });
        const coupon = {
            couponCode: checkoutParam.couponCode,
            couponData: checkoutParam.couponData,
            couponDiscount: checkoutParam.couponDiscountAmount,
        };

        const newCustomerMail: any = {};
        const codAdminMail: any = {};
        const codCustomerMail: any = {};
        const stockNotifyMails: any = {};

        // Coupon Validation
        if (payload.pluginModule.includes('Coupon')) {
            const importPath = payload.dirName + '/../../../../add-ons/Coupon/coupon';
            const Coupon = await require(importPath);
            const pluginResponse: any = await Coupon.process(coupon);
            if (pluginResponse === 'error') {
                return { status: 0, message: 'Invalid Coupon' };
            }
        }

        const dynamicData: any = {};
        const orderProducts: any = checkoutParam.productDetails;
        let priceGroupAddonExist = false;
        let customerPriceBySkuAndCustomerId: any;

        if (payload.pluginModule.includes('ProductPriceGroup') && await this.pluginService.findOne({ where: { slugName: 'product-price-group', pluginStatus: 1 } })) {
            priceGroupAddonExist = true;
            const importPath = payload.dirName + '/../../../../add-ons/ProductPriceGroup/priceGroupHook';
            const { getCustomerPriceBySkuAndCustomerId } = require(importPath);
            customerPriceBySkuAndCustomerId = getCustomerPriceBySkuAndCustomerId;
        }

        for (const val of orderProducts) {
            let price: any;
            let taxType: any;
            let taxValue: any;
            let tirePrice = 0;
            let priceWithTax: any;
            let priceGroupDetailId = 0;
            const productTire: any = await this.productService.findOne({ where: { productId: val.productId } });
            taxType = productTire.taxType;
            if (taxType === 2 && taxType) {
                const tax: any = await this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                taxValue = (tax) ? tax.taxPercentage : 0;
            } else if (taxType === 1 && taxType) {
                taxValue = productTire.taxValue;
            }
            const sku: any = await this.skuService.findOne({ where: { skuName: val.skuName } });
            if (sku) {
                const customerPrice = [];
                if (priceGroupAddonExist) {
                    customerPrice.push(...(await customerPriceBySkuAndCustomerId(sku.id, payload.customerId)));
                }
                if (customerPrice.length) {
                    const customerPriceSort = customerPrice.sort((a: any, b: any) => b.maxQuantity - a.maxQuantity);
                    const priceByQuantity = customerPriceSort.find((custPrice: any) => val.quantity >= custPrice.maxQuantity);
                    if (priceByQuantity) {
                        tirePrice = priceByQuantity.price;
                        priceGroupDetailId = priceByQuantity.id;
                    }
                }
                if (!tirePrice) {
                    const findWithQty = await this.productTirePriceService.findTirePrice(val.productId, sku.id, val.quantity);
                    if (findWithQty) {
                        tirePrice = findWithQty.price;
                    } else {
                        const dateNow = new Date();
                        const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(val.productId, sku.id, todaydate);
                        const productDiscount = await this.productDiscountService.findDiscountPricewithSku(val.productId, sku.id, todaydate);
                        if (productSpecial) {
                            tirePrice = productSpecial.price;
                        } else if (productDiscount) {
                            tirePrice = productDiscount.price;
                        } else {
                            tirePrice = sku.price;
                        }
                    }
                }
            } else {
                tirePrice = productTire.price;
            }
            if (taxType && taxType === 2) {
                const percentAmt = +tirePrice * (+taxValue / 100);
                priceWithTax = +tirePrice + +percentAmt;
            } else if (taxType && taxType === 1) {
                priceWithTax = +tirePrice + +taxValue;
            } else {
                priceWithTax = +tirePrice;
            }
            price = priceWithTax;
            const obj: any = {};
            obj.skuPrice = sku ? sku.price : productTire.price;
            obj.skuId = sku ? sku.id : productTire.skuId;
            obj.price = price;
            obj.taxType = taxType;
            obj.taxValue = taxValue;
            obj.tirePrice = tirePrice;
            obj.productTire = productTire;
            obj.quantity = val.quantity ?? 1;
            obj.priceGroupDetailId = priceGroupDetailId;
            dynamicData[val.skuName] = obj;
        }

        for (const val of orderProducts) {
            const product: any = await this.productService.findOne({ where: { productId: val.productId } });
            const sku: any = await this.skuService.findOne({ where: { skuName: val.skuName } });
            if (product.productType === 'physical' && product.hasStock === 1) {
                if (!(+sku.minQuantityAllowedCart <= +val.quantity)) {
                    return { status: 0, message: 'Quantity should be greater than min Quantity.' };
                } else if (!(+sku.maxQuantityAllowedCart >= +val.quantity)) {
                    return { status: 0, message: 'Reached maximum quantity limit' };
                }
                if ((+sku.quantity <= 0)) {
                    return { status: 0, message: 'item is Out of stock' };
                }
                if (!(+sku.quantity >= +val.quantity)) {
                    return { status: 0, message: `Available stock for ${product.name} - ${val.skuName} is ${sku.quantity}` };
                }
            }
        }

        const plugin: any = await this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
        if (!plugin) {
            return { status: 0, message: 'Payment method is invalid' };
        }
        if (checkoutParam.productType !== 'physical' && plugin.pluginName === 'CashOnDelivery') {
            return { status: 0, message: 'Payment method is invalid' };
        }

        // Uses a pre-flight estimate — final authoritative check is at deduction time.
        if (plugin.pluginName === 'Wallet' && payload.pluginModule.includes('Wallet')) {
            try {
                const walletHook = require(payload.dirName + '/../../../../add-ons/Wallet/walletOrderHook');
                // Use dynamicData to compute an estimated total for early validation
                const estimatedTotal = Object.values(dynamicData).reduce((sum: number, item: any) => {
                    return sum + (+item.price * +item.quantity);
                }, 0);
                const validation = await walletHook.validateWalletPayment(payload.customerId, estimatedTotal, payload.tenantId);
                if (!validation.valid) {
                    return { status: 0, message: validation.message };
                }
            } catch (_e) {
                return { status: 0, message: 'Wallet payment is not available.' };
            }
        }

        const newOrder = {} as any;
        const newOrderTotal = {} as any;
        let orderProduct = [];
        let i: number;
        let n: number;
        let totalProductAmount: any;
        let totalAmount = 0;
        const productDetailData: any[] = [];

        if (payload.customerId) {
            newOrder.customerId = payload.customerId;
        } else {
            const customerEmail = await this.customerService.findOne({
                where: { email: checkoutParam.emailId, deleteFlag: 0 },
            });
            if (!customerEmail) {
                if (checkoutParam.password) {
                    const newUser = {} as any;
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.lastName = checkoutParam.shippingLastName;
                    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                    if (!checkoutParam.password.match(pattern)) {
                        return {
                            status: 0,
                            message: "You have an error in your request's body. Check 'errors' field for more details!",
                            data: { message: ['Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'] },
                        };
                    }
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.siteId = payload.siteId;
                    newUser.ip = payload.ipAddress;
                    newUser.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    newUser.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    const resultDatas: any = await this.customerService.create(newUser);
                    const newAddress = {} as any;
                    newAddress.firstName = checkoutParam.shippingFirstName;
                    newAddress.lastName = checkoutParam.shippingLastName ?? '';
                    newAddress.customerId = resultDatas.id;
                    newAddress.address1 = checkoutParam.shippingAddress_1;
                    newAddress.address2 = checkoutParam.shippingAddress_2;
                    newAddress.city = checkoutParam.shippingCity;
                    newAddress.state = checkoutParam.shippingZone ?? '';
                    newAddress.zoneId = checkoutParam.state ?? 0;
                    newAddress.countryId = checkoutParam.shippingCountryId;
                    newAddress.postcode = checkoutParam.shippingPostCode;
                    newAddress.addressType = 0;
                    newAddress.company = checkoutParam.shippingCompany ?? '';
                    newAddress.landmark = '';
                    newAddress.phoneNo = checkoutParam.phoneNumber;
                    await this.addressService.create(newAddress);
                    const emailContents: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 1 } });
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    const mailContent: any = {};
                    mailContent.logo = logo;
                    mailContent.emailContent = message;
                    mailContent.redirectUrl = payload.storeRedirectUrl;
                    mailContent.productDetailData = undefined;
                    newCustomerMail.mailContent = mailContent;
                    newCustomerMail.email = resultDatas.email;
                    newCustomerMail.subject = emailContents.subject;
                    newCustomerMail.bcc = false;
                    newCustomerMail.isAttachment = false;
                    newCustomerMail.attachmentDetails = '';
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                return { status: 0, message: 'Please login for checkout, emailId already exist' };
            }
        }

        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;

        if (checkoutParam.productType === 'physical') {
            newOrder.shippingFirstname = checkoutParam.shippingFirstName;
            newOrder.shippingLastname = checkoutParam.shippingLastName;
            newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
            newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
            newOrder.shippingCompany = checkoutParam.shippingCompany;
            newOrder.shippingCity = checkoutParam.shippingCity;
            newOrder.shippingZone = checkoutParam.shippingZone;
            newOrder.shippingCountryId = checkoutParam.shippingCountryId;
            const country: any = await this.countryService.findOne({ where: { countryId: checkoutParam.shippingCountryId } });
            if (country) { newOrder.shippingCountry = country.name; }
            newOrder.shippingPostcode = checkoutParam.shippingPostCode;
            newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        } else {
            newOrder.shippingFirstname = '';
            newOrder.shippingLastname = '';
            newOrder.shippingAddress1 = '';
            newOrder.shippingAddress2 = '';
            newOrder.shippingCompany = '';
            newOrder.shippingCity = '';
            newOrder.shippingZone = '';
            newOrder.shippingCountryId = 0;
            newOrder.shippingCountry = '';
            newOrder.shippingPostcode = '';
            newOrder.shippingAddressFormat = '';
        }

        newOrder.paymentFirstname = checkoutParam.paymentFirstName;
        newOrder.paymentLastname = checkoutParam.paymentLastName;
        newOrder.paymentAddress1 = checkoutParam.paymentAddress_1;
        newOrder.paymentAddress2 = checkoutParam.paymentAddress_2;
        newOrder.paymentMobileNumber = checkoutParam.paymentMobileNumber;
        newOrder.paymentCompany = checkoutParam.paymentCompany;
        newOrder.tenantId = payload.tenantId;
        newOrder.poNumber = checkoutParam.poNumber ?? '';
        newOrder.mustShipBefore = moment().format('YYYY-MM-DD HH:mm:ss');
        newOrder.notes = '';
        newOrder.paymentRuleId = checkoutParam.paymentRuleId;
        newOrder.paymentTermId = checkoutParam.paymentTermId;
        newOrder.shippingCostOverride = checkoutParam.shippingCostOverride;
        newOrder.orderSource = 'shopping-cart';
        newOrder.createdByType = 'buyer';
        const paymentCountry: any = await this.countryService.findOne({ where: { countryId: checkoutParam.paymentCountryId } });
        if (paymentCountry) { newOrder.paymentCountry = paymentCountry.name; }
        newOrder.paymentCity = checkoutParam.paymentCity;
        newOrder.paymentZone = checkoutParam.paymentZone;
        newOrder.paymentPostcode = checkoutParam.paymentPostCode;
        newOrder.paymentMethod = checkoutParam.paymentMethod;
        newOrder.customerGstNo = checkoutParam.taxNumber;
        newOrder.ip = payload.ipAddress;
        newOrder.isActive = 1;

        const setting: any = await this.settingService.findOne({ where: { settingsId: payload.siteId } });
        newOrder.orderStatusId = setting ? setting.orderStatus : 0;
        newOrder.invoicePrefix = setting ? setting.invoicePrefix : '';
        const currencyVal: any = await this.currencyService.findOne({ where: { currencyId: setting.storeCurrencyId } });
        newOrder.currencyCode = currencyVal ? currencyVal.code : '';
        newOrder.currencyValue = currencyVal ? currencyVal.value : '';
        newOrder.currencySymbolLeft = currencyVal ? currencyVal.symbolLeft : '';
        newOrder.currencySymbolRight = currencyVal?.symbolRight ?? '';
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        newOrder.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const currencyCode = payload.currencyCode || 'INR';
        let validCurrency = await this.currencyService.findOne({ where: { code: currencyCode, isActive: 1 } });
        if (!validCurrency) {
            validCurrency = await this.currencyService.findOne({ where: { code: 'INR', isActive: 1 } });
        }
        newOrder.currencyExchangeCode = validCurrency.code;
        newOrder.currencyExchangeSymbolLeft = validCurrency.symbolLeft;
        newOrder.rateUsed = validCurrency.value;
        newOrder.isShoppingList = payload.isShoppingCart ?? false;
        const orderData: any = await this.orderService.create(newOrder);
        await this.orderLogService.create({ orderLogId: undefined, ...orderData });
        if (payload.pluginModule.includes('GiftCard')) {
            const importPath = payload.dirName + '/../../../../add-ons/GiftCard/GiftCardHook';
            const giftCard = await require(importPath);
            await giftCard.attachGiftCardsToOrder(
                orderData.orderId,
                orderData.customerId,
                checkoutParam.productDetails);
        }
        orderProduct = checkoutParam.productDetails;
        let j = 1;
        for (i = 0; i < orderProduct.length; i++) {
            const dynamicPrices = dynamicData[orderProduct[i].skuName];
            const productDetails = {} as any;
            productDetails.productId = orderProduct[i].productId;
            const productData: any = await this.productService.findOne({ where: { productId: orderProduct[i].productId } });
            const nwDate = new Date();
            const odrDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
            productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + j;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = productData.productType === 'physical' ? orderProduct[i].quantity : 1;
            productDetails.productPrice = dynamicPrices.price;
            productDetails.basePrice = dynamicPrices.skuPrice;
            productDetails.discountAmount = parseFloat(dynamicPrices.skuPrice) - parseFloat(dynamicPrices.tirePrice);
            productDetails.discountedAmount = productDetails.discountAmount !== 0.00 ? dynamicPrices.tirePrice : '0.00';
            productDetails.taxType = dynamicPrices.taxType;
            productDetails.taxValue = dynamicPrices.taxValue;
            productDetails.total = +orderProduct[i].quantity * dynamicPrices.price;
            productDetails.model = dynamicPrices.productTire.name;
            productDetails.skuName = orderProduct[i].skuName ? orderProduct[i].skuName : '';
            productDetails.priceGroupDetailId = dynamicPrices.priceGroupDetailId;
            productDetails.orderStatusId = 1;
            productDetails.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            productDetails.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const productInformation = await this.orderProductService.createData(productDetails);
            await this.orderProductLogService.create(productInformation);

            const customerCartCondition = {} as any;
            customerCartCondition.productId = orderProduct[i].productId;
            customerCartCondition.customerId = orderData.customerId;
            if (!payload.customerId && payload.pluginModule.includes('AbandonedCart')) {
                customerCartCondition.ip = orderData.ip;
            }
            const cart: any = await this.customerCartService.findOne({ where: customerCartCondition });
            if (cart) { await this.customerCartService.delete({ id: cart.id }); }

            // Remove ordered product from Shopping List
            if (payload.isShoppingCart === true ) {

                const shoppingCartHook =
                    await require('../../core/ShoppingCartHook');

                const shoppingCartData = await shoppingCartHook.findOne({
                    where: {
                        id: payload.shoppingCartId,
                        customerId: orderData.customerId,
                        isOrdered: 0,
                        isDelete: 0,
                    },
                });

                if (shoppingCartData) {
                    await shoppingCartHook.update(
                        shoppingCartData.id,
                        {
                            isOrdered: 1,
                        });
                }
            }
            if (orderProduct[i].vendorId !== 0) {
                const val: any = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId, vendorId: orderProduct[i].vendorId } });
                if (val) {
                    const vendor: any = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                    const vendororders = {} as any;
                    vendororders.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + val.vendorId + j;
                    vendororders.vendorId = val.vendorId;
                    vendororders.orderId = orderData.orderId;
                    vendororders.orderProductId = productInformation.orderProductId;
                    vendororders.total = productDetails.total;
                    vendororders.subOrderStatusId = 1;
                    vendororders.commission = 0;
                    vendororders.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    if (val.vendorProductCommission > 0) {
                        vendororders.commission = val.vendorProductCommission;
                    } else if (vendor && vendor.commission > 0) {
                        vendororders.commission = vendor.commission;
                    } else {
                        const vendorGroup: any = vendor?.vendorGroupId ? await this.vendorGroupService.findOne({
                            select: ['groupId', 'name', 'description', 'commission'],
                            where: { groupId: vendor.vendorGroupId },
                        }) : null;
                        const defaultCommission: any = await this.vendorGlobalSettingService.findOne({ where: {} });
                        vendororders.commission = (vendorGroup && vendorGroup.commission) ? vendorGroup.commission : (defaultCommission?.defaultCommission || 0);
                    }
                    vendororders.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    const value = await this.vendorOrderService.create(vendororders);
                    const vendorOrderLog = {} as any;
                    vendorOrderLog.vendorOrderId = value.vendorOrderId;
                    vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + val.vendorId + j;
                    vendorOrderLog.vendorId = val.vendorId;
                    vendorOrderLog.orderId = orderData.orderId;
                    vendorOrderLog.subOrderStatusId = 1;
                    vendorOrderLog.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    vendorOrderLog.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    await this.vendorOrderLogService.create(vendorOrderLog);

                    const vendorInvoice = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    if (!vendorInvoice) {
                        const newVendorInvoice = {} as any;
                        newVendorInvoice.vendorId = val.vendorId;
                        newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                        newVendorInvoice.orderId = orderData.orderId;
                        newVendorInvoice.email = checkoutParam.emailId;
                        newVendorInvoice.total = 0;
                        newVendorInvoice.shippingFirstname = checkoutParam.shippingFirstName;
                        newVendorInvoice.shippingLastname = checkoutParam.shippingLastName;
                        newVendorInvoice.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        newVendorInvoice.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        await this.vendorInvoiceService.create(newVendorInvoice);
                    }

                    const vendorInvoiceData: any = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
                    const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                    vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                    await this.vendorInvoiceService.create(vendorInvoiceData);

                    const newVendorInvoiceItem = {} as any;
                    newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                    newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
                    newVendorInvoiceItem.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    newVendorInvoiceItem.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    await this.vendorInvoiceItemService.create(newVendorInvoiceItem);
                }
            }

            if (productData.productType === 'physical' && productData.hasStock === 1) {
                const skuValue: any = await this.skuService.findOne({ where: { skuName: productInformation.skuName } });
                skuValue.quantity = +skuValue.quantity - +productInformation.quantity;
                const prod: any = await this.skuService.create(skuValue);
                if (productData.isSimplified !== 0) {
                    const productValue: any = await this.productService.findOne({ where: { productId: productInformation.productId } });
                    productValue.quantity = productValue.quantity - +productInformation.quantity;
                    await this.productService.create(productValue);
                }
                if (+prod.quantity <= +prod.notifyMinQuantity) {
                    const productStockAlert = {} as any;
                    productStockAlert.productId = productInformation.productId;
                    productStockAlert.skuName = productInformation.skuName;
                    productStockAlert.mailFlag = 1;
                    await this.productStockAlertService.create(productStockAlert);
                    const findVendorProduct: any = await this.vendorProductService.findOne({ where: { productId: productInformation.productId }, relations: ['vendor'] });
                    const findProductNotifyTemp: any = await this.emailTemplateService.findOne(46);
                    if (findVendorProduct) {
                        const customer: any = await this.customerService.findOne({ where: { id: findVendorProduct.vendor.customerId } });
                        const vendorMessage = findProductNotifyTemp.content.replace(/{name}/g, customer.firstName + ' ' + customer.lastName).replace(/{productName}/g, productData.name);
                        const vendorMailContents: any = {};
                        vendorMailContents.logo = logo;
                        vendorMailContents.productDetailData = undefined;
                        vendorMailContents.emailContent = vendorMessage;
                        vendorMailContents.redirectUrl = payload.vendorRedirectUrl;
                        stockNotifyMails.vendorEmailContents = vendorMailContents;
                        stockNotifyMails.vendorEmail = customer.email;
                        stockNotifyMails.subject = findProductNotifyTemp.subject;
                        stockNotifyMails.bcc = false;
                        stockNotifyMails.isAttachment = false;
                        stockNotifyMails.attachmentDetails = '';
                    }
                }
                const stockLog = {} as any;
                stockLog.productId = productInformation.productId;
                stockLog.orderId = orderData.orderId;
                stockLog.skuName = productInformation.skuName;
                stockLog.quantity = productInformation.quantity;
                stockLog.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                await this.stockLogService.create(stockLog);
            }

            const productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
            productData.productInformationData = productInformation;
            productData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.find({ where: { productId: orderProduct[i].productId, orderId: orderData.orderId, orderProductId: productInformation.orderProductId } });
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productData);
            j++;
        }

        let couponData: { total: any; couponCode: string; discountAmount: any } = { total: 0, couponCode: '', discountAmount: 0 };
        if (payload.pluginModule.includes('Coupon')) {
            const importPath = payload.dirName + '/../../../../add-ons/Coupon/coupon';
            const Coupon = await require(importPath);
            couponData = await Coupon.process(coupon, orderData, dynamicData, totalAmount);
        }

        newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        newOrderTotal.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        if (couponData.discountAmount) {
            newOrder.total = couponData.total;
            newOrder.couponCode = couponData.couponCode;
            newOrder.discountAmount = couponData.discountAmount;
            newOrder.amount = totalAmount;
            newOrderTotal.value = totalAmount - couponData.discountAmount;
        } else {
            newOrder.amount = totalAmount;
            newOrder.total = totalAmount;
            newOrderTotal.value = totalAmount;
        }
        await this.orderService.update(orderData.orderId, newOrder);
        await this.orderTotalService.createOrderTotalData(newOrderTotal);

        const finalOrderTotal = +newOrder.total;

        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 5 } });
            const adminEmailContent: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 6 } });
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerName = orderData.shippingFirstname + ' ' + orderData.shippingLastname;
            const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any[] = [];
            const adminUser: any = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) { adminId.push(user.username); }

            const codVendorMails: any[] = [];
            const vendorInvoiceList: any[] = await this.vendorInvoiceService.findAll({ where: { orderId: orderData.orderId } });
            if (vendorInvoiceList.length > 0) {
                for (const vendInvoice of vendorInvoiceList) {
                    const vendorProductDetailData: any[] = [];
                    const vendor: any = await this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                    const customer: any = await this.customerService.findOne({ where: { id: vendor.customerId } });
                    const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                    const vendorInvoiceItem: any[] = await this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                    for (const vendInvoiceItem of vendorInvoiceItem) {
                        const vendorProductInformation: any = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                        const vendorProductImageData: any = await this.productService.findOne({ where: { productId: vendorProductInformation.productId } });
                        const vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                        vendorProductImageData.productInformationData = vendorProductInformation;
                        vendorProductImageData.productImage = vendorProductImageDetail;
                        vendorProductDetailData.push(vendorProductImageData);
                    }
                    const vendorMailContents: any = {};
                    vendorMailContents.logo = logo;
                    vendorMailContents.emailContent = vendorMessage;
                    vendorMailContents.redirectUrl = payload.vendorRedirectUrl;
                    vendorMailContents.productDetailData = vendorProductDetailData;
                    vendorMailContents.today = today;
                    vendorMailContents.orderData = orderData;
                    const codVendorMail: any = {};
                    codVendorMail.vendorEmailContents = vendorMailContents;
                    codVendorMail.vendorEmail = customer.email;
                    codVendorMail.subject = adminEmailContent.subject;
                    codVendorMail.bcc = false;
                    codVendorMail.isAttachment = false;
                    codVendorMail.attachmentDetails = '';
                    codVendorMails.push({ ...codVendorMail });
                }
            }

            const adminMailContents: any = {};
            adminMailContents.logo = logo;
            adminMailContents.emailContent = adminMessage;
            adminMailContents.redirectUrl = payload.adminRedirectUrl;
            adminMailContents.productDetailData = productDetailData;
            adminMailContents.today = today;
            adminMailContents.orderData = orderData;
            codAdminMail.adminMailContents = adminMailContents;
            codAdminMail.adminId = adminId;
            codAdminMail.subject = adminEmailContent.subject;
            codAdminMail.bcc = false;
            codAdminMail.isAttachment = false;
            codAdminMail.attachmentDetails = '';

            const storeMailContents: any = {};
            storeMailContents.logo = logo;
            storeMailContents.emailContent = customerMessage;
            storeMailContents.redirectUrl = payload.storeRedirectUrl;
            storeMailContents.productDetailData = productDetailData;
            storeMailContents.today = today;
            storeMailContents.orderData = orderData;
            codCustomerMail.storeMailContents = storeMailContents;
            codCustomerMail.email = orderData.email;
            codCustomerMail.subject = emailContent.subject;
            codCustomerMail.bcc = false;
            codCustomerMail.isAttachment = false;
            codCustomerMail.attachmentDetails = '';

            const order: any = await this.orderService.findOnes({ where: { orderId: orderData.orderId } });
            order.paymentType = plugin ? plugin.pluginName : '';
            order.productDetail = await this.orderProductService.find({ where: { orderId: orderData.orderId } }).then((val) => {
                const productImage = val.map(async (value: any) => {
                    const image = await this.productImageService.findOne({ where: { productId: value.productId } });
                    const temp: any = value;
                    temp.image = image;
                    return temp;
                });
                return Promise.all(productImage);
            });
            return {
                status: 1,
                message: 'You have successfully placed order. order details sent to your mail',
                data: { order, email: { newCustomerMail, codAdminMail, codCustomerMail, codVendorMails, stockNotifyMails } },
            };
        } else if (plugin.pluginName === 'Wallet' && payload.pluginModule.includes('Wallet')) {
            // WALLET CHANGE 3: deduct using finalOrderTotal — backend-computed after coupon,
            // never from frontend payload.
            try {
                const walletHook = require(payload.dirName + '/../../../../add-ons/Wallet/walletOrderHook');

                // Re-validate with the real final total (coupon may have reduced it)
                const validation = await walletHook.validateWalletPayment(payload.customerId, finalOrderTotal, payload.tenantId);
                if (!validation.valid) {
                    return { status: 0, message: validation.message };
                }

                const result = await walletHook.deductWalletForOrder(payload.customerId, finalOrderTotal, payload.tenantId);
                if (!result.success) {
                    return { status: 0, message: result.message };
                }
            } catch (_e) {
                return { status: 0, message: 'Wallet deduction failed. Please try again.' };
            }

            // Mark order as paid instantly (same as COD)
            orderData.paymentFlag = 1;
            orderData.paymentStatus = 1;
            orderData.paymentProcess = 1;
            orderData.paymentType = 'Wallet';
            await this.orderService.update(orderData.orderId, orderData);

            const order: any = await this.orderService.findOne({ where: { orderId: orderData.orderId } });
            order.paymentType = 'Wallet';
            order.productDetail = await this.orderProductService.find({ where: { orderId: orderData.orderId } }).then((val) => {
                const productImage = val.map(async (value: any) => {
                    const image = await this.productImageService.findOne({ where: { productId: value.productId } });
                    const temp: any = value;
                    temp.image = image;
                    return temp;
                });
                return Promise.all(productImage);
            });
            if (payload.pluginModule.includes('GiftCard')) {
                const importPath = payload.dirName + '/../../../../add-ons/GiftCard/GiftCardHook';
                const giftCard = await require(importPath);
                await giftCard.activateGiftCard(
                    orderData.orderId,
                    orderData.customerId);
            }
            return {
                status: 1,
                message: 'You have successfully placed order. order details sent to your mail',
                data: { order, email: { newCustomerMail, stockNotifyMails } },
            };

        } else {
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            orderData.paymentProcess = 0;
            await this.orderService.update(orderData.orderId, orderData);
            let route = payload.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            if (plugin.pluginName === 'razorpay' && checkoutParam.isMobile) {
                route = payload.baseUrl + pluginInfo.processAPIRoute + '/' + orderData.orderPrefixId;
                return {
                    status: 4,
                    message: 'Redirect to this url',
                    data: { route, email: { newCustomerMail, stockNotifyMails } },
                };
            }
            return {
                status: 3,
                message: 'Redirect to this url',
                data: { route, email: { newCustomerMail, stockNotifyMails } },
            };
        }
    }

}
