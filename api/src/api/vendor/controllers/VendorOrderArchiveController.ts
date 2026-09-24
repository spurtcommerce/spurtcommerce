/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Req, Get, QueryParam, Authorized, Param, BodyParam, Post } from 'routing-controllers';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { OrderService } from '../../core/services/OrderService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import * as fs from 'fs';
import { VendorPaymentService } from '../../core/services/VendorPaymentService';
import { VendorPaymentArchiveService } from '../../core/services/VendorPaymentArchiveService';
import { VendorPaymentArchive } from '../../core/models/VendorPaymentArchive';
import { VendorPayment } from '../../core/models/VendorPayment';
import { OrderLogService } from '../../core/services/OrderLogService';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Order } from '../../core/models/Order';
import { OrderArchive } from '../../core/models/OrderArchive';
import { OrderArchiveLog } from '../../core/models/OrderArchiveLog';
import { OrderProductArchive } from '../../core/models/OrderProductArchive';
import { OrderLog } from '../../core/models/OrderLog';
import { OrderArchiveService } from '../../core/services/OrderArchiveService';
import { OrderArchiveLogService } from '../../core/services/OrderArchiveLogService';
import { OrderProductArchiveService } from '../../core/services/OrderProductArchiveService';
import { OrderProduct } from '../../core/models/OrderProduct';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-order-archive')
export class VendorOrderArchiveController {
    constructor(
        private vendorOrdersService: VendorOrdersService,
        private orderService: OrderService,
        private orderProductService: OrderProductService,
        private productImageService: ProductImageService,
        private orderStatusService: OrderStatusService,
        private vendorPaymentService: VendorPaymentService,
        private vendorPaymentArchiveService: VendorPaymentArchiveService,
        private orderLogService: OrderLogService,
        private orderArchiveService: OrderArchiveService,
        private orderArchiveLogService: OrderArchiveLogService,
        private orderProductArchiveService: OrderProductArchiveService
    ) {
        // --
    }

    /**
     * @api {get} /vendor-order-archive/detail/:id Get Vendor Archive Order Detail
     * @apiGroup Vendor Order Archive
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor, view-archive-orders
     *
     * @apiParam {Number} id orderArchive ID (path parameter)
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully shown the archive order detail",
     *   "data": {
     *     "orderId": 101,
     *     "orderStatusId": 5,
     *     "customerId": 2001,
     *     "telephone": "1234567890",
     *     "invoiceNo": "INV-12345",
     *     "paymentStatus": "Paid",
     *     "shippingFirstname": "John",
     *     "shippingLastname": "Doe",
     *     "shippingAddress1": "123 Main St",
     *     "shippingCity": "New York",
     *     "shippingCountry": "USA",
     *     "total": 150,
     *     "currencyCode": "USD",
     *     "currencySymbolLeft": "$",
     *     "currencySymbolRight": "",
     *     "fullfillmentStatusId": 2,
     *     "orderProductArchive": [
     *       {
     *         "orderProductId": 501,
     *         "productId": 3001,
     *         "name": "Product Name",
     *         "model": "Model X",
     *         "quantity": 2,
     *         "total": 100,
     *         "productPrice": 50,
     *         "taxType": 2,
     *         "taxValue": 10,
     *         "taxValueInAmount": "5.00",
     *         "image": "product.jpg",
     *         "containerName": "products",
     *         "rating": 0,
     *         "review": ""
     *       }
     *     ],
     *     "orderStatusName": "Completed",
     *     "statusColorCode": "#00FF00",
     *     "orderFullfillmentStatusName": "Shipped",
     *     "orderFullfillmentStatusColorCode": "#0000FF"
     *   }
     * }
     *
     * @apiErrorExample {json} Invalid Order ID
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Invalid Order Id"
     * }
     *
     * @apiSampleRequest /vendor-order-archive/detail/:id
     */
    @Get('/detail/:id')
    @Authorized(['vendor', 'view-archive-orders'])
    public async orderArchiveDetail(@Param('id') orderArchiveId: number, @Res() response: any): Promise<any> {
        const orderArchive = await this.orderArchiveService.findOrder({
            where: { orderArchiveId }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight', 'fullfillmentStatusId'],
        });
        if (!orderArchive) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Id',
            };
            return response.status(400).send(errorResponse);
        }
        orderArchive.orderProductArchive = await this.orderProductArchiveService.find({
            where: { orderArchiveId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'trackingUrl', 'trackingNo', 'orderStatusId', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'orderStatusId',
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
            where: { orderStatusId: orderArchive.orderStatusId },
            select: ['name', 'colorCode'],
        });
        if (orderStatusData) {
            orderArchive.orderStatusName = orderStatusData.name;
            orderArchive.statusColorCode = orderStatusData.colorCode;
        }
        const orderFullfillmentStatus = await this.orderStatusService.findOne({
            where: { orderStatusId: orderArchive.fullfillmentStatusId },
            select: ['name', 'colorCode'],
        });
        orderArchive.orderFullfillmentStatusName = orderFullfillmentStatus?.name ?? '';
        orderArchive.orderFullfillmentStatusColorCode = orderFullfillmentStatus?.colorCode ?? '';
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the archive order detail',
            data: orderArchive,
        };
        return response.status(200).send(successResponse);
    }
    /**
     * @api {post} /vendor-order-archive Archive Vendor Order
     * @apiGroup Vendor Order Archive
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor, order-archive
     *
     * @apiParam (Request Body) {Number} orderId Order ID to archive
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully order archived"
     * }
     *
     * @apiErrorExample {json} Invalid Seller Order
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Invalid seller Order"
     * }
     *
     * @apiSampleRequest /vendor-order-archive
     */
    @Post()
    @Authorized(['vendor', 'order-archive'])
    public async makeArchive(@BodyParam('orderId') orderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        if (!orderId) {
            const errorResponse: any = {
                status: 0,
                message: 'OrderId is required',
            };
            return response.status(400).send(errorResponse);
        }

        const queryRunner = getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const order = await this.orderService.findOne({ orderId, tenantId: request.user.tenantId });
            if (!order) {
                await queryRunner.rollbackTransaction();
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid seller Order',
                };
                return response.status(400).send(errorResponse);
            }
            const newOrderArchive = new OrderArchive();
            Object.assign(newOrderArchive, order);
            newOrderArchive.createdDate = order.createdDate;
            const saveOrderArchive = await queryRunner.manager.save(newOrderArchive);

            const orderLogs = await this.orderLogService.findCondition({
                where: {
                    orderId,
                },
            });
            for (const log of orderLogs) {
                const archiveLog = new OrderArchiveLog();
                Object.assign(archiveLog, log);
                await queryRunner.manager.save(archiveLog);
            }

            const vendorPayment = await this.vendorPaymentService.findOne({
                where: {
                    orderId,
                },
            });
            if (vendorPayment) {
                const newVendorPaymentArchive: any = new VendorPaymentArchive();
                newVendorPaymentArchive.vendorId = vendorPayment.vendorId;
                newVendorPaymentArchive.orderId = orderId;
                newVendorPaymentArchive.vendorOrderArchive = 1;
                newVendorPaymentArchive.paymentItemId = vendorPayment.paymentItemId;
                newVendorPaymentArchive.amount = vendorPayment.amount;
                newVendorPaymentArchive.commissionAmount = vendorPayment.commissionAmount;
                await queryRunner.manager.save(newVendorPaymentArchive);

            }

            // Fetch all products for the given order
            const orderProducts = await this.orderProductService.find({ where: { orderId } });
            for (const product of orderProducts) {
                const newOrderProductArchive: any = new OrderProductArchive();
                Object.assign(newOrderProductArchive, product);
                newOrderProductArchive.orderArchiveId = saveOrderArchive.orderArchiveId;
                await queryRunner.manager.save(newOrderProductArchive);
            }

            await queryRunner.manager.delete(Order, { orderId });
            await queryRunner.manager.delete(OrderLog, { orderId });
            await queryRunner.manager.delete(VendorPayment, { orderId });
            await queryRunner.manager.delete(OrderProduct, { orderId });

            await queryRunner.commitTransaction();

            await queryRunner.release();

            const successResponse: any = {
                status: 1,
                message: 'Successfully order archived',
            };
            return response.status(200).send(successResponse);

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }
    /**
     * @api {post} /vendor-order-archive/revoke Revoke Archived Vendor Order
     * @apiGroup Vendor Order Archive
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor, revoke-archive-orders
     *
     * @apiParam (Request Body) {Number} orderArchiveId ID of the archived order to restore
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Order successfully restored from archive"
     * }
     *
     * @apiErrorExample {json} Archived Order Not Found
     * HTTP/1.1 400 Bad Request
     * {
     *   "status": 0,
     *   "message": "Archived order not found"
     * }
     *
     * @apiSampleRequest /vendor-order-archive/revoke
     */
    @Post('/revoke')
    @Authorized(['vendor', 'revoke-archive-orders'])
    public async revokeArchive(@BodyParam('orderArchiveId') orderArchiveId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const queryRunner = getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const archivedOrder = await this.orderArchiveService.findOne({ orderArchiveId, tenantId: request.user.tenantId });
            if (!archivedOrder) {
                await queryRunner.rollbackTransaction();
                return response.status(400).send({ status: 0, message: 'Archived order not found' });
            }
            const orderId = archivedOrder.orderId;
            const restoredOrder = new Order();
            Object.assign(restoredOrder, archivedOrder);
            restoredOrder.createdDate = archivedOrder.createdDate;
            restoredOrder.orderId = orderId;
            await queryRunner.manager.save(Order, restoredOrder);

            const archivedLogs = await this.orderArchiveLogService.findCondition({ where: { orderId } });
            for (const log of archivedLogs) {
                const restoredLog = new OrderLog();
                Object.assign(restoredLog, log);
                restoredLog.orderLogId = log.orderLogId;
                await queryRunner.manager.save(OrderLog, restoredLog);
            }

            const vendorPaymentArchive = await this.vendorPaymentArchiveService.findOne({ where: { orderId } });
            if (vendorPaymentArchive) {
                const restoredVendorPayment = new VendorPayment();
                Object.assign(restoredVendorPayment, vendorPaymentArchive);
                await queryRunner.manager.save(VendorPayment, restoredVendorPayment);
            }

            const archivedProducts = await this.orderProductArchiveService.find({ where: { orderId } });
            for (const archivedProduct of archivedProducts) {
                const restoredProduct = new OrderProduct();
                Object.assign(restoredProduct, archivedProduct);
                restoredProduct.orderProductId = archivedProduct.orderProductId;
                await queryRunner.manager.save(OrderProduct, restoredProduct);
            }

            await queryRunner.manager.delete(OrderArchive, { orderId });
            await queryRunner.manager.delete(OrderArchiveLog, { orderId });
            await queryRunner.manager.delete(OrderProductArchive, { orderId });
            await queryRunner.manager.delete(VendorPaymentArchive, { orderId });

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return response.status(200).send({
                status: 1,
                message: 'Order successfully restored from archive',
            });

        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw error;
        }
    }
    /**
     * @api {get} /vendor-order-archive Archive Order List
     * @apiGroup Vendor Order Archive
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor, list-archive-orders
     *
     * @apiParam (Query) {Number} [limit] Limit number of records
     * @apiParam (Query) {Number} [offset] Offset for pagination
     * @apiParam (Query) {String} [orderId] Filter by order ID
     * @apiParam (Query) {String} [orderStatusId] Filter by order status ID
     * @apiParam (Query) {String} [customerName] Filter by customer name
     * @apiParam (Query) {String} [totalAmount] Filter by total amount
     * @apiParam (Query) {String} [dateAdded] Filter by order creation date
     * @apiParam (Query) {String} [filter] Custom filter expression
     * @apiParam (Query) {String} [keyword] Search keyword
     * @apiParam (Query) {String} [paymentProcess] Filter by payment process
     * @apiParam (Query) {String} [sortBy] Field to sort by: buyerName, location, orderId, total, orderDate
     * @apiParam (Query) {String} [sortOrder] Sort order: ASC or DESC
     * @apiParam (Query) {Boolean|Number} [count] Set to true or 1 to get the total count only
     *
     * @apiSuccessExample {json} Success - List
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully shown the order list",
     *   "data": [
     *     {
     *       "orderArchiveId": 101,
     *       "orderId": 1001,
     *       "customerId": 2001,
     *       "createdDate": "2025-09-19T10:00:00.000Z",
     *       "total": 150,
     *       "currencySymbolLeft": "$",
     *       "currencySymbolRight": "",
     *       "orderStatusId": 5,
     *       "shippingFirstName": "John",
     *       "shippingCity": "New York",
     *       "paymentStatus": "Paid",
     *       "paymentProcess": "Completed",
     *       "orderStatus": {
     *         "orderStatusId": 5,
     *         "name": "Completed",
     *         "colorCode": "#00FF00"
     *       },
     *       "productCount": 3
     *     }
     *   ]
     * }
     *
     * @apiSuccessExample {json} Success - Count
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got the order count",
     *   "data": 150
     * }
     *
     * @apiSampleRequest /vendor-order-archive
     */
    @Get()
    @Authorized(['vendor', 'list-archive-orders'])
    public async archiveOrderList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('orderId') orderId: string,
        @QueryParam('orderStatusId') orderStatusId: string,
        @QueryParam('customerName') customerName: string,
        @QueryParam('totalAmount') totalAmount: string,
        @QueryParam('dateAdded') dateAdded: string,
        @QueryParam('filter') filter: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('paymentProcess') paymentProcess: string,
        @QueryParam('sortBy') sortBy: string,
        @QueryParam('sortOrder') sortOrder: string,
        @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {
        const select = [
            'orderArchive.customerId as customerId',
            'orderArchive.createdDate as createdDate',
            'orderArchive.modifiedDate as modifiedDate',
            'MAX(orderArchive.orderArchiveId) as orderArchiveId',
            'orderArchive.total as total',
            'orderArchive.currencySymbolLeft as currencySymbolLeft',
            'orderArchive.currencySymbolRight as currencySymbolRight',
            'orderArchive.orderPrefixId as orderPrefixId',
            'orderArchive.orderStatusId as orderStatusId',
            'orderArchive.shippingFirstname as shippingFirstName',
            'orderArchive.shippingCity as shippingCity',
            'orderArchive.paymentStatus as paymentStatus',
            'orderArchive.paymentProcess as paymentProcess',
            'orderArchive.shippingCountry as shippingCountry',
            'orderArchive.orderId as orderId',
        ];

        const relations = [
            {
                tableName: 'OrderProductArchive.orderArchive',
                aliasName: 'orderArchive',
            },
        ];
        const groupBy = [
            {
                name: 'OrderProductArchive.orderArchiveId',
            },
        ];

        const whereConditions: any = [
            {
                name: 'orderArchive.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'orderArchive.backOrders',
                op: 'and',
                value: 0,
            },
        ];
        if (paymentProcess && paymentProcess !== '') {
            whereConditions.push({
                name: 'orderArchive.paymentProcess',
                op: 'and',
                value: 1,
            });
        }

        const searchConditions = [];
        if (keyword?.trim()) {
            searchConditions.push({
                name: ['orderArchive.shippingFirstname', 'orderArchive.orderPrefixId', , 'orderArchive.shippingCity', 'orderArchive.total'],
                value: keyword.toLowerCase(),
            });
        }
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderArchive.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        if (orderId && orderId !== '') {
            searchConditions.push({
                name: ['orderArchive.orderPrefixId'],
                value: orderId,
            });
        }

        if (totalAmount && totalAmount !== '') {
            whereConditions.push({
                name: ['orderArchive.total'],
                op: 'where',
                value: totalAmount,
            });
        }

        if (orderStatusId && orderStatusId !== '') {
            searchConditions.push({
                name: ['OrderProductArchive.orderStatusId'],
                value: orderStatusId,
            });
        }
        if (dateAdded) {
            searchConditions.push({
                name: ['OrderProductArchive.createdDate'],
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
                name: 'orderArchive.shippingFirstname',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'location') {
            sort.push({
                name: 'orderArchive.shippingCity',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'orderId') {
            sort.push({
                name: 'orderArchive.orderId',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'total') {
            sort.push({
                name: 'orderArchive.total',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'orderDate' || !sortBy || sortBy === 'orderId') {
            sort.push({
                name: 'orderArchive.createdDate',
                order: sortOrder ?? 'DESC',
            });
        }
        if (count) {
            const orderCount: any = await this.orderProductArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const Response: any = {
                status: 1,
                message: 'Successfully got the order count',
                data: orderCount.length,
            };
            return response.status(200).send(Response);
        }
        const orderList: any = await this.orderProductArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderStatusList = await this.orderStatusService.findAll({
            select: ['orderStatusId', 'name', 'colorCode'],
        });
        const orderStatus = orderList.map(async (value: any) => {
            const status = orderStatusList.find((statusValue) => statusValue.orderStatusId === value.orderStatusId);
            const vendorOrders = await this.vendorOrdersService.findAll({
                where: { orderId: value.orderId },
            });
            const temp: any = value;
            temp.orderStatus = status;
            temp.productCount = vendorOrders.length;
            return temp;
        });
        const results = await Promise.all(orderStatus);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {get} /vendor-order-archive/export-excel Export Archived Orders to Excel
     * @apiGroup Vendor Order Archive
     * @apiHeader {String} Authorization Bearer token
     * @apiPermission vendor, export-archive-orders
     *
     * @apiParam (Query) {String} [orderId] Comma-separated order IDs to export (optional)
     *
     * @apiSuccess {File} Excel file containing archived order details:
     * - Order Id
     * - Customer Name
     * - Email
     * - Mobile Number
     * - Total Amount
     * - Created Date
     * - Updated Date
     *
     * @apiSampleRequest /vendor-order-archive/export-excel
     *
     * @apiDescription
     * Generates an Excel file for archived vendor orders. You can optionally filter by specific `orderId`s.
     * The exported file includes key order details and is returned as a downloadable XLSX file.
     *
     * @apiErrorExample {json} Unauthorized
     * HTTP/1.1 401 Unauthorized
     * {
     *   "status": 0,
     *   "message": "Authorization token is missing or invalid"
     * }
     */
    @Get('/export-excel')
    @Authorized(['vendor', 'export-archive-orders'])
    public async excelOrderView(@QueryParam('orderId') orderId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Order Detail Sheet');
        const rows = [];
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 18 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 18 },
            { header: 'Email', key: 'email', size: 16, width: 25 },
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
        const select = [
            'COUNT(orderArchive.orderId) as NoOfItems',
            'MAX(OrderProductArchive.orderProductArchiveId) as orderProductArchiveId',
            'orderArchive.createdDate as createdDate',
            'orderArchive.email as email',
            'orderArchive.telephone as telephone',
            'orderArchive.orderPrefixId as orderPrefixId',
            'orderArchive.orderId as orderId',
            'orderArchive.shippingFirstname as shippingFirstname',
            'orderArchive.shippingLastname as shippingLastname',
            'orderArchive.total as total',
            'orderArchive.currencyCode as currencyCode',
            'orderArchive.currencySymbolLeft as currencySymbolLeft',
            'orderArchive.currencySymbolRight as currencySymbolRight',
            'MAX(OrderProductArchive.orderStatusId) as orderStatusId',
            'orderArchive.modifiedDate as modifiedDate',
            'MAX(OrderProductArchive.orderId) as orderId',
            'orderArchive.shippingAddress1 as shippingAddress1',
            'orderArchive.shippingAddress2 as shippingAddress2',
            'orderArchive.shippingCity as shippingCity',
            'orderArchive.shippingPostcode as shippingPostcode',
            'orderArchive.shippingZone as shippingZone',
        ];
        const relations = [
            {
                tableName: 'OrderProductArchive.orderArchive',
                aliasName: 'orderArchive',
            },
        ];
        const groupBy = [{
            name: 'OrderProductArchive.orderProductArchiveId',
        }];
        const whereConditions = [];

        whereConditions.push({
            name: 'orderArchive.tenantId',
            op: 'where',
            value: request.user.tenantId,
        }, {
            name: 'orderArchive.backOrders',
            op: 'and',
            value: 0,
        });
        if (orderId && orderId !== '') {
            const orderIds = orderId.split(',');
            whereConditions.push({
                name: 'orderArchive.orderId',
                op: 'IN',
                value: orderIds,
            });
        }
        const searchConditions = [];
        const sort = [];
        sort.push({
            name: 'orderArchive.createdDate',
            order: 'DESC',
        });
        const orderList: any = await this.orderProductArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
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
        worksheet.addRows(rows);
        const fileName = './OrderArchiveExcel_' + Date.now() + '.xlsx';
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
}
