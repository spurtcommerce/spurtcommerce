/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, JsonController, Req, Res, Get, QueryParam, Body, UseBefore } from 'routing-controllers';
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
import { SettingService } from '../../core/services/SettingService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { CountryService } from '../../core/services/CountryService';
import { UserService } from '../../core/services/UserService';
import { Customer } from '../../core/models/Customer';
import { PluginService } from '../../core/services/PluginService';
import { CurrencyService } from '../../core/services/CurrencyService';
import { env } from '../../../env';
import { OrderLogService } from '../../core/services/OrderLogService';
import { PdfService } from '../../core/services/PdfService';
import { ZoneService } from '../../core/services/zoneService';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { OrderProductLogService } from '../../core/services/OrderProductLogService';
import { CustomerCartService } from '../../core/services/CustomerCartService';
import { OrderCancelReasonService } from '../../core/services/OrderCancelReasonService';
import { SkuService } from '../../core/services/SkuService';
import { TaxService } from '../../core/services/TaxService';
import { CheckCustomerMiddleware, CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { pluginModule } from '../../../loaders/pluginLoader';

import uncino from 'uncino';
const hooks = uncino();
@JsonController('/orders')
export class CustomerOrderController {
    constructor(
        private orderService: OrderService,
        private orderProductService: OrderProductService,
        private orderTotalService: OrderTotalService,
        private customerService: CustomerService,
        private productService: ProductService,
        private productImageService: ProductImageService,
        private settingService: SettingService,
        private emailTemplateService: EmailTemplateService,
        private orderLogService: OrderLogService,
        private countryService: CountryService,
        private pluginService: PluginService,
        private currencyService: CurrencyService,
        private userService: UserService,
        private pdfService: PdfService,
        private zoneService: ZoneService,
        private s3Service: S3Service,
        private orderStatusService: OrderStatusService,
        private orderProductLogService: OrderProductLogService,
        private customerCartService: CustomerCartService,
        private orderCancelReasonService: OrderCancelReasonService,
        private taxService: TaxService,
        private imageService: ImageService,
        private skuService: SkuService) {
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
    @UseBefore(CheckTokenMiddleware)
    @Post('/customer-checkout')
    public async customerCheckout(@Body({ validate: true }) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        // remove's hook if in memory..
        hooks.removeHook('coupon-validator', 'C1-namespace');
        hooks.removeHook('coupon', 'C2-namespace');
        // --
        const logo = await this.settingService.findOne();
        const coupon = {
            couponCode: checkoutParam.couponCode,
            couponData: checkoutParam.couponData,
            couponDiscount: checkoutParam.couponDiscountAmount,
        };

        // Coupon Validation
        if (pluginModule.includes('Coupon')) {
            hooks.addHook('coupon-validator', 'C1-namespace', async () => {
                const importPath = '../../../../add-ons/Coupon/coupon';
                const Coupon = await require(importPath);
                const pluginResponse: any = await Coupon.process(coupon);
                return pluginResponse;
            });
            const couponResponse = await hooks.runHook('coupon-validator');
            if (couponResponse === 'error') {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Coupon',
                });
            }
        }
        // --

        const dynamicData: any = {};
        const orderProducts: any = checkoutParam.productDetails;
        for (const val of orderProducts) {
            /// for find product price with tax
            let price: any;
            let taxType: any;
            let taxValue: any;
            let tirePrice: any;
            let priceWithTax: any;
            const productTire = await this.productService.findOne({ where: { productId: val.productId } });
            taxType = productTire.taxType;
            if (taxType === 2 && taxType) {
                const tax = await this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                taxValue = (tax !== undefined) ? tax.taxPercentage : 0;
            } else if (taxType === 1 && taxType) {
                taxValue = productTire.taxValue;
            }
            const sku = await this.skuService.findOne({ where: { skuName: val.skuName } });
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
            const obj: any = {};
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
        const plugin = await this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
        if (plugin === undefined) {
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
                    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                    if (!checkoutParam.password.match(pattern)) {
                        const passwordValidatingMessage = [];
                        passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                        const errResponse: any = {
                            status: 0,
                            message: "You have an error in your request's body. Check 'errors' field for more details!",
                            data: { message: passwordValidatingMessage },
                        };
                        return response.status(422).send(errResponse);
                    }
                    const partsOfThreeLetters = checkoutParam.emailId.match(/.{3}/g).concat(
                        checkoutParam.emailId.substr(1).match(/.{3}/g),
                        checkoutParam.emailId.substr(2).match(/.{3}/g));
                    const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(checkoutParam.password);
                    if (matchEmail === true) {
                        const validationMessage = [];
                        validationMessage.push('Password must not contain any duplicate part of the email address');
                        const passwordDuplicateErrorResponse: any = {
                            status: 0,
                            message: "You have an error in your request's body. Check 'errors' field for more details!",
                            data: { message: validationMessage },
                        };
                        return response.status(422).send(passwordDuplicateErrorResponse);
                    }
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
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    const redirectUrl = env.storeRedirectUrl;
                    const mailContent: any = {};
                    mailContent.logo = logo;
                    mailContent.emailContent = message;
                    mailContent.redirectUrl = redirectUrl;
                    mailContent.productDetailData = undefined;
                    MAILService.sendMail(mailContent, resultDatas.email, emailContents.subject, false, false, '');
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
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
        const country = await this.countryService.findOne({
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
        const paymentCountry = await this.countryService.findOne({
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
        const setting = await this.settingService.findOne();
        newOrder.orderStatusId = setting ? setting.orderStatus : 0;
        newOrder.invoicePrefix = setting ? setting.invoicePrefix : '';
        const currencyVal = await this.currencyService.findOne(setting.storeCurrencyId);
        newOrder.currencyCode = currencyVal ? currencyVal.code : '';
        newOrder.currencyValue = currencyVal ? currencyVal.value : '';
        newOrder.currencySymbolLeft = currencyVal ? currencyVal.symbolLeft : '';
        newOrder.currencySymbolRight = currencyVal ? currencyVal.symbolRight : '';
        newOrder.currencyValue = currencyVal ? currencyVal.value : '';
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        const orderData = await this.orderService.create(newOrder);
        await this.orderLogService.create(orderData);
        const currencySymbol = await this.currencyService.findOne(setting.storeCurrencyId);
        orderData.currencyRight = currencySymbol ? currencySymbol.symbolRight : '';
        orderData.currencyLeft = currencySymbol ? currencySymbol.symbolLeft : '';
        orderProduct = checkoutParam.productDetails;
        let j = 1;
        for (i = 0; i < orderProduct.length; i++) {
            ///// finding price from backend ends /////
            const dynamicPrices = dynamicData[orderProduct[i].skuName];
            const productDetails = new OrderProduct();
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
            const productInformation = await this.orderProductService.createData(productDetails);
            await this.orderProductLogService.create(productInformation);
            // Remove product from Cart..!
            const customerCartCondition: any = {};
            customerCartCondition.productId = orderProduct[i].productId;
            customerCartCondition.customerId = orderData.customerId;
            const cart = await this.customerCartService.findOne({ where: customerCartCondition });
            if (cart !== undefined) {
                await this.customerCartService.delete(cart.id);
            }
            const productImageData = await this.productService.findOne(productInformation.productId);
            let productImageDetail;
            productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
            j++;
        }

        // Coupon Code Plugin
        let couponData: {
            total: any,
            couponCode: string,
            discountAmount: any
        } = { total: 0, couponCode: '', discountAmount: 0 };
        if (pluginModule.includes('Coupon')) {
            hooks.addHook('coupon', 'C2-namespace', async () => {
                const importPath = '../../../../add-ons/Coupon/coupon';
                const Coupon = await require(importPath);
                const pluginResponse: any = await Coupon.process(coupon, orderData, dynamicData, totalAmount);
                return pluginResponse;
            });
            couponData = await hooks.runHook('coupon');
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
        } else {
            newOrder.amount = totalAmount;
            newOrder.total = totalAmount;
            newOrderTotal.value = totalAmount;
        }
        await this.orderService.update(orderData.orderId, newOrder);
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const adminRedirectUrl = env.adminRedirectUrl;
            const adminMailContents: any = {};
            adminMailContents.logo = logo;
            adminMailContents.emailContent = adminMessage;
            adminMailContents.redirectUrl = adminRedirectUrl;
            adminMailContents.productDetailData = productDetailData;
            adminMailContents.today = today;
            adminMailContents.orderData = orderData;
            MAILService.sendMail(adminMailContents, adminId, adminEmailContent.subject, false, false, '');
            const storeRedirectUrl = env.storeRedirectUrl;
            const storeMailContents: any = {};
            storeMailContents.logo = logo;
            storeMailContents.emailContent = customerMessage;
            storeMailContents.redirectUrl = storeRedirectUrl;
            storeMailContents.productDetailData = productDetailData;
            storeMailContents.today = today;
            storeMailContents.orderData = orderData;
            MAILService.sendMail(storeMailContents, orderData.email, emailContent.subject, false, false, '');
            const order = await this.orderService.findOrder(orderData.orderId);
            order.paymentType = plugin ? plugin.pluginName : '';
            order.productDetail = await this.orderProductService.find({ where: { orderId: orderData.orderId } }).then((val) => {
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

            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            orderData.paymentProcess = 0;
            await this.orderService.update(orderData.orderId, orderData);
            let route = env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            if (plugin.pluginName === 'razorpay' && checkoutParam.isMobile) {
                route = env.baseUrl + pluginInfo.processAPIRoute + '/' + orderData.orderPrefixId;
                return response.status(200).send({
                    status: 4,
                    message: 'Redirect to this url',
                    data: route,
                });
            }
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
    @UseBefore(CheckCustomerMiddleware)
    @Get('/order-list')
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
            whereConditions.push(
                {
                    name: 'OrderProduct.orderStatusId',
                    op: 'not',
                    value: 5,
                },
                {
                    name: 'OrderProduct.cancelRequestStatus',
                    op: 'cancel',
                    value: 1,
                });
        }
        if (status && status === 'cancelled') {
            whereConditions.push(
                {
                    name: 'OrderProduct.cancelRequestStatus',
                    op: 'and',
                    value: 1,
                }
            );
        }
        const sort = [];
        sort.push({
            name: 'OrderProduct.createdDate',
            order: 'DESC',
        });
        if (count) {
            const orderCount: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Successfully get Count. ',
                data: orderCount,
            };
            return response.status(200).send(Response);
        }
        const orderList: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const promises = orderList.map(async (results: any) => {
            const temp = results;
            const productImage = await this.productImageService.findOne({
                where: { productId: results.productId, defaultImage: 1 },
                select: ['image', 'containerName'],
            });
            if (productImage !== undefined) {
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
                select: ['productSlug', 'name'],
            });
            if (products) {
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
            message: 'Successfully shown the order list. ',
            data: instanceToPlain(result),
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
    public async orderExportPdf(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderProduct = await this.orderProductService.findOne({
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderProduct.orderId, customerId: request.user.id }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'amount',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        if (!orderData) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid Order for this customer',
            };
            return response.status(400).send(errResponse);
        }
        orderData.productList = await this.orderProductService.find({ where: { orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue'] }).then((val) => {
            const productVal = val.map(async (value: any) => {
                const rating = undefined;
                const tempVal: any = value;
                tempVal.taxType = value.taxType;
                tempVal.taxValue = value.taxValue;
                if (value.taxType === 2) {
                    const price = +value.basePrice;
                    tempVal.taxValueInAmount = (price * (+value.taxValue / 100)).toFixed(2);
                } else {
                    tempVal.taxValueInAmount = value.taxValue;
                }
                if (rating !== undefined) {
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
        const select = '';
        const relation = [];
        const WhereConditions = [];
        const limit = 1;

        const settings: any = await this.settingService.list(limit, select, relation, WhereConditions);
        const settingDetails = settings[0];
        const countryData: any = await this.countryService.findOne({ where: { countryId: settingDetails.countryId } });
        const zoneData: any = await this.zoneService.findOne({ where: { zoneId: settingDetails.zoneId } });
        orderData.settingDetails = settingDetails;
        orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ';
        orderData.countryData = (countryData !== undefined) ? countryData : ' ';
        orderData.currencyCode = orderData.currencyCode;
        orderData.symbolLeft = orderData.currencySymbolLeft;
        orderData.symbolRight = orderData.currencySymbolRight;
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderProduct.orderStatusId },
            select: ['name', 'colorCode'],
        });
        if (orderStatusData) {
            orderData.orderStatusName = orderStatusData.name;
            orderData.statusColorCode = orderStatusData.colorCode;
        }
        let image: any;
        if (env.imageserver === 's3') {
            image = await this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
        } else {
            image = await this.imageService.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
        }
        orderData.logo = image;
        const htmlData = await this.pdfService.readHtmlToString('invoice', orderData);
        const pdfBinary = await this.pdfService.createPDFFile(htmlData, true, '');
        return response.status(200).send({
            data: pdfBinary,
            status: 1,
            message: 'pdf exported',
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
            where: { orderId: orderProduct.orderId, customerId: request.user.id },
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
        orderProduct.orderStatusId = orderStatus ? orderStatus.orderStatusId : 8;
        orderProduct.cancelRequestStatus = 1;
        const orderProductUpdated = await this.orderProductService.createData(orderProduct);
        if (orderProductUpdated !== undefined) {
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
    @UseBefore(CheckCustomerMiddleware)
    @Get('/order-detail')
    public async orderDetail(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const obj: any = {};
        const orderProduct = await this.orderProductService.findOne({
            select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'orderId', 'productId', 'createdDate', 'modifiedDate', 'total', 'name', 'productPrice', 'orderProductPrefixId', 'quantity', 'orderStatusId', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'],
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const order = await this.orderService.findOrder({
            select: ['paymentType', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'shippingCountry', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'paymentPostcode', 'paymentZone', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'customerGstNo'],
            where: {
                orderId: orderProduct.orderId, customerId: request.user.id,
            },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid order for this customer',
            };
            return response.status(400).send(errResponse);
        }
        const product = await this.productImageService.findOne({
            select: ['productId', 'image', 'containerName'],
            where: {
                productId: orderProduct.productId,
                defaultImage: 1,
            },
        });
        const products = await this.productService.findOne({
            select: ['productSlug'],
            where: {
                productId: orderProduct.productId,
            },
        });
        const passingOrderStatus = await this.orderStatusService.findOne({
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
        } else {
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
        const orderStatus = await this.orderStatusService.findAll({
            select: ['orderStatusId', 'name'],
            where: {
                isActive: 1,
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
        const rating = undefined;
        if (rating !== undefined) {
            obj.rating = rating.rating;
            obj.review = rating.review;
        } else {
            obj.rating = 0;
            obj.review = '';
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully show the order details',
            data: obj,
        };
        return response.status(200).send(successResponse);
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
            message: 'Successfully got payment.',
            data: order,
        };
        return response.status(200).send(successResponse);
    }

}
