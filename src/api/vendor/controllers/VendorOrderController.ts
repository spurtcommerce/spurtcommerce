/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Req, Get, QueryParam, Authorized } from 'routing-controllers';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { ProductService } from '../../core/services/ProductService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { env } from '../../../env';
import * as fs from 'fs';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-order')
export class VendorOrderController {
    constructor(
        private vendorOrdersService: VendorOrdersService,
        private vendorProductService: VendorProductService,
        private productImageService: ProductImageService,
        private productService: ProductService
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

}
