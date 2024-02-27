"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrderController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const CustomerCheckoutRequest_1 = require("./requests/CustomerCheckoutRequest");
const OrderCancelRequest_1 = require("./requests/OrderCancelRequest");
const OrderService_1 = require("../../core/services/OrderService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const OrderTotalService_1 = require("../../core/services/OrderTotalService");
const Order_1 = require("../../core/models/Order");
const OrderProduct_1 = require("../../core/models/OrderProduct");
const OrderTotal_1 = require("../../core/models/OrderTotal");
const CustomerService_1 = require("../../core/services/CustomerService");
const mail_services_1 = require("../../../auth/mail.services");
const ProductService_1 = require("../../core/services/ProductService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const SettingService_1 = require("../../core/services/SettingService");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const CountryService_1 = require("../../core/services/CountryService");
const UserService_1 = require("../../core/services/UserService");
const Customer_1 = require("../../core/models/Customer");
const VendorOrders_1 = require("../../core/models/VendorOrders");
const VendorService_1 = require("../../core/services/VendorService");
const PluginService_1 = require("../../core/services/PluginService");
const CurrencyService_1 = require("../../core/services/CurrencyService");
const env_1 = require("../../../env");
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const OrderLogService_1 = require("../../core/services/OrderLogService");
const VendorOrderLogService_1 = require("../../core/services/VendorOrderLogService");
const VendorOrderLog_1 = require("../../core/models/VendorOrderLog");
const VendorSettingService_1 = require("../../core/services/VendorSettingService");
const PdfService_1 = require("../../core/services/PdfService");
const zoneService_1 = require("../../core/services/zoneService");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const OrderProductLogService_1 = require("../../core/services/OrderProductLogService");
const CustomerCartService_1 = require("../../core/services/CustomerCartService");
const OrderCancelReasonService_1 = require("../../core/services/OrderCancelReasonService");
const moment = require("moment");
const ProductTirePriceService_1 = require("../../core/services/ProductTirePriceService");
const ProductSpecialService_1 = require("../../core/services/ProductSpecialService");
const ProductDiscountService_1 = require("../../core/services/ProductDiscountService");
const VendorInvoiceItemService_1 = require("../../core/services/VendorInvoiceItemService");
const VendorInvoiceService_1 = require("../../core/services/VendorInvoiceService");
const VendorInvoice_1 = require("../../core/models/VendorInvoice");
const VendorInvoiceItem_1 = require("../../core/models/VendorInvoiceItem");
const SkuService_1 = require("../../core/services/SkuService");
const TaxService_1 = require("../../core/services/TaxService");
const CustomerBackorderRequest_1 = require("./requests/CustomerBackorderRequest");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const pluginLoader_1 = require("../../../loaders/pluginLoader");
const order_1 = require("@spurtcommerce/order");
const fs = tslib_1.__importStar(require("fs"));
const typeorm_1 = require("typeorm");
const StoreCategoryValidatorMiddleware_1 = require("../../core/middlewares/StoreCategoryValidatorMiddleware");
let CustomerOrderController = class CustomerOrderController {
    constructor(orderService, orderProductService, orderTotalService, vendorService, vendorSettingService, customerService, productService, productImageService, settingService, emailTemplateService, vendorProductService, orderLogService, countryService, pluginService, currencyService, vendorOrderService, userService, vendorOrderLogService, pdfService, zoneService, s3Service, orderStatusService, orderProductLogService, customerCartService, orderCancelReasonService, productTirePriceService, productSpecialService, productDiscountService, vendorInvoiceService, vendorInvoiceItemService, taxService, imageService, skuService) {
        this.orderService = orderService;
        this.orderProductService = orderProductService;
        this.orderTotalService = orderTotalService;
        this.vendorService = vendorService;
        this.vendorSettingService = vendorSettingService;
        this.customerService = customerService;
        this.productService = productService;
        this.productImageService = productImageService;
        this.settingService = settingService;
        this.emailTemplateService = emailTemplateService;
        this.vendorProductService = vendorProductService;
        this.orderLogService = orderLogService;
        this.countryService = countryService;
        this.pluginService = pluginService;
        this.currencyService = currencyService;
        this.vendorOrderService = vendorOrderService;
        this.userService = userService;
        this.vendorOrderLogService = vendorOrderLogService;
        this.pdfService = pdfService;
        this.zoneService = zoneService;
        this.s3Service = s3Service;
        this.orderStatusService = orderStatusService;
        this.orderProductLogService = orderProductLogService;
        this.customerCartService = customerCartService;
        this.orderCancelReasonService = orderCancelReasonService;
        this.productTirePriceService = productTirePriceService;
        this.productSpecialService = productSpecialService;
        this.productDiscountService = productDiscountService;
        this.vendorInvoiceService = vendorInvoiceService;
        this.vendorInvoiceItemService = vendorInvoiceItemService;
        this.taxService = taxService;
        this.imageService = imageService;
        this.skuService = skuService;
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
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/customer-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Checkout Function
    customerCheckout(checkoutParam, response, request) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderResponse = yield (0, order_1.orderCreate)((0, typeorm_1.getConnection)(), {
                checkoutPayload: checkoutParam,
                pluginModule: pluginLoader_1.pluginModule,
                ipAddress: (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0],
                customerId: (_a = request.id) !== null && _a !== void 0 ? _a : 0,
                storeRedirectUrl: env_1.env.storeRedirectUrl,
                adminRedirectUrl: env_1.env.adminRedirectUrl,
                vendorRedirectUrl: env_1.env.vendorRedirectUrl,
                baseUrl: env_1.env.baseUrl,
                dirName: __dirname,
                siteId: request.store.Id,
            });
            if (orderResponse.status && orderResponse.data.order) {
                const emailPayload = orderResponse.data.email;
                if (Object.keys(emailPayload.newCustomerMail).length) {
                    const customerNew = emailPayload.newCustomerMail;
                    mail_services_1.MAILService.sendMail(customerNew.mailContent, customerNew.email, customerNew.subject, customerNew.bcc, customerNew.isAttachment, customerNew.attachmentDetails);
                }
                const adminEmail = emailPayload.codAdminMail;
                mail_services_1.MAILService.sendMail(adminEmail.adminMailContents, adminEmail.adminId, adminEmail.subject, adminEmail.bcc, adminEmail.isAttachment, adminEmail.attachmentDetails);
                if (emailPayload.codVendorMails.length) {
                    for (const codVendorMail of emailPayload.codVendorMails) {
                        const vendorMail = codVendorMail;
                        mail_services_1.MAILService.sendMail(vendorMail.vendorMailContents, vendorMail.vendorEmail, vendorMail.subject, vendorMail.bcc, vendorMail.isAttachment, vendorMail.attachmentDetails);
                    }
                }
                const customerEmail = emailPayload.codCustomerMail;
                mail_services_1.MAILService.sendMail(customerEmail.storeMailContents, customerEmail.email, customerEmail.subject, customerEmail.bcc, customerEmail.isAttachment, customerEmail.attachmentDetails);
            }
            return response.status(orderResponse.status ? 200 : 400).send({
                status: orderResponse.status,
                message: orderResponse.message,
                data: orderResponse.status ? (orderResponse.status === 1 ? orderResponse.data.order : orderResponse.data.route) : undefined,
            });
        });
    }
    // customer checkout
    /**
     * @api {post} /api/orders/back-order-checkout Checkout
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
     * }
     * @apiSampleRequest /api/orders/back-order-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Checkout Function
    backOrderCustomerCheckout(checkoutParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const logo = yield this.settingService.findOne();
            const orderProducts = checkoutParam.productDetails;
            for (const val of orderProducts) {
                const product = yield this.productService.findOne(val.productId);
                const sku = yield this.skuService.findOne({ where: { skuName: val.skuName } });
                if (product.hasStock === 1) {
                    if (!(sku.minQuantityAllowedCart <= +val.quantity)) {
                        const minCart = {
                            status: 0,
                            message: 'Quantity should greater than min Quantity.',
                        };
                        return response.status(400).send(minCart);
                    }
                    else if (!(sku.maxQuantityAllowedCart >= +val.quantity)) {
                        const maxCart = {
                            status: 0,
                            message: 'Reached maximum quantity limit',
                        };
                        return response.status(400).send(maxCart);
                    }
                }
            }
            const plugin = yield this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
            if (plugin === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Payment method is invalid',
                };
                return response.status(400).send(errorResponse);
            }
            const newOrder = new Order_1.Order();
            const newOrderTotal = new OrderTotal_1.OrderTotal();
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
            }
            else {
                const customerEmail = yield this.customerService.findOne({
                    where: {
                        email: checkoutParam.emailId,
                        deleteFlag: 0,
                    },
                });
                if (customerEmail === undefined) {
                    if (checkoutParam.password) {
                        const newUser = new Customer_1.Customer();
                        newUser.firstName = checkoutParam.shippingFirstName;
                        newUser.password = yield Customer_1.Customer.hashPassword(checkoutParam.password);
                        newUser.email = checkoutParam.emailId;
                        newUser.username = checkoutParam.emailId;
                        newUser.mobileNumber = checkoutParam.phoneNumber;
                        newUser.isActive = 1;
                        newUser.ip = (request.headers['x-forwarded-for'] ||
                            request.connection.remoteAddress ||
                            request.socket.remoteAddress ||
                            request.connection.socket.remoteAddress).split(',')[0];
                        const resultDatas = yield this.customerService.create(newUser);
                        const emailContents = yield this.emailTemplateService.findOne(1);
                        const message = emailContents.content.replace('{name}', resultDatas.firstName);
                        const redirectUrl = env_1.env.storeRedirectUrl;
                        const mailContent = {};
                        mailContent.logo = logo;
                        mailContent.emailContent = message;
                        mailContent.redirectUrl = redirectUrl;
                        mailContent.productDetailData = undefined;
                        mail_services_1.MAILService.sendMail(mailContent, resultDatas.email, emailContents.subject, false, false, '');
                        newOrder.customerId = resultDatas.id;
                    }
                    else {
                        newOrder.customerId = 0;
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Please login for checkout, emailId already exist',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            newOrder.email = checkoutParam.emailId;
            newOrder.telephone = checkoutParam.phoneNumber;
            newOrder.shippingFirstname = checkoutParam.shippingFirstName;
            newOrder.shippingLastname = checkoutParam.shippingLastName;
            newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
            newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
            newOrder.shippingCompany = checkoutParam.shippingCompany;
            newOrder.shippingCity = checkoutParam.shippingCity;
            newOrder.shippingZone = checkoutParam.shippingZone;
            newOrder.shippingCountryId = checkoutParam.shippingCountryId;
            const country = yield this.countryService.findOne({
                where: {
                    countryId: checkoutParam.shippingCountryId,
                },
            });
            if (country) {
                newOrder.shippingCountry = country.name;
            }
            newOrder.shippingPostcode = checkoutParam.shippingPostCode;
            newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
            newOrder.paymentMethod = checkoutParam.paymentMethod;
            newOrder.isActive = 1;
            newOrder.backOrders = 1;
            const setting = yield this.settingService.findOne(request.store.Id);
            newOrder.orderStatusId = setting.orderStatus;
            newOrder.invoicePrefix = setting.invoicePrefix;
            const currencyVal = yield this.currencyService.findOne(setting.storeCurrencyId);
            if (currencyVal) {
                newOrder.currencyCode = currencyVal.code;
                newOrder.currencyValue = currencyVal.value;
                newOrder.currencySymbolLeft = currencyVal.symbolLeft;
                newOrder.currencySymbolRight = currencyVal.symbolRight;
                newOrder.currencyValue = currencyVal.value;
            }
            newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
            const orderData = yield this.orderService.create(newOrder);
            yield this.orderLogService.create(orderData);
            const currencySymbol = yield this.currencyService.findOne(setting.storeCurrencyId);
            if (currencySymbol) {
                orderData.currencyRight = currencySymbol.symbolRight;
                orderData.currencyLeft = currencySymbol.symbolLeft;
            }
            const nwDate = new Date();
            const orderDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
            orderProduct = checkoutParam.productDetails;
            let j = 1;
            for (i = 0; i < orderProduct.length; i++) {
                /// for find product price with tax , option price, special, discount and tire price /////
                let price;
                let taxType;
                let taxValue;
                let tirePrice;
                let priceWithTax;
                const productTire = yield this.productService.findOne({ where: { productId: orderProduct[i].productId } });
                taxType = productTire.taxType;
                if (taxType === 2 && taxType) {
                    const tax = yield this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                    taxValue = (tax !== undefined) ? tax.taxPercentage : 0;
                }
                else if (taxType === 1 && taxType) {
                    taxValue = productTire.taxValue;
                }
                const sku = yield this.skuService.findOne({ where: { skuName: orderProduct[i].skuName } });
                if (sku) {
                    if (productTire.hasTirePrice === 1) {
                        const findWithQty = yield this.productTirePriceService.findTirePrice(orderProduct[i].productId, sku.id, orderProduct[i].quantity);
                        if (findWithQty) {
                            tirePrice = findWithQty.price;
                        }
                        else {
                            const dateNow = new Date();
                            const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                            const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                            const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                            if (productSpecial !== undefined) {
                                tirePrice = productSpecial.price;
                            }
                            else if (productDiscount !== undefined) {
                                tirePrice = productDiscount.price;
                            }
                            else {
                                tirePrice = sku.price;
                            }
                        }
                        if (taxType && taxType === 2) {
                            const percentVal = +tirePrice * (+taxValue / 100);
                            priceWithTax = +tirePrice + +percentVal;
                        }
                        else if (taxType && taxType === 1) {
                            priceWithTax = +tirePrice + +orderProduct[i].taxValue;
                        }
                        else {
                            priceWithTax = +tirePrice;
                        }
                        price = priceWithTax;
                    }
                    else {
                        const dateNow = new Date();
                        const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                        if (productSpecial !== undefined) {
                            tirePrice = productSpecial.price;
                        }
                        else if (productDiscount !== undefined) {
                            tirePrice = productDiscount.price;
                        }
                        else {
                            tirePrice = sku.price;
                        }
                        if (taxType && taxType === 2) {
                            const perVal = +tirePrice * (+taxValue / 100);
                            priceWithTax = +tirePrice + +perVal;
                        }
                        else if (taxType && taxType === 1) {
                            priceWithTax = +tirePrice + +taxValue;
                        }
                        else {
                            priceWithTax = +tirePrice;
                        }
                        price = priceWithTax;
                    }
                }
                else {
                    tirePrice = productTire.price;
                    if (taxType && taxType === 2) {
                        const percentAmt = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +percentAmt;
                    }
                    else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +taxValue;
                    }
                    else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                }
                const skuPrice = sku ? sku.price : productTire.price;
                ///// finding price from backend ends /////
                const productDetails = new OrderProduct_1.OrderProduct();
                productDetails.productId = orderProduct[i].productId;
                productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + orderDate + orderData.orderId) + j;
                productDetails.name = productTire.name;
                productDetails.orderId = orderData.orderId;
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
                const productInformation = yield this.orderProductService.createData(productDetails);
                yield this.orderProductLogService.create(productInformation);
                // Remove product from Cart..!
                const customerCartCondition = {};
                customerCartCondition.productId = orderProduct[i].productId;
                customerCartCondition.customerId = orderData.customerId;
                if (!request.id && pluginLoader_1.pluginModule.includes('AbandonedCart')) {
                    customerCartCondition.ip = orderData.ip;
                }
                const cart = yield this.customerCartService.findOne({ where: customerCartCondition });
                if (cart !== undefined) {
                    yield this.customerCartService.delete(cart.id);
                }
                // --
                ///// for saving vendor orders starts///////
                const val = yield this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
                if (val !== undefined) {
                    const vendor = yield this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                    const vendororders = new VendorOrders_1.VendorOrders();
                    vendororders.subOrderId = orderData.invoicePrefix.concat('-' + orderDate + orderData.orderId) + val.vendorId + j;
                    vendororders.vendorId = val.vendorId;
                    vendororders.orderId = orderData.orderId;
                    vendororders.orderProductId = productInformation.orderProductId;
                    vendororders.total = productDetails.total;
                    vendororders.subOrderStatusId = 1;
                    vendororders.commission = 0;
                    const date = new Date();
                    vendororders.modifiedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                    if (val.vendorProductCommission > 0) {
                        vendororders.commission = val.vendorProductCommission;
                    }
                    else if (vendor.commission > 0) {
                        vendororders.commission = vendor.commission;
                    }
                    else {
                        const defaultCommission = yield this.vendorSettingService.findOne();
                        const defCommission = defaultCommission.defaultCommission;
                        vendororders.commission = defCommission;
                    }
                    const value = yield this.vendorOrderService.create(vendororders);
                    const vendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
                    vendorOrderLog.vendorOrderId = value.vendorOrderId;
                    vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + orderDate + orderData.orderId) + val.vendorId + j;
                    vendorOrderLog.vendorId = val.vendorId;
                    vendorOrderLog.orderId = orderData.orderId;
                    vendorOrderLog.subOrderStatusId = 1;
                    yield this.vendorOrderLogService.create(vendorOrderLog);
                    const vendorInvoice = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    if (!vendorInvoice) {
                        const newVendorInvoice = new VendorInvoice_1.VendorInvoice();
                        newVendorInvoice.vendorId = val.vendorId;
                        newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                        newVendorInvoice.orderId = orderData.orderId;
                        newVendorInvoice.email = checkoutParam.emailId;
                        newVendorInvoice.total = 0;
                        newVendorInvoice.shippingFirstname = checkoutParam.shippingFirstName;
                        newVendorInvoice.shippingLastname = checkoutParam.shippingLastName;
                        yield this.vendorInvoiceService.create(newVendorInvoice);
                    }
                    const vendorInvoiceData = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
                    const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                    vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                    yield this.vendorInvoiceService.create(vendorInvoiceData);
                    const newVendorInvoiceItem = new VendorInvoiceItem_1.VendorInvoiceItem();
                    newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                    newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
                    yield this.vendorInvoiceItemService.create(newVendorInvoiceItem);
                }
                let productImageDetail;
                productImageDetail = yield this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                const productImageData = yield this.productService.findOne(productInformation.productId);
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                totalProductAmount = yield this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
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
            newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
            newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
            yield this.orderService.update(orderData.orderId, newOrder);
            newOrderTotal.orderId = orderData.orderId;
            newOrderTotal.value = totalAmount;
            yield this.orderTotalService.createOrderTotalData(newOrderTotal);
            if (plugin.pluginName === 'CashOnDelivery') {
                const emailContent = yield this.emailTemplateService.findOne(5);
                const adminEmailContent = yield this.emailTemplateService.findOne(6);
                const today = ('0' + nwDate.getDate()).slice(-2) + '.' + ('0' + (nwDate.getMonth() + 1)).slice(-2) + '.' + nwDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const vendorInvoice = yield this.vendorInvoiceService.findAll({ where: { orderId: orderData.orderId } });
                if (vendorInvoice.length > 0) {
                    for (const vendInvoice of vendorInvoice) {
                        const vendorProductDetailData = [];
                        const vendor = yield this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                        const customer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                        const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                        const vendorInvoiceItem = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                        for (const vendInvoiceItem of vendorInvoiceItem) {
                            const vendorProductInformation = yield this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                            // const vendorProductInformation = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                            const vendorProductImageData = yield this.productService.findOne(vendorProductInformation.productId);
                            let vendorProductImageDetail;
                            vendorProductImageDetail = yield this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                            vendorProductImageData.productInformationData = vendorProductInformation;
                            vendorProductImageData.productImage = vendorProductImageDetail;
                            vendorProductDetailData.push(vendorProductImageData);
                        }
                        const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                        const mailContents = {};
                        mailContents.logo = logo;
                        mailContents.emailContent = vendorMessage;
                        mailContents.redirectUrl = vendorRedirectUrl;
                        mailContents.productDetailData = vendorProductDetailData;
                        mailContents.today = today;
                        mailContents.orderData = orderData;
                        mail_services_1.MAILService.sendMail(mailContents, customer.email, adminEmailContent.subject, false, false, '');
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
                const storeMailContents = {};
                storeMailContents.logo = logo;
                storeMailContents.emailContent = customerMessage;
                storeMailContents.redirectUrl = storeRedirectUrl;
                storeMailContents.productDetailData = productDetailData;
                storeMailContents.today = today;
                storeMailContents.orderData = orderData;
                mail_services_1.MAILService.sendMail(storeMailContents, adminId, emailContent.subject, false, false, '');
                const order = yield this.orderService.findOrder(orderData.orderId);
                order.paymentType = plugin ? plugin.pluginName : '';
                order.productDetail = yield this.orderProductService.find({ where: { orderId: orderData.orderId } }).then((val) => {
                    const productImage = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        let image;
                        image = yield this.productImageService.findOne({ where: { productId: value.productId } });
                        const temp = value;
                        temp.image = image;
                        return temp;
                    }));
                    const results = Promise.all(productImage);
                    return results;
                });
                const successResponse = {
                    status: 1,
                    message: 'You have successfully placed order. order details sent to your mail',
                    data: order,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                orderData.paymentProcess = 0;
                yield this.orderService.update(orderData.orderId, orderData);
                const route = env_1.env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
                const successResponse = {
                    status: 3,
                    message: 'Redirect to this url',
                    data: route,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Customer Order List API
    /**
     * @api {get} /api/orders/order-list My Order List
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status -> closed, open, cancel
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-list
     * @apiErrorExample {json} Order List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    orderList(limit, offset, keyword, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                'OrderProduct.cancelRequest as cancelRequest',
                'OrderProduct.cancelRequestStatus as cancelRequestStatus',
                'OrderProduct.discountAmount as discountAmount',
                'OrderProduct.discountedAmount as discountedAmount',
                'OrderProduct.couponDiscountAmount as couponDiscountAmount',
                'OrderProduct.skuName as skuName',
                'orderStatus.orderStatusId as orderStatusId',
                'orderStatus.name as name',
            ];
            const relations = [
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
            const whereConditions = [];
            whereConditions.push({
                name: 'order.customerId',
                op: 'and',
                value: request.user.id,
            }, {
                name: 'order.paymentProcess',
                op: 'and',
                value: 1,
            });
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['OrderProduct.name', 'order.orderPrefixId', 'OrderProduct.orderProductPrefixId'],
                    value: keyword.toLowerCase(),
                });
            }
            if (status && status === 'closed') {
                whereConditions.push({
                    name: 'OrderProduct.orderStatusId',
                    op: 'and',
                    value: 5,
                });
            }
            if (status && status === 'opened') {
                whereConditions.push({
                    name: 'OrderProduct.orderStatusId',
                    op: 'not',
                    value: 5,
                }, {
                    name: 'OrderProduct.cancelRequestStatus',
                    op: 'cancel',
                    value: 1,
                });
            }
            if (status && status === 'cancelled') {
                whereConditions.push({
                    name: 'OrderProduct.cancelRequestStatus',
                    op: 'and',
                    value: 1,
                });
            }
            const sort = [];
            sort.push({
                name: 'OrderProduct.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderCount = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Successfully get Count. ',
                    data: orderCount,
                };
                return response.status(200).send(Response);
            }
            const orderList = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const promises = orderList.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = results;
                const productImage = yield this.productImageService.findOne({
                    where: { productId: results.productId, defaultImage: 1 },
                    select: ['image', 'containerName'],
                });
                if (productImage !== undefined) {
                    temp.image = productImage.image;
                    temp.containerName = productImage.containerName;
                }
                else {
                    temp.image = '';
                    temp.containerName = '';
                }
                const passingOrderStatus = yield this.orderStatusService.findOne({
                    where: {
                        orderStatusId: results.orderProductStatusId,
                    },
                });
                if (passingOrderStatus) {
                    temp.orderStatusName = passingOrderStatus.name;
                    temp.orderStatusColorCode = passingOrderStatus.colorCode;
                }
                const products = yield this.productService.findOne({
                    where: { productId: results.productId },
                    select: ['productSlug', 'name'],
                });
                if (products) {
                    temp.productSlug = products.productSlug;
                    temp.productName = products.name;
                }
                const orderStatus = yield this.orderProductLogService.findOne({
                    where: {
                        orderStatusId: 5,
                        orderProductId: results.orderProductId,
                    },
                });
                if (orderStatus) {
                    temp.deliveryDate = orderStatus.createdDate;
                }
                return results;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order list. ',
                data: (0, class_transformer_1.instanceToPlain)(result),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Customer Order Detail API
    /**
     * @api {get} /api/orders/order-detail My OrderDetail
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId orderProductId
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
     * @apiSampleRequest /api/orders/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderDetail(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = {};
            const orderProduct = yield this.orderProductService.findOne({
                select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'orderId', 'productId', 'createdDate', 'modifiedDate', 'total', 'name', 'productPrice', 'orderProductPrefixId', 'quantity', 'orderStatusId', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'],
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const order = yield this.orderService.findOrder({
                select: ['paymentType', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'shippingCountry', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'paymentPostcode', 'paymentZone', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'customerGstNo'],
                where: {
                    orderId: orderProduct.orderId, customerId: request.user.id,
                },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            const product = yield this.productImageService.findOne({
                select: ['productId', 'image', 'containerName'],
                where: {
                    productId: orderProduct.productId,
                    defaultImage: 1,
                },
            });
            const products = yield this.productService.findOne({
                select: ['productSlug'],
                where: {
                    productId: orderProduct.productId,
                },
            });
            const passingOrderStatus = yield this.orderStatusService.findOne({
                where: {
                    orderStatusId: orderProduct.orderStatusId,
                },
            });
            obj.orderedDate = orderProduct.createdDate;
            obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
            obj.shippingAddress1 = order.shippingAddress1;
            obj.shippingAddress2 = order.shippingAddress2;
            obj.shippingCity = order.shippingCity;
            if (products) {
                obj.productSlug = products.productSlug;
            }
            obj.shippingPostcode = order.shippingPostcode;
            obj.shippingZone = order.shippingZone;
            obj.paymentMethod = order.paymentType;
            obj.total = orderProduct.total;
            if (passingOrderStatus) {
                obj.orderStatus = passingOrderStatus.name;
            }
            obj.currencySymbolLeft = order.currencySymbolLeft;
            obj.currencySymbolRight = order.currencySymbolRight;
            obj.discountAmount = orderProduct.discountAmount;
            obj.discountedAmount = orderProduct.discountedAmount;
            obj.couponDiscountAmount = orderProduct.couponDiscountAmount;
            obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
            obj.customerGstNo = order.customerGstNo;
            obj.paymentAddress1 = order.paymentAddress1;
            obj.paymentAddress2 = order.paymentAddress2;
            obj.paymentCity = order.paymentCity;
            obj.paymentPostcode = order.paymentPostcode;
            obj.paymentZone = order.paymentZone;
            obj.paymentCountry = order.paymentCountry;
            obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
            if (orderProduct.modifiedDate) {
                obj.orderStatusDate = orderProduct.modifiedDate;
            }
            else {
                obj.orderStatusDate = orderProduct.createdDate;
            }
            if (product) {
                obj.productImage = product.image;
                obj.containerName = product.containerName;
            }
            obj.basePrice = orderProduct.basePrice;
            obj.taxValue = orderProduct.taxValue;
            obj.taxType = orderProduct.taxType;
            obj.orderId = orderProduct.orderId;
            obj.orderProductId = orderProduct.orderProductId;
            obj.productId = orderProduct.productId;
            obj.productName = orderProduct.name;
            obj.productQuantity = orderProduct.quantity;
            obj.productPrice = orderProduct.productPrice;
            obj.skuName = orderProduct.skuName;
            const orderStatus = yield this.orderStatusService.findAll({
                select: ['orderStatusId', 'name'],
                where: {
                    isActive: 1,
                },
            });
            const orderProductLog = yield this.orderProductLogService.find({
                select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
                where: {
                    orderProductId: orderProduct.orderProductId,
                },
            });
            const orderStatusDate = orderStatus.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (date === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = date.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(orderStatusDate);
            obj.deliveryStatus = result;
            const rating = undefined;
            if (rating !== undefined) {
                obj.rating = rating.rating;
                obj.review = rating.review;
            }
            else {
                obj.rating = 0;
                obj.review = '';
            }
            const successResponse = {
                status: 1,
                message: 'Successfully show the order details',
                data: obj,
            };
            return response.status(200).send(successResponse);
        });
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
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/track-order-product
     * @apiErrorExample {json} Track Order error
     * HTTP/1.1 500 Internal Server Error
     */
    // Track Order Function
    trackOrder(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = {};
            const orderProduct = yield this.orderProductService.findOne({
                select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'trackingNo', 'trackingUrl', 'name', 'productPrice', 'orderId', 'productId', 'orderProductPrefixId', 'total', 'quantity', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'modifiedDate', 'orderStatusId', 'createdDate', 'skuName'],
                where: { orderProductId },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const product = yield this.productImageService.findOne({
                select: ['image', 'containerName', 'productId'],
                where: { productId: orderProduct.productId, defaultImage: 1 },
            });
            const order = yield this.orderService.findOrder({
                select: ['shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'orderPrefixId'],
                where: { orderId: orderProduct.orderId, customerId: request.user.id },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            const passingOrderStatus = yield this.orderStatusService.findOne({
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
            }
            else {
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
            if (product) {
                obj.productImage = product.image;
                obj.containerName = product.containerName;
            }
            const orderStatus = yield this.orderStatusService.findAll({
                select: ['orderStatusId', 'name'],
                where: {
                    isActive: 1,
                },
            });
            const orderProductLog = yield this.orderProductLogService.find({
                select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
                where: {
                    orderProductId: orderProduct.orderProductId,
                },
            });
            const orderStatusDate = orderStatus.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (date === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = date.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(orderStatusDate);
            obj.deliveryStatus = result;
            const successResponse = {
                status: 1,
                message: 'Successfully shown the Track Order.',
                data: obj,
            };
            return response.status(200).send(successResponse);
        });
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
    orderExportPdf(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const orderData = yield this.orderService.findOrder({
                where: { orderId: orderProduct.orderId, customerId: request.user.id }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                    'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                    'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'couponCode', 'discountAmount', 'amount',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            if (!orderData) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            orderData.productList = yield this.orderProductService.find({ where: { orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const rating = undefined;
                    const tempVal = value;
                    tempVal.taxType = value.taxType;
                    tempVal.taxValue = value.taxValue;
                    if (value.taxType === 2) {
                        const price = value.discountAmount === '0.00' || value.discountAmount === null ? +value.basePrice : +value.discountedAmount;
                        tempVal.taxValueInAmount = (price * (+value.taxValue / 100)).toFixed(2);
                    }
                    else {
                        tempVal.taxValueInAmount = value.taxValue;
                    }
                    if (rating !== undefined) {
                        tempVal.rating = rating.rating;
                        tempVal.review = rating.review;
                    }
                    else {
                        tempVal.rating = 0;
                        tempVal.review = '';
                    }
                    return tempVal;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const select = '';
            const relation = [];
            const WhereConditions = [];
            const limit = 1;
            const settings = yield this.settingService.list(limit, select, relation, WhereConditions);
            const settingDetails = settings[0];
            const countryData = yield this.countryService.findOne({ where: { countryId: settingDetails.countryId } });
            const zoneData = yield this.zoneService.findOne({ where: { zoneId: settingDetails.zoneId } });
            orderData.settingDetails = settingDetails;
            orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ';
            orderData.countryData = (countryData !== undefined) ? countryData : ' ';
            orderData.currencyCode = orderData.currencyCode;
            orderData.symbolLeft = orderData.currencySymbolLeft;
            orderData.symbolRight = orderData.currencySymbolRight;
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderProduct.orderStatusId },
                select: ['name', 'colorCode'],
            });
            if (orderStatusData) {
                orderData.orderStatusName = orderStatusData.name;
                orderData.statusColorCode = orderStatusData.colorCode;
            }
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('invoice', orderData);
            const pathName = `./Invoice_${orderData.invoicePrefix + orderData.invoiceNo}.pdf`;
            yield this.pdfService.htmlPdf(htmlData, pathName);
            return new Promise((resolve, reject) => {
                response.download(pathName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(pathName);
                        return response.end();
                    }
                });
            });
        });
    }
    decrypt(text) {
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/order-cancel-reason-list
     * @apiErrorExample {json} order cancel reason List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Abuse Reason list Function
    reasonList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'reason'];
            const ReasonList = yield this.orderCancelReasonService.list(limit, offset, select, 0, 0, count).then((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const mapping = yield value.map((data) => {
                    const temp = data;
                    const reasonData = temp.reason;
                    const resultData = reasonData.charAt(0).toUpperCase() + reasonData.slice(1);
                    temp.reason = resultData;
                    return data;
                });
                const result = yield Promise.all(mapping);
                return result;
            }));
            const successResponse = {
                status: 1,
                message: 'Successfully got Order Cancel Reason list',
                data: ReasonList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // order cancel Request API
    /**
     * @api {post} /api/orders/order-cancel-request order cancel request API
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/order-cancel-request
     * @apiErrorExample {json} Order Cancel Request error
     * HTTP/1.1 500 Internal Server Error
     */
    createOrderCancel(orderCancelParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                where: { orderProductId: orderCancelParam.orderProductId },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const reason = yield this.orderCancelReasonService.findOne({
                where: { id: orderCancelParam.reasonId },
            });
            if (!reason) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid reasonId',
                };
                return response.status(400).send(errorResponse);
            }
            const order = yield this.orderService.findOrder({
                where: { orderId: orderProduct.orderId, customerId: request.user.id },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid request for this user',
                };
                return response.status(400).send(errResponse);
            }
            orderProduct.cancelReason = reason.reason;
            orderProduct.cancelReasonDescription = orderCancelParam.description;
            orderProduct.cancelRequest = 1;
            const orderStatus = yield this.orderStatusService.findOne({
                where: { name: 'order cancelled' },
            });
            orderProduct.orderStatusId = orderStatus ? orderStatus.orderStatusId : 8;
            orderProduct.cancelRequestStatus = 1;
            const orderProductUpdated = yield this.orderProductService.createData(orderProduct);
            if (orderProductUpdated !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Order cancelled',
                    data: orderProductUpdated,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Order cannot be cancelled',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/get-order-payment-status
     * @apiErrorExample {json} Store order error
     * HTTP/1.1 500 Internal Server Error
     */
    // Track Order Function
    getOrderPayment(orderPrefixId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderService.findOrder({
                select: ['paymentStatus', 'orderPrefixId', 'paymentType'],
                where: { orderPrefixId },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got payment.',
                data: order,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.UseBefore)(StoreCategoryValidatorMiddleware_1.StoreCategoryValidator),
    (0, routing_controllers_1.Post)('/customer-checkout'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerCheckoutRequest_1.CustomerCheckoutRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "customerCheckout", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.UseBefore)(StoreCategoryValidatorMiddleware_1.StoreCategoryValidator),
    (0, routing_controllers_1.Post)('/back-order-checkout'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerBackorderRequest_1.CustomerBackorderRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "backOrderCustomerCheckout", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/order-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "orderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/order-detail'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "orderDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/track-order-product'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "trackOrder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/order-export-pdf'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "orderExportPdf", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/order-cancel-reason-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "reasonList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/order-cancel-request'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [OrderCancelRequest_1.OrderCancelRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "createOrderCancel", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-order-payment-status'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderPrefixId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "getOrderPayment", null);
CustomerOrderController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/orders'),
    tslib_1.__metadata("design:paramtypes", [OrderService_1.OrderService,
        OrderProductService_1.OrderProductService,
        OrderTotalService_1.OrderTotalService,
        VendorService_1.VendorService,
        VendorSettingService_1.VendorGlobalSettingService,
        CustomerService_1.CustomerService,
        ProductService_1.ProductService,
        ProductImageService_1.ProductImageService,
        SettingService_1.SettingService,
        EmailTemplateService_1.EmailTemplateService,
        VendorProductService_1.VendorProductService,
        OrderLogService_1.OrderLogService,
        CountryService_1.CountryService,
        PluginService_1.PluginService,
        CurrencyService_1.CurrencyService,
        VendorOrderService_1.VendorOrdersService,
        UserService_1.UserService,
        VendorOrderLogService_1.VendorOrderLogService,
        PdfService_1.PdfService,
        zoneService_1.ZoneService,
        S3Service_1.S3Service,
        OrderStatusService_1.OrderStatusService,
        OrderProductLogService_1.OrderProductLogService,
        CustomerCartService_1.CustomerCartService,
        OrderCancelReasonService_1.OrderCancelReasonService,
        ProductTirePriceService_1.ProductTirePriceService,
        ProductSpecialService_1.ProductSpecialService,
        ProductDiscountService_1.ProductDiscountService,
        VendorInvoiceService_1.VendorInvoiceService,
        VendorInvoiceItemService_1.VendorInvoiceItemService,
        TaxService_1.TaxService,
        ImageService_1.ImageService,
        SkuService_1.SkuService])
], CustomerOrderController);
exports.CustomerOrderController = CustomerOrderController;
//# sourceMappingURL=CustomerOrderController.js.map