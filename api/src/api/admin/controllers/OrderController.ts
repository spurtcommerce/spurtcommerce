/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, QueryParam, Res, Req, Post, Body, Delete, Param, BodyParam, Put } from 'routing-controllers';
import { OrderService } from '../../core/services/OrderService';
import { UpdateOrderChangeStatus } from './requests/UpdateOrderChangeStatus';
import { DeleteOrderRequest } from './requests/DeleteOrderRequest';
import { OrderLogService } from '../../core/services/OrderLogService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { SettingService } from '../../core/services/SettingService';
import { PdfService } from '../../core/services/PdfService';
import { CountryService } from '../../core/services/CountryService';
import { ZoneService } from '../../core/services/zoneService';
import { Payment } from '../../core/models/Payment';
import { PaymentItems } from '../../core/models/PaymentItems';
import { VendorPayment } from '../../core/models/VendorPayment';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { PaymentService } from '../../core/services/PaymentService';
import { PaymentItemsService } from '../../core/services/PaymentItemsService';
import { VendorPaymentService } from '../../core/services/VendorPaymentService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorService } from '../../core/services/VendorService';
import { VendorGlobalSettingService } from '../../core/services/VendorSettingService';
import * as fs from 'fs';
import moment = require('moment');
import { OrderProductLog } from '../../core/models/OrderProductLog';
import { VendorOrderLog } from '../../core/models/VendorOrderLog';
import { OrderProductLogService } from '../../core/services/OrderProductLogService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { VendorOrderLogService } from '../../core/services/VendorOrderLogService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { MAILService } from '../../../auth/mail.services';
import { AddPaymentRequest } from './requests/AddPaymentRequest';
import { PluginService } from '../../core/services/PluginService';
import { ProductService } from '../../core/services/ProductService';
import { PaymentArchiveService } from '../../core/services/PaymentArchiveService';
import { VendorGroupService } from '../../core/services/VendorGroupService';

import { ExportLog } from '../../core/models/ExportLog';
import { ExportLogService } from '../../core/services/ExportLogService';
@JsonController('/order')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private orderLogService: OrderLogService,
        private orderProductService: OrderProductService,
        private pdfService: PdfService,
        private countryService: CountryService,
        private zoneService: ZoneService,
        private settingService: SettingService,
        private s3Service: S3Service,
        private imageService: ImageService,
        private paymentService: PaymentService,
        private paymentItemsService: PaymentItemsService,
        private vendorPaymentService: VendorPaymentService,
        private vendorProductService: VendorProductService,
        private vendorService: VendorService,
        private vendorOrdersService: VendorOrdersService,
        private vendorGlobalSettingService: VendorGlobalSettingService,
        private orderProductLogService: OrderProductLogService,
        private productImageService: ProductImageService,
        private vendorOrderLogService: VendorOrderLogService,
        private emailTemplateService: EmailTemplateService,
        private pluginService: PluginService,
        private orderStatusService: OrderStatusService,
        private productService: ProductService,
        private paymentArchiveService: PaymentArchiveService,
        private vendorGroupService: VendorGroupService,
        private exportLogService: ExportLogService
    ) {
    }

    // order List API
    /**
     * @api {get} /api/order Order List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} orderId search by orderId
     * @apiParam (Request body) {String} orderStatusId search by orderStatusId
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} totalAmount search by totalAmount
     * @apiParam (Request body) {String} dateAdded search by dateAdded
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully shown the order list",
     *      "data":{
     *              "NoOfItems": "",
     *              "orderProductId": "",
     *              "createdDate": "",
     *              "orderPrefixId": "",
     *              "orderId": "",
     *              "shippingFirstname": "",
     *              "total": "",
     *              "currencyCode": "",
     *              "currencySymbolLeft": "",
     *              "currencySymbolRight": "",
     *              "orderStatusId": "",
     *              "modifiedDate": "",
     *              "shippingAddress1": "",
     *              "shippingAddress2": "",
     *              "shippingCity": "",
     *              "shippingPostcode": "",
     *              "shippingZone": ""
     *              }
     * }
     * @apiSampleRequest /api/order
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'list-order'])
    public async orderList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('orderId') orderId: string,
        @QueryParam('orderStatusId') orderStatusId: string,
        @QueryParam('customerName') customerName: string,
        @QueryParam('totalAmount') totalAmount: string,
        @QueryParam('dateAdded') dateAdded: string,
        @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [
            'COUNT(order.orderId) as NoOfItems',
            'MAX(OrderProduct.orderProductId) as orderProductId',
            'order.createdDate as createdDate',
            'order.orderPrefixId as orderPrefixId',
            'order.orderId as orderId',
            'order.shippingFirstname as shippingFirstname',
            'order.total as total',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'MAX(OrderProduct.orderStatusId) as orderStatusId',
            'order.modifiedDate as modifiedDate',
            'MAX(OrderProduct.orderId) as orderId',
            'order.shippingAddress1 as shippingAddress1',
            'order.shippingAddress2 as shippingAddress2',
            'order.shippingCity as shippingCity',
            'order.shippingPostcode as shippingPostcode',
            'order.shippingZone as shippingZone',
        ];

        const relations = [
            {
                tableName: 'OrderProduct.order',
                aliasName: 'order',
            },
        ];
        const groupBy = [{
            name: 'OrderProduct.orderId',
        }];

        const whereConditions = [];

        whereConditions.push({
            name: 'order.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'order.backOrders',
            op: 'and',
            value: 0,
        });

        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['order.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        if (orderId && orderId !== '') {
            searchConditions.push({
                name: ['order.orderPrefixId'],
                value: orderId,
            });
        }

        if (totalAmount && totalAmount !== '') {
            whereConditions.push({
                name: ['order.total'],
                op: 'where',
                value: totalAmount,
            });
        }

        if (orderStatusId && orderStatusId !== '') {
            searchConditions.push({
                name: ['OrderProduct.orderStatusId'],
                value: orderStatusId,
            });
        }
        if (dateAdded) {
            searchConditions.push({
                name: ['OrderProduct.createdDate'],
                value: dateAdded,
            });
        }
        const sort = [];
        sort.push({
            name: 'order.createdDate',
            order: 'DESC',
        });
        if (count) {
            const orderCount: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Successfully got the order count',
                data: orderCount,
            };
            return response.status(200).send(Response);
        }
        const orderList: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list',
            data: orderList,
        };
        return response.status(200).send(successResponse);
    }

    // Sales Report List API
    /**
     * @api {get} /api/order/sales-report-list Sales Report list API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} productId
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got sales report list",
     *      "data":[{
     *               "orderProductId": "" ,
     *               "productName": "",
     *               "productId": "",
     *               "orderId": "",
     *               "firstName": "",
     *               "lastName": "",
     *               "orderProductPrefixId": "",
     *               "quantity": "",
     *               "total": "",
     *               "discountedAmount": "",
     *               "orderStatusId": "",
     *               "discountAmount": "",
     *               "createdDate": "",
     *               "productPrice": "",
     *               "basePrice": "",
     *               "couponDiscountAmount": "",
     *               "orderStatusName": "",
     *               "paymentType": "",
     *               "ipAddress": ""
     *           }],
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/sales-report-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/sales-report-list')
    @Authorized(['admin', 'sales-report-list'])
    public async salesReport(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('categoryId') categoryId: string, @QueryParam('productId') productId: string,
        @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string,
        @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [
            ('DISTINCT OrderProduct.orderProductId as orderProductId'),
            'productInformationDetail.productId as productId',
            'productInformationDetail.name as productName',
            'customer.firstName as firstName',
            'customer.lastName as lastName',
            'OrderProduct.orderProductPrefixId as orderProductPrefixId',
            'OrderProduct.quantity as quantity',
            'OrderProduct.total as total',
            'OrderProduct.discountedAmount as discountedAmount',
            'OrderProduct.orderStatusId as orderStatusId',
            'OrderProduct.discountAmount as discountAmount',
            'OrderProduct.createdDate as createdDate',
            'OrderProduct.productPrice as productPrice',
            'OrderProduct.basePrice as basePrice',
            'OrderProduct.couponDiscountAmount as couponDiscountAmount',
            'orderStatus.name as orderStatusName',
            'customerGroup.name as customerGroup',
            'order.paymentType as paymentType',
            'order.ip as ipAddress'];
        const relations = [];
        const groupBy = [];
        const whereConditions = [];
        whereConditions.push({
            name: '`order`.`payment_process`',
            op: 'and',
            value: 1,
        }, {
            name: '`order`.`payment_status`',
            op: 'and',
            value: 1,
        }, {
            name: '`OrderProduct`.`cancel_request_status`',
            op: 'and',
            value: 0,
        });
        if (productId) {
            relations.push({
                tableName: 'OrderProduct.productInformationDetail',
                aliasName: 'productInformationDetail',
            }, {
                tableName: 'OrderProduct.order',
                aliasName: 'order',
            }, {
                tableName: 'OrderProduct.orderStatus',
                aliasName: 'orderStatus',
            }, {
                tableName: 'order.customer',
                aliasName: 'customer',
            }, {
                tableName: 'customer.customerGroup',
                op: 'left',
                aliasName: 'customerGroup',
            });
            whereConditions.push({
                name: 'OrderProduct.productId',
                op: 'IN',
                value: productId,
            });
        }
        if (startDate && startDate !== '') {
            whereConditions.push({
                name: '`OrderProduct`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });
        }
        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`OrderProduct`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });

        }
        const searchConditions = [];
        const sort = [];
        sort.push({
            name: 'OrderProduct.createdDate',
            order: 'DESC',
        });
        const orderList: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const result: any = [];
        let total: any = 0;
        const groupByKey = key => array =>
            array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
        const groupByType = groupByKey('productName');
        const groupByPeriodTypeArray = groupByType(orderList);
        const groupByPeriodTypeObject = Object.keys(groupByPeriodTypeArray);
        if (groupByPeriodTypeObject && groupByPeriodTypeObject.length > 0) {
            groupByPeriodTypeObject.forEach((periodType: any) => {
                const temp: any = {};
                temp.productName = periodType;
                temp.buyers = groupByPeriodTypeArray[periodType] && groupByPeriodTypeArray[periodType].length > 0 ? groupByPeriodTypeArray[periodType] : [];
                for (const val of groupByPeriodTypeArray[periodType]) {
                    total += +val.total;
                }
                result.push(temp);
            });
        }
        const orderCount: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the sales report list',
            data: result, total, orderCount,
        };
        return response.status(200).send(successResponse);
    }

    // Dashboard Transaction List API
    /**
     * @api {get} /api/order/transaction-list Dashboard Transaction List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} year year
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get transaction list",
     *      "data":{
     *      }
     * }
     * @apiSampleRequest /api/order/transaction-list
     * @apiErrorExample {json} transaction list error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/transaction-list')
    @Authorized()
    public async transactionList(@QueryParam('year') year: number, @Res() response: any): Promise<any> {
        const transactionlist = await this.orderService.transactionList(year);
        return response.status(200).send({
            status: 1,
            message: 'Successfully got the transaction list',
            data: transactionlist,
        });
    }

    // sales Graph List API
    /**
     * @api {get} /api/order/sales-graph-list Sales Graph List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} year year
     * @apiParam (Request body) {String} month month
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get sales graph list",
     *      "data":{
     *      }
     * }
     * @apiSampleRequest /api/order/sales-graph-list
     * @apiErrorExample {json} sales error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/sales-graph-list')
    @Authorized()
    public async salesGraphList(@QueryParam('year') year: string, @QueryParam('month') month: string, @Res() response: any): Promise<any> {
        const orderList = await this.orderProductService.salesGraphList(year, month);
        const promises = orderList.map(async (result: any) => {
            const temp: any = result;
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the sales count list',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
    }

    // Product list API
    /**
     * @api {get} /api/order/product-list Product list API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Limit suggestion Showing Successfully..!",
     *      "status": "1",
     *      "data": "[{
     *                 "productId": 1678,
     *                 "productToCategoryId": 7639,
     *                 "categoryId": 314,
     *                 "name": "HP Laser MFP 1188fnw, Wireless, Print, Copy, Scan",
     *                 "categoryName": "Multifunction Printer"
     *              }]",
     * }
     * @apiSampleRequest /api/order/product-list
     * @apiErrorExample {json} Customer Limits error
     * HTTP/1.1 500 Internal Server Error
     */
    // Product List Function
    @Get('/product-list')
    @Authorized('')
    public async productList(
        @Res() response: any
    ): Promise<any> {
        const select = [
            ('DISTINCT Product.productId as productId'),
            'MAX(productToCategory.productToCategoryId) as productToCategoryId',
            'MAX(productToCategory.categoryId) as categoryId',
            'Product.name as name',
            'MAX(category.name) as categoryName'];
        const whereCondition = [];
        const searchConditions = [];
        const relations = [{
            tableName: 'Product.productToCategory',
            op: 'left',
            aliasName: 'productToCategory',
        }, {
            tableName: 'productToCategory.category',
            op: 'left',
            aliasName: 'category',
        }];
        const groupBy = [{
            name: 'Product.productId',
        }];
        const sort = [];
        sort.push({
            name: 'Product.createdDate',
            order: 'DESC',
        });
        const productData: any = await this.productService.listByQueryBuilder(0, 0, select, whereCondition, searchConditions, relations, groupBy, sort, false, true);
        // _.groupBy(productData, 'make')
        const successResponse: any = {
            status: 1,
            message: 'Limit suggestion Showing Successfully',
            data: productData,
        };
        return response.status(200).send(successResponse);
    }

    //  Order Export PDF API
    /**
     * @api {get} /api/order/order-export-pdf  Order Export PDF API
     * @apiGroup Order
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
     * @apiSampleRequest /api/order/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/order-export-pdf')
    // @Authorized()
    public async orderExportPdf(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
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
                image = await this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '110', '30');
            } else {
                image = await this.imageService.resizeImageBase64(settingDetails.invoiceLogoPath + settingDetails.invoiceLogo, '110', '30');
            }
        } catch (error: any) {
            return response.status(400).send({
                data: settingDetails.invoiceLogo,
                error: error.message,
            });
        }
        orderData.logo = image;
        const htmlData = await this.pdfService.readHtmlToString('invoice', orderData);
        const pathName = `./Invoice_${orderData.invoicePrefix + orderData.invoiceNo}.pdf`;
        await this.pdfService.htmlPdf(htmlData, pathName);
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

    // sales List API
    /**
     * @api {get} /api/order/saleslist Sales List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get sales count list",
     *      "data": [{
     *                "ordercount": "",
     *                "month": "",
     *                "year": "",
     *                "monthYear": ""
     *              }]
     * }
     * @apiSampleRequest /api/order/saleslist
     * @apiErrorExample {json} sales error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/saleslist')
    @Authorized(['admin', 'list-sales'])
    public async salesList(@QueryParam('year') year: string, @Res() response: any): Promise<any> {
        const orderList = await this.orderService.salesList();
        const promises = orderList.map(async (result: any) => {
            const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
            ];
            const temp: any = result;
            temp.monthYear = monthNames[result.month] + '-' + result.year;
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the sales count list',
            data: finalResult,
        };
        return response.status(200).send(successResponse);

    }

    // total order amount API
    /**
     * @api {get} /api/order/total-order-amount Total Order Amount API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get total order amount",
     *      "data":{
     *      "count" : "",
     *      }
     * }
     * @apiSampleRequest /api/order/total-order-amount
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/total-order-amount')
    @Authorized()
    public async totalOrderAmount(@Res() response: any): Promise<any> {
        let total = 0;
        const order = await this.orderService.findAll();
        let n = 0;
        for (n; n < order.length; n++) {
            total += +order[n].total;
        }
        if (order) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the total order amount',
                data: total,
            };

            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get the total order amount',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Today order amount API
    /**
     * @api {get} /api/order/today-order-amount Today Order Amount API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get today order amount",
     *      "data":{
     *      }
     * }
     * @apiSampleRequest /api/order/today-order-amount
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/today-order-amount')
    @Authorized()
    public async todayOrderAmount(@Res() response: any): Promise<any> {
        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        let total = 0;
        const order = await this.orderService.findAlltodayOrder(todaydate);
        let n = 0;
        for (n; n < order.length; n++) {
            total += +order[n].total;
        }
        if (order) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the today order amount',
                data: total,
            };

            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to got the today order amount',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Today order count API
    /**
     * @api {get} /api/order/today-order-count Today OrderCount API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/today-order-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/today-order-count')
    @Authorized()
    public async orderCount(@Res() response: any): Promise<any> {

        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();

        const orderCount = await this.orderService.findAllTodayOrderCount(todaydate);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the Today order count',
            data: orderCount,
        };
        return response.status(200).send(successResponse);

    }

    // Change order Status API
    /**
     * @api {post} /api/order/order-change-status Change Order Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {Number} orderStatusId order Status Id
     * @apiParamExample {json} Input
     * {
     *   "orderDetails" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated order change status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/order-change-status
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/order-change-status')
    @Authorized(['admin', 'update-order-status'])
    public async orderChangeStatus(@Body({ validate: true }) orderChangeStatus: UpdateOrderChangeStatus, @Res() response: any): Promise<any> {
        const val = await this.orderStatusService.findOne({ where: { orderStatusId: orderChangeStatus.orderStatusId } });
        if (val.isAdmin !== 1) {
            const errorResponse: any = {
                status: 0,
                message: 'Access 2estricted to change status',
            };
            return response.status(400).send(errorResponse);
        }
        const updateOrder = await this.orderService.findOrder(orderChangeStatus.orderId);
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.orderStatusId = orderChangeStatus.orderStatusId;
        const order = await this.orderLogService.create(updateOrder);
        const orderLog = await this.orderLogService.findOne(order.orderLogId);
        orderLog.orderId = orderChangeStatus.orderId;
        await this.orderLogService.create(order);
        updateOrder.orderStatusId = orderChangeStatus.orderStatusId;
        const orderSave = await this.orderService.create(updateOrder);
        if (orderSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the 0rder status',
                data: orderSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the Order Status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Order Details Excel Document download
    /**
     * @api {get} /api/order/order-excel-list Order Excel
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderId orderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Order Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/order/order-excel-list
     * @apiErrorExample {json} Order Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/order-excel-list')
    @Authorized()
    public async excelOrderView(@QueryParam('orderId') orderId: string, @QueryParam('failedOrder') failedOrder: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Order Detail Sheet');
        const rows = [];
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 15 },
            { header: 'Mobile Number', key: 'telephone', size: 16, width: 15 },
            { header: 'Total Amount', key: 'total', size: 16, width: 15 },
            { header: 'Created Date', key: 'createdDate', size: 16, width: 15 },
            { header: 'Updated Date', key: 'modifiedDate', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        let totalData;
        if (!orderId || orderId === '') {
            const select = [
                'COUNT(order.orderId) as NoOfItems',
                'MAX(OrderProduct.orderProductId) as orderProductId',
                'order.createdDate as createdDate',
                'order.email as email',
                'order.telephone as telephone',
                'order.orderPrefixId as orderPrefixId',
                'order.orderId as orderId',
                'order.shippingFirstname as shippingFirstname',
                'order.shippingLastname as shippingLastname',
                'order.total as total',
                'order.currencyCode as currencyCode',
                'order.currencySymbolLeft as currencySymbolLeft',
                'order.currencySymbolRight as currencySymbolRight',
                'MAX(OrderProduct.orderStatusId) as orderStatusId',
                'order.modifiedDate as modifiedDate',
                'MAX(OrderProduct.orderId) as orderId',
                'order.shippingAddress1 as shippingAddress1',
                'order.shippingAddress2 as shippingAddress2',
                'order.shippingCity as shippingCity',
                'order.shippingPostcode as shippingPostcode',
                'order.shippingZone as shippingZone',
            ];
            const relations = [
                {
                    tableName: 'OrderProduct.order',
                    aliasName: 'order',
                },
            ];
            const groupBy = [{
                name: 'OrderProduct.orderId',
            }];
            const whereConditions = [];

            whereConditions.push({
                name: 'order.paymentProcess',
                op: 'and',
                value: failedOrder ? 0 : 1,
            }, {
                name: 'order.backOrders',
                op: 'and',
                value: 0,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            const orderList: any = await this.orderProductService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            totalData = orderList.length;
            for (const id of orderList) {
                const right = id.currencySymbolRight;
                const left = id.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, id.total, id.createdDate, id.modifiedDate]);
                } else {
                    if (left !== undefined) {
                        rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, left + id.total, id.createdDate, id.modifiedDate]);
                    } else {
                        rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, id.total + right, id.createdDate, id.modifiedDate]);
                    }
                }
            }
        } else {
            const orderid = orderId?.split(',');
            totalData = orderid.length;
            for (const id of orderid) {
                const dataId = await this.orderService.findOrder(id);
                const right = dataId.currencySymbolRight;
                const left = dataId.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total, dataId.createdDate, dataId.modifiedDate]);
                } else {
                    if (left !== undefined) {
                        rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, left + dataId.total, dataId.createdDate, dataId.modifiedDate]);
                    } else {
                        rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total + right, dataId.createdDate, dataId.modifiedDate]);
                    }
                }
            }
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './OrderExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        // Add export log
        const newExportLog = new ExportLog();
        newExportLog.module = failedOrder ? 'Failed Orders' : 'Orders';
        newExportLog.recordAvailable = totalData;
        newExportLog.createdBy = request.user.userId;
        await this.exportLogService.create(newExportLog);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Delete Order API
    /**
     * @api {delete} /api/order/delete-order/:id Delete Single Order API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Order.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/order/delete-order/:id
     * @apiErrorExample {json} orderDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-order/:id')
    @Authorized(['admin', 'delete-order'])
    public async deleteOrder(@Param('id') orderid: number, @Res() response: any, @Req() request: any): Promise<any> {
        const orderData = await this.orderService.find({ where: { orderId: orderid } });
        if (orderData.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteOrder = await this.orderService.delete(orderid);
        if (deleteOrder) {
            const successResponse: any = {
                status: 1,
                message: 'Order Deleted Successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the Order',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Order API
    /**
     * @api {post} /api/order/delete-order Delete Order API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} orderId orderId
     * @apiParamExample {json} Input
     * {
     * "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Order.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/order/delete-order
     * @apiErrorExample {json} orderDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-order')
    @Authorized()
    public async deleteMultipleOrder(@Body({ validate: true }) orderDelete: DeleteOrderRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const orderIdNo = orderDelete.orderId.toString();
        const orderid = orderIdNo.split(',');
        for (const id of orderid) {
            const orderData = await this.orderService.find({ where: { orderId: id } });
            if (orderData.length === 0) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a order that you want to delete',
                };
                return response.status(400).send(errorResponse);
            }
        }

        for (const id of orderid) {
            const deleteOrderId = parseInt(id, 10);
            await this.orderService.delete(deleteOrderId);
        }
        const successResponse: any = {
            status: 1,
            message: 'Order deleted successfully',
        };
        return response.status(200).send(successResponse);
    }

    // order log List API
    /**
     * @api {get} /api/order/orderLoglist Order Log List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId orderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateAdded" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/orderLoglist
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/orderLoglist')
    @Authorized()
    public async orderLogList(@QueryParam('orderId') orderId: number, @Res() response: any): Promise<any> {
        const select = ['orderId', 'orderPrefixId', 'orderStatusId', 'shippingFirstname', 'total', 'createdDate', 'modifiedDate'];
        const search = [
            {
                name: 'orderId',
                op: 'where',
                value: orderId,
            },
        ];
        const WhereConditions = [];
        const orderList = await this.orderLogService.list(0, 0, select, search, WhereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 } });
        const order = orderStatuss.map(async (value: any) => {
            const user = orderList.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (user === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = user.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(order);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order Log list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    //  Update Payment Status API
    /**
     * @api {post} /api/order/update-payment-status Update Payment Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {Number} paymentStatusId 1->paid 2->fail 3-> refund
     * @apiParamExample {json} Input
     * {
     *   "orderId" : "",
     *   "paymentStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated payment status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-payment-status
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-payment-status')
    @Authorized()
    public async updatePaymentStatus(@BodyParam('orderId') orderId: number, @BodyParam('paymentStatusId') paymentStatusId: number, @Res() response: any): Promise<any> {
        const updateOrder = await this.orderService.findOrder(orderId);
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.paymentStatus = paymentStatusId;
        updateOrder.paymentFlag = paymentStatusId;
        const plugin = await this.pluginService.findOne({ where: { id: updateOrder.paymentMethod } });
        updateOrder.paymentType = plugin.pluginName;
        await this.orderService.create(updateOrder);
        if (paymentStatusId === 1) {
            const findPayment = await this.paymentService.findOne({ where: { orderId } });
            if (findPayment) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Payment has been made for this order',
                };
                return response.status(400).send(errorResponse);
            }
            const paymentParams = new Payment();
            paymentParams.orderId = updateOrder.orderId;
            const date = new Date();
            paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            paymentParams.paymentAmount = updateOrder.total;
            const payments = await this.paymentService.create(paymentParams);
            let i;
            const orderProduct = await this.orderProductService.find({ where: { orderId: updateOrder.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] });
            for (i = 0; i < orderProduct.length; i++) {
                const paymentItems = new PaymentItems();
                paymentItems.paymentId = payments.paymentId;
                paymentItems.orderProductId = orderProduct[i].orderProductId;
                paymentItems.totalAmount = orderProduct[i].total;
                paymentItems.productName = orderProduct[i].name;
                paymentItems.productQuantity = orderProduct[i].quantity;
                paymentItems.productPrice = orderProduct[i].productPrice;
                const payItem = await this.paymentItemsService.create(paymentItems);
                const vendorProduct = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
                if (vendorProduct) {
                    const vendor = await this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
                    const vendorGroup = await this.vendorGroupService.findOne({
                        where: {
                            groupId: vendor.vendorGroupId,
                        },
                    });
                    const vendorOrders = await this.vendorOrdersService.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                    if (vendorOrders) {
                        const vendorPayments = new VendorPayment();
                        vendorPayments.vendorId = vendorProduct.vendorId;
                        vendorPayments.paymentItemId = payItem.paymentItemId;
                        vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                        vendorPayments.amount = orderProduct[i].total;
                        if (+vendorProduct.vendorProductCommission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendorProduct.vendorProductCommission / 100);
                        } else if (+vendor.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendor.commission / 100);
                        } else if (vendorGroup !== undefined && +vendorGroup.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
                        } else {
                            const defaultCommission = await this.vendorGlobalSettingService.findOne();
                            const defCommission = defaultCommission.defaultCommission;
                            vendorPayments.commissionAmount = vendorPayments.amount * (+defCommission / 100);
                        }
                        await this.vendorPaymentService.create(vendorPayments);
                    }
                }
            }
        } else {
            const vendorOrder = await this.vendorOrdersService.findOne({ orderId });
            if (vendorOrder) {
                const vendorPayment = await this.vendorPaymentService.findOne({
                    vendorOrderId: vendorOrder.vendorOrderId,
                });
                await this.vendorPaymentService.delete(vendorPayment.vendorPaymentId);
            }
            const paymentArchive = await this.paymentArchiveService.findOne({
                where: {
                    orderId,
                },
            });
            if (paymentArchive) {
                await this.paymentArchiveService.delete({ orderId });
            }
            await this.paymentService.delete({ orderId });
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the Payment Status',
            data: updateOrder,
        };
        return response.status(200).send(successResponse);
    }

    //  update shipping information API
    /**
     * @api {post} /api/order/update-shipping-information  Update Shipping Information API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {String} trackingUrl shipping tracking url
     * @apiParam (Request body) {String} trackingNo shipping tracking no
     * @apiParamExample {json} Input
     * {
     *   "orderId" : "",
     *   "trackingUrl" : "",
     *   "trackingNo" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated shipping information.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-shipping-information
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-shipping-information')
    @Authorized()
    public async updateShippingInformation(@BodyParam('orderId') orderId: number, @BodyParam('trackingUrl') trackingUrl: string, @BodyParam('trackingNo') trackingNo: string, @Res() response: any): Promise<any> {
        const updateOrder = await this.orderService.findOrder(orderId);
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.trackingUrl = trackingUrl;
        updateOrder.trackingNo = trackingNo;
        const orderSave = await this.orderService.create(updateOrder);
        if (orderSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the Shipping Information',
                data: orderSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the Shipping Information',
            };
            return response.status(400).send(errorResponse);
        }
    }

    //  Update Order Product Shipping Information API
    /**
     * @api {post} /api/order/update-order-product-shipping-information Update Order Product Shipping Information API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParam (Request body) {String} trackingUrl shipping tracking url
     * @apiParam (Request body) {String} trackingNo shipping tracking no
     * @apiParamExample {json} Input
     * {
     *   "orderProductId" : "",
     *   "trackingUrl" : "",
     *   "trackingNo" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated shipping information.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-order-product-shipping-information
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-order-product-shipping-information')
    @Authorized()
    public async updateOrderProductShippingInformation(@BodyParam('orderProductId') orderProductId: number, @BodyParam('trackingUrl') trackingUrl: string, @BodyParam('trackingNo') trackingNo: string, @Res() response: any): Promise<any> {
        const updateOrderProduct = await this.orderProductService.findOne(orderProductId);
        if (!updateOrderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order product Id',
            };
            return response.status(400).send(errorResponse);
        }
        if (updateOrderProduct.cancelRequestStatus === 1) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot update the shipping information as the cancel request for this order is approved',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrderProduct.trackingUrl = trackingUrl;
        updateOrderProduct.trackingNo = trackingNo;
        const orderProductSave = await this.orderProductService.createData(updateOrderProduct);
        const updateVendorOrder = await this.vendorOrdersService.findOne({ where: { orderProductId } });
        if (updateVendorOrder) {
            updateVendorOrder.trackingUrl = trackingUrl;
            updateVendorOrder.trackingNo = trackingNo;
            await this.vendorOrdersService.create(updateVendorOrder);
        }
        if (orderProductSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the Shipping Information',
                data: orderProductSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the Shipping Information',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // update Order Product Status API
    /**
     * @api {put} /api/order/update-order-product-status/:orderProductId Update Order Product Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderStatusId OrderStatus orderStatusId
     * @apiParamExample {json} Input
     * {
     *      "orderStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated orderProductStatus.",
     *      "status": "1",
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "orderProductId": "",
     *              "productId": "",
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
     *              "cancelReasonDescription": "",
     *              "isActive": "",
     *              "skuName": "",
     *              "vendorId": "",
     *              "couponDiscountAmount": ""
     *    }
     * }
     * @apiSampleRequest /api/order/update-order-product-status/:orderProductId
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-order-product-status/:orderProductId')
    @Authorized()
    public async updateOrderProductStatus(@Param('orderProductId') orderProductId: number, @BodyParam('orderStatusId') orderStatusId: number, @Res() response: any): Promise<any> {
        const val = await this.orderStatusService.findOne({ where: { orderStatusId } });
        if (val.isAdmin !== 1) {
            const errorResponse: any = {
                status: 0,
                message: 'Access Restricted to change status',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductStatus = await this.orderProductService.findOne({
            where: {
                orderProductId,
            },
        });
        if (!orderProductStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        if (orderProductStatus.cancelRequestStatus === 1) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot update the status as the cancel request for this order is approved',
            };
            return response.status(400).send(errorResponse);
        }
        orderProductStatus.orderStatusId = orderStatusId;
        const orderProductStatusUpdate = await this.orderProductService.update(orderProductStatus.orderProductId, orderProductStatus);
        const orderProductLog = new OrderProductLog();
        orderProductLog.model = orderProductStatusUpdate.model;
        orderProductLog.name = orderProductStatusUpdate.name;
        orderProductLog.orderId = orderProductStatusUpdate.orderId;
        orderProductLog.orderProductId = orderProductStatusUpdate.orderProductId;
        orderProductLog.orderStatusId = orderProductStatusUpdate.orderStatusId;
        orderProductLog.productId = orderProductStatusUpdate.productId;
        orderProductLog.productPrice = orderProductStatusUpdate.productPrice;
        orderProductLog.quantity = orderProductStatusUpdate.quantity;
        orderProductLog.total = orderProductStatusUpdate.total;
        orderProductLog.trace = orderProductStatusUpdate.trace;
        orderProductLog.tax = orderProductStatusUpdate.tax;
        orderProductLog.trackingNo = orderProductStatusUpdate.trackingNo;
        orderProductLog.trackingUrl = orderProductStatusUpdate.trackingUrl;
        orderProductLog.isActive = orderProductStatusUpdate.isActive;
        await this.orderProductLogService.create(orderProductLog);
        const vendorOrder = await this.vendorOrdersService.findOne({
            where: {
                orderProductId: orderProductStatusUpdate.orderProductId,
            },
        });
        if (vendorOrder) {
            const vendorOrderLog: any = new VendorOrderLog();
            vendorOrderLog.vendorId = vendorOrder.vendorId;
            vendorOrderLog.vendorOrderId = vendorOrder.vendorOrderId;
            vendorOrderLog.orderId = vendorOrder.orderId;
            vendorOrderLog.subOrderId = vendorOrder.subOrderId;
            vendorOrderLog.subOrderStatusId = orderProductStatusUpdate.orderStatusId;
            vendorOrderLog.total = vendorOrder.total;
            await this.vendorOrderLogService.create(vendorOrderLog);
            vendorOrder.subOrderStatusId = orderProductStatusUpdate.orderStatusId;
            await this.vendorOrdersService.update(vendorOrder.vendorOrderId, vendorOrder);
        }
        if (orderProductStatusUpdate !== undefined) {
            const emailContent = await this.emailTemplateService.findOne(21);
            const logo = await this.settingService.findOne();
            const order = await this.orderService.findOrder(orderProductStatus.orderId);
            const orderStatus = await this.orderStatusService.findOne(orderStatusId);
            const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{title}', orderProductStatusUpdate.name).replace('{status}', orderStatus.name).replace('{order}', order.orderPrefixId);
            const redirectUrl = env.storeRedirectUrl;
            const mailContents: any = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            console.log('order.email:', order.email);
            MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the order status',
                data: orderProductStatusUpdate,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update the order product Status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // order product log List API
    /**
     * @api {get} /api/order/order-product-log-list Order Product Log List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId orderProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order product log list",
     *      "data":{
     *      "orderProductLogId" : "",
     *      "orderProductId" : "",
     *      "productId" : "",
     *      "orderId" : "",
     *      "name" : "",
     *      "model" : "",
     *      "quantity" : "",
     *      "trace" : "",
     *      "total" : "",
     *      "tax" : "",
     *      "orderStatusId" : "",
     *      "trackingUrl" : "",
     *      "trackingNo" : "",
     *      "isActive" : "",
     *      "createdDate" : "",
     *      "modifiedDate" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/order-product-log-list
     * @apiErrorExample {json} orderProductLog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/order-product-log-list')
    @Authorized()
    public async orderProductLogList(@QueryParam('orderProductId') orderProductId: number, @Res() response: any): Promise<any> {
        const select = ['orderProductLogId', 'orderProductId', 'productId', 'orderId', 'name', 'model', 'quantity', 'trace', 'total', 'tax', 'orderStatusId', 'trackingUrl', 'trackingNo', 'isActive', 'createdDate', 'modifiedDate'];
        const relation = [];
        const WhereConditions = [
            {
                name: 'orderProductId',
                op: 'where',
                value: orderProductId,
            },
        ];
        const orderProductList = await this.orderProductLogService.list(0, 0, select, relation, WhereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1, parentId: 7 }, order: { priority: 'ASC' } });
        const orderProduct = orderStatuss.map(async (value: any) => {
            const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (user === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = user.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderProduct);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete Order Product Log list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // Order Count API
    /**
     * @api {get} /api/order/order-count Order Count API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get order count",
     *      "data": {
     *        "todayOrderCount": {
     *        "orderCount": ""
     *         },
     *        "totalOrderAmount": "",
     *        "todayOrderAmount": "",
     *        "totalOrder": ""
     *           }
     * }
     * @apiSampleRequest /api/order/order-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/order-count')
    @Authorized()
    public async orderCounts(@Res() response: any): Promise<any> {
        const orders: any = {};
        const order = await this.orderService.findTotalOrderAmount();
        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const orderAmount = await this.orderService.findAlltodayOrder(todaydate);
        const orderCount = await this.orderService.findAllTodayOrderCount(todaydate);
        const select = [];
        const search = [{
            name: 'paymentProcess',
            op: 'where',
            value: '1',
        }];
        const WhereConditions = [];
        const orderList = await this.orderService.list(0, 0, select, search, WhereConditions, 0, 1);
        orders.todayOrderCount = orderCount;
        orders.totalOrderAmount = order.total !== null ? order.total : 0;
        orders.todayOrderAmount = orderAmount.total !== null ? orderAmount.total : 0;
        orders.totalOrder = orderList;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the order counts',
            data: orders,
        };
        return response.status(200).send(successResponse);
    }
    // Order Cancel Request List API
    /**
     * @api {get} /api/order/order-cancel-request-list Order Cancel Request List
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order List..!!",
     *      "status": "1",
     *      "data": [{
     *               "createdDate": "2024-07-19T13:39:31.000Z",
     *               "orderId": 408,
     *               "customerFirstName": "Abinesh",
     *               "shippingCity": "Tiruvanamalai",
     *               "shippingCountry": "India",
     *               "shippingZone": "Tamil Nadu",
     *               "currencyCode": "USD",
     *               "currencySymbolLeft": "$",
     *               "currencySymbolRight": null,
     *               "orderProductId": 718,
     *               "orderProductStatusId": 7,
     *               "productId": 1553,
     *               "name": " kurta",
     *               "total": "1000.00",
     *               "orderProductPrefixId": "INV-202407194081",
     *               "productPrice": "1000.00",
     *               "quantity": 1,
     *               "cancelRequest": 1,
     *               "cancelRequestStatus": 1,
     *               "cancelReason": "Wrongly Ordered",
     *               "cancelReasonDescription": "wrongly ordered ",
     *               "discountAmount": "0.00",
     *               "discountedAmount": "0.00",
     *               "couponDiscountAmount": null,
     *               "image": "20151314-011710502910738.jpeg",
     *               "containerName": "",
     *               "orderStatusName": "Order cancelled",
     *               "orderStatusColorCode": "#f40337"
     *              }],
     * }
     * @apiSampleRequest /api/order/order-cancel-request-list
     * @apiErrorExample {json} Order Cancel Request List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Cancel Request List Function
    @Get('/order-cancel-request-list')
    @Authorized(['admin', 'cancel-request-list'])
    public async canceledOrderProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [
            'order.createdDate as createdDate',
            'order.orderId as orderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingZone as shippingZone',
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
            'OrderProduct.cancelReason as cancelReason',
            'OrderProduct.cancelReasonDescription as cancelReasonDescription',
            'OrderProduct.discountAmount as discountAmount',
            'OrderProduct.discountedAmount as discountedAmount',
            'OrderProduct.couponDiscountAmount as couponDiscountAmount',
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
            name: 'OrderProduct.cancelRequest',
            op: 'and',
            value: 1,
        }, {
            name: 'order.paymentProcess',
            op: 'and',
            value: 1,
        });

        if (status) {
            whereConditions.push({
                name: 'OrderProduct.cancelRequestStatus',
                op: 'and',
                value: status,
            });
        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['OrderProduct.name', 'OrderProduct.orderProductPrefixId'],
                value: keyword.toLowerCase(),
            });

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
                message: 'Successfully got the order count',
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
            temp.orderStatusName = passingOrderStatus.name ? passingOrderStatus.name : '';
            temp.orderStatusColorCode = passingOrderStatus.colorCode ? passingOrderStatus.colorCode : '';
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order product cancel list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // update Order Cancel Request Status API
    /**
     * @api {put} /api/order/update-order-cancel-request/:orderProductId Update Order Cancel Request Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} cancelStatusId send 1 -> approved 2 ->rejected
     * @apiParamExample {json} Input
     * {
     *      "cancelStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated order cancel status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-order-cancel-request/:orderProductId
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-order-cancel-request/:orderProductId')
    @Authorized(['admin', 'update-cancel-request-status'])
    public async updateOrderCancelStatus(@Param('orderProductId') orderProductId: number, @BodyParam('cancelStatusId') cancelStatusId: number, @Res() response: any): Promise<any> {
        const orderProduct = await this.orderProductService.findOne({
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        orderProduct.cancelRequestStatus = cancelStatusId;
        const orderProductStatusUpdate = await this.orderProductService.update(orderProduct.orderProductId, orderProduct);
        const order = await this.orderService.findOrder({ where: { orderId: orderProduct.orderId } });
        const emailContent = await this.emailTemplateService.findOne(20);
        let status;
        let res;
        if (orderProductStatusUpdate.cancelRequestStatus === 1) {
            status = 'approved';
            res = 'Successfully accepted the cancelled orders';
        } else if (orderProductStatusUpdate.cancelRequestStatus === 2) {
            status = 'rejected';
            res = 'Successfully rejected the cancelled orders';
        } else if (orderProductStatusUpdate.cancelRequestStatus === 0) {
            status = 'pending';
        }
        const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{productname}', orderProduct.name).replace('{status}', status);
        const redirectUrl = env.storeRedirectUrl;
        const logo = await this.settingService.findOne();
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = message;
        mailContents.redirectUrl = redirectUrl;
        mailContents.productDetailData = '';
        console.log('email:', order.email);
        MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
        if (orderProductStatusUpdate !== undefined) {
            return response.status(200).send({
                status: 1,
                message: res,
                data: orderProductStatusUpdate,
            });
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to update the Order cancel status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Bulk Order Cancel Request Status API
    /**
     * @api {get} /api/order/update-bulk-order-cancel-request Update bulk Order Cancel Request Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderProductId
     * @apiParam (Request body) {Number} cancelStatusId send 1 -> approved 2 ->rejected
     * @apiParamExample {json} Input
     * {
     *      "cancelStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Bulk order cancel status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-bulk-order-cancel-request
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/update-bulk-order-cancel-request')
    @Authorized()
    public async updateBulkOrderCancelStatus(@QueryParam('orderProductId') orderProductId: string, @QueryParam('cancelStatusId') cancelStatusId: number, @Res() response: any): Promise<any> {
        const orderProducts = orderProductId.split(',');
        const arr: any = [];
        for (const orderProduct of orderProducts) {
            const orderProd = await this.orderProductService.findOne({
                where: {
                    orderProductId: orderProduct,
                },
            });
            if (!orderProd) {
                arr.push(1);
            }
        }
        if (arr.length > 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        let res;
        for (const orderProduct of orderProducts) {
            const orderProdt = await this.orderProductService.findOne({
                where: {
                    orderProductId: orderProduct,
                },
            });
            orderProdt.cancelRequestStatus = cancelStatusId;
            const orderProductStatusUpdate = await this.orderProductService.update(orderProdt.orderProductId, orderProdt);
            const order = await this.orderService.findOrder({ where: { orderId: orderProdt.orderId } });
            const emailContent = await this.emailTemplateService.findOne(20);
            const logo = await this.settingService.findOne();
            let status;
            if (orderProductStatusUpdate.cancelRequestStatus === 1) {
                status = 'approved';
                res = 'Successfully accepted the cancelled orders';
            } else if (orderProductStatusUpdate.cancelRequestStatus === 2) {
                status = 'rejected';
                res = 'Successfully rejected the cancelled orders';
            } else if (orderProductStatusUpdate.cancelRequestStatus === 0) {
                status = 'pending';
            }
            const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{productname}', orderProdt.name).replace('{status}', status);
            const redirectUrl = env.storeRedirectUrl;
            const mailContents: any = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            console.log('order.email:', order.email);
            MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
        }
        const successResponse: any = {
            status: 1,
            message: res,
        };
        return response.status(200).send(successResponse);
    }

    // Export bulk order cancel request
    /**
     * @api {get} /api/order/order-cancel-excel-list Order Cancel Excel list
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderProductId orderProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Order Cancel Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/order/order-cancel-excel-list
     * @apiErrorExample {json} Order Cancel Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/order-cancel-excel-list')
    @Authorized(['admin', 'cancel-request-export-list'])
    public async exportCancelRequest(@QueryParam('orderProductId') orderProductId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Order Detail Sheet');
        const rows = [];
        const orderid = orderProductId.split(',');
        for (const id of orderid) {
            const dataId = await this.orderProductService.findOne({ where: { orderProductId: id } });
            if (dataId.length === 0) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid order product id',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'OrderProductPrefixId', key: 'orderProductPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 15 },
            { header: 'Product Name', key: 'productName', size: 16, width: 15 },
            { header: 'Product Price', key: 'productPrice', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'total', key: 'total', size: 16, width: 15 },
            { header: 'Order Cancel Status', key: 'cancelRequestStatus', size: 16, width: 15 },
            { header: 'Order Cancel Reason', key: 'cancelRequestReason', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of orderid) {
            const data = await this.orderProductService.findOne(id);
            const dataId = await this.orderService.findOrder(data.orderId);
            let status;
            if (data.cancelRequestStatus === 1) {
                status = 'approved';
            } else if (data.cancelRequestStatus === 2) {
                status = 'rejected';
            } else if (data.cancelRequestStatus === 0) {
                status = 'pending';
            }
            const right = dataId.currencySymbolRight;
            const left = dataId.currencySymbolLeft;
            if (left === null && right === null) {
                rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total, data.cancelReason, status]);
            } else {
                if (left !== undefined) {
                    rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, left + data.total, data.cancelReason, status]);
                } else {
                    rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total + right, data.cancelReason, status]);
                }
            }
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './OrderCancelExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Export bulk order cancel request api
    /**
     * @api {get} /api/order/bulk-order-cancel-excel-list Bulk Order Cancel Excel list
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Bulk Order Cancel Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/order/bulk-order-cancel-excel-list
     * @apiErrorExample {json} Order Cancel Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/bulk-order-cancel-excel-list')
    @Authorized(['admin', 'export-order'])
    public async bulkExportCancelRequest(@Req() request: any, @Res() response: any, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Order Detail Sheet');
        const rows = [];
        const select = [
            'order.createdDate as createdDate',
            'order.orderId as orderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingZone as shippingZone',
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
            'OrderProduct.cancelReason as cancelReason',
            'OrderProduct.cancelReasonDescription as cancelReasonDescription',
            'OrderProduct.discountAmount as discountAmount',
            'OrderProduct.discountedAmount as discountedAmount',
            'OrderProduct.couponDiscountAmount as couponDiscountAmount',
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
            name: 'OrderProduct.cancelRequest',
            op: 'and',
            value: 1,
        }, {
            name: 'order.paymentProcess',
            op: 'and',
            value: 1,
        });

        if (status) {
            whereConditions.push({
                name: 'OrderProduct.cancelRequestStatus',
                op: 'and',
                value: status,
            });
        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['OrderProduct.name', 'OrderProduct.orderProductPrefixId'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'OrderProduct.createdDate',
            order: 'DESC',
        });
        const orderProductList: any = await this.orderProductService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        if (orderProductList.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'file is empty',
            });
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 20 },
            { header: 'OrderProductPrefixId', key: 'orderProductPrefixId', size: 16, width: 20 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 20 },
            { header: 'Email', key: 'email', size: 16, width: 30 },
            { header: 'Product Name', key: 'productName', size: 16, width: 45 },
            { header: 'Product Price', key: 'productPrice', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'total', key: 'total', size: 16, width: 15 },
            { header: 'Order Cancel Reason', key: 'cancelRequestReason', size: 16, width: 30 },
            { header: 'Order Cancel Status', key: 'cancelRequestStatus', size: 16, width: 20 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const data of orderProductList) {
            console.log('data:', data);
            const dataId = await this.orderService.findOrder(data.orderId);
            let requestStatus;
            if (data.cancelRequestStatus === 1) {
                requestStatus = 'approved';
            } else if (data.cancelRequestStatus === 2) {
                requestStatus = 'rejected';
            } else if (data.cancelRequestStatus === 0) {
                requestStatus = 'pending';
            }
            const right = dataId.currencySymbolRight;
            const left = dataId.currencySymbolLeft;
            if (left === null && right === null) {
                rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total, data.cancelReason, requestStatus]);
            } else {
                if (left !== undefined) {
                    rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, left + data.total, data.cancelReason, requestStatus]);
                } else {
                    rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total + right, data.cancelReason, requestStatus]);
                }
            }
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BulkOrderCancelExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Back order List API
    /**
     * @api {get} /api/order/back-order-list Back Order List
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Back Order List..!!",
     *      "status": "1",
     *      "data": {
     *          "createdDate": "",
     *          "orderId": "",
     *          "customerFirstName": "",
     *          "shippingCity": "",
     *          "shippingCountry": "",
     *          "shippingZone": "",
     *          "currencyCode": "",
     *          "currencySymbolLeft": "",
     *          "currencySymbolRight": ""
     *          "orderProductId": "",
     *          "orderProductStatusId": "",
     *          "productId": ""
     *          "name": "",
     *          "total": "",
     *          "orderProductPrefixId": ""
     *          "productPrice": "",
     *          "quantity": "",
     *              }
     * }
     * @apiSampleRequest /api/order/back-order-list
     * @apiErrorExample {json} back order List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Cancel Request List Function
    @Get('/back-order-list')
    @Authorized(['admin', 'back-order-list'])
    public async backOrderProductList(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('dateAdded') dateAdded: string, @QueryParam('keyword') keyword: string, @QueryParam('orderLineNo') orderLineNo: string, @QueryParam('orderId') orderId: string,
        @QueryParam('customerName') customerName: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [
            'Order.createdDate as createdDate',
            'Order.modifiedDate as modifiedDate',
            'Order.orderId as orderId',
            'Order.orderPrefixId as orderPrefixId',
            'Order.shippingFirstname as customerFirstName',
            'Order.shippingCity as shippingCity',
            'Order.shippingCountry as shippingCountry',
            'Order.shippingZone as shippingZone',
            'Order.currencyCode as currencyCode',
            'Order.currencySymbolLeft as currencySymbolLeft',
            'Order.currencySymbolRight as currencySymbolRight',
            'orderProduct.orderProductId as orderProductId',
            'orderProduct.orderStatusId as orderProductStatusId',
            'orderProduct.productId as productId',
            'orderProduct.name as name',
            'orderProduct.total as total',
            'orderProduct.orderProductPrefixId as orderProductPrefixId',
            'orderProduct.productPrice as productPrice',
            'orderProduct.quantity as quantity',
        ];

        const relations = [
            {
                tableName: 'Order.orderProduct',
                aliasName: 'orderProduct',
            }];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'Order.backOrders',
            op: 'and',
            value: 1,
        });

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['orderProduct.name', 'orderProduct.orderProductPrefixId', 'Order.shippingFirstname', 'Order.orderPrefixId'],
                value: keyword.toLowerCase(),
            });

        }
        if (orderLineNo && orderLineNo !== '') {
            searchConditions.push({
                name: ['orderProduct.orderProductPrefixId'],
                value: orderLineNo,
            });
        }
        if (orderId && orderId !== '') {
            searchConditions.push({
                name: ['Order.orderPrefixId'],
                value: orderId,
            });
        }
        if (dateAdded) {
            searchConditions.push({
                name: ['Order.createdDate'],
                value: dateAdded,
            });
        }
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['Order.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }
        const sort = [];
        sort.push({
            name: 'Order.createdDate',
            order: 'DESC',
        });
        if (count) {
            const orderCount: any = await this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Successfully got the count',
                data: orderCount,
            };
            return response.status(200).send(Response);
        }
        const orderList: any = await this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
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
            temp.orderStatusName = passingOrderStatus.name ? passingOrderStatus.name : '';
            temp.orderStatusColorCode = passingOrderStatus.colorCode ? passingOrderStatus.colorCode : '';
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the Back Order list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // failed order List API
    /**
     * @api {get} /api/order/failed-order-list Failed Order List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} orderId search by orderId
     * @apiParam (Request body) {String} orderStatusId search by orderStatusId
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {Number} totalAmount search by totalAmount
     * @apiParam (Request body) {Number} dateAdded search by dateAdded
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
     *      "data":{
     *              "orderId" : "",
     *              "orderStatusId" : "",
     *              "orderPrefixId" : "",
     *              "shippingFirstname" : "",
     *              "total" : "",
     *              "createdDate" : "",
     *              "customerId" : "",
     *              "isActive" : "",
     *              "modifiedDate" : "",
     *              "currencyCode" : "",
     *              "currencySymbolLeft" : "",
     *              "currencySymbolRight" : "",
     *              }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/failed-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/failed-order-list')
    @Authorized(['admin', 'failed-order-list'])
    public async failedOrderList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('orderId') orderId: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('orderStatusId') orderStatusId: string,
        @QueryParam('customerName') customerName: string,
        @QueryParam('totalAmount') totalAmount: string, @QueryParam('dateAdded') dateAdded: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['orderId', 'orderStatusId', 'orderPrefixId', 'shippingFirstname', 'total', 'createdDate', 'customerId', 'isActive', 'modifiedDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'];
        const search = [
            {
                name: 'orderPrefixId',
                op: 'like',
                value: orderId,
            },
            {
                name: 'orderStatusId',
                op: 'like',
                value: orderStatusId,
            },
            {
                name: 'shippingFirstname',
                op: 'like',
                value: customerName,
            },
            {
                name: 'total',
                op: 'where',
                value: totalAmount,
            },
            {
                name: 'createdDate',
                op: 'like',
                value: dateAdded,
            },
            {
                name: 'paymentProcess',
                op: 'where',
                value: 0,
            },

        ];
        if (keyword && keyword !== '') {
            search.push(
                {
                    name: 'orderPrefixId',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'shippingFirstname',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'total',
                    op: 'where',
                    value: keyword,
                },
                {
                    name: 'createdDate',
                    op: 'like',
                    value: keyword,
                }
            );
        }
        const relations = ['orderProduct'];
        const WhereConditions = [];
        const failedOrderList = await this.orderService.list(limit, offset, select, search, WhereConditions, relations, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got count',
                data: failedOrderList,
            };
            return response.status(200).send(Response);
        }
        const orderStatus = failedOrderList.map(async (value: any) => {
            const status = await this.orderStatusService.findOne({
                where: { orderStatusId: value.orderStatusId },
                select: ['orderStatusId', 'name', 'colorCode'],
            });
            const temp: any = value;
            temp.orderStatus = status;
            temp.quantity = value.orderProduct.length;
            delete temp.orderProduct;
            return temp;

        });
        const results = await Promise.all(orderStatus);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the failed order list',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    //  Move failedOrder into mainOrder API
    /**
     * @api {post} /api/order/update-main-order Update FailedOrder into MainOrder API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {Number} paymentStatus 1->paid 2->unpaid
     * @apiParam (Request body) {Number} paymentMethod
     * @apiParam (Request body) {String{..255}} paymentRefId
     * @apiParam (Request body) {String} [paymentDetail]
     * @apiParamExample {json} Input
     * {
     *   "orderId" : "",
     *   "paymentStatus" : "",
     *   "paymentMethod" : "",
     *   "paymentRefId" : "",
     *   "paymentDetail" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your order.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-main-order
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-main-order')
    // @Authorized(['admin', 'move-failed-order-to-main-order'])
    public async updationForMainOrder(@Body({ validate: true }) paymentParam: AddPaymentRequest, @Res() response: any): Promise<any> {
        const updateOrder = await this.orderService.findOrder(paymentParam.orderId);
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.paymentStatus = paymentParam.paymentStatus;
        updateOrder.paymentFlag = paymentParam.paymentStatus;
        const plugin = await this.pluginService.findOne({ where: { id: paymentParam.paymentMethod } });
        updateOrder.paymentMethod = paymentParam.paymentMethod;
        updateOrder.paymentType = plugin.pluginName;
        updateOrder.paymentDetails = paymentParam.paymentRefId;
        updateOrder.paymentProcess = 1;
        await this.orderService.create(updateOrder);
        if (paymentParam.paymentStatus === 1) {
            const paymentParams = new Payment();
            paymentParams.orderId = updateOrder.orderId;
            const date = new Date();
            paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            paymentParams.paymentAmount = updateOrder.total;
            paymentParams.paymentNumber = paymentParam.paymentRefId;
            paymentParams.paymentInformation = paymentParam.paymentDetail;
            const payments = await this.paymentService.create(paymentParams);
            let i;
            const orderProduct = await this.orderProductService.find({ where: { orderId: updateOrder.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] });
            for (i = 0; i < orderProduct.length; i++) {
                const paymentItems = new PaymentItems();
                paymentItems.paymentId = payments.paymentId;
                paymentItems.orderProductId = orderProduct[i].orderProductId;
                paymentItems.totalAmount = orderProduct[i].total;
                paymentItems.productName = orderProduct[i].name;
                paymentItems.productQuantity = orderProduct[i].quantity;
                paymentItems.productPrice = orderProduct[i].productPrice;
                const payItem = await this.paymentItemsService.create(paymentItems);
                const vendorProduct = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
                if (vendorProduct) {
                    const vendor = await this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
                    const vendorGroup = await this.vendorGroupService.findOne({ where: { groupId: vendor.vendorGroupId, isActive: 1 } });
                    const vendorOrders = await this.vendorOrdersService.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                    const vendorPayments = new VendorPayment();
                    vendorPayments.vendorId = vendorProduct.vendorId;
                    vendorPayments.paymentItemId = payItem.paymentItemId;
                    vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                    vendorPayments.amount = orderProduct[i].total;
                    if (vendorProduct.vendorProductCommission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (+vendorProduct.vendorProductCommission / 100);
                    } else if (vendor.commission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (+vendor.commission / 100);
                    } else if (vendorGroup !== undefined && +vendorGroup.commission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
                    } else {
                        const defaultCommission = await this.vendorGlobalSettingService.findOne();
                        const defCommission = defaultCommission.defaultCommission;
                        vendorPayments.commissionAmount = vendorPayments.amount * (+defCommission / 100);
                    }
                    await this.vendorPaymentService.create(vendorPayments);
                }
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated your order',
        };
        return response.status(200).send(successResponse);
    }

    // order count for List API
    /**
     * @api {get} /api/order/order-count-for-list Order Count For Order List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderId search by orderId
     * @apiParam (Request body) {String} orderStatusId search by orderStatusId
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} totalAmount search by totalAmount
     * @apiParam (Request body) {String} dateAdded search by dateAdded
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateAdded" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/order-count-for-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/order-count-for-list')
    @Authorized()
    public async orderCountForList(
        @QueryParam('orderId') orderId: string,
        @QueryParam('orderStatusId') orderStatusId: string, @QueryParam('customerName') customerName: string,
        @QueryParam('totalAmount') totalAmount: string, @QueryParam('dateAdded') dateAdded: string, @Res() response: any): Promise<any> {
        const orderList: any = await this.orderService.orderCount(orderId, orderStatusId, totalAmount, customerName, dateAdded);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order count',
            data: orderList,
        };
        return response.status(200).send(successResponse);
    }

    // Sales Report List API
    /**
     * @api {get} /api/order/sales-report-excel-list Sales Report excel list API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} productId
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got sales report list",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/sales-report-excel-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/sales-report-excel-list')
    @Authorized(['admin', 'sales-report-export'])
    public async salesExcelReport(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productId') productId: string,
        @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string,
        @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Total Sales Export sheet', { properties: { defaultColWidth: 15 } });
        const rows = [];
        const select = [
            ('DISTINCT orderProduct.orderProductId as orderProductId'),
            'Product.productId as productId',
            'Product.name as productName',
            'customer.firstName as firstName',
            'customer.lastName as lastName',
            'orderProduct.orderProductPrefixId as orderProductPrefixId',
            'orderProduct.orderStatusId as orderStatusId',
            'orderProduct.quantity as quantity',
            'orderProduct.total as total',
            'orderProduct.basePrice as basePrice',
            'orderProduct.discountAmount as discountAmount',
            'orderProduct.couponDiscountAmount as couponDiscountAmount',
            'orderProduct.createdDate as createdDate',
            'orderProduct.productPrice as productPrice',
            'orderStatus.name as orderStatusName',
            'customerGroup.name as groupName',
            'order.paymentType as paymentType',
        ];
        const relations = [];
        relations.push({
            tableName: 'Product.orderProduct',
            aliasName: 'orderProduct',
        }, {
            tableName: 'orderProduct.order',
            aliasName: 'order',
        }, {
            tableName: 'orderProduct.orderStatus',
            aliasName: 'orderStatus',
        }, {
            tableName: 'order.customer',
            aliasName: 'customer',
        }, {
            tableName: 'customer.customerGroup',
            op: 'left',
            aliasName: 'customerGroup',
        });
        const groupBy = [];
        const whereConditions = [];
        whereConditions.push({
            name: '`order`.`payment_process`',
            op: 'and',
            value: 1,
        }, {
            name: '`order`.`payment_status`',
            op: 'and',
            value: 1,
        }, {
            name: '`orderProduct`.`cancel_request_status`',
            op: 'and',
            value: 0,
        });
        if (productId) {
            whereConditions.push({
                name: 'orderProduct.product_id',
                op: 'IN',
                value: productId,
            });
        }
        if (startDate && startDate !== '') {
            whereConditions.push({
                name: '`orderProduct`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });
        }
        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`orderProduct`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });

        }
        const searchConditions = [];
        const sort = [];
        sort.push({
            name: 'orderProduct.createdDate',
            order: 'DESC',
        });
        const orderList: any = await this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const groupByKey = key => array =>
            array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
        const groupByType = groupByKey('productName');
        const groupByPeriodTypeArray = groupByType(orderList);
        const groupByPeriodTypeObject = Object.keys(groupByPeriodTypeArray);
        if (groupByPeriodTypeObject && groupByPeriodTypeObject.length > 0) {
            groupByPeriodTypeObject.forEach((periodType: any) => {
                const buyers = groupByPeriodTypeArray[periodType] && groupByPeriodTypeArray[periodType].length > 0 ? groupByPeriodTypeArray[periodType] : [];
                rows.push(['Product name-' + '' + periodType + '']);
                rows.push(['Customer name', 'quantity', 'date of purchase', 'payment type', 'Original Amount', 'Discount Amount', 'Total amount', 'Order Id', 'orderStatus', 'Customer Group Name']);
                for (const value of buyers) {
                    rows.push([value.firstName + (value.lastName ? value.lastName : ''), value.quantity, value.createdDate, value.paymentType, +value.basePrice, +value.discountAmount, +value.total, value.orderProductPrefixId, value.orderStatusName, value.groupName]);
                }
            });
        }
        worksheet.addRows(rows);
        const fileName = './salesReport_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }
    //  Order Detail API
    /**
     * @api {get} /api/order/:orderId  Order Detail API
     * @apiGroup Order
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
     *      "data": {
     *               "createdDate": "2024-06-28T07:26:54.000Z",
     *               "orderId": 11,
     *               "customerId": 0,
     *               "invoiceNo": null,
     *               "invoicePrefix": "INV",
     *               "email": "piccotalent194@gmail.com",
     *               "telephone": "123567890",
     *               "shippingFirstname": "spurtcommerce",
     *               "shippingLastname": "spurtcommerce",
     *               "shippingCompany": "spurtcommerce",
     *               "shippingAddress1": "Chennai",
     *               "shippingAddress2": "Chennai2",
     *               "shippingCity": "Chennai3",
     *               "shippingPostcode": "123",
     *               "shippingCountry": "Belarus",
     *               "shippingZone": "India",
     *               "shippingAddressFormat": "",
     *               "paymentFirstname": null,
     *               "paymentLastname": null,
     *               "paymentCompany": null,
     *               "paymentAddress1": null,
     *               "paymentAddress2": null,
     *               "paymentCity": null,
     *               "paymentPostcode": null,
     *               "paymentCountry": null,
     *               "paymentZone": null,
     *               "paymentAddressFormat": "",
     *               "total": null,
     *               "orderStatusId": 1,
     *               "orderPrefixId": null,
     *               "currencyCode": null,
     *               "currencySymbolLeft": null,
     *               "currencySymbolRight": null,
     *               "paymentStatus": 0,
     *               "customerGstNo": null,
     *               "productList": [
     *                 {
     *                   "modifiedDate": null,
     *                   "orderProductId": 2,
     *                   "productId": 1,
     *                   "orderProductPrefixId": "INV-20240628111",
     *                   "orderId": 11,
     *                   "name": "Printed Floral Print Daily Wear Chiffon Saree White",
     *                   "model": "Printed Floral Print Daily Wear Chiffon Saree White",
     *                   "quantity": 1,
     *                   "productPrice": "599.00",
     *                   "discountAmount": "0.00",
     *                   "basePrice": "599.00",
     *                   "taxType": 1,
     *                   "taxValue": 0,
     *                   "total": "599.00",
     *                   "discountedAmount": "0.00",
     *                   "orderStatusId": 1,
     *                   "trackingUrl": null,
     *                   "trackingNo": null,
     *                   "cancelRequest": 0,
     *                   "cancelRequestStatus": 0,
     *                   "cancelReason": null,
     *                   "cancelReasonDescription": null,
     *                   "skuName": "sar4534",
     *                   "couponDiscountAmount": null,
     *                   "image": "printed bhagalpuri art silk saree1710481555207.png",
     *                   "containerName": "women ethnic/",
     *                   "orderStatusName": "Order Placed",
     *                   "statusColorCode": "#6798e3",
     *                   "taxValueInAmount": 0,
     *                   "rating": 0,
     *                   "review": ""
     *                 }
     *               ],
     *               "orderStatusName": "Order Placed",
     *               "statusColorCode": "#6798e3"
     * }
     * @apiSampleRequest /api/order/:orderId
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/:orderId')
    @Authorized()
    public async orderDetail(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        if (!orderData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Id',
            };
            return response.status(400).send(errorResponse);
        }
        orderData.productList = await this.orderProductService.find({
            where: { orderId: orderid }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'trackingUrl', 'trackingNo', 'orderStatusId', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'orderStatusId',
                'skuName', 'orderProductPrefixId', 'modifiedDate', 'cancelReason', 'cancelReasonDescription', 'cancelRequestStatus', 'cancelRequest', 'priceGroupDetailId', 'fullfillmentStatusId'],
        }).then((val) => {
            const productVal = val.map(async (value: any) => {
                const rating = undefined;
                const productImage = await this.productImageService.findOne({ select: ['image', 'containerName'], where: { productId: value.productId, defaultImage: 1 } });
                const tempVal: any = value;
                tempVal.taxType = value.taxType;
                tempVal.taxValue = value.taxValue;
                if (productImage) {
                    tempVal.image = productImage.image;
                    tempVal.containerName = productImage.containerName;
                }
                const orderProductStatusData = await this.orderStatusService.findOne({
                    where: { orderStatusId: value.orderStatusId },
                    select: ['name', 'colorCode'],
                });
                if (orderProductStatusData) {
                    tempVal.orderStatusName = orderProductStatusData.name;
                    tempVal.statusColorCode = orderProductStatusData.colorCode;
                }
                const orderFullfillmentStatus = await this.orderStatusService.findOne({
                    where: { orderStatusId: tempVal.fullfillmentStatusId },
                    select: ['name', 'colorCode'],
                });
                tempVal.orderFullfillmentStatusName = orderFullfillmentStatus?.name ?? '';
                tempVal.orderFullfillmentStatusColorCode = orderFullfillmentStatus?.colorCode ?? '';
                if (value.taxType === 2) {
                    tempVal.taxValueInAmount = (+value.basePrice * (+value.taxValue / 100)).toFixed(2);
                } else {
                    tempVal.taxValueInAmount = +value.taxValue;
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
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.orderStatusId },
            select: ['name', 'colorCode'],
        });
        if (orderStatusData) {
            orderData.orderStatusName = orderStatusData.name;
            orderData.statusColorCode = orderStatusData.colorCode;
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order detail',
            data: orderData,
        };
        return response.status(200).send(successResponse);
    }
}
