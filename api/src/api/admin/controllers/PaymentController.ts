/*
 * spurtcommerce marketplace API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, QueryParam, JsonController, Authorized, Res, Post, BodyParam, Req } from 'routing-controllers';
import { PaymentService } from '../../core/services/PaymentService';
import { PaymentItemsService } from '../../core/services/PaymentItemsService';
import { PaymentArchiveService } from '../../core/services/PaymentArchiveService';
import { PaymentItemsArchiveService } from '../../core/services/PaymentItemsArchiveService';
import { PaymentArchive } from '../../core/models/PaymentArchive';
import { PaymentItemsArchive } from '../../core/models/PaymentItemsArchive';
import * as fs from 'fs';
import moment from 'moment';
import { ExportLog } from '../../core/models/ExportLog';
import { ExportLogService } from '../../core/services/ExportLogService';

@JsonController('/payment')
export class PaymentController {
    constructor(private paymentService: PaymentService,
                private paymentItemsService: PaymentItemsService,
                private paymentArchiveService: PaymentArchiveService,
                private paymentItemsArchiveService: PaymentItemsArchiveService,
                private exportLogService: ExportLogService) {
    }

    // Payment List API
    /**
     * @api {get} /api/payment/payment-list Payment List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {String} paymentMethod search by paymentMethod
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
     *      "data":[{
     *              "paymentId": 15,
     *              "orderId": 405,
     *              "orderStatusId": 1,
     *              "orderPrefixId": "INV-20240717405",
     *              "currencySymbolLeft": "$",
     *              "currencySymbolRight": "",
     *              "shippingFirstname": "Anangan",
     *              "total": "118499.00",
     *              "createdDate": "2024-07-17T13:06:00.000Z",
     *              "paymentType": "CashOnDelivery",
     *              "paymentDetails": null,
     *              "customerId": 16,
     *              "isActive": 1,
     *              "paymentMethod": "1",
     *              "subOrderDetails": [
     *                {
     *                  "orderProductId": 714,
     *                  "orderProductPrefixId": "INV-202407174051",
     *                  "productId": 929,
     *                  "orderId": 405,
     *                  "quantity": 1,
     *                  "name": "LG Gram16",
     *                  "price": "118499.00",
     *                  "basePrice": "118499.00",
     *                  "total": "118499.00",
     *                  "discountAmount": "0.00",
     *                  "discountedAmount": "0.00",
     *                  "couponDiscountAmount": null,
     *                  "skuName": "LG45676543"
     *                }]
     *              }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/payment-list')
    @Authorized(['admin', 'list-sales-payments'])
    public async paymentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('paymentMethod') paymentMethod: string, @QueryParam('customerName') customerName: string,
                             @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'Payment.paymentId as paymentId',
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive',
            'orderDetail.paymentMethod as paymentMethod',
        ];
        const relations = [
            {
                tableName: 'Payment.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];
        const whereConditions = [];
        if (startDate && startDate !== '') {
            whereConditions.push({
                name: '`Payment`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });
        }
        if (endDate && endDate !== '') {
            whereConditions.push({
                name: '`Payment`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });
        }
        if (+paymentMethod && paymentMethod !== '') {
            whereConditions.push({
                name: 'orderDetail.paymentMethod',
                op: 'where',
                value: +paymentMethod,
            });
        }
        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        const sort = [];
        sort.push({
            name: 'Payment.createdDate',
            order: 'DESC',
        });
        if (count) {
            const paymentCount = await this.paymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the payment count',
                data: paymentCount,
            });
        }
        const paymentList: any = await this.paymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const paymentResponse = paymentList.map(async (value: any) => {
            const payment = value;
            const subOrderSelect = [
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.productId as productId',
                'orderProduct.orderId as orderId',
                'orderProduct.quantity as quantity',
                'orderProduct.name as name',
                'orderProduct.productPrice as price',
                'orderProduct.basePrice as basePrice',
                'orderProduct.total as total',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount',
                'orderProduct.couponDiscountAmount as couponDiscountAmount',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.skuName as skuName',
                // 'orderProduct.varientName as varientName',
            ];

            const subOrderRelations = [
                {
                    tableName: 'PaymentItems.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const subOrderWhereConditions = [
                {
                    name: 'orderProduct.order_id',
                    op: 'where',
                    value: value.orderId,
                },
            ];
            const paymentItemsList: any = await this.paymentItemsService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
            payment.subOrderDetails = paymentItemsList;
            return payment;
        });
        const paymentListDetails = await Promise.all(paymentResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }
    // Payment List Count API
    /**
     * @api {get} /api/payment/payment-list-count Payment List Count API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list count",
     *      "data": 100,
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/payment-list-count
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/payment-list-count')
    @Authorized()
    public async paymentListCount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                                  @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'Payment.paymentId as paymentId',
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive'];

        const relations = [
            {
                tableName: 'Payment.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [
        ];

        const whereConditions = [];

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`Payment`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`Payment`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }
        const paymentList: any = await this.paymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, [], true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the payment list count',
            data: paymentList,
        };
        return response.status(200).send(successResponse);
    }

    // Export Payment List API
    /**
     * @api {get} /api/payment/export-payment-list Export Payment List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} paymentId paymentId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/export-payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/export-payment-list')
    @Authorized()
    public async exportPaymentList(@QueryParam('paymentId') paymentId: string, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('payment Excel Sheet');
        const rows = [];
        const paymentid = paymentId.split(',');
        for (const id of paymentid) {
            const dataId = await this.paymentService.findOne({ where: { paymentId: id } });
            if (!dataId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid paymentId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 15 },
            { header: 'Total Amount', key: 'total', size: 16, width: 15 },
            { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
            { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
            { header: 'Payment Detail', key: 'paymentDetail', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of paymentid) {
            const select = [
                'Payment.paymentId as paymentId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as shippingFirstname',
                'orderDetail.email as email',
                'orderDetail.total as total',
                'orderDetail.createdDate as createdDate',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails',
                'orderDetail.customerId as customerId',
                'orderDetail.isActive as isActive'];

            const relations = [
                {
                    tableName: 'Payment.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [];

            const whereConditions = [];

            whereConditions.push({
                name: 'Payment.paymentId',
                op: 'and',
                value: id,
            });

            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'Payment.createdDate',
                order: 'DESC',
            });

            const paymentList: any = await this.paymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './PaymentExcel_' + Date.now() + '.xlsx';
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

    // Bulk Export Payment List API
    /**
     * @api {get} /api/payment/bulk-export-payment-list Bulk Export Payment List API
     * @apiGroup Payment
     * @apiParam (Request body) {Number} paymentMethod paymentMethod
     * @apiParam (Request body) {String} customerName customerName
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/bulk-export-payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/bulk-export-payment-list')
    @Authorized(['admin', 'export-all-sales-payments'])
    public async bulkExportPaymentList(@Res() response: any, @QueryParam('paymentMethod') paymentMethod: string, @QueryParam('customerName') customerName: string,
                                       @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('payment Excel Sheet');
        const rows = [];
        const select = [
            'Payment.paymentId as paymentId',
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            'orderDetail.email as email',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive',
            'orderDetail.paymentMethod as paymentMethod',
        ];
        const relations = [
            {
                tableName: 'Payment.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];
        const whereConditions = [];
        if (startDate && startDate !== '') {
            whereConditions.push({
                name: '`Payment`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });
        }
        if (endDate && endDate !== '') {
            whereConditions.push({
                name: '`Payment`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });
        }
        if (+paymentMethod && paymentMethod !== '') {
            whereConditions.push({
                name: 'orderDetail.paymentMethod',
                op: 'where',
                value: +paymentMethod,
            });
        }
        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }
        const sort = [];
        sort.push({
            name: 'Payment.createdDate',
            order: 'DESC',
        });
        const paymentList: any = await this.paymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        if (+paymentList.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'list is empty',
            });
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 30 },
            { header: 'Total Amount', key: 'total', size: 16, width: 15 },
            { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
            { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
            { header: 'Payment Detail', key: 'paymentDetails', size: 16, width: 35 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for ( const data of paymentList) {
        console.log('data:', data);
        rows.push([data.orderPrefixId, data.shippingFirstname, data.email, data.total, data.createdDate, data.paymentType, data.paymentDetails]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BulkPaymentExcel_' + Date.now() + '.xlsx';
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

    // Make Payment Archive API
    /**
     * @api {post} /api/payment/make-payment-archive Make Payment Archive API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} paymentId  paymentId
     * @apiParamExample {json} Input
     * {
     *   "paymentId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Archived this payment",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/make-payment-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/make-payment-archive')
    @Authorized('')
    public async makeArchive(@BodyParam('paymentId') paymentId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const payment = await this.paymentService.findOne({
            where: {
                paymentId,
            },
        });
        if (!payment) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Payment Id',
            };
            return response.status(400).send(errorResponse);
        }
        const newPaymentArchive: any = new PaymentArchive();
        newPaymentArchive.orderId = payment.orderId;
        newPaymentArchive.paidDate = payment.paidDate;
        newPaymentArchive.paymentNumber = payment.paymentNumber;
        newPaymentArchive.paymentInformation = payment.paymentInformation;
        newPaymentArchive.paymentAmount = payment.paymentAmount;
        newPaymentArchive.paymentCommissionAmount = payment.paymentCommissionAmount;
        const archive = await this.paymentArchiveService.create(newPaymentArchive);
        const paymentItems = await this.paymentItemsService.findAll({
            where: {
                paymentId,
            },
        });
        const arr: any = [];
        for (const data of paymentItems) {
            const newPaymentItemsArchiveLog: any = new PaymentItemsArchive();
            newPaymentItemsArchiveLog.paymentArchiveId = archive.paymentArchiveId;
            newPaymentItemsArchiveLog.orderProductId = data.orderProductId;
            newPaymentItemsArchiveLog.totalAmount = data.totalAmount;
            newPaymentItemsArchiveLog.productName = data.productName;
            newPaymentItemsArchiveLog.productQuantity = data.productQuantity;
            newPaymentItemsArchiveLog.productPrice = data.productPrice;
            arr.push(newPaymentItemsArchiveLog);
        }
        await this.paymentItemsArchiveService.create(arr);
        await this.paymentService.delete(payment);
        const successResponse: any = {
            status: 1,
            message: 'Successfully Archived this payment',
        };
        return response.status(200).send(successResponse);
    }

    // Archive Payment List API
    /**
     * @api {get} /api/payment/archive-payment-list Archive Payment List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Archive payment list",
     *      "data":{
     *              "paymentArchiveId" : "",
     *              "createdDate" : "",
     *              "orderId" : "",
     *              "orderStatusId" : "",
     *              "orderPrefixId" : "",
     *              "currencySymbolLeft" : "",
     *              "currencySymbolRight" : "",
     *              "shippingFirstname" : "",
     *              "total" : "",
     *              "paymentType" : "",
     *              "paymentDetails" : "",
     *              "customerId" : "",
     *              "isActive": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/archive-payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/archive-payment-list')
    @Authorized(['admin', 'archive-payment-list'])
    public async archivePaymentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                                    @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'PaymentArchive.paymentArchiveId as paymentArchiveId',
            'PaymentArchive.createdDate as createdDate',
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            // 'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive'];

        const relations = [
            {
                tableName: 'PaymentArchive.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`PaymentArchive`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`PaymentArchive`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        const sort = [];
        sort.push({
            name: 'PaymentArchive.createdDate',
            order: 'DESC',
        });

        const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const paymentResponse = paymentList.map(async (value: any) => {
            const payment = value;
            const subOrderSelect = [
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.productId as productId',
                'orderProduct.orderId as orderId',
                'orderProduct.quantity as quantity',
                'orderProduct.name as name',
                'orderProduct.productPrice as price',
                'orderProduct.basePrice as basePrice',
                'orderProduct.total as total',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount',
                'orderProduct.couponDiscountAmount as couponDiscountAmount',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.skuName as skuName',
                // 'orderProduct.varientName as varientName',
            ];

            const subOrderRelations = [
                {
                    tableName: 'PaymentItemsArchive.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const subOrderWhereConditions = [
                {
                    name: 'orderProduct.order_id',
                    op: 'where',
                    value: value.orderId,
                },
            ];
            const paymentItemsList: any = await this.paymentItemsArchiveService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
            payment.subOrderDetails = paymentItemsList;
            return payment;
        });
        const paymentListDetails = await Promise.all(paymentResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete archive payment list',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Archive Payment List count API
    /**
     * @api {get} /api/payment/archive-payment-list-count Archive Payment List Count API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Archive payment count",
     *      "data":""
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/archive-payment-list-count
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/archive-payment-list-count')
    @Authorized()
    public async archivePaymentListCount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                                         @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'PaymentArchive.paymentArchiveId as paymentArchiveId',
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive'];

        const relations = [
            {
                tableName: 'PaymentArchive.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`PaymentArchive`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`PaymentArchive`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        const sort = [];
        sort.push({
            name: 'PaymentArchive.createdDate',
            order: 'DESC',
        });

        const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete archive payment list count',
            data: paymentList,
        };
        return response.status(200).send(successResponse);
    }

    // Export Payment Archive List API
    /**
     * @api {get} /api/payment/export-payment-archive-list Export Payment Archive List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} paymentArchiveId paymentArchiveId
     * @apiSampleRequest /api/payment/export-payment-archive-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/export-payment-archive-list')
    @Authorized()
    public async exportPaymentArchiveList(@QueryParam('paymentArchiveId') paymentArchiveId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('payment Archive Excel Sheet');
        const rows = [];
        let totalData;
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 15 },
            { header: 'Total Amount', key: 'total', size: 16, width: 15 },
            { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
            { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
            { header: 'Payment Detail', key: 'paymentDetail', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // for (const id of paymentid) {
        const select = [
            'PaymentArchive.paymentArchiveId as paymentArchiveId',
            'orderDetail.orderId as orderId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.email as email',
            'orderDetail.total as total',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive'];
        const relations = [
            {
                tableName: 'PaymentArchive.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];
        if (!paymentArchiveId || paymentArchiveId === '') {
            const whereConditions = [];
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'PaymentArchive.createdDate',
                order: 'DESC',
            });
            const paymentLists: any = await this.paymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            totalData = paymentLists.length;
            for (const paymentList of paymentLists) {
                rows.push([paymentList.orderPrefixId, paymentList.shippingFirstname, paymentList.email, paymentList.total, paymentList.createdDate, paymentList.paymentType, paymentList.paymentDetails]);
            }
        } else {
            const paymentid = paymentArchiveId.split(',');
            totalData = paymentid.length;
            for (const id of paymentid) {
                const dataId = await this.paymentArchiveService.findOne({ where: { paymentArchiveId: id } });
                if (!dataId) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Invalid payment Archive Id',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of paymentid) {
                const whereConditions = [];
                whereConditions.push({
                    name: 'PaymentArchive.paymentArchiveId',
                    op: 'and',
                    value: id,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'PaymentArchive.createdDate',
                    order: 'DESC',
                });
                const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
            }

        }
        // }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './PaymentArchiveExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        // Add export log
        const newExportLog = new ExportLog();
        newExportLog.module = 'Archive Payments';
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

    // Bulk Export Payment Archive List API
    /**
     * @api {get} /api/payment/bulk-export-payment-archive-list Bulk Export Payment Archive List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} customerName customerName
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiSampleRequest /api/payment/bulk-export-payment-archive-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/bulk-export-payment-archive-list')
    @Authorized()
    public async bulkExportPaymentArchiveList(@Res() response: any, @QueryParam('customerName') customerName: string, @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Bulk payment Archive Excel Sheet');
        const rows = [];
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'PaymentArchive.paymentArchiveId as paymentArchiveId',
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            'orderDetail.email as email',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive'];

        const relations = [
            {
                tableName: 'PaymentArchive.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`PaymentArchive`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`PaymentArchive`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        const sort = [];
        sort.push({
            name: 'PaymentArchive.createdDate',
            order: 'DESC',
        });

        const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        console.log('paymentList len:', paymentList.length);
        if (+paymentList.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'list is empty',
            });
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 30 },
            { header: 'Total Amount', key: 'total', size: 16, width: 15 },
            { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
            { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
            { header: 'Payment Detail', key: 'paymentDetails', size: 16, width: 35 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const data of paymentList) {
            console.log('data:', data);
            rows.push([data.orderPrefixId, data.shippingFirstname, data.email, data.total, data.createdDate, data.paymentType, data.paymentDetails]);
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BulkPaymentExcel_' + Date.now() + '.xlsx';
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
