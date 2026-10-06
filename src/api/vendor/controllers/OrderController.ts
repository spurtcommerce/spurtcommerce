/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, QueryParam, Res, Req, Post, Body, Delete, Param, BodyParam } from 'routing-controllers';
import { OrderService } from '../../core/services/OrderService';
import { UpdateOrderChangeStatus } from './requests/UpdateOrderChangeStatus';
import { OrderLogService } from '../../core/services/OrderLogService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { PdfService } from '../../core/services/PdfService';
import { VendorCountryService } from '../../core/services/VendorCountryService';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorService } from '../../core/services/VendorService';
import * as fs from 'fs';
import moment = require('moment');
import { OrderProductLogService } from '../../core/services/OrderProductLogService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { VendorOrderLogService } from '../../core/services/VendorOrderLogService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { MAILService } from '../../../auth/mail.services';
import { ProductService } from '../../core/services/ProductService';
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
        private vendorProductService: VendorProductService,
        private vendorService: VendorService,
        private vendorOrdersService: VendorOrdersService,
        private orderProductLogService: OrderProductLogService,
        private productImageService: ProductImageService,
        private vendorOrderLogService: VendorOrderLogService,
        private emailTemplateService: EmailTemplateService,
        private orderStatusService: OrderStatusService,
        private productService: ProductService,
        private exportLogService: ExportLogService,
        private vendorSettingsService: VendorSettingsService,
        private vendorPluginService: VendorPluginService,
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
        private orderFullfillmentStatusService: OrderFullfillmentStatusService,
        private addressService: AddressService,
        private vendorUsersService: VendorUsersService
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
        // filter parameter removed: injecting arbitrary SQL strings is not safe
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
            const redirectUrl = vendorSetting.storeUrl;
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
