/*
 * spurtcommerce community API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Post, JsonController, Req, Res, Get, QueryParam, Body, Authorized} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import {CustomerCheckoutRequest} from './requests/CustomerCheckoutRequest';
import {OrderService} from '../../services/OrderService';
import {OrderProductService} from '../../services/OrderProductService';
import {OrderTotalService} from '../../services/OrderTotalService';
import {Order} from '../../models/Order';
import {OrderProduct} from '../../models/OrderProduct';
import {OrderTotal} from '../../models/OrderTotal';
import {MAILService} from '../../../auth/mail.services';
import {ProductService} from '../../services/ProductService';
import {ProductImageService} from '../../services/ProductImageService';
import {SettingService} from '../../services/SettingService';
import {EmailTemplateService} from '../../services/EmailTemplateService';
import {CountryService} from '../../services/CountryService';
import {UserService} from '../../services/UserService';

@JsonController('/orders')
export class CustomerOrderController {
    constructor(private orderService: OrderService, private orderProductService: OrderProductService, private orderTotalService: OrderTotalService,
                private productService: ProductService, private productImageService: ProductImageService, private settingService: SettingService,
                private emailTemplateService: EmailTemplateService,
                private countryService: CountryService,   private userService: UserService) {
    }

    // customer checkout
    /**
     * @api {post} /api/orders/customer-checkout Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {String} shippingFirstName Shipping First name
     * @apiParam (Request body) {String} shippingLastName Shipping Last Name
     * @apiParam (Request body) {String} shippingCompany Shipping Company
     * @apiParam (Request body) {String} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String} shippingAddress_2 Shipping Address 2
     * @apiParam (Request body) {String} shippingCity Shipping City
     * @apiParam (Request body) {Number} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountry Shipping Country
     * @apiParam (Request body) {String} shippingZone Shipping Zone
     * @apiParam (Request body) {String} shippingAddressFormat Shipping Address Format
     * @apiparam (Request body) {Number} phoneNumber Customer Phone Number
     * @apiparam (Request body) {String} emailId Customer Email Id
     * @apiParamExample {json} Input
     * {
     *      "productDetail" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountry" : "",
     *      "shippingZone" : "",
     *      "shippingAddressFormat" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
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
    @Post('/customer-checkout')
    @Authorized('customer')
    public async customerCheckout(@Body({validate: true}) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        const errProd: any = [];
        const orderProducts:  any = checkoutParam.productDetails;
        for (i = 0; i < orderProducts.length; i++) {
            const productValue = await this.productService.findOne({where: {productId: orderProducts[i].productId}});
            if (!productValue) {
                errProd.push(1);
            }
        }
        if (errProd.length > 0) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid product',
            };
            return response.status(400).send(errResponse);
        }
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        newOrder.customerId = request.user.id;
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingCountry = checkoutParam.shippingCountry;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.shippingFirstName;
        newOrder.paymentLastname = checkoutParam.shippingLastName;
        newOrder.paymentAddress1 = checkoutParam.shippingAddress_1;
        newOrder.paymentAddress2 = checkoutParam.shippingAddress_2;
        newOrder.paymentCompany = checkoutParam.shippingCompany;
        newOrder.paymentCity = checkoutParam.shippingCity;
        newOrder.paymentCountry = checkoutParam.shippingCountry;
        newOrder.paymentZone = checkoutParam.shippingZone;
        newOrder.paymentPostcode = checkoutParam.shippingPostCode;
        newOrder.isActive = 1;
        const setting = await this.settingService.findOne();
        newOrder.orderStatusId = setting.orderStatus;
        newOrder.invoicePrefix = setting.invoicePrefix;
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        const orderData = await this.orderService.create(newOrder);
        const countryName = await this.countryService.findOne(orderData.shippingCountry);
        orderData.shippingCountry = countryName ? countryName.name : '';
        orderProduct = checkoutParam.productDetails;
        for (i = 0; i < orderProduct.length; i++) {
            const productValue = await this.productService.findOne({where: {productId: orderProduct[i].productId}});
            const price = productValue.price;
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.name = productValue.name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = price;
            productDetails.total = +orderProduct[i].quantity * +price;
            productDetails.model = productValue.name;
            const productInformation = await this.orderProductService.createData(productDetails);
            const productImageData = await this.productService.findOne(productInformation.productId);
            const productImageDetail = await this.productImageService.findOne({where: {productId: productInformation.productId}});
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
        }
        newOrder.total = totalAmount;
        newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        const resultData = await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.value = totalAmount;
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({select: ['username'], where: {userGroupId : 1, deleteFlag: 0}});
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId);
            MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        }

    // Customer Order List API
    /**
     * @api {get} /api/orders/order-list My Order List
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
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
    @Get('/order-list')
    @Authorized('customer')
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const search = [
            {
                name: 'customerId',
                op: 'where',
                value: request.user.id,
            },
        ];
        const whereConditions = 0;
        const select = ['orderId', 'customerId', 'orderStatus', 'total', 'createdDate', 'orderPrefixId'];
        const relation = ['orderStatus'];
        const OrderData = await this.orderService.list(limit, offset, select, search, whereConditions, relation, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully get Count. ',
                data: OrderData,
            };
            return response.status(200).send(Response);
        }
        const promises = OrderData.map(async (results: any) => {
            const Id = results.orderId;
            const countValue = await this.orderProductService.findAndCount({where: {orderId: Id}});
            results.items = countValue[1];
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list. ',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    // Customer Order Detail API
    /**
     * @api {get} /api/orders/order-detail My OrderDetail
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
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
    @Get('/order-detail')
    @Authorized('customer')
    public async orderDetail(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: {orderId: orderid, customerId: request.user.id},
            select: ['orderId', 'orderStatusId', 'orderPrefixId', 'customerId', 'invoiceNo', 'telephone', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'createdDate'],
        });
        if (!orderData) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid order for this user',
            };
            return response.status(400).send(errResponse);
        }
         orderData.productList = await this.orderProductService.find({
                where: {orderId: orderid},
                select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice'],
            }).then((val) => {
                console.log(val);
                const productVal = val.map(async (value: any) => {
                    const tempVal: any = value;
                    return tempVal;
                });
                const results = Promise.all(productVal);
                return results;
            });
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: orderData,
        };
        return response.status(200).send(successResponse);
    }
}
