/*
 * spurtcommerce API
 * version 1.0.0
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
import { PdfService } from '../../core/services/PdfService';
import { VendorCountryService } from '../../core/services/VendorCountryService';
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
import { VendorGlobalSettingService } from '../../core/services/VendorGlobalSettingService';
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
import { VendorGroupService } from '../../core/services/VendorGroupService';
import { ExportLog } from '../../core/models/ExportLog';
import { ExportLogService } from '../../core/services/ExportLogService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { CreateOrderRequest } from './requests/CreateOrderRequest';
import { pluginModule } from '../../../../src/loaders/pluginLoader';
import { VendorPluginService } from '../../core/services/VendorPluginService';
// import { VendorTaxService } from '../../core/services/VendorTaxService';
import { SkuService } from '../../core/services/SkuService';
import { ProductTirePriceService } from '../../core/services/ProductTirePriceService';
import { ProductSpecialService } from '../../core/services/ProductSpecialService';
import { ProductDiscountService } from '../../core/services/ProductDiscountService';
import { VendorInvoiceService } from '../../core/services/VendorInvoiceService';
import { VendorInvoiceItemService } from '../../core/services/VendorInvoiceItemService';
import { ProductStockAlertService } from '../../core/services/ProductStockAlertService';
import { StockLogService } from '../../core/services/StockLogService';
import { CustomerService } from '../../core/services/CustomerService';
import { OrderTotalService } from '../../core/services/OrderTotalService';
// import { QuoteRequestDetailService } from '../../../../add-ons/RfqAndQuotes/services/QuoteRequestDetailService';
import { OrderFullfillmentStatusService } from '../../core/services/OrderFullfillmentStatusService';
import Container, { Service } from 'typedi';
import { ZoneService } from '../../core/services/zoneService';
import { CurrencyService } from '../../core/services/CurrencyService';
import { VendorSettingsDomainService } from '../../core/services/VendorSettingsDomainService';
import { AddressService } from '../../core/services/AddressService';
// import archiver from 'archiver';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { In } from 'typeorm';
@Service()
@JsonController('/order')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private orderLogService: OrderLogService,
        private orderProductService: OrderProductService,
        private pdfService: PdfService,
        private vendorCountryService: VendorCountryService,
        private zoneService: ZoneService,
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
        private vendorGroupService: VendorGroupService,
        private exportLogService: ExportLogService,
        private vendorSettingsService: VendorSettingsService,
        private vendorPluginService: VendorPluginService,
        // private vendorTaxService: VendorTaxService,
        private skuService: SkuService,
        private productTirePriceService: ProductTirePriceService,
        private productSpecialService: ProductSpecialService,
        private currencyService: CurrencyService,
        private productDiscountService: ProductDiscountService,
        private vendorOrderService: VendorOrdersService,
        private vendorInvoiceService: VendorInvoiceService,
        private vendorInvoiceItemService: VendorInvoiceItemService,
        private productStockAlertService: ProductStockAlertService,
        private stockLogService: StockLogService,
        private customerService: CustomerService,
        private orderTotalService: OrderTotalService,
        // private quoteRequestDetailService: QuoteRequestDetailService,
        private orderFullfillmentStatusService: OrderFullfillmentStatusService,
        private vendorSettingsDomainService: VendorSettingsDomainService,
        private addressService: AddressService,
        private vendorUsersService: VendorUsersService
        // private userService: UserService
    ) {
    }

    // order List API
    /**
     * @api {get} /api/order Order List API
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'list-order'])
    public async orderList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('orderId') orderId: string,
        @QueryParam('orderDate') orderDate: string,
        @QueryParam('productCount') productCount: string,
        @QueryParam('customerName') customerName: string,
        @QueryParam('paymentStatus') paymentStatus: string,
        @QueryParam('orderStatusId') orderStatusId: string,
        @QueryParam('totalAmount') totalAmount: string,
        @QueryParam('dateAdded') dateAdded: string,
        @QueryParam('filter') filter: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('paymentProcess') paymentProcess: string,
        @QueryParam('sortBy') sortBy: string,
        @QueryParam('sortOrder') sortOrder: string,
        @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = [
            'order.customerId as customerId',
            'order.createdDate as createdDate',
            'order.modifiedDate as modifiedDate',
            'MAX(order.orderId) as orderId',
            'order.total as total',
            'order.shipping_firstname as customerName',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'order.orderPrefixId as orderPrefixId',
            'order.orderStatusId as orderStatusId',
            'order.shippingFirstname as shippingFirstName',
            'order.shippingCity as shippingCity',
            // 'order.productCount as productCount',
            'order.paymentStatus as paymentStatus',
            'order.paymentProcess as paymentProcess',
            'order.shippingCountry as shippingCountry',
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

        const whereConditions: any = [
            {
                name: 'order.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'order.backOrders',
                op: 'and',
                value: 0,
            },
        ];
        if (paymentProcess && paymentProcess !== '') {
            whereConditions.push({
                name: 'order.paymentProcess',
                op: 'and',
                value: 1,
            });
        }
        if (orderStatusId && orderStatusId !== '') {
            whereConditions.push({
                name: 'order.orderStatusId',
                op: 'and',
                value: orderStatusId,
            });
        }

        const searchConditions = [];
        if (keyword?.trim()) {
            searchConditions.push({
                name: ['order.shippingFirstname', 'order.orderPrefixId', 'order.shippingCity', 'order.total'],
                value: keyword.toLowerCase(),
            });
        }

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

        if (paymentStatus && paymentStatus !== '') {
            searchConditions.push({
                name: ['order.paymentStatus'],
                value: paymentStatus,
            });
        }

        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['order.shipping_firstname'],
                value: customerName,
            });
        }

        if (paymentStatus && paymentStatus !== '') {
            searchConditions.push({
                name: ['order.paymentStatus'],
                value: paymentStatus,
            });
        }

        if (orderDate && orderDate !== '') {
            searchConditions.push({
                name: ['order.createdDate'],
                value: orderDate,
            });
        }

        if (totalAmount && totalAmount !== '') {
            whereConditions.push({
                name: ['order.total'],
                op: 'where',
                value: totalAmount,
            });
        }

        // if (orderStatusId && orderStatusId !== '') {
        //     searchConditions.push({
        //         name: ['OrderProduct.orderStatusId'],
        //         value: orderStatusId,
        //     });
        // }
        if (dateAdded) {
            searchConditions.push({
                name: ['OrderProduct.createdDate'],
                value: dateAdded,
            });
        }
        if (filter && filter !== '') {
            whereConditions.push({
                op: 'raw',
                name: '(' + filter + ')',
                value: '',
            });
        }
        const sort = [];

        if (sortBy === 'buyerName') {
            sort.push({
                name: 'order.shippingFirstname',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'location') {
            sort.push({
                name: 'order.shippingCity',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'orderId') {
            sort.push({
                name: 'order.orderId',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'total') {
            sort.push({
                name: 'order.total',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'orderDate' || !sortBy || sortBy === 'orderId') {
            sort.push({
                name: 'order.orderId',
                order: sortOrder ?? 'DESC',
            });
        }
        if (count) {
            const orderCount: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const Response: any = {
                status: 1,
                message: 'Successfully got the order count',
                data: orderCount.length,
            };
            return response.status(200).send(Response);
        }
        const orderList: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderStatusList = await this.orderStatusService.findAll({
            select: ['orderStatusId', 'name', 'colorCode', 'priority'],
            where: {
                tenantId: request.user.tenantId,
            },
            order: {
                priority: 'ASC',
            },
        });
        const statusWhereConditions = [
            {
                name: 'order.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'order.backOrders',
                op: 'and',
                value: 0,
            },
        ];
        const statusCountRaw = await this.orderProductService.listByQueryBuilder(
            0,
            0,
            [
                'order.orderStatusId as orderStatusId',
                'COUNT(DISTINCT order.orderId) as total',
            ],
            statusWhereConditions,
            [],
            relations,
            [{
                name: 'order.orderStatusId',
            }],
            [],
            false,
            true
        );
        const statusCount = orderStatusList.map(status => {

            const matched = statusCountRaw.find(
                sc => Number(sc.orderStatusId) === Number(status.orderStatusId)
            );

            return {
                orderStatusId: status.orderStatusId,
                name: status.name,
                count: matched ? Number(matched.total) : 0,
            };
        });

        const orderStatus = orderList.map(async (value: any) => {
            const status = orderStatusList.find((statusValue) => statusValue.orderStatusId === value.orderStatusId);
            const vendorOrders = await this.vendorOrdersService.findAll({
                where: { orderId: value.orderId },
            });
            const temp: any = value;
            temp.orderStatus = status;
            temp.productCount = vendorOrders.length;
            temp.vendorOrders = vendorOrders;
            return temp;
        });

        let results = await Promise.all(orderStatus);
        results.sort((a, b) => {
            return (a.orderStatus?.priority || 0) - (b.orderStatus?.priority || 0);
        });

        if (productCount && productCount !== '') {
            const countNum = +productCount;
            results = results.filter(o => o.productCount === countNum);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list',
            data: results,
            statusCount,
        };
        return response.status(200).send(successResponse);
    }

    // Sales Report List API
    /**
     * @api {get} /api/order/sales-report-list Sales Report list API
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'list-sales-report'])
    public async salesReport(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productId') productId: string,
        @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string,
        @Res() response: any): Promise<any> {
        const select = [
            ('DISTINCT OrderProduct.orderProductId as orderProductId'),
            'productInformationDetail.productId as productId',
            'productInformationDetail.name as productName',
            'customer.firstName as firstName',
            'customer.lastName as lastName',
            'OrderProduct.orderProductPrefixId as orderProductPrefixId',
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
            'order.ip as ipAddress',
        ];

        const whereConditions: any = [
            {
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
            },
        ];
        const relations = [];
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
        const sort = [
            {
                name: 'OrderProduct.createdDate',
                order: 'DESC',
            },
        ];
        const orderList: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], sort, false, true);
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
        const orderCount: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], sort, true, true);
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async productList(@Res() response: any): Promise<any> {
        const select = [
            ('DISTINCT Product.productId as productId'),
            'MAX(productToCategory.productToCategoryId) as productToCategoryId',
            'MAX(productToCategory.categoryId) as categoryId',
            'Product.name as name',
            'MAX(category.name) as categoryName',
        ];
        const relations = [
            {
                tableName: 'Product.productToCategory',
                op: 'left',
                aliasName: 'productToCategory',
            },
            {
                tableName: 'productToCategory.category',
                op: 'left',
                aliasName: 'category',
            },
        ];
        const groupBy = [
            {
                name: 'Product.productId',
            },
        ];
        const sort = [
            {
                name: 'Product.createdDate',
                order: 'DESC',
            },
        ];
        const productData: any = await this.productService.listByQueryBuilder(0, 0, select, [], [], relations, groupBy, sort, false, true);
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
        const vendorSettings: any = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
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
        // const pdfBuffer = await this.pdfService.htmlToPdfBuffer(htmlData);

        // const fileName = `Invoice_${orderData.invoicePrefix + orderData.invoiceNo}.pdf`;
        // const zipFileName = `vendor_invoice_${Date.now()}.zip`;

        // response.setHeader('Content-Type', 'application/zip');
        // response.setHeader(
        //     'Content-Disposition',
        //     `attachment; filename="${zipFileName}"`
        // );
        // response.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

        // const archive = archiver('zip', { zlib: { level: 9 } });
        // archive.pipe(response);

        // archive.append(pdfBuffer, { name: fileName });

        // await archive.finalize();
    }

    // sales List API
    /**
     * @api {get} /api/order/saleslist Sales List API
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'list-sales'])
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'update-order-status'])
    public async orderChangeStatus(@Body({ validate: true }) orderChangeStatus: UpdateOrderChangeStatus, @Req() request: any, @Res() response: any): Promise<any> {
        const updateOrder = await this.updateOrderStatus(orderChangeStatus.orderId, orderChangeStatus.orderStatusId, orderChangeStatus.fullfillmentStatusId, request);
        if (updateOrder.status === 0) {
            return response.status(400).send(updateOrder);
        }
        return response.status(200).send(updateOrder);
    }

    // Change order Status API
    /**
     * @api {post} /api/order/bulk-order-change-status Change Order Status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderIds Order Id
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
     * @apiSampleRequest /api/order/bulk-order-change-status
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/bulk-order-change-status')
    @Authorized(['vendor', 'update-order-status'])
    public async bulkOrderChangeStatus(@Body({ validate: true }) orderChangeStatus: UpdateOrderChangeStatus, @Req() request: any, @Res() response: any): Promise<any> {
        const orderIds = orderChangeStatus.orderIds.split(',');
        for (const orderId of orderIds) {
            const updateOrder = await this.updateOrderStatus(+orderId, orderChangeStatus.orderStatusId, orderChangeStatus.fullfillmentStatusId, request);
            if (updateOrder.status === 0) {
                return response.status(400).send(updateOrder);
            }
        }
        return response.status(200).send({ status: 1, message: 'Successfully updated the order status' });
    }

    /**
     * @api {get} /api/order/order-excel-list Download Order Excel
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization Vendor's access token.
     *
     * @apiQuery {String} [orderId] One or more order IDs (comma-separated). Example: "12345,12346".
     * @apiQuery {Boolean|Number} [failedOrder] Set to `1` or `true` for failed orders, `0` or `false` for successful orders.
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "message": "Successfully download the Order Excel List..!!",
     *   "status": "1",
     *   "data": {}
     * }
     *
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "message": "Order Excel List error",
     *   "status": "0"
     * }
     *
     * @apiSampleRequest /api/order/order-excel-list
     */
    @Get('/order-excel-list')
    @Authorized('vendor')
    public async excelOrderView(@QueryParam('dateFrom') dateFrom: string, @QueryParam('dateTo') dateTo: string, @QueryParam('title') title: string, @QueryParam('orderId') orderId: string, @QueryParam('failedOrder') failedOrder: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
        // if (!orderId || orderId === '') {
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
            name: 'order.tenantId',
            op: 'where',
            value: request.user.tenantId,
        }, {
            name: 'order.backOrders',
            op: 'and',
            value: 0,
        });
        if (orderId && orderId !== '') {
            const orderIds = orderId.split(',');
            whereConditions.push({
                name: 'order.orderId',
                op: 'IN',
                value: orderIds,
            });
        }
        const searchConditions = [];
        const sort = [];
        sort.push({
            name: 'order.createdDate',
            order: 'DESC',
        });
        // DATE RANGE FILTER
        if (dateFrom && dateTo) {
            whereConditions.push({
                name: 'DATE(`order`.`created_date`)',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
            whereConditions.push({
                name: 'DATE(`order`.`created_date`)',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        } else if (dateFrom) {
            whereConditions.push({
                name: 'DATE(`order`.`created_date`)',
                op: 'raw',
                sign: '>=',
                value: dateFrom,
            });
        } else if (dateTo) {
            whereConditions.push({
                name: 'DATE(`order`.`created_date`)',
                op: 'raw',
                sign: '<=',
                value: dateTo,
            });
        }
        const orderList: any = await this.orderProductService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        totalData = orderList.length;
        for (const id of orderList) {
            const right = id.currencySymbolRight;
            const left = id.currencySymbolLeft;
            if (left === null && right === null) {
                rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, id.total, id.createdDate, id.modifiedDate]);
            } else {
                if (left) {
                    rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, left + id.total, id.createdDate, id.modifiedDate]);
                } else {
                    rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, id.total + right, id.createdDate, id.modifiedDate]);
                }
            }
        }
        // } else {
        //     const orderid = orderId?.split(',');
        //     totalData = orderid.length;
        //     for (const id of orderid) {
        //         const dataId = await this.orderService.findOrder({ where: { orderId: id } });
        //         const right = dataId.currencySymbolRight;
        //         const left = dataId.currencySymbolLeft;
        //         if (left === null && right === null) {
        //             rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total, dataId.createdDate, dataId.modifiedDate]);
        //         } else {
        //             if (left) {
        //                 rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, left + dataId.total, dataId.createdDate, dataId.modifiedDate]);
        //             } else {
        //                 rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total + right, dataId.createdDate, dataId.modifiedDate]);
        //             }
        //         }
        //     }
        // }
        // Add all rows data in sheet
        const recordIdsList = orderList.map((o: any) => o.orderId).join(',');
        worksheet.addRows(rows);
        const fileName = './OrderExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        // Add export log
        const newExportLog = new ExportLog();
        newExportLog.module = 'Manage Orders';
        newExportLog.title = title;
        newExportLog.exportId = await this.exportLogService.generateExportId(request.user.tenantId, 'Manage Orders');
        newExportLog.recordAvailable = totalData;
        newExportLog.tenantId = request.user.tenantId;
        newExportLog.createdBy = request.user.id;
        newExportLog.referenceType = 2;
        newExportLog.recordIds = recordIdsList;
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

    // DownloadOrderExportFromLog
    /**
     * @api {Get} /api/vendor-order/export-log-download/:id Download Order Export from Log
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization Vendor JWT Token
     * @apiParam (Path) {Number} id Export log table ID that contains selected order IDs.
     *
     * @apiDescription
     * This API allows the vendor to download an Excel sheet of specific orders
     * that were previously exported and recorded in the export log table.
     *
     * The Excel file includes detailed order information such as:
     * - Order ID
     * - Customer name
     * - Email
     * - Mobile number
     * - Total amount
     * - Created and updated dates
     *
     * Each record is fetched based on the order IDs stored in the export log entry
     * for the module **"Manage Orders"**.
     *
     * @apiSampleRequest /api/vendor-order/export-log-download/1
     *
     * @apiSuccessExample {file} Success-Response:
     * HTTP/1.1 200 OK
     * Excel file will be downloaded containing the order details:
     * [
     *   "Order Id",
     *   "Customer Name",
     *   "Email",
     *   "Mobile Number",
     *   "Total Amount",
     *   "Created Date",
     *   "Updated Date"
     * ]
     *
     * @apiErrorExample {json} Export Log Not Found
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "Export log not found or contains no order data"
     * }
     *
     * @apiErrorExample {json} No Orders Found
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "No orders found for this export log"
     * }
     */
    @Get('/export-log-download/:id')
    @Authorized('vendor')
    public async downloadOrderExportFromLog(
        @Param('id') exportLogId: number,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const excel = require('exceljs');
        // tslint:disable-next-line:no-shadowed-variable
        const fs = require('fs');

        const exportLog = await this.exportLogService.findOne({
            where: {
                id: exportLogId,
                tenantId: request.user.tenantId,
                module: 'Manage Orders',
            },
        });

        if (!exportLog || !exportLog.recordIds) {
            return response.status(404).send({
                status: 0,
                message: 'Export log not found or contains no order data',
            });
        }

        const recordIds = exportLog.recordIds.split(',').map((id: string) => +id);
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Order Detail Sheet');
        const rows = [];

        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 15 },
            { header: 'Mobile Number', key: 'telephone', size: 16, width: 15 },
            { header: 'Total Amount', key: 'total', size: 16, width: 15 },
            { header: 'Created Date', key: 'createdDate', size: 16, width: 15 },
            { header: 'Updated Date', key: 'modifiedDate', size: 16, width: 15 },
        ];

        const headers = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'];
        headers.forEach((cell) => {
            worksheet.getCell(cell).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

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
            { tableName: 'OrderProduct.order', aliasName: 'order' },
        ];

        const groupBy = [{ name: 'OrderProduct.orderId' }];
        const whereConditions = [
            { name: 'order.tenantId', op: 'where', value: request.user.tenantId },
            { name: 'order.backOrders', op: 'and', value: 0 },
            { name: 'order.orderId', op: 'IN', value: recordIds },
        ];

        const searchConditions = [];
        const sort = [{ name: 'order.createdDate', order: 'DESC' }];

        const orderList: any = await this.orderProductService.listByQueryBuilder(
            0,
            0,
            select,
            whereConditions,
            searchConditions,
            relations,
            groupBy,
            sort,
            false,
            true
        );

        if (!orderList.length) {
            return response.status(404).send({
                status: 0,
                message: 'No orders found for this export log',
            });
        }

        for (const order of orderList) {
            const { currencySymbolLeft, currencySymbolRight, total } = order;
            let totalDisplay = total;

            if (currencySymbolLeft) {
                totalDisplay = `${currencySymbolLeft}${total}`;
            } else if (currencySymbolRight) {
                totalDisplay = `${total}${currencySymbolRight}`;
            }

            rows.push([
                order.orderPrefixId,
                `${order.shippingFirstname} ${order.shippingLastname}`,
                order.email,
                order.telephone,
                totalDisplay,
                order.createdDate,
                order.modifiedDate,
            ]);
        }

        worksheet.addRows(rows);

        const fileName = `./OrderExport_${Date.now()}.xlsx`;
        await workbook.xlsx.writeFile(fileName);

        return new Promise((resolve, reject) => {
            response.download(fileName, (err) => {
                fs.unlinkSync(fileName);
                if (err) {
                    reject(err);
                } else {
                    resolve(response.end());
                }
            });
        });
    }

    // Delete Order API
    /**
     * @api {delete} /api/order/delete-order/:id Delete Single Order API
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'delete-order'])
    public async deleteOrder(@Param('id') orderid: number, @Res() response: any): Promise<any> {
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async deleteMultipleOrder(@Body({ validate: true }) orderDelete: DeleteOrderRequest, @Res() response: any): Promise<any> {
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async orderLogList(@QueryParam('orderId') orderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['orderId', 'orderPrefixId', 'orderStatusId', 'shippingFirstname', 'total', 'createdDate', 'modifiedDate'];
        const search = [
            {
                name: 'orderId',
                op: 'where',
                value: orderId,
            },
        ];
        const whereConditions = [];
        const orderList = await this.orderLogService.list(0, 0, select, search, whereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1, tenantId: request.user.tenantId }, order: { priority: 'ASC' } });
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async updatePaymentStatus(@BodyParam('orderId') orderId: number, @BodyParam('paymentStatusId') paymentStatusId: number, @Res() response: any): Promise<any> {
        const updateOrder = await this.orderService.findOrder({ where: { orderId } });
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.paymentStatus = paymentStatusId;
        updateOrder.paymentFlag = paymentStatusId;
        // const plugin = await this.pluginService.findOne({ where: { id: updateOrder.paymentMethod } });
        // updateOrder.paymentType = plugin.pluginName;
        await this.orderService.create(updateOrder);
        // if (paymentStatusId === 1) {
        //     const findPayment = await this.paymentService.findOne({ where: { orderId } });
        //     if (findPayment) {
        //         const errorResponse: any = {
        //             status: 0,
        //             message: 'Payment has been made for this order',
        //         };
        //         return response.status(400).send(errorResponse);
        //     }
        //     const paymentParams = new Payment();
        //     paymentParams.orderId = updateOrder.orderId;
        //     const date = new Date();
        //     paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        //     paymentParams.paymentAmount = updateOrder.total;
        //     const payments = await this.paymentService.create(paymentParams);
        //     let i;
        //     const orderProduct = await this.orderProductService.find({ where: { orderId: updateOrder.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] });
        //     for (i = 0; i < orderProduct.length; i++) {
        //         const paymentItems = new PaymentItems();
        //         paymentItems.paymentId = payments.paymentId;
        //         paymentItems.orderProductId = orderProduct[i].orderProductId;
        //         paymentItems.totalAmount = orderProduct[i].total;
        //         paymentItems.productName = orderProduct[i].productName;
        //         paymentItems.productQuantity = orderProduct[i].quantity;
        //         paymentItems.productPrice = orderProduct[i].productPrice;
        //         const payItem = await this.paymentItemsService.create(paymentItems);
        //         const vendorProduct = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
        //         if (vendorProduct) {
        //             const vendor = await this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
        //             const vendorGroup = await this.vendorGroupService.findOne({
        //                 where: {
        //                     groupId: vendor.vendorGroupId,
        //                 },
        //             });
        //             const vendorOrders = await this.vendorOrdersService.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
        //             if (vendorOrders) {
        //                 const vendorPayments = new VendorPayment();
        //                 vendorPayments.vendorId = vendorProduct.vendorId;
        //                 vendorPayments.paymentItemId = payItem.paymentItemId;
        //                 vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
        //                 vendorPayments.amount = orderProduct[i].total;
        //                 if (+vendorProduct.vendorProductCommission > 0) {
        //                     vendorPayments.commissionAmount = vendorPayments.amount * (+vendorProduct.vendorProductCommission / 100);
        //                 } else if (+vendor.commission > 0) {
        //                     vendorPayments.commissionAmount = vendorPayments.amount * (+vendor.commission / 100);
        //                 } else if (vendorGroup  && +vendorGroup.commission > 0) {
        //                     vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
        //                 } else {
        //                     const defaultCommission = await this.vendorGlobalSettingService.findOne();
        //                     const defCommission = defaultCommission.defaultCommission;
        //                     vendorPayments.commissionAmount = vendorPayments.amount * (+defCommission / 100);
        //                 }
        //                 await this.vendorPaymentService.create(vendorPayments);
        //             }
        //         }
        //     }
        // } else {
        //     const vendorOrder = await this.vendorOrdersService.findOne({ orderId });
        //     if (vendorOrder) {
        //         const vendorPayment = await this.vendorPaymentService.findOne({
        //             vendorOrderId: vendorOrder.vendorOrderId,
        //         });
        //         await this.vendorPaymentService.delete(vendorPayment.vendorPaymentId);
        //     }
        //     const paymentArchive = await this.paymentArchiveService.findOne({
        //         where: {
        //             orderId,
        //         },
        //     });
        //     if (paymentArchive) {
        //         await this.paymentArchiveService.delete({ orderId });
        //     }
        //     await this.paymentService.delete({ orderId });
        // }
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async updateOrderProductStatus(@Param('orderProductId') orderProductId: number, @BodyParam('orderStatusId') orderStatusId: number, @Res() response: any, @Req() request: any): Promise<any> {
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
        if (orderProductStatusUpdate) {
            const emailContent = await this.emailTemplateService.findOne(21);
            // const logo = await this.settingService.findOne();
            const vendorSetting = await this.vendorSettingsService.findOne({ vendorId: request.user.tenantId });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });
            const order = await this.orderService.findOrder(orderProductStatus.orderId);
            const orderStatus = await this.orderStatusService.findOne(orderStatusId);
            const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{title}', orderProductStatusUpdate.name).replace('{status}', orderStatus.name).replace('{order}', order.orderPrefixId);
            // const redirectUrl = env.storeRedirectUrl;
            const mailContents: any = {};
            mailContents.setting = { ...vendorSetting, ...vendor };
            mailContents.emailContent = message;
            const vendorDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0 } });
            let redirectUrl = vendorSetting.storeUrl;
            if (vendorDomain?.name) {
                redirectUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.user.tenantId, vendorDomain.name);
            }
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async orderProductLogList(@QueryParam('orderProductId') orderProductId: number, @Res() response: any): Promise<any> {
        const select = ['orderProductLogId', 'orderProductId', 'productId', 'orderId', 'name', 'model', 'quantity', 'trace', 'total', 'tax', 'orderStatusId', 'trackingUrl', 'trackingNo', 'isActive', 'createdDate', 'modifiedDate'];
        const relation = [];
        const whereConditions = [
            {
                name: 'orderProductId',
                op: 'where',
                value: orderProductId,
            },
        ];
        const orderProductList = await this.orderProductLogService.list(0, 0, select, relation, whereConditions, 0);
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async orderCounts(@Res() response: any): Promise<any> {
        const orders: any = {};
        const order = await this.orderService.findTotalOrderAmount();
        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const orderAmount = await this.orderService.findAlltodayOrder(todaydate);
        const orderCount = await this.orderService.findAllTodayOrderCount(todaydate);
        const search = [{
            name: 'paymentProcess',
            op: 'where',
            value: '1',
        }];
        const orderList = await this.orderService.list(0, 0, [], search, [], 0, 1);
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'cancel-request-list'])
    public async canceledOrderProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'update-cancel-request-status'])
    public async updateOrderCancelStatus(@Param('orderProductId') orderProductId: number, @BodyParam('cancelStatusId') cancelStatusId: number, @Res() response: any, @Req() request: any): Promise<any> {
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
        // const redirectUrl = env.storeRedirectUrl;
        // const logo = await this.settingService.findOne();
        const vendorSetting = await this.vendorSettingsService.findOne({ vendorId: request.user.tenantId });
        const vendor = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });
        const mailContents: any = {};
        mailContents.setting = { ...vendorSetting, ...vendor };
        mailContents.emailContent = message;
        const vendorDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0 } });
        let redirectUrl = vendorSetting.storeUrl;
        if (vendorDomain?.name) {
            redirectUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.user.tenantId, vendorDomain.name);
        }
        mailContents.redirectUrl = redirectUrl;
        mailContents.productDetailData = '';
        MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
        if (orderProductStatusUpdate) {
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async updateBulkOrderCancelStatus(@QueryParam('orderProductId') orderProductId: string, @QueryParam('cancelStatusId') cancelStatusId: number, @Res() response: any, @Req() request: any): Promise<any> {
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
            // const logo = await this.settingService.findOne();
            const vendorSetting = await this.vendorSettingsService.findOne({ vendorId: request.user.tenantId });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });
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
            // const redirectUrl = env.storeRedirectUrl;
            const mailContents: any = {};
            mailContents.setting = { ...vendorSetting, ...vendor };
            mailContents.emailContent = message;
            const vendorDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0 } });
            let redirectUrl = vendorSetting.storeUrl;
            if (vendorDomain?.name) {
                redirectUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.user.tenantId, vendorDomain.name);
            }
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'cancel-request-export-list'])
    public async exportCancelRequest(@QueryParam('orderProductId') orderProductId: string, @Res() response: any): Promise<any> {
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
                if (left) {
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'export-order'])
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
                if (left) {
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'list-back-order'])
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'failed-order-list'])
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
        const whereConditions = [];
        const failedOrderList = await this.orderService.list(limit, offset, select, search, whereConditions, relations, count);
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'move-failed-order-to-main-order'])
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
                paymentItems.productName = orderProduct[i].productName;
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
                    } else if (vendorGroup && +vendorGroup.commission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
                    } else {
                        const defaultCommission = await this.vendorGlobalSettingService.findOne({ where: { settingId: 1 } });
                        const defCommission = defaultCommission?.defaultCommission;
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
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
     * @apiGroup Vendor Order
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
    @Authorized(['vendor', 'sales-report-export'])
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
     * @apiGroup Vendor Order
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
    @Authorized('vendor')
    public async orderDetail(@Param('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat', 'shippingCostOverride',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight', 'fullfillmentStatusId'],
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
                // const orderProductStatusData = await this.orderStatusService.findOne({
                //     where: { orderStatusId: value.orderStatusId },
                //     select: ['name', 'colorCode'],
                // });
                // if (orderProductStatusData) {
                //     tempVal.orderStatusName = orderProductStatusData.name;
                //     tempVal.statusColorCode = orderProductStatusData.colorCode;
                // }
                // const orderFullfillmentStatus = await this.orderStatusService.findOne({
                //     where: { orderStatusId: tempVal.fullfillmentStatusId },
                //     select: ['name', 'colorCode'],
                // });
                // tempVal.orderFullfillmentStatusName = orderFullfillmentStatus?.name ?? '';
                // tempVal.orderFullfillmentStatusColorCode = orderFullfillmentStatus?.colorCode ?? '';
                if (value.taxType === 2) {
                    tempVal.taxValueInAmount = (+value.basePrice * (+value.taxValue / 100)).toFixed(2);
                } else {
                    tempVal.taxValueInAmount = +value.taxValue;
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
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.orderStatusId },
            select: ['name', 'colorCode'],
        });
        if (orderStatusData) {
            orderData.orderStatusName = orderStatusData.name;
            orderData.statusColorCode = orderStatusData.colorCode;
        }
        const orderFullfillmentStatus = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.fullfillmentStatusId },
            select: ['name', 'colorCode'],
        });
        orderData.orderFullfillmentStatusName = orderFullfillmentStatus?.name ?? '';
        orderData.orderFullfillmentStatusColorCode = orderFullfillmentStatus?.colorCode ?? '';
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order detail',
            data: orderData,
        };
        return response.status(200).send(successResponse);
    }

    // customer checkout
    /**
     * @api {post} /api/orders/create-order
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} customerId customerId
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
     *      "productName" : "",
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
     *      "customerId": "",
     *      "orderSource":"",
     *      "quoteRequestId":""
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
     * @apiSampleRequest /api/order/create-order
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-order')
    @Authorized(['vendor', 'create-order'])
    public async createOrder(@Body({ validate: true }) createOrderParam: CreateOrderRequest, @Req() request: any, @Res() response: any): Promise<any> {

        // const logo = await this.settingService.findOne();
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
        const vendorData = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });
        const coupon = {
            couponCode: createOrderParam.couponCode,
            couponData: createOrderParam.couponData,
            couponDiscount: createOrderParam.couponDiscountAmount,
        };
        // Coupon Validation
        if (pluginModule.includes('Coupon')) {
            const importPath = __dirname + '/../../../../add-ons/Coupon/coupon';
            const Coupon = await require(importPath);
            const pluginResponse: any = await Coupon.process(coupon);

            if (pluginResponse === 'error') {
                return {
                    status: 0,
                    message: 'Invalid Coupon',
                };
            }
        }

        const dynamicData: any = {};
        const orderProducts: any = createOrderParam.productDetails;

        // if (createOrderParam.orderSource === 'rfq') {
        //     const rfqDetails = await this.quoteRequestDetailService.find({ where: { id: createOrderParam.quoteRequestId } });
        //     orderProducts.map(product => {
        //         const rfqData = rfqDetails.find(item => item.skuId === product.skuId);
        //         if (rfqData) {
        //             product.price = rfqData.targetPrice;
        //         }
        //         return product;
        //     });
        // }

        if (pluginModule.includes('RfqAndQuotes') && createOrderParam.orderSource === 'rfq') {

            const { QuoteRequestDetailService } = require('../../../../add-ons/RfqAndQuotes/services/QuoteRequestDetailService');
            const quoteRequestDetailService: any = Container.get(QuoteRequestDetailService);

            if (!createOrderParam.quoteRequestId) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid quote Request Id.',
                });
            }
            const quoteDetails = await quoteRequestDetailService.find({ where: { quoteRequestId: createOrderParam.quoteRequestId } });
            if (!quoteDetails.length) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid quote request.',
                });
            }
            orderProducts.map(product => {
                const quoteData = quoteDetails.find(item => item.skuId === product.skuId);
                if (quoteData) {
                    product.price = +quoteData.targetPrice;
                    product.quantity = quoteData.quantity;
                }
                return product;
            });
        }

        let priceGroupAddonExist = false;
        let customerPriceBySkuAndCustomerId;

        if (pluginModule.includes('ProductPriceGroup') && await this.vendorPluginService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, plugins: { slugName: 'product-price-group', pluginStatus: 1 } }, relations: ['plugins'] })) {
            priceGroupAddonExist = true;
            const importPath = __dirname + '/../../../../add-ons/ProductPriceGroup/priceGroupHook';
            const { getCustomerPriceBySkuAndCustomerId } = require(importPath);
            customerPriceBySkuAndCustomerId = getCustomerPriceBySkuAndCustomerId;
        }
        for (const val of orderProducts) {
            /// for find product price with tax , option price, special, discount and tire price /////
            let price: any;
            let taxType: any;
            let taxValue: any;
            let tirePrice = 0;
            let priceWithTax: any;
            let priceGroupDetailId = 0;
            const productTire: any = await this.productService.findOne({ where: { productId: val.productId } });
            taxType = productTire.taxType;
            taxValue = productTire.taxValue;
            // if (taxType === 2 && taxType) {
            //     const vendorTax = await this.vendorTaxService.findOne({ where: { id: productTire.taxValue }, relations: ['tax'] });
            //     taxValue = (vendorTax.tax) ? vendorTax.tax.taxPercentage : 0;
            // } else if (taxType === 1 && taxType) {
            //     taxValue = productTire.taxValue;
            // }
            const sku: any = await this.skuService.findOne({ where: { skuName: val.skuName } });
            if (sku) {
                if (createOrderParam.orderSource === 'rfq' || createOrderParam.orderSource === 'quote') {
                    tirePrice = val.price;
                } else {
                    const customerPrice = [];
                    if (priceGroupAddonExist) {
                        customerPrice.push(...(await customerPriceBySkuAndCustomerId(sku.id, request.id ?? 0)));
                    }
                    if (customerPrice.length) {
                        const customerPriceSort = customerPrice.sort((a, b) => b.maxQuantity - a.maxQuantity);
                        const priceByQuantity = customerPriceSort.find((custPrice) => val.quantity >= custPrice.maxQuantity);
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
            ///// finding price from backend ends /////
            const obj: any = {};
            obj.skuPrice = sku ? sku.price : productTire.price;
            obj.skuId = sku ? sku.id : productTire.skuId;
            obj.price = price;
            obj.taxType = taxType;
            obj.taxValue = taxValue;
            obj.tirePrice = tirePrice;
            obj.productTire = productTire;
            obj.quantity = val.quantity;
            obj.priceGroupDetailId = priceGroupDetailId;
            dynamicData[val.skuName] = obj;
        }
        for (const val of orderProducts) {
            const product: any = await this.productService.findOne({ where: { productId: val.productId } });
            const sku: any = await this.skuService.findOne({ where: { skuName: val.skuName } });
            if (product.hasStock === 1) {
                if (!(+sku.minQuantityAllowedCart <= +val.quantity)) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Quantity should be greater than min Quantity.',
                    });
                } else if (!(+sku.maxQuantityAllowedCart >= +val.quantity)) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Reached maximum quantity limit',
                    });
                }
                if ((+sku.quantity <= 0)) {
                    return response.status(400).send({
                        status: 0,
                        message: 'item is Out of stock',
                    });
                }
                if (!(+sku.quantity >= +val.quantity)) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Available stock for ' + product.name + ' - ' + val.skuName + 'is' + sku.quantity,
                    });
                }
            }
        }
        const vendorZoneData: any = await this.zoneService.find({ where: { zoneId: In([createOrderParam.shippingZone, createOrderParam.paymentZone]) } });
        const newOrder = {} as any;
        const newOrderTotal = {} as any;
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];

        const zoneData: any = vendorZoneData.find(val => +val.zoneId === +createOrderParam.paymentZone);
        newOrder.customerId = createOrderParam.customerId;
        newOrder.email = createOrderParam.emailId;
        newOrder.telephone = createOrderParam.phoneNumber;
        newOrder.shippingFirstname = createOrderParam.shippingFirstName;
        newOrder.shippingLastname = createOrderParam.shippingLastName;
        newOrder.shippingAddress1 = createOrderParam.shippingAddress_1;
        newOrder.shippingAddress2 = createOrderParam.shippingAddress_2;
        newOrder.shippingCompany = createOrderParam.shippingCompany;
        newOrder.shippingCity = createOrderParam.shippingCity;
        newOrder.shippingZone = zoneData?.name ?? '';
        newOrder.shippingCountryId = createOrderParam.shippingCountryId;
        const vendorCountry = await this.vendorCountryService.findOne({
            where: {
                id: createOrderParam.shippingCountryId,
            },
            relations: ['country'],
        });
        if (vendorCountry) {
            newOrder.shippingCountry = vendorCountry.country?.name;
        }
        newOrder.shippingPostcode = createOrderParam.shippingPostCode;
        newOrder.shippingAddressFormat = createOrderParam.shippingAddressFormat;
        newOrder.paymentFirstname = createOrderParam.paymentFirstName;
        newOrder.paymentLastname = createOrderParam.paymentLastName;
        newOrder.paymentAddress1 = createOrderParam.paymentAddress_1;
        newOrder.paymentAddress2 = createOrderParam.paymentAddress_2;
        newOrder.paymentMobileNumber = createOrderParam.paymentMobileNumber;
        newOrder.paymentCompany = createOrderParam.paymentCompany;
        const paymentVendorCountry: any = await this.vendorCountryService.findOne({
            where: {
                id: createOrderParam.paymentCountryId,
            },
            relations: ['country'],
        });
        if (paymentVendorCountry) {
            newOrder.paymentCountry = paymentVendorCountry?.country?.name;
        }
        const zone: any = vendorZoneData.find(val => +val.zoneId === +createOrderParam.paymentZone);
        newOrder.paymentCity = createOrderParam.paymentCity;
        newOrder.paymentZone = zone?.name ?? '';
        newOrder.paymentPostcode = createOrderParam.paymentPostCode;
        newOrder.paymentMethod = createOrderParam.paymentMethod;
        newOrder.customerGstNo = createOrderParam.taxNumber;
        newOrder.ip = '';
        newOrder.isActive = 1;

        newOrder.orderStatusId = vendorSetting.orderStatus ?? 0;
        newOrder.invoicePrefix = vendorSetting ? vendorSetting.invoicePrefix : '';
        const vendorCurrency: any = await this.currencyService.findOne({ where: { currencyId: vendorSetting?.storeCurrencyId } });
        newOrder.currencyCode = vendorCurrency?.code ?? '';
        newOrder.currencyValue = vendorCurrency?.value ?? 0;
        newOrder.currencySymbolLeft = vendorCurrency?.symbolLeft ?? '';
        newOrder.currencySymbolRight = vendorCurrency?.symbolRight ?? '';
        newOrder.paymentAddressFormat = createOrderParam.shippingAddressFormat;
        newOrder.tenantId = request.user.tenantId;
        newOrder.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        newOrder.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        newOrder.mustShipBefore = createOrderParam.mustShipBefore;
        newOrder.poNumber = createOrderParam.poNumber;
        newOrder.notes = createOrderParam.notes;
        newOrder.paymentRuleId = createOrderParam.paymentRuleId;
        newOrder.paymentTermId = createOrderParam.paymentTermId;
        newOrder.createdByType = 'seller';
        newOrder.orderSource = createOrderParam.orderSource;
        newOrder.shippingCostOverride = createOrderParam.shippingCostOverride;
        const orderData: any = await this.orderService.create(newOrder);

        await this.orderLogService.create({ orderLogId: undefined, ...orderData });

        orderProduct = createOrderParam.productDetails;
        let j = 1;
        for (i = 0; i < orderProduct.length; i++) {

            if (createOrderParam.orderSource === 'rfq') {
                orderProduct[i].quantity = dynamicData[orderProduct[i].skuName].quantity;
            }
            ///// finding price from backend ends /////
            const dynamicPrices = dynamicData[orderProduct[i].skuName];
            const productDetails = {} as any;
            productDetails.productId = orderProduct[i].productId;
            const nwDate = new Date();
            const odrDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
            productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + j;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = dynamicPrices.tirePrice;
            productDetails.basePrice = dynamicPrices.skuPrice;
            productDetails.discountAmount = parseFloat(dynamicPrices.skuPrice) - parseFloat(dynamicPrices.tirePrice);
            productDetails.discountedAmount = productDetails.discountAmount !== 0.00 ? dynamicPrices.tirePrice : '0.00';
            productDetails.taxType = dynamicPrices.taxType;
            productDetails.taxValue = dynamicPrices.taxValue;
            productDetails.total = +orderProduct[i].quantity * dynamicPrices.price;
            productDetails.model = dynamicPrices.productTire.name;
            productDetails.skuName = orderProduct[i].skuName ? orderProduct[i].skuName : '';
            productDetails.priceGroupDetailId = dynamicPrices.priceGroupDetailId;
            const orderStatus = await this.orderStatusService.findOne({ where: { statusId: 1, tenantId: request.user.tenantId } });
            productDetails.orderStatusId = orderStatus.orderStatusId;
            productDetails.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            productDetails.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const productInformation = await this.orderProductService.createData(productDetails);
            await this.orderProductLogService.create(productInformation);

            // -- VEN
            if (request.user.tenantId !== 0) {
                const val: any = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId, vendorId: request.user.tenantId } });
                if (val) {
                    const vendororders = {} as any;
                    vendororders.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + request.user.tenantId + j;
                    vendororders.vendorId = request.user.tenantId;
                    vendororders.orderId = orderData.orderId;
                    vendororders.orderProductId = productInformation.orderProductId;
                    vendororders.total = productDetails.total;
                    vendororders.subOrderStatusId = 1;
                    vendororders.commission = 0;
                    // const date = new Date();
                    vendororders.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    // Disable Commisison
                    // if (val.vendorProductCommission > 0) {
                    //     vendororders.commission = val.vendorProductCommission;
                    // } else if (vendor.commission > 0) {
                    //     vendororders.commission = vendor.commission;
                    // } else {
                    //     const vendorGroup: any = await this.vendorGroupService.findOne({
                    //         select: ['groupId', 'name', 'description', 'commission'],
                    //         where: {
                    //             groupId: vendor.vendorGroupId,
                    //         },
                    //     });
                    //     const defaultCommission: any = await this.vendorSettingService.findOne();
                    //     const defCommission = defaultCommission.defaultCommission;
                    //     vendororders.commission = (vendorGroup && vendorGroup.commission) ? vendorGroup.commission : defCommission;
                    // }
                    // --
                    vendororders.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    const value = await this.vendorOrderService.create(vendororders);
                    const vendorOrderLog = {} as any;
                    vendorOrderLog.vendorOrderId = value.vendorOrderId;
                    vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + request.user.tenantId + j;
                    vendorOrderLog.vendorId = request.user.tenantId;
                    vendorOrderLog.orderId = orderData.orderId;
                    vendorOrderLog.subOrderStatusId = orderStatus.orderStatusId;
                    vendorOrderLog.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    vendorOrderLog.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');

                    await this.vendorOrderLogService.create(vendorOrderLog);

                    const getVendorInvoice = await this.vendorInvoiceService.findOne({ where: { vendorId: request.user.tenantId, orderId: orderData.orderId } });
                    if (!getVendorInvoice) {
                        const newVendorInvoice = {} as any;
                        newVendorInvoice.vendorId = request.user.tenantId;
                        newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                        newVendorInvoice.orderId = orderData.orderId;
                        newVendorInvoice.email = createOrderParam.emailId;
                        newVendorInvoice.total = 0;
                        newVendorInvoice.shippingFirstname = createOrderParam.shippingFirstName;
                        newVendorInvoice.shippingLastname = createOrderParam.shippingLastName;
                        newVendorInvoice.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        newVendorInvoice.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        await this.vendorInvoiceService.create(newVendorInvoice);
                    }
                    const vendorInvoiceData: any = await this.vendorInvoiceService.findOne({ where: { vendorId: request.user.tenantId, orderId: orderData.orderId } });
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

            const productImageData: any = await this.productService.findOne({ where: { productId: productInformation.productId } });
            // for stock management
            if (productImageData.hasStock === 1) {
                const product: any = await this.skuService.findOne({ where: { skuName: productInformation.skuName } });
                product.quantity = +product.quantity - +productInformation.quantity;
                const prod: any = await this.skuService.create(product);
                if (productImageData.isSimplified === 0) {
                    const findSku: any = await this.skuService.findOne({ where: { skuName: productInformation.skuName } });
                    findSku.quantity = +findSku.quantity - +productInformation.quantity;
                    await this.skuService.create(findSku);
                }
                if (+prod.quantity <= +prod.notifyMinQuantity) {
                    const productStockAlert = {} as any;
                    productStockAlert.productId = productInformation.productId;
                    productStockAlert.skuName = productInformation.skuName;
                    productStockAlert.mailFlag = 1;
                    await this.productStockAlertService.create(productStockAlert);
                    // Send email for stock notify
                    const findVendorProduct: any = await this.vendorProductService.findOne({ where: { productId: productInformation.productId }, relations: ['vendor'] });
                    const findProductNotifyTemp: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 46 } });
                    if (findVendorProduct) {
                        const customer: any = await this.customerService.findOne({ where: { id: findVendorProduct.vendor.customerId } });
                        const vendorMessage = findProductNotifyTemp.content.replace(/{name}/g, customer.firstName + ' ' + customer.lastName).replace(/{productName}/g, productImageData.name);
                        const vendorMailContents: any = {};
                        vendorMailContents.setting = { ...vendorSetting, ...vendorData };
                        vendorMailContents.productDetailData = undefined;
                        vendorMailContents.emailContent = vendorMessage;
                        vendorMailContents.redirectUrl = env.vendorRedirectUrl;
                        // stockNotifyMails.vendorEmailContents = vendorMailContents;
                        // stockNotifyMails.vendorEmail = customer.email;
                        // stockNotifyMails.subject = findProductNotifyTemp.subject;
                        // stockNotifyMails.bcc = false;
                        // stockNotifyMails.isAttachment = false;
                        // stockNotifyMails.attachmentDetails = '';
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
            let productImageDetail;
            productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.find({ where: { productId: orderProduct[i].productId, orderId: orderData.orderId, orderProductId: productInformation.orderProductId } });
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
            const importPath = __dirname + '/../../../../add-ons/Coupon/coupon';
            const Coupon = await require(importPath);
            couponData = await Coupon.process(coupon, orderData, dynamicData, totalAmount);
        }
        // ---

        newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = vendorSetting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        newOrderTotal.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        if (couponData.discountAmount) {
            newOrder.total = couponData.total + (+createOrderParam.shippingCostOverride);
            newOrder.couponCode = couponData.couponCode;
            newOrder.discountAmount = couponData.discountAmount;
            newOrder.amount = totalAmount;
            newOrderTotal.value = totalAmount - couponData.discountAmount + (+createOrderParam.shippingCostOverride);
        } else {
            newOrder.amount = totalAmount;
            newOrder.total = totalAmount + (+createOrderParam.shippingCostOverride);
            newOrderTotal.value = totalAmount + (+createOrderParam.shippingCostOverride);
        }
        await this.orderService.update(orderData.orderId, newOrder);
        await this.orderTotalService.createOrderTotalData(newOrderTotal);

        // Create entry for customer addresses
        if (createOrderParam.customerId) {
            // Billing address
            const existingBilling = await this.addressService.findOne({
                where: {
                    customerId: createOrderParam.customerId,
                    addressType: 1,
                },
            });
            if (!existingBilling && (createOrderParam.paymentFirstName || createOrderParam.paymentAddress_1 || createOrderParam.paymentCity)) {
                const billingAddress: any = {};
                billingAddress.customerId = createOrderParam.customerId;
                billingAddress.countryId = createOrderParam.paymentCountryId ?? null;
                billingAddress.zoneId = createOrderParam.paymentZone ?? 0;
                billingAddress.firstName = createOrderParam.paymentFirstName ?? '';
                billingAddress.lastName = createOrderParam.paymentLastName ?? '';
                billingAddress.company = createOrderParam.paymentCompany ?? '';
                billingAddress.address1 = createOrderParam.paymentAddress_1 ?? '';
                billingAddress.address2 = createOrderParam.paymentAddress_2 ?? '';
                billingAddress.postcode = createOrderParam.paymentPostCode ? String(createOrderParam.paymentPostCode) : '';
                billingAddress.city = createOrderParam.paymentCity ?? '';
                billingAddress.phoneNo = createOrderParam.paymentMobileNumber ? Number(createOrderParam.paymentMobileNumber) : Number(createOrderParam.phoneNumber ?? 0);
                billingAddress.addressType = 1;
                billingAddress.isActive = 1;
                billingAddress.isDefault = 0;
                await this.addressService.create(billingAddress);
            }

            // Shipping address
            const existingShipping = await this.addressService.findOne({
                where: {
                    customerId: createOrderParam.customerId,
                    addressType: 0,
                },
            });
            if (!existingShipping && (createOrderParam.shippingFirstName || createOrderParam.shippingAddress_1 || createOrderParam.shippingCity)) {
                const shippingAddress: any = {};
                shippingAddress.customerId = createOrderParam.customerId;
                shippingAddress.countryId = createOrderParam.shippingCountryId ?? null;
                shippingAddress.zoneId = createOrderParam.shippingZone ?? 0;
                shippingAddress.firstName = createOrderParam.shippingFirstName ?? '';
                shippingAddress.lastName = createOrderParam.shippingLastName ?? '';
                shippingAddress.company = createOrderParam.shippingCompany ?? '';
                shippingAddress.address1 = createOrderParam.shippingAddress_1 ?? '';
                shippingAddress.address2 = createOrderParam.shippingAddress_2 ?? '';
                shippingAddress.postcode = createOrderParam.shippingPostCode ? String(createOrderParam.shippingPostCode) : '';
                shippingAddress.city = createOrderParam.shippingCity ?? '';
                shippingAddress.phoneNo = Number(createOrderParam.phoneNumber ?? 0);
                shippingAddress.addressType = 0;
                shippingAddress.isActive = 1;
                shippingAddress.isDefault = 0;
                await this.addressService.create(shippingAddress);
            }
        }

        if (!createOrderParam.paymentRuleId) {
            return {
                status: 0,
                message: 'paymentRuleId is invalid',
            };
        }
        const emailContent: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 5 } });
        const adminEmailContent: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 6 } });
        const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
        const customerFirstName = orderData.shippingFirstname;
        const customerLastName = orderData.shippingLastname;
        const customerName = customerFirstName + ' ' + customerLastName;
        // const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
        const customerMessage = emailContent.content.replace('{name}', customerName);
        const adminId: any = [];
        // const adminUser: any = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
        // for (const user of adminUser) {
        //     const val = user.username;
        //     adminId.push(val);
        // }
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
        const codVendorMails: any[] = [];
        const vendorInvoice: any[] = await this.vendorInvoiceService.findAll({ where: { orderId: orderData.orderId } });
        if (vendorInvoice.length > 0) {
            for (const vendInvoice of vendorInvoice) {
                const vendorProductDetailData = [];
                const vendor: any = await this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                const customer: any = await this.customerService.findOne({ where: { id: vendor.customerId } });
                const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const vendorInvoiceItem: any[] = await this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                for (const vendInvoiceItem of vendorInvoiceItem) {
                    const vendorProductInformation: any = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'skuName', 'taxValue', 'taxType', 'orderProductPrefixId'] });
                    // const vendorProductInformation = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                    const vendorProductImageData: any = await this.productService.findOne({ where: { productId: vendorProductInformation.productId } });
                    let vendorProductImageDetail;
                    vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                    vendorProductImageData.productInformationData = vendorProductInformation;
                    vendorProductImageData.productImage = vendorProductImageDetail;
                    vendorProductDetailData.push(vendorProductImageData);

                }
                const vendorRedirectUrl = env.vendorRedirectUrl;
                const vendorMailContents: any = {};
                vendorMailContents.setting = { ...vendorSetting, ...vendor };
                vendorMailContents.emailContent = vendorMessage;
                vendorMailContents.redirectUrl = vendorRedirectUrl;
                vendorMailContents.productDetailData = vendorProductDetailData;
                vendorMailContents.today = today;
                vendorMailContents.orderData = orderData;
                // MAILService.sendMail(mailContents, customer.email, adminEmailContent.subject, false, false, '');
                const codVendorMail: any = {};
                codVendorMail.vendorEmailContents = vendorMailContents;
                codVendorMail.vendorEmail = customer.email;
                codVendorMail.subject = adminEmailContent.subject.replace('{orderId}', orderData.orderId);
                codVendorMail.bcc = false;
                codVendorMail.isAttachment = false;
                codVendorMail.attachmentDetails = '';

                codVendorMails.push({ ...codVendorMail });
            }
        }
        if (codVendorMails.length) {
            for (const codVendorMail of codVendorMails) {
                const vendorMail = codVendorMail;
                vendorMail.vendorEmailContents.templateName = 'invoice-order';
                MAILService.sendMail(vendorMail.vendorEmailContents, vendorMail.vendorEmail, vendorMail.subject, vendorMail.bcc, vendorMail.isAttachment, vendorMail.attachmentDetails);
            }
        }
        const storeUrls = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
        const storeMailContents: any = {};
        storeMailContents.setting = { ...vendorSetting, ...vendorData };
        storeMailContents.emailContent = customerMessage;
        storeMailContents.redirectUrl = storeUrls ?? '';
        storeMailContents.productDetailData = productDetailData;
        storeMailContents.today = today;
        storeMailContents.orderData = orderData;
        storeMailContents.templateName = 'invoice-order';
        MAILService.sendMail(storeMailContents, orderData.email, emailContent.subject, false, false, '');
        const order: any = await this.orderService.findOne({ orderId: orderData.orderId });
        // order.paymentType = vendorPluginData ? vendorPluginData.pluginName : '';
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

        const vendorPlugin = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.user.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: 'ShoppingCart',
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            }
        );
        if (createOrderParam.shoppingCartId && pluginModule.includes('ShoppingCart') && vendorPlugin) {
            const importPath = '../../../../add-ons/ShoppingCart/ShoppingCartHook';
            const shoppingCart = await require(importPath);
            const shoppingCartData = await shoppingCart.findOne({ where: { id: createOrderParam.shoppingCartId, isOrdered: 0 } });
            if (shoppingCartData) {
                shoppingCartData.isOrdered = 1;
                await shoppingCart.update(shoppingCartData.id, shoppingCartData);
            }
        }
        return response.status(200).send({
            status: 1,
            message: 'You have successfully placed order. order details sent to your mail',
            data: { order },
        });
    }

    public async updateOrderStatus(orderId: number, orderStatusId: number, fullfillmentStatusId: number, request: any): Promise<any> {
        const orderStatus = await this.orderStatusService.findOne({ where: { orderStatusId } });
        if (orderStatus.isVendor !== 1 || orderStatus.isActive !== 1) {
            const errorResponse: any = {
                status: 0,
                message: 'Access Restricted to change status',
            };
            return errorResponse;
        }
        const order = await this.orderService.findOne({ orderId });
        if (!order) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Order',
            };
            return errorResponse;
        }
        order.orderStatusId = orderStatusId;
        order.fullfillmentStatusId = fullfillmentStatusId;
        const orderData = await this.orderService.update(order.orderId, order);

        const orderProducts = await this.orderProductService.find({ where: { orderId: order.orderId } });
        if (orderProducts) {
            orderProducts.orderStatusId = orderStatusId;
            await this.orderProductService.update(orderProducts.orderProductId, orderProducts);
        }

        const vendorOrders = await this.vendorOrderService.findOne({ where: { orderId: order.orderId, vendorId: request.user.tenantId } });
        if (vendorOrders) {
            vendorOrders.subOrderStatusId = orderStatusId;
            await this.vendorOrderService.update(vendorOrders.vendorOrderId, vendorOrders);
        }

        await this.orderLogService.create({ orderLogId: undefined, ...orderData });

        orderData.name = orderStatus.name;
        if (orderData) {
            const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 21 } });
            const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });
            const orderFullfillmentStatus = await this.orderFullfillmentStatusService.findOne({ where: { fullfillmentStatusId } });
            const message = emailContent.content.replace('{name}', orderData.shippingFirstname).replace('{title}', '').replace('{status}', `${orderStatus.name} ${orderFullfillmentStatus ? `Fullfillment ${orderFullfillmentStatus.name}` : ''}`).replace('{order}', orderData.orderPrefixId);
            const mailContents: any = {};
            mailContents.setting = { ...vendorSetting, ...vendor };
            mailContents.emailContent = message;
            const vendorDomain = await this.vendorSettingsDomainService.findOne({ where: { vendorId: request.user.tenantId, isActive: 1, isDelete: 0 } });
            let redirectUrl = vendorSetting.storeUrl;
            if (vendorDomain?.name) {
                redirectUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.user.tenantId, vendorDomain.name);
            }
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the order status',
                data: orderData,
            };
            return successResponse;
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to update OrderStatus',
            };
            return errorResponse;
        }
    }
}
