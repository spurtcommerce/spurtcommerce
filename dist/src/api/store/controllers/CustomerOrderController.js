"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
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
const PluginService_1 = require("../../core/services/PluginService");
const CurrencyService_1 = require("../../core/services/CurrencyService");
const env_1 = require("../../../env");
const OrderLogService_1 = require("../../core/services/OrderLogService");
const PdfService_1 = require("../../core/services/PdfService");
const zoneService_1 = require("../../core/services/zoneService");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const OrderProductLogService_1 = require("../../core/services/OrderProductLogService");
const CustomerCartService_1 = require("../../core/services/CustomerCartService");
const OrderCancelReasonService_1 = require("../../core/services/OrderCancelReasonService");
const SkuService_1 = require("../../core/services/SkuService");
const TaxService_1 = require("../../core/services/TaxService");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const pluginLoader_1 = require("../../../loaders/pluginLoader");
const uncino_1 = tslib_1.__importDefault(require("uncino"));
const hooks = (0, uncino_1.default)();
let CustomerOrderController = class CustomerOrderController {
    constructor(orderService, orderProductService, orderTotalService, customerService, productService, productImageService, settingService, emailTemplateService, orderLogService, countryService, pluginService, currencyService, userService, pdfService, zoneService, s3Service, orderStatusService, orderProductLogService, customerCartService, orderCancelReasonService, taxService, imageService, skuService) {
        this.orderService = orderService;
        this.orderProductService = orderProductService;
        this.orderTotalService = orderTotalService;
        this.customerService = customerService;
        this.productService = productService;
        this.productImageService = productImageService;
        this.settingService = settingService;
        this.emailTemplateService = emailTemplateService;
        this.orderLogService = orderLogService;
        this.countryService = countryService;
        this.pluginService = pluginService;
        this.currencyService = currencyService;
        this.userService = userService;
        this.pdfService = pdfService;
        this.zoneService = zoneService;
        this.s3Service = s3Service;
        this.orderStatusService = orderStatusService;
        this.orderProductLogService = orderProductLogService;
        this.customerCartService = customerCartService;
        this.orderCancelReasonService = orderCancelReasonService;
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
     *      "vendorId" : ""
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // remove's hook if in memory..
            hooks.removeHook('coupon-validator', 'C1-namespace');
            hooks.removeHook('coupon', 'C2-namespace');
            // --
            const logo = yield this.settingService.findOne();
            const coupon = {
                couponCode: checkoutParam.couponCode,
                couponData: checkoutParam.couponData,
                couponDiscount: checkoutParam.couponDiscountAmount,
            };
            // Coupon Validation
            if (pluginLoader_1.pluginModule.includes('Coupon')) {
                hooks.addHook('coupon-validator', 'C1-namespace', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const importPath = '../../../../add-ons/Coupon/coupon';
                    const Coupon = yield require(importPath);
                    const pluginResponse = yield Coupon.process(coupon);
                    return pluginResponse;
                }));
                const couponResponse = yield hooks.runHook('coupon-validator');
                if (couponResponse === 'error') {
                    return response.status(400).send({
                        status: 0,
                        message: 'Invalid Coupon',
                    });
                }
            }
            // --
            const dynamicData = {};
            const orderProducts = checkoutParam.productDetails;
            for (const val of orderProducts) {
                /// for find product price with tax
                let price;
                let taxType;
                let taxValue;
                let tirePrice;
                let priceWithTax;
                const productTire = yield this.productService.findOne({ where: { productId: val.productId } });
                taxType = productTire.taxType;
                if (taxType === 2 && taxType) {
                    const tax = yield this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                    taxValue = (tax !== undefined) ? tax.taxPercentage : 0;
                }
                else if (taxType === 1 && taxType) {
                    taxValue = productTire.taxValue;
                }
                const sku = yield this.skuService.findOne({ where: { skuName: val.skuName } });
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
                const obj = {};
                obj.skuPrice = sku ? sku.price : productTire.price;
                obj.skuId = sku ? sku.id : productTire.skuId;
                obj.price = price;
                obj.taxType = taxType;
                obj.taxValue = taxValue;
                obj.tirePrice = tirePrice;
                obj.productTire = productTire;
                obj.quantity = val.quantity;
                dynamicData[val.skuName] = obj;
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
                        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                        if (!checkoutParam.password.match(pattern)) {
                            const passwordValidatingMessage = [];
                            passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                            const errResponse = {
                                status: 0,
                                message: "You have an error in your request's body. Check 'errors' field for more details!",
                                data: { message: passwordValidatingMessage },
                            };
                            return response.status(422).send(errResponse);
                        }
                        const partsOfThreeLetters = checkoutParam.emailId.match(/.{3}/g).concat(checkoutParam.emailId.substr(1).match(/.{3}/g), checkoutParam.emailId.substr(2).match(/.{3}/g));
                        const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(checkoutParam.password);
                        if (matchEmail === true) {
                            const validationMessage = [];
                            validationMessage.push('Password must not contain any duplicate part of the email address');
                            const passwordDuplicateErrorResponse = {
                                status: 0,
                                message: "You have an error in your request's body. Check 'errors' field for more details!",
                                data: { message: validationMessage },
                            };
                            return response.status(422).send(passwordDuplicateErrorResponse);
                        }
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
            newOrder.paymentFirstname = checkoutParam.paymentFirstName;
            newOrder.paymentLastname = checkoutParam.paymentLastName;
            newOrder.paymentAddress1 = checkoutParam.paymentAddress_1;
            newOrder.paymentAddress2 = checkoutParam.paymentAddress_2;
            newOrder.paymentCompany = checkoutParam.paymentCompany;
            const paymentCountry = yield this.countryService.findOne({
                where: {
                    countryId: checkoutParam.paymentCountryId,
                },
            });
            if (paymentCountry) {
                newOrder.paymentCountry = paymentCountry.name;
            }
            newOrder.paymentCity = checkoutParam.paymentCity;
            newOrder.paymentZone = checkoutParam.paymentZone;
            newOrder.paymentPostcode = checkoutParam.paymentPostCode;
            newOrder.paymentMethod = checkoutParam.paymentMethod;
            newOrder.customerGstNo = checkoutParam.taxNumber;
            newOrder.ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            newOrder.isActive = 1;
            const setting = yield this.settingService.findOne();
            newOrder.orderStatusId = setting ? setting.orderStatus : 0;
            newOrder.invoicePrefix = setting ? setting.invoicePrefix : '';
            const currencyVal = yield this.currencyService.findOne(setting.storeCurrencyId);
            newOrder.currencyCode = currencyVal ? currencyVal.code : '';
            newOrder.currencyValue = currencyVal ? currencyVal.value : '';
            newOrder.currencySymbolLeft = currencyVal ? currencyVal.symbolLeft : '';
            newOrder.currencySymbolRight = currencyVal ? currencyVal.symbolRight : '';
            newOrder.currencyValue = currencyVal ? currencyVal.value : '';
            newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
            const orderData = yield this.orderService.create(newOrder);
            yield this.orderLogService.create(orderData);
            const currencySymbol = yield this.currencyService.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol ? currencySymbol.symbolRight : '';
            orderData.currencyLeft = currencySymbol ? currencySymbol.symbolLeft : '';
            orderProduct = checkoutParam.productDetails;
            let j = 1;
            for (i = 0; i < orderProduct.length; i++) {
                ///// finding price from backend ends /////
                const dynamicPrices = dynamicData[orderProduct[i].skuName];
                const productDetails = new OrderProduct_1.OrderProduct();
                productDetails.productId = orderProduct[i].productId;
                const nwDate = new Date();
                const odrDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
                productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + j;
                productDetails.name = orderProduct[i].name;
                productDetails.orderId = orderData.orderId;
                productDetails.quantity = orderProduct[i].quantity;
                productDetails.productPrice = dynamicPrices.price;
                productDetails.basePrice = dynamicPrices.skuPrice;
                productDetails.taxType = dynamicPrices.taxType;
                productDetails.taxValue = dynamicPrices.taxValue;
                productDetails.total = +orderProduct[i].quantity * dynamicPrices.price;
                productDetails.model = dynamicPrices.productTire.name;
                productDetails.skuName = orderProduct[i].skuName ? orderProduct[i].skuName : '';
                productDetails.orderStatusId = 1;
                const productInformation = yield this.orderProductService.createData(productDetails);
                yield this.orderProductLogService.create(productInformation);
                // Remove product from Cart..!
                const customerCartCondition = {};
                customerCartCondition.productId = orderProduct[i].productId;
                customerCartCondition.customerId = orderData.customerId;
                const cart = yield this.customerCartService.findOne({ where: customerCartCondition });
                if (cart !== undefined) {
                    yield this.customerCartService.delete(cart.id);
                }
                ///// for saving vendor orders ends //////
                const productImageData = yield this.productService.findOne(productInformation.productId);
                let productImageDetail;
                productImageDetail = yield this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                totalProductAmount = yield this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
                for (n = 0; n < totalProductAmount.length; n++) {
                    totalAmount += +totalProductAmount[n].total;
                }
                productDetailData.push(productImageData);
                j++;
            }
            // Coupon Code Plugin
            let couponData = { total: 0, couponCode: '', discountAmount: 0 };
            if (pluginLoader_1.pluginModule.includes('Coupon')) {
                hooks.addHook('coupon', 'C2-namespace', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const importPath = '../../../../add-ons/Coupon/coupon';
                    const Coupon = yield require(importPath);
                    const pluginResponse = yield Coupon.process(coupon, orderData, dynamicData, totalAmount);
                    return pluginResponse;
                }));
                couponData = yield hooks.runHook('coupon');
            }
            // ---
            newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
            const nowDate = new Date();
            const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
            newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
            newOrderTotal.orderId = orderData.orderId;
            if (couponData.discountAmount) {
                newOrder.total = couponData.total;
                newOrder.couponCode = couponData.couponCode;
                newOrder.discountAmount = couponData.discountAmount;
                newOrder.amount = totalAmount;
                newOrderTotal.value = totalAmount - couponData.discountAmount;
            }
            else {
                newOrder.amount = totalAmount;
                newOrder.total = totalAmount;
                newOrderTotal.value = totalAmount;
            }
            yield this.orderService.update(orderData.orderId, newOrder);
            yield this.orderTotalService.createOrderTotalData(newOrderTotal);
            if (plugin.pluginName === 'CashOnDelivery') {
                const emailContent = yield this.emailTemplateService.findOne(5);
                const adminEmailContent = yield this.emailTemplateService.findOne(6);
                const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
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
                mail_services_1.MAILService.sendMail(storeMailContents, orderData.email, emailContent.subject, false, false, '');
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
                let route = env_1.env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
                if (plugin.pluginName === 'razorpay' && checkoutParam.isMobile) {
                    route = env_1.env.baseUrl + pluginInfo.processAPIRoute + '/' + orderData.orderPrefixId;
                    return response.status(200).send({
                        status: 4,
                        message: 'Redirect to this url',
                        data: route,
                    });
                }
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
                    'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'amount',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            if (!orderData) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            orderData.productList = yield this.orderProductService.find({ where: { orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const rating = undefined;
                    const tempVal = value;
                    tempVal.taxType = value.taxType;
                    tempVal.taxValue = value.taxValue;
                    if (value.taxType === 2) {
                        const price = +value.basePrice;
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
            const pdfBinary = yield this.pdfService.createPDFFile(htmlData, true, '');
            return response.status(200).send({
                data: pdfBinary,
                status: 1,
                message: 'pdf exported',
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
    (0, routing_controllers_1.Post)('/customer-checkout'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerCheckoutRequest_1.CustomerCheckoutRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "customerCheckout", null);
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
    (0, routing_controllers_1.Post)('/order-cancel-request'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [OrderCancelRequest_1.OrderCancelRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "createOrderCancel", null);
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
        CustomerService_1.CustomerService,
        ProductService_1.ProductService,
        ProductImageService_1.ProductImageService,
        SettingService_1.SettingService,
        EmailTemplateService_1.EmailTemplateService,
        OrderLogService_1.OrderLogService,
        CountryService_1.CountryService,
        PluginService_1.PluginService,
        CurrencyService_1.CurrencyService,
        UserService_1.UserService,
        PdfService_1.PdfService,
        zoneService_1.ZoneService,
        S3Service_1.S3Service,
        OrderStatusService_1.OrderStatusService,
        OrderProductLogService_1.OrderProductLogService,
        CustomerCartService_1.CustomerCartService,
        OrderCancelReasonService_1.OrderCancelReasonService,
        TaxService_1.TaxService,
        ImageService_1.ImageService,
        SkuService_1.SkuService])
], CustomerOrderController);
exports.CustomerOrderController = CustomerOrderController;
//# sourceMappingURL=CustomerOrderController.js.map