/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Req, Get, QueryParam, Authorized, Param, Put, Body } from 'routing-controllers';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { ProductService } from '../../core/services/ProductService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { env } from '../../../env';
import * as fs from 'fs';
import { Service } from 'typedi';
import { OrderProductService } from '../../../../src/api/core/services/OrderProductService';
import { OrderStatusService } from '../../../../src/api/core/services/OrderStatusService';
import { OrderFullfillmentStatusService } from '../../../../src/api/core/services/OrderFullfillmentStatusService';
import { OrderService } from '../../../../src/api/core/services/OrderService';
import { VendorPluginService } from '../../../../src/api/core/services/VendorPluginService';
import { OrderStatusToFullfillmentService } from '../../../../src/api/core/services/OrderStatusToFullfillmentService';
import { In } from 'typeorm';
import { VendorOrderLogService } from '../../../../src/api/core/services/VendorOrderLogService';
import { SkuService } from '../../../../src/api/core/services/SkuService';

@Service()
@JsonController('/vendor-order')
export class VendorOrderController {
    constructor(
        private vendorOrdersService: VendorOrdersService,
        private vendorProductService: VendorProductService,
        private productImageService: ProductImageService,
        private productService: ProductService,
        private orderProductService: OrderProductService,
        private orderStatusService: OrderStatusService,
        private orderFullfillmentStatusService: OrderFullfillmentStatusService,
        private orderService: OrderService,
        private vendorPluginService: VendorPluginService,
        private orderStatusToFullfillmentService: OrderStatusToFullfillmentService,
        private vendorOrderLogService: VendorOrderLogService,
        private skuService: SkuService
    ) {
        // --
    }

    /**
     * @api {get} /api/vendor-order/revenue-overview Get Vendor Revenue Overview
     * @apiGroup Vendor Order
     * @apiName VendorOrderRevenueOverview
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [duration] Duration filter (1: Last Month, 3: Last 3 Months, 6: Last 6 Months, 7: Last 7 Days)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got revenue overview",
     *         "data": [
     *             {
     *                 "revenue": 5000,
     *                 "orderCount": 3,
     *                 "month": 1,
     *                 "year": 2026
     *             }
     *         ],
     *         "maxAmount": 5000
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-order/revenue-overview
     */
    @Get('/revenue-overview')
    @Authorized('vendor')
    public async revenueOverview(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const effectiveDuration = duration || 6;
        const rawData = await this.vendorOrdersService.revenueOverview(request.user.tenantId, effectiveDuration);
        const now = new Date();
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        let data: any[];

        if (effectiveDuration === 7) {

            const rawMap = new Map(rawData.map((item: any) => {
                const d = new Date(now.getFullYear(), +item.month - 1, +item.day);
                return [d.toDateString(), item];
            }));

            data = Array.from({ length: 7 }, (_, i) => {
                const d = new Date(now);
                d.setDate(now.getDate() - (6 - i));

                const found: any = rawMap.get(d.toDateString());

                return {
                    revenue: found ? +found.revenue || 0 : 0,
                    orderCount: found ? +found.orderCount || 0 : 0,
                    day: d.getDate(),
                    month: d.getMonth() + 1,
                    year: d.getFullYear(),
                };
            });

        } else if (effectiveDuration === 1) {

            const targetMonth = lastMonthDate.getMonth();
            const targetYear = lastMonthDate.getFullYear();

            const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

            const rawMap = new Map(rawData.map((item: any) => [+item.day, item]));

            data = Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const found: any = rawMap.get(day);

                return {
                    revenue: found ? +found.revenue || 0 : 0,
                    orderCount: found ? +found.orderCount || 0 : 0,
                    day,
                    month: targetMonth + 1,
                    year: targetYear,
                };
            });

        } else if (effectiveDuration === 3) {

            const months3: Array<{ month: number; year: number }> = [];

            for (let i = 2; i >= 0; i--) {
                const d = new Date(
                    now.getFullYear(),
                    now.getMonth() - i,
                    1
                );
                months3.push({ month: d.getMonth() + 1, year: d.getFullYear() });
            }

            const rawMap3 = new Map(
                rawData.map((item: any) => [`${+item.year}-${+item.month}`, item])
            );

            data = months3.map(({ month, year }) => {
                const found: any = rawMap3.get(`${year}-${month}`);

                return {
                    revenue: found ? +found.revenue || 0 : 0,
                    orderCount: found ? +found.orderCount || 0 : 0,
                    month,
                    year,
                };
            });

        } else {

            const months6: Array<{ month: number; year: number }> = [];

            for (let i = 5; i >= 0; i--) {
                const d = new Date(
                    now.getFullYear(),
                    now.getMonth() - i,
                    1
                );
                months6.push({ month: d.getMonth() + 1, year: d.getFullYear() });
            }

            const rawMap6 = new Map(
                rawData.map((item: any) => [`${+item.year}-${+item.month}`, item])
            );

            data = months6.map(({ month, year }) => {
                const found: any = rawMap6.get(`${year}-${month}`);

                return {
                    revenue: found ? +found.revenue || 0 : 0,
                    orderCount: found ? +found.orderCount || 0 : 0,
                    month,
                    year,
                };
            });
        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully got revenue overview',
            data,
            maxAmount: data.length > 0 ? Math.max(...data.map((d: any) => +d.revenue || 0)) : 0,
        });
    }
    /**
     * @api {get} /api/vendor-order/top-selling-productlist Get Vendor Top Selling Products
     * @apiGroup Vendor Order
     * @apiName VendorOrderTopSellingProductList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [duration] Duration filter (1: This Week, 2: This Month, 3: This Year)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got top selling product",
     *         "data": [
     *             {
     *                 "product": {
     *                     "productId": 1,
     *                     "name": "Sample Product",
     *                     "price": 100
     *                 },
     *                 "soldCount": 15,
     *                 "buyerCount": 12,
     *                 "totalAmount": 1500,
     *                 "soldPercentage": 100
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-order/top-selling-productlist
     */
    @Get('/top-selling-productlist')
    @Authorized('vendor')
    public async topSellingProductList(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const data = await this.vendorProductService.topProductSelling(request.user.tenantId, duration, 4);
        const promise = data.map(async (result: any) => {
            const product = await this.productService.findOne({
                select: ['productId', 'price', 'name'],
                where: { productId: result.product },
            });
            const productImage = await this.productImageService.findOne({
                where: { productId: result.product, defaultImage: 1 },
                select: ['image', 'containerName'],
            });
            const temp: any = result;
            temp.product = product;
            temp.soldCount = +result.soldCount || 0;
            temp.buyerCount = +result.buyerCount || 0;
            temp.totalAmount = +result.totalAmount || 0;
            if (productImage) {
                temp.image = productImage.image;
                temp.containerName = productImage.containerName;
                temp.imagePath = productImage.containerName ? `${env.imageUrl}${productImage.containerName}/${productImage.image}` : `${env.imageUrl}${productImage.image}`;
            } else {
                temp.image = '';
                temp.containerName = '';
                temp.imagePath = '';
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const maxSoldCount = value.length > 0 ? Math.max(...value.map((v: any) => v.soldCount)) : 1;
        const topSellingResult = value.map((item: any) => ({
            ...item,
            soldPercentage: maxSoldCount > 0 ? Math.round((item.soldCount / maxSoldCount) * 100) : 0,
        }));
        const successResponse: any = {
            status: 1,
            message: 'Successfully got top selling product',
            data: topSellingResult,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {get} /api/vendor-order/sales-report-list List Vendor Sales Report
     * @apiGroup Vendor Order
     * @apiName VendorOrderSalesReportList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [startDate] Filter by start date (YYYY-MM-DD)
     * @apiQuery {String} [endDate] Filter by end date (YYYY-MM-DD)
     * @apiQuery {String} [productId] Filter by product ID
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got seller sales list",
     *         "data": [
     *             {
     *                 "productName": "Sneakers",
     *                 "buyers": [
     *                     {
     *                         "vendorOrderId": 363,
     *                         "orderId": 361,
     *                         "quantity": 1,
     *                         "name": "Sneakers",
     *                         "price": "825.00",
     *                         "total": "825.00",
     *                         "orderStatusName": "Order Placed"
     *                     }
     *                 ]
     *             }
     *         ],
     *         "total": 825,
     *         "orderCount": 1
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-order/sales-report-list
     */
    @Get('/sales-report-list')
    @Authorized(['vendor', 'list-sales-report'])
    public async vendorSalesReportList(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number,
        @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('productId') productId: string,
        @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const subOrderSelect = [
            'VendorOrders.vendorOrderId as vendorOrderId',
            'VendorOrders.orderId as orderId',
            'vendor.companyState as companyState',
            'VendorOrders.vendorId as vendorId',
            'orderProduct.orderProductPrefixId as orderProductPrefixId',
            'orderProduct.quantity as quantity',
            'orderProduct.name as name',
            'orderProduct.productPrice as price',
            'orderProduct.quantity as quantity',
            'orderProduct.basePrice as basePrice',
            'orderProduct.skuName as skuName',
            'orderProduct.taxType as taxType',
            'orderProduct.taxValue as taxValue',
            'VendorOrders.total as total',
            'VendorOrders.subOrderId as subOrderId',
            'VendorOrders.commission as commission',
            'VendorOrders.createdDate as createdDate',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderProduct.cancelRequestStatus as cancelRequestStatus',
            'orderDetail.paymentZone as paymentZone',
            'orderProduct.name as productName',
            'orderProduct.skuName as skuName',
            'orderStatus.name as orderStatusName',
            'orderStatus.colorCode as orderColorCode',
            'vendorInvoice.invoiceNo as invoiceNo',
            'vendorInvoice.invoicePrefix as invoicePrefix',
            'customer.firstName as firstName',
            'customer.lastName as lastName',
            'orderProduct.discountAmount as discountAmount',
            'orderProduct.couponDiscountAmount as couponDiscountAmount',
            'customerGroup.name as customerGroup',
            'orderDetail.paymentType as paymentType',
            'orderDetail.ip as ipAddress',
        ];
        const subOrderRelations = [
            {
                tableName: 'VendorOrders.orderProduct',
                aliasName: 'orderProduct',
            },
            {
                tableName: 'VendorOrders.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'VendorOrders.orderDetail',
                aliasName: 'orderDetail',
            },
            {
                tableName: 'VendorOrders.orderStatus',
                aliasName: 'orderStatus',
            },
            {
                tableName: 'orderDetail.vendorInvoice',
                op: 'left',
                aliasName: 'vendorInvoice',
            }, {
                tableName: 'orderDetail.customer',
                op: 'left',
                aliasName: 'customer',
            }, {
                tableName: 'customer.customerGroup',
                op: 'left',
                aliasName: 'customerGroup',
            },
        ];
        const subOrderWhereConditions = [];
        subOrderWhereConditions.push({
            name: 'VendorOrders.vendor_id',
            op: 'and',
            value: request.user.tenantId,
        }, {
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
        }, {
            name: '`orderProduct`.`cancel_request_status`',
            op: 'and',
            value: 0,
        });
        if (productId) {
            subOrderWhereConditions.push({
                name: 'orderProduct.productId',
                op: 'IN',
                value: productId,
            });
        }
        if (startDate && startDate !== '') {

            subOrderWhereConditions.push({
                name: '`VendorOrders`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });

        }
        if (endDate && endDate !== '') {

            subOrderWhereConditions.push({
                name: '`VendorOrders`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });
        }
        const sortOrder = [{
            name: 'vendorOrderId',
            order: 'DESC',
        }];
        if (count) {
            const vendorOrderCount: any = await this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, true, true);
            const countResponse: any = {
                status: 1,
                message: 'Successfully got seller sales count',
                data: vendorOrderCount,
            };
            return response.status(200).send(countResponse);
        }
        const vendorOrderList: any = await this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
        const result: any = [];
        let total: any = 0;
        const groupByKey = key => array =>
            array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
        const groupByType = groupByKey('productName');
        const groupByPeriodTypeArray = groupByType(vendorOrderList);
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
        const orderCount: any = await this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got seller sales list',
            data: result, total, orderCount,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {get} /api/vendor-order/sales-report-export-list Export Sales Report Excel
     * @apiGroup Vendor Order
     * @apiName VendorOrderSalesReportExportList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to export
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [productId] Filter by product ID
     * @apiQuery {String} [startDate] Filter by start date (YYYY-MM-DD)
     * @apiQuery {String} [endDate] Filter by end date (YYYY-MM-DD)
     *
     * @apiSuccessExample {file} Success-Response:
     *     HTTP/1.1 200 OK
     *     Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Export failed"
     *     }
     *
     * @apiSampleRequest /api/vendor-order/sales-report-export-list
     */
    @Get('/sales-report-export-list')
    @Authorized('vendor')
    public async totalSalesExcelView(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productId') productId: string,
        @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string,
        @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Total Sales Export sheet');
        const rows = [];
        const select = [
            'vendor.vendorId as vendorId',
            'vendor.companyName as companyName',
            'vendor.companyState as companyState',
            'VendorOrders.vendorOrderId as vendorOrderId',
            'VendorOrders.orderId as orderId',
            'VendorOrders.vendorId as vendorId',
            'orderProduct.orderProductPrefixId as orderProductPrefixId',
            'orderProduct.quantity as quantity',
            'orderProduct.name as name',
            'orderProduct.productPrice as price',
            'orderProduct.quantity as quantity',
            'orderProduct.basePrice as basePrice',
            'orderProduct.skuName as skuName',
            'orderProduct.discountAmount as discountAmount',
            'orderProduct.couponDiscountAmount as couponDiscountAmount',
            'orderProduct.taxType as taxType',
            'orderProduct.taxValue as taxValue',
            'VendorOrders.total as total',
            'VendorOrders.subOrderId as subOrderId',
            'VendorOrders.commission as commission',
            'VendorOrders.createdDate as createdDate',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.paymentZone as paymentZone',
            'orderProduct.name as productName',
            'orderProduct.cancelRequestStatus as cancelRequestStatus',
            'orderStatus.name as orderStatusName',
            'orderStatus.colorCode as orderColorCode',
            'vendorInvoice.invoiceNo as invoiceNo',
            'vendorInvoice.invoicePrefix as invoicePrefix',
            'customer.firstName as firstName',
            'customer.lastName as lastName',
            'customerGroup.name as groupName',
        ];

        const relations = [{
            tableName: 'VendorOrders.vendor',
            aliasName: 'vendor',
        }, {
            tableName: 'VendorOrders.orderDetail',
            aliasName: 'orderDetail',
        }, {
            tableName: 'VendorOrders.orderProduct',
            aliasName: 'orderProduct',
        }, {
            tableName: 'VendorOrders.orderStatus',
            aliasName: 'orderStatus',
        }, {
            tableName: 'orderDetail.vendorInvoice',
            op: 'left',
            aliasName: 'vendorInvoice',
        }, {
            tableName: 'orderDetail.customer',
            op: 'left',
            aliasName: 'customer',
        }, {
            tableName: 'customer.customerGroup',
            op: 'left',
            aliasName: 'customerGroup',
        }];
        const groupBy = [];

        const whereConditions = [
        ];
        whereConditions.push({
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
        }, {
            name: 'VendorOrders.vendorId',
            op: 'and',
            value: request.user.tenantId,
        }, {
            name: '`orderProduct`.`cancel_request_status`',
            op: 'and',
            value: 0,
        });
        if (productId) {
            whereConditions.push({
                name: 'orderProduct.productId',
                op: 'IN',
                value: productId,
            });
        }

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`VendorOrders`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`VendorOrders`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });

        }
        const searchConditions = [];
        const sort = [{
            name: 'vendorOrderId',
            order: 'DESC',
        }];
        const orderList: any = await this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
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
                rows.push(['Order Line number', 'Customer Name', 'order date', 'invoice', 'sku', 'Quantity', 'Base Value', 'Discount Amount', 'Coupon Discount Amount', 'TotalValue', 'orderStatus', 'Customer Group Name']);
                for (const value of buyers) {
                    rows.push([value.orderProductPrefixId, value.firstName + (value.lastName ? value.lastName : ''), value.createdDate, value.invoicePrefix + value.invoiceNo, value.skuName, +value.quantity, +value.basePrice, +value.discountAmount, +value.couponDiscountAmount, +value.total, value.orderStatusName, value.groupName]);
                }
            });
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './TotalSalesReportExcel_' + Date.now() + '.xlsx';
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
     * @api {Get} /api/vendor-order/order-detail/:vendorOrderId  Order Detail API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
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
     *          "createdDate": "2024-08-01T10:28:17.000Z",
     *          "vendorOrderId": 702,
     *          "subOrderId": "INV-20240801612101",
     *          "vendorId": 10,
     *          "subOrderStatusId": 5,
     *          "orderProductId": 1150,
     *          "orderId": 612,
     *          "total": "4100.00",
     *          "trackingUrl": "",
     *          "trackingNo": "",
     *          "productList": [
     *              {
     *                  "orderProductId": 1150,
     *                  "productId": 928,
     *                  "orderProductPrefixId": "INV-202408016121",
     *                  "name": "SONME ENTERPRISES Men",
     *                  "quantity": 1,
     *                  "discountAmount": "0.00",
     *                  "basePrice": "4000.00",
     *                  "taxType": 1,
     *                  "taxValue": 100,
     *                  "total": "4100.00",
     *                  "discountedAmount": "0.00",
     *                  "skuName": "SKU83838",
     *                  "couponDiscountAmount": "",
     *                  "image": "200608478556.jpeg",
     *                  "containerName": ""
     *              }
     *          ],
     *          "customerFirstName": "Henry ",
     *          "shippingAddress1": "34 pier",
     *          "shippingAddress2": "Malitios street",
     *          "shippingCity": "Chennai",
     *          "shippingPostcode": "627005",
     *          "shippingCountry": "India",
     *          "shippingZone": "Tamil Nadu",
     *          "orderPrefixId": "INV-20240801612",
     *          "email": "example@gmail.com",
     *          "mobileNumber": "9789929028",
     *          "orderStatusName": "Order Delivered",
     *          "statusColorCode": "#501332",
     *          "paymentMethod": "CashOnDelivery",
     *          "currencySymbolLeft": "",
     *          "currencySymbolRight": "$",
     *          "paymentStatus": 0
     *      },
     * }
     * @apiSampleRequest /api/vendor-order/order-detail/:vendorOrderId
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */

    // Order Detail Function
    @Get('/order-detail/:vendorOrderId')
    @Authorized('vendor')
    public async orderDetail(@Param('vendorOrderId') vendorOrderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.vendorOrdersService.findOne({
            where: { vendorOrderId, vendorId: request.user.tenantId }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total', 'createdDate', 'trackingUrl', 'trackingNo'],
        });
        if (!orderData) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid order',
            };
            return response.status(400).send(errorResponse);
        }
        orderData.productList = await this.orderProductService.find({
            where: { orderProductId: orderData.orderProductId },
            select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'skuName', 'orderProductPrefixId', 'priceGroupDetailId', 'orderStatusId', 'trackingUrl', 'trackingNo', 'fullfillmentStatusId', 'tags'],
        }).then((val) => {
            const vendorOrder = val.map(async (value: any) => {
                const ProductImage = await this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                const temp: any = value;
                if (ProductImage) {
                    temp.image = ProductImage.image;
                    temp.containerName = ProductImage.containerName;
                }
                const orderStatus = await this.orderStatusService.findOne({
                    where: { orderStatusId: temp.orderStatusId },
                    select: ['name', 'colorCode'],
                });
                const orderFullfillmentStatus = await this.orderFullfillmentStatusService.findOne({
                    where: { id: temp.fullfillmentStatusId },
                    select: ['name', 'colorCode'],
                });
                temp.orderFullfillmentStatusName = orderFullfillmentStatus?.name ?? '';
                temp.orderFullfillmentStatusColorCode = orderFullfillmentStatus?.colorCode ?? '';
                if (orderStatus) {
                    temp.orderStatusName = orderStatus.name;
                    temp.statusColorCode = orderStatus.colorCode;
                }
                temp.tags = temp.tags ?? '';
                temp.trackingUrl = temp.trackingUrl ?? '';
                temp.trackingNo = temp.trackingNo ?? '';
                return temp;
            });
            const results = Promise.all(vendorOrder);
            return results;
        });
        const order = await this.orderService.findOrder({
            where: { orderId: orderData.orderId },
        });
        const plugin = await this.vendorPluginService.findOne({ where: { id: order.paymentMethod } });
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.subOrderStatusId },
            select: ['name', 'colorCode'],
        });
        orderData.shipmentId = undefined;
        orderData.partner = undefined;
        orderData.awb = undefined;
        orderData.shipmentStatus = undefined;
        orderData.manifestNumber = undefined;
        orderData.pickupId = undefined;
        orderData.labelGeneratedAt = undefined;
        orderData.pickupScheduledAt = undefined;
        orderData.manifestRequired = undefined;
        orderData.pickupRequired = undefined;
        orderData.trackingLastSyncedAt = undefined;
        orderData.estimatedShippingRate = undefined;
        orderData.warehouseName = undefined;
        orderData.warehouseAddress = undefined;
        orderData.providerShipmentId = undefined;
        orderData.shipmentItems = [];
        orderData.shipmentItemCount = 0;
        orderData.customerFirstName = order.shippingFirstname;
        orderData.shippingAddress1 = order.shippingAddress1;
        orderData.shippingAddress2 = order.shippingAddress2;
        orderData.shippingCity = order.shippingCity;
        orderData.shippingPostcode = order.shippingPostcode;
        orderData.shippingCountry = order.shippingCountry;
        orderData.shippingZone = order.shippingZone;
        orderData.paymentFirstname = order.paymentFirstname;
        orderData.paymentAddress1 = order.paymentAddress1;
        orderData.paymentAddress2 = order.paymentAddress2;
        orderData.paymentCity = order.paymentCity;
        orderData.paymentPostcode = order.paymentPostcode;
        orderData.paymentCountry = order.paymentCountry;
        orderData.paymentZone = order.paymentZone;
        orderData.orderPrefixId = order.orderPrefixId;
        orderData.email = order.email;
        orderData.mobileNumber = order.telephone;
        if (orderStatusData) {
            orderData.orderStatusName = orderStatusData.name;
            orderData.statusColorCode = orderStatusData.colorCode;
        }
        if (plugin) {
            orderData.paymentMethod = plugin.pluginName;
        }
        orderData.currencySymbolLeft = order.currencySymbolLeft;
        orderData.currencySymbolRight = order.currencySymbolRight;
        orderData.paymentFlag = order.paymentFlag;
        orderData.paymentStatus = order.paymentStatus;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order detail',
            data: orderData,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Order Status List API
    /**
     * @api {Get} /api/vendor-order/vendor-order-status-list OrderStatus List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} orderStatus orderStatus
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete order status list",
     *      "data": [
     *        {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "orderStatusId": 1,
     *       "name": "",
     *       "isActive": "",
     *       "priority": "",
     *       "parentId": 1,
     *       "defaultStatus": 1,
     *       "isAdmin": "",
     *       "isVendor": 1,
     *       "isBuyer": 1,
     *       "isApi": 1,
     *       "colorCode": ""
     *         }]
     *       "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-order-status-list
     * @apiErrorExample {json} orderStatusList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-order-status-list')
    @Authorized('vendor')
    public async orderStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {

        const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive', 'defaultStatus', 'isAdmin', 'isVendor', 'isBuyer', 'isApi', 'tenantId'];

        const search = [];

        const WhereConditions = [
            {
                name: 'isVendor',
                value: 1,
            },
            {
                name: 'isActive',
                value: 1,
            },
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];

        if (keyword) {
            search.push(
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }
            );
        }

        const orderStatusList = await this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);

        if (!count) {
            const orderStatusWithFullFillmentStatusList = await Promise.all(orderStatusList.map(async (orderStatus) => {
                const fullFillmentStatusIds = (await this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: orderStatus.orderStatusId } })).map((orderToFullfillmentStatus) => orderToFullfillmentStatus.orderFulfillmentStatusId);
                orderStatus.fullfillmentStatus = await this.orderFullfillmentStatusService.findAll({ where: { id: In(fullFillmentStatusIds), isActive: 1 } });
                return orderStatus;
            }));

            return response.status(200).send({
                status: 1,
                message: 'Successfully got the complete order status list',
                data: orderStatusWithFullFillmentStatusList,
            });
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order status list',
            data: orderStatusList,
        };

        return response.status(200).send(successResponse);
    }
    // order log List API
    /**
     * @api {Get} /api/vendor-order/vendorOrderLoglist Vendor Order Log List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete Vendor Order Status Log list",
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
     * @apiSampleRequest /api/vendor-order/vendorOrderLoglist
     * @apiErrorExample {json} orderLogList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendorOrderLoglist')
    @Authorized('vendor')
    public async orderLogList(@QueryParam('vendorOrderId') vendorOrderId: number, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['vendorOrderLogId', 'vendorId', 'vendorOrderId', 'orderId', 'subOrderId', 'subOrderStatusId', 'createdDate', 'modifiedDate'];
        const WhereConditions = [
            {
                name: 'vendorOrderId',
                op: 'where',
                value: vendorOrderId,
            },
            {
                name: 'vendorId',
                op: 'where',
                value: request.user.tenantId,
            },
        ];
        const orderList = await this.vendorOrderLogService.list(0, 0, select, WhereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 }, order: { priority: 'ASC' } });
        const order = orderStatuss.map(async (value: any) => {
            const user = orderList.find(item => item.subOrderStatusId === value.orderStatusId);
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
            message: 'Successfully got the complete seller Order Status Log list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // Back order List API
    /**
     * @api {get} /api/vendor-order/back-order-list Back Order List
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
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/back-order-list
     * @apiErrorExample {json} back order List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Cancel Request List Function
    @Get('/back-order-list')
    @Authorized('vendor')
    public async backOrderProductList(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string, @QueryParam('orderId') orderId: string, @QueryParam('amount') amount: number, @QueryParam('dateAdded') dateAdded: string, @QueryParam('keyword') keyword: string,
        @QueryParam('orderStatus') orderStatus: string, @QueryParam('skuName') skuName: string, @QueryParam('sortBy') sortBy: string, @QueryParam('sortOrder') sortOrder: string, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [
            'Order.createdDate as createdDate',
            'Order.orderId as orderId',
            'Order.shippingFirstname as customerFirstName',
            'Order.shippingLastname as customerLastName',
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
            'orderProduct.skuName as skuName',
            'orderProduct.orderProductPrefixId as orderProductPrefixId',
            'orderProduct.productPrice as productPrice',
            'orderProduct.quantity as quantity',
            'vendorOrders.subOrderStatusId as subOrderStatusId',
            'vendorOrders.total as total',
            'vendorOrders.vendorOrderId as vendorOrderId',
            'Order.tenantId as tenantId',
        ];

        const relations = [
            {
                tableName: 'Order.orderProduct',
                aliasName: 'orderProduct',
            }, {
                tableName: 'orderProduct.vendorOrders',
                op: 'left',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'Order.customer',
                aliasName: 'customer',
            },
        ];
        const groupBy = [];
        const whereConditions = [];
        if (+orderStatus && orderStatus !== '') {
            whereConditions.push({
                name: 'vendorOrders.subOrderStatusId',
                op: 'and',
                value: +orderStatus,
            });
        }
        if (amount && amount !== 0) {
            whereConditions.push({
                name: 'vendorOrders.total',
                op: 'raw',
                sign: '=',
                value: +amount,
            });
        }
        whereConditions.push({
            name: 'Order.backOrders',
            op: 'and',
            value: 1,
        }, {
            name: 'vendorOrders.vendorId',
            op: 'and',
            value: request.user.tenantId,
        });

        const searchConditions = [];
        if (orderId && orderId !== '') {
            searchConditions.push({
                name: ['orderProduct.orderProductPrefixId'],
                value: orderId,
            });
        }
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['orderProduct.name', 'orderProduct.orderProductPrefixId', 'vendorOrders.total', 'vendorOrders.subOrderStatusId', 'Order.shippingFirstname', 'orderProduct.skuName'],
                value: keyword.toLowerCase(),
            });
        }
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['Order.shippingFirstname', 'Order.shippingLastname'],
                value: customerName.toLowerCase(),
            });
        }
        if (skuName && skuName !== '') {
            searchConditions.push({
                name: ['orderProduct.skuName'],
                value: skuName,
            });
        }
        if (dateAdded) {
            searchConditions.push({
                name: ['Order.created_date'],
                value: dateAdded,
            });
        }
        const sort = [];
        if (sortBy === 'buyerName') {
            sort.push({
                name: 'Order.shippingFirstname',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'location') {
            sort.push({
                name: 'Order.shippingCity',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'total') {
            sort.push({
                name: 'orderProduct.total',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'orderDate' || !sortBy || sortBy === 'orderId') {
            sort.push({
                name: 'Order.createdDate',
                order: sortOrder ?? 'DESC',
            });
        }
        if (count) {
            const orderCount: any = await this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Successfully get Count',
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
            temp.orderStatusName = passingOrderStatus.name;
            temp.orderStatusColorCode = passingOrderStatus.colorCode;
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


    // Retry Payment API
    /**
     * @api {get} /api/vendor-order/order Put Update Order
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} isBackOrder isBackOrder
     * @apiParam (Request body) {String} vendorOrderIds vendorOrderIds
     * @apiParamExample {json} Input
     * {
     *      "isBackOrder" : "",
     *      "vendorOrderIds" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Updated Order..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/order
     * @apiErrorExample {json} Store order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/order')
    @Authorized('vendor')
    public async updateOrder(@Body({ validate: true }) payload: { backOrder: number, vendorOrderIds: number[] }, @Res() response: any, @Req() request: any): Promise<any> {

        const validVendorOrders: any[] = await this.vendorOrdersService.findAll({ where: { vendorOrderId: In(payload.vendorOrderIds), vendorId: request.user.tenantId } });

        const orderIds: number[] = validVendorOrders.map((vendorOrder) => vendorOrder.orderId);

        const outOfStockError = [];

        const validBackOrderIds = [];

        for (const id of orderIds) {

            const orderProduct = await this.orderProductService.findOne({ where: { orderId: id } });
            const sku = await this.skuService.findOne({ where: { skuName: orderProduct.skuName } });

            if (sku.quantity < orderProduct.quantity) {
                outOfStockError.push(orderProduct);
            } else {
                sku.quantity -= orderProduct.quantity;
                await this.skuService.create(sku);
                // const product = await this.productService.findOne({ where: { productId: orderProduct.productId } });
                // await this.productService.update(orderProduct.productId, { quantity: product.quantity - orderProduct.quantity });
                validBackOrderIds.push(id);
            }

        }

        await this.orderService.bulkUpdateByIds(validBackOrderIds, { backOrders: payload.backOrder });

        return response.status(200).send({
            status: 1,
            message: `Successfully updated order`,
            data: {
                error: outOfStockError,
            },
        });
    }
    // Getting A Child Order Status List Based On Parent List API
    /**
     * @api {Get} /api/vendor-order/vendor-order-status-list-based-on-parent Getting A Child Order Status List Based On Parent List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} parentId parentId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order status list based on parent",
     *      "status": 1
     * }
     * @apiSampleRequest /api/vendor-order/vendor-order-status-list-based-on-parent
     * @apiErrorExample {json} OrderStatusListBasedOnParent error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-order-status-list-based-on-parent')
    @Authorized('vendor')
    public async orderStatusListBasedOnParent(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('parentId') parentId: number, @Res() response: any, @Req() request: any): Promise<any> {

        const fullfillmentStatusIds = (await this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: parentId ?? 0 } })).map((orderStatusToFullfillment) => orderStatusToFullfillment.orderFulfillmentStatusId);
        const WhereConditions = [];
        WhereConditions.push(
            {
                name: 'id',
                value: In(fullfillmentStatusIds),
            },
            {
                name: 'isActive',
                value: 1,
            },
            {
                name: 'tenantId',
                value: request.user.tenantId,
            }
        );
        const orderStatusList = await this.orderFullfillmentStatusService.list(limit, offset, [], [], WhereConditions, false);
        if (orderStatusList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got order status list based on parent',
                data: orderStatusList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get order status list based on parent',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Export Backorder list api
    /**
     * @api {Get} /api/vendor-order/back-order-excel-list Back order Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderProductId
     * @apiSampleRequest /api/vendor-order/back-order-excel-list
     * @apiErrorExample {json} Back Order Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/back-order-excel-list')
    @Authorized('vendor')
    public async backOrderExport(@QueryParam('orderProductId') orderProductId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Back Order Export excel Sheet');
        const rows = [];
        const select = [
            'Order.createdDate as createdDate',
            'Order.orderId as orderId',
            'Order.orderPrefixId as orderPrefixId',
            'Order.shippingFirstname as customerFirstName',
            'Order.shippingCity as shippingCity',
            'Order.shippingCountry as shippingCountry',
            'Order.shippingZone as shippingZone',
            'Order.currencyCode as currencyCode',
            'Order.email as email',
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
            }, {
                tableName: 'orderProduct.vendorOrders',
                op: 'left',
                aliasName: 'vendorOrders',
            }];
        const groupBy = [];

        const whereConditions = [];

        if (orderProductId && orderProductId !== '') {
            whereConditions.push({
                name: 'vendorOrders.orderProductId',
                op: 'IN',
                value: orderProductId,
            });
        }
        whereConditions.push({
            name: 'Order.backOrders',
            op: 'and',
            value: 1,
        }, {
            name: 'vendorOrders.vendorId',
            op: 'and',
            value: request.user.tenantId,
        });
        const searchConditions = [];
        const sort = [];
        sort.push({
            name: 'Order.createdDate',
            order: 'DESC',
        });
        const orderList: any = await this.orderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        if (orderList.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'file is empty',
            };
            return response.status(400).send(errorResponse);
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
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const order of orderList) {
            const right = order.currencySymbolRight;
            const left = order.currencySymbolLeft;
            if (left === null && right === null) {
                rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, (order?.currencySymbolLeft ?? order?.currencySymbolRight) + ' ' + order.total]);
            } else {
                if (left !== undefined) {
                    rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, left + order.total]);
                } else {
                    rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, order.total + right]);
                }
            }
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BackOrderExcel_' + Date.now() + '.xlsx';
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
    // Export Backorder list api
    /**
     * @api {get} /api/vendor-order/bulk-back-order-excel-list Bulk back order Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
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

    @Get('/bulk-back-order-excel-list')
    @Authorized('vendor')
    public async bulkExportBackorder(@QueryParam('limit') limit: any, @QueryParam('offset') offset: any, @QueryParam('keyword') keyword: any, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Back Order Export excel Sheet');
        const rows = [];
        const select = [
            'Order.createdDate as createdDate',
            'Order.orderId as orderId',
            'Order.orderPrefixId as orderPrefixId',
            'Order.shippingFirstname as customerFirstName',
            'Order.shippingCity as shippingCity',
            'Order.shippingCountry as shippingCountry',
            'Order.shippingZone as shippingZone',
            'Order.currencyCode as currencyCode',
            'Order.email as email',
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
            }, {
                tableName: 'orderProduct.vendorOrders',
                op: 'left',
                aliasName: 'vendorOrders',
            }];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'Order.backOrders',
            op: 'and',
            value: 1,
        }, {
            name: 'vendorOrders.vendorId',
            op: 'and',
            value: request.user.tenantId,
        });

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['orderProduct.name', 'orderProduct.orderProductPrefixId'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'Order.createdDate',
            order: 'DESC',
        });
        const orderList: any = await this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        if (orderList.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'file is empty',
            };
            return response.status(400).send(errorResponse);
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
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const order of orderList) {
            const right = order.currencySymbolRight;
            const left = order.currencySymbolLeft;
            if (left === null && right === null) {
                rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, order.total]);
            } else {
                if (left !== undefined) {
                    rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, left + order.total]);
                } else {
                    rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, order.total + right]);
                }
            }
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BulkBackOrderExcel_' + Date.now() + '.xlsx';
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
