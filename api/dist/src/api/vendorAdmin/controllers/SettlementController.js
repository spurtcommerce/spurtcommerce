"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateSettlementRequest_1 = require("./requests/CreateSettlementRequest");
const Settlement_1 = require("../../core/models/Settlement");
const SettlementItem_1 = require("../../core/models/SettlementItem");
const SettlementService_1 = require("../../core/services/SettlementService");
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const SettlementItemService_1 = require("../../core/services/SettlementItemService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const OrderService_1 = require("../../core/services/OrderService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorInvoiceService_1 = require("../../core/services/VendorInvoiceService");
const fs = tslib_1.__importStar(require("fs"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
let SettlementController = class SettlementController {
    constructor(settlementItemService, vendorService, vendorInvoiceService, orderService, settlementService, orderProductService, vendorOrderService) {
        this.settlementItemService = settlementItemService;
        this.vendorService = vendorService;
        this.vendorInvoiceService = vendorInvoiceService;
        this.orderService = orderService;
        this.settlementService = settlementService;
        this.orderProductService = orderProductService;
        this.vendorOrderService = vendorOrderService;
    }
    // Create Settlement API
    /**
     * @api {post} /api/settlement Create settlement API
     * @apiGroup Settlement
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} vendorOrderId vendorOrderId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "vendorOrderId" : [],
     * }],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New settlement is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    createSettlement(settlementParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrders = settlementParam.vendorOrderId;
            for (const vendorOrder of vendorOrders) {
                const findOrder = yield this.vendorOrderService.findOne({ where: { vendorOrderId: vendorOrder } });
                if (!findOrder) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid order Id',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const newSettlement = new Settlement_1.Settlement();
            newSettlement.title = settlementParam.title;
            newSettlement.noOfOrders = vendorOrders.length;
            const settlement = yield this.settlementService.create(newSettlement);
            let totalAmount = 0;
            let currencySymbolLeft = undefined;
            let currencySymbolRight = undefined;
            const arr = [];
            for (const vendorOrder of vendorOrders) {
                const settlementItem = new SettlementItem_1.SettlementItem();
                const vendOrder = yield this.vendorOrderService.findOne({ where: { vendorOrderId: vendorOrder } });
                vendOrder.makeSettlement = 1;
                yield this.vendorOrderService.create(vendOrder);
                settlementItem.vendorId = vendOrder.vendorId;
                settlementItem.vendorOrderId = vendOrder.vendorOrderId;
                settlementItem.orderProductId = vendOrder.orderProductId;
                settlementItem.orderId = vendOrder.orderId;
                settlementItem.total = vendOrder.total;
                settlementItem.settlementId = settlement.id;
                const vendor = yield this.vendorService.findOne({ where: { vendorId: vendOrder.vendorId } });
                settlementItem.companyName = vendor ? vendor.companyName : '';
                settlementItem.commission = vendOrder ? vendOrder.commission : '';
                const defCommission = (vendOrder.commission && vendOrder.commission > 0) ? vendOrder.commission : 0;
                const commission = vendOrder.total * (defCommission / 100);
                settlementItem.CommissionAmount = commission;
                const amount = vendOrder.total - commission;
                settlementItem.netAmount = amount;
                totalAmount += amount;
                const orderProduct = yield this.orderProductService.findOne({ where: { orderProductId: vendOrder.orderProductId } });
                settlementItem.orderProductPrefixId = orderProduct.orderProductPrefixId;
                const order = yield this.orderService.findOrder({ where: { orderId: vendOrder.orderId } });
                currencySymbolLeft = order.currencySymbolLeft;
                currencySymbolRight = order.currencySymbolRight;
                arr.push(settlementItem);
            }
            yield this.settlementItemService.create(arr);
            newSettlement.totalAmount = totalAmount;
            newSettlement.currencySymbolLeft = currencySymbolLeft;
            newSettlement.currencySymbolRight = currencySymbolRight;
            yield this.settlementService.create(newSettlement);
            const successResponse = {
                status: 1,
                message: 'Successfully created new settlement',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Settlement List API
    /**
     * @api {get} /api/settlement  Settlement list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by title
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by starting amount
     * @apiParam (Request body) {String} amountTo search by ending Amount
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order list",
     *      "data":{
     *       "id": "",
     *       "createdDate": "",
     *       "title": "",
     *       "currencySymbolLeft": "",
     *       "currencySymbolRight": "",
     *       "totalAmount": "",
     *       "noOfOrders": "",
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    orderListtt(limit, offset, keyword, startDate, endDate, amountFrom, amountTo, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Settlement.id as id',
                'Settlement.createdDate as createdDate',
                'Settlement.modifiedDate as modifiedDate',
                'Settlement.title as title',
                'Settlement.currencySymbolLeft as currencySymbolLeft',
                'Settlement.currencySymbolRight as currencySymbolRight',
                'Settlement.totalAmount as totalAmount',
                'Settlement.noOfOrders as noOfOrders'
            ];
            const relations = [];
            const groupBy = [];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`Settlement`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDate + ' 00:00:00',
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`Settlement`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDate + ' 23:59:59',
                });
            }
            if (amountFrom && amountFrom !== '') {
                whereConditions.push({
                    name: '`Settlement`.`total_amount`',
                    op: 'raw',
                    sign: '>=',
                    value: amountFrom,
                });
            }
            if (amountTo && amountTo !== '') {
                whereConditions.push({
                    name: '`Settlement`.`total_amount`',
                    op: 'raw',
                    sign: '<=',
                    value: amountTo,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['Settlement.title'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'Settlement.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderCount = yield this.settlementService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successCount = {
                    status: 1,
                    message: 'Successfully got settlement count',
                    data: orderCount,
                };
                return response.status(200).send(successCount);
            }
            const orderList = yield this.settlementService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got settlement list',
                data: orderList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Settlement Export Excel download
    /**
     * @api {get} /api/settlement/settlement-export-excel-download Settlement Export Excel Download API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} settlementId settlementId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Settement Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/settlement/settlement-export-excel-download
     * @apiErrorExample {json} Settlement Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    settlementexcelexport(settlementId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Settlement Detail Sheet');
            const rows = [];
            worksheet.columns = [
                { header: 'Title', key: 'title', size: 16, width: 30 },
                { header: 'Settlement Date', key: 'createdDate', size: 16, width: 15 },
                { header: 'No of Orders', key: 'noOfOrders', size: 16, width: 15 },
                { header: 'Total Settlement Value', key: 'totalAmount', size: 16, width: 30 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            // for (const id of settlementid) {
            const condition = {};
            if (settlementId.trim()) {
                condition.where = { id: (0, typeorm_1.In)(settlementId.split(',')) };
            }
            const dataIds = yield this.settlementService.findAll(condition);
            for (const dataId of dataIds) {
                rows.push([dataId.title, dataId.createdDate, dataId.noOfOrders, dataId.totalAmount]);
            }
            // }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './SettlementExcel' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Settlement Bulk Export API
    /**
     * @api {get} /api/settlement/bulk-export-settlement-list All Settlement Excel
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParam (Request body) {String} amountFrom amountFrom
     * @apiParam (Request body) {String} amountTo amountTo
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Settlement Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/settlement/bulk-export-settlement-list
     * @apiErrorExample {json} All Settlement Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    settlementBulkExport(keyword, startDate, endDate, amountFrom, amountTo, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('BUlk Settlement Excel');
            const rows = [];
            const select = [
                'Settlement.id as id',
                'Settlement.createdDate as createdDate',
                'Settlement.title as title',
                'Settlement.currencySymbolLeft as currencySymbolLeft',
                'Settlement.currencySymbolRight as currencySymbolRight',
                'Settlement.totalAmount as totalAmount',
                'Settlement.noOfOrders as noOfOrders'
            ];
            const relations = [];
            const groupBy = [];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`Settlement`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDate + ' 00:00:00',
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`Settlement`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDate + ' 23:59:59',
                });
            }
            if (amountFrom && amountFrom !== '') {
                whereConditions.push({
                    name: '`Settlement`.`total_amount`',
                    op: 'raw',
                    sign: '>=',
                    value: amountFrom,
                });
            }
            if (amountTo && amountTo !== '') {
                whereConditions.push({
                    name: '`Settlement`.`total_amount`',
                    op: 'raw',
                    sign: '<=',
                    value: amountTo,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['Settlement.title'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'Settlement.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.settlementService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (+orderList.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'list is empty',
                });
            }
            worksheet.columns = [
                { header: 'Title', key: 'title', size: 16, width: 30 },
                { header: 'Settlement Date', key: 'createdDate', size: 16, width: 15 },
                { header: 'No of Orders', key: 'noOfOrders', size: 16, width: 15 },
                { header: 'Total Settlement Value', key: 'totalAmount', size: 16, width: 30 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const data of orderList) {
                rows.push([data.title, data.createdDate, data.noOfOrders, data.totalAmount]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './SettlementBulkExport' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Get Settlement Detail API
    /**
     * @api {get} /api/settlement/settlement/:id Settlement Detail API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get settlement detail",
     * "data": {
     *   "createdBy": "",
     *   "createdDate": "",
     *   "modifiedBy": "",
     *   "modifiedDate": "",
     *   "id": "",
     *   "title": "",
     *   "noOfOrders": "",
     *   "totalAmount": "",
     *   "currencySymbolLeft": "",
     *   "currencySymbolRight": "",
     *   "items": []
     *  }
     * "status": "1"
     * }
     * @apiSampleRequest /api/settlement/settlement/:id
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    settlementDetails(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settlement = yield this.settlementService.findOne({
                where: { id },
            });
            settlement.items = yield this.settlementItemService.findAll({
                where: { settlementId: settlement.id },
            });
            const successResponse = {
                status: 1,
                message: 'successfully got Settlement details',
                data: settlement,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Multiple Settlement API
    /**
     * @api {post} /api/settlement/delete-multiple-settlement Delete Multiple Settlement API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} settlementId settlementId
     * @apiParamExample {json} Input
     * {
     * "settlementId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted settlement.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/settlement/delete-multiple-settlement
     * @apiErrorExample {json} Settlement Delete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleSettlement(settlementId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settlements = settlementId.split(',');
            for (const settlement of settlements) {
                const dataId = yield this.settlementService.findOne(settlement);
                if (!dataId) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid settlement Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    yield this.settlementService.delete({ id: settlement });
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully deleted the settlement',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Report List API
    /**
     * @api {get} /api/settlement/vendor-sales-report-list  Vendor Sales Report list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} allVendor allVendor
     * @apiParam (Request body) {String} vendorsId vendorsId
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got vendor sales report list",
     *      "data": {
     *       "vendorId": "",
     *       "companyName": "",
     *       "companyState": "",
     *       "vendorOrderId": "",
     *       "vendorOrderDetails": [
     *           {
     *               "vendorOrderId": "",
     *               "orderId": "",
     *               "vendorId": "",
     *               "orderProductPrefixId": "",
     *               "quantity": "",
     *               "name": "",
     *               "price": "",
     *               "basePrice": "",
     *               "skuName": "",
     *               "taxType": "",
     *               "taxValue": "",
     *               "total": "",
     *               "subOrderId": "",
     *               "commission": "",
     *               "createdDate": "",
     *               "currencySymbolLeft": "",
     *               "currencySymbolRight": "",
     *               "cancelRequestStatus": "",
     *               "paymentZone": "",
     *               "productName": "",
     *               "orderStatusName": "",
     *               "orderColorCode": "",
     *               "taxTypeValue": "",
     *               "invoiceNo": "",
     *               "invoicePrefix": ""
     *           }
     *      ]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement/vendor-sales-report-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorSalesReportList(limit, offset, allVendor, vendorsId, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'vendor.vendorId as vendorId',
                'vendor.companyName as companyName',
                'vendor.companyState as companyState',
                'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
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
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.vendorId',
                },
            ];
            const whereConditions = [];
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
            if (vendorsId && vendorsId !== undefined) {
                whereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorsId.split(','),
                });
            }
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            const sort = [{
                    name: 'vendorOrderId',
                    order: 'DESC',
                }];
            if (count) {
                const orderCount = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successCount = {
                    status: 1,
                    message: 'Successfully got sales report count',
                    data: orderCount,
                };
                return response.status(200).send(successCount);
            }
            const orderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const vendorOrder = value;
                const subOrderSelect = [
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
                ];
                const subOrderRelations = [
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'VendorOrders.orderStatus',
                        aliasName: 'orderStatus',
                    },
                ];
                const subOrderWhereConditions = [];
                subOrderWhereConditions.push({
                    name: 'VendorOrders.vendor_id',
                    op: 'and',
                    value: value.vendorId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
                });
                if (startDate && startDate !== '') {
                    subOrderWhereConditions.push({
                        name: '`VendorOrders`.`created_date`',
                        op: 'raw',
                        sign: '>=',
                        value: startDateMin,
                    });
                }
                if (endDate && endDate !== '') {
                    subOrderWhereConditions.push({
                        name: '`VendorOrders`.`created_date`',
                        op: 'raw',
                        sign: '<=',
                        value: endDateMin,
                    });
                }
                const sortOrder = [{
                        name: 'vendorOrderId',
                        order: 'DESC',
                    }];
                const vendorOrderList = yield this.vendorOrderService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
                const val = vendorOrderList.map((element) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = element;
                    if (temp.cancelRequestStatus === 1) {
                        temp.orderStatusName = 'Cancelled';
                    }
                    if (element.taxType !== 0 && (value.companyState) && element.paymentZone !== null) {
                        if (value.companyState.toLowerCase() === element.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'SGST,CGST';
                        }
                        else if (value.companyState.toLowerCase() !== element.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        temp.taxTypeValue = '';
                    }
                    const invoice = yield this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: element.orderId, vendorId: element.vendorId } });
                    if (invoice) {
                        temp.invoiceNo = invoice.invoiceNo;
                        temp.invoicePrefix = invoice.invoicePrefix;
                    }
                    else {
                        temp.invoiceNo = '';
                        temp.invoicePrefix = '';
                    }
                    return temp;
                }));
                const product = yield Promise.all(val);
                vendorOrder.vendorOrderDetails = product;
                vendorOrder.vendorOrderDetailsCount = yield this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], true, true);
                return vendorOrder;
            }));
            const orderListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got seller list',
                data: orderListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Total Sales Report List API
    /**
     * @api {get} /api/settlement/total-sales-report-list  Total Sales Report list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by amountFrom
     * @apiParam (Request body) {String} amountTo search by amountTo
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got total sales report list",
     *      "data": {
     *       "vendorOrderId": "",
     *       "orderPrefixId": "",
     *       "orderId": "",
     *       "orderProduct": [
     *           {
     *               "vendorId": "",
     *               "companyName": "",
     *               "companyState": "",
     *               "vendorOrderId": "",
     *               "orderId": "",
     *               "orderProductPrefixId": "",
     *               "quantity": "",
     *               "orderProductId": "",
     *               "name": "",
     *               "price": "",
     *               "basePrice": "",
     *               "skuName": "",
     *               "taxType": "",
     *               "taxValue": "",
     *               "total": "",
     *               "subOrderId": "",
     *               "commission": "",
     *               "createdDate": "",
     *               "currencySymbolLeft": "",
     *               "currencySymbolRight": "",
     *               "orderPrefixId": "",
     *               "paymentZone": "",
     *               "productName": "",
     *               "cancelRequestStatus": "",
     *               "orderStatusName": "",
     *               "orderColorCode": "",
     *               "invoiceNo": "",
     *               "invoicePrefix": "",
     *               "taxTypeValue": ""
     *           }
     *       ]
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement/total-sales-report-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    totalSalesReportList(limit, offset, amountFrom, startDate, endDate, amountTo, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.orderId as orderId',
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
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.orderId',
                },
            ];
            const whereConditions = [];
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
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
            if (amountFrom && amountFrom !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`total`',
                    op: 'raw',
                    sign: '>=',
                    value: amountFrom,
                });
            }
            if (amountTo && amountTo !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`total`',
                    op: 'raw',
                    sign: '<=',
                    value: amountTo,
                });
            }
            const searchConditions = [];
            const sort = [{
                    name: 'vendorOrderId',
                    order: 'DESC',
                }];
            if (count) {
                const orderCount = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successCount = {
                    status: 1,
                    message: 'Successfully got sales report count',
                    data: orderCount,
                };
                return response.status(200).send(successCount);
            }
            const orderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const vendorOrder = value;
                const selectOrderProduct = [
                    'vendor.vendorId as vendorId',
                    'vendor.companyName as companyName',
                    'vendor.companyState as companyState',
                    'VendorOrders.vendorOrderId as vendorOrderId',
                    'VendorOrders.orderId as orderId',
                    'VendorOrders.vendorId as vendorId',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderProduct.quantity as quantity',
                    'orderProduct.orderProductId as orderProductId',
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
                    'orderDetail.orderPrefixId as orderPrefixId',
                    'orderDetail.paymentZone as paymentZone',
                    'orderProduct.name as productName',
                    'orderProduct.skuName as skuName',
                    'orderProduct.cancelRequestStatus as cancelRequestStatus',
                    'orderStatus.name as orderStatusName',
                    'orderStatus.colorCode as orderColorCode',
                    'vendorInvoice.invoiceNo as invoiceNo',
                    'vendorInvoice.invoicePrefix as invoicePrefix',
                ];
                const orderProductrelations = [{
                        tableName: 'VendorOrders.vendor',
                        aliasName: 'vendor',
                    }, {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    }, {
                        tableName: 'orderDetail.vendorInvoice',
                        aliasName: 'vendorInvoice',
                    }, {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    }, {
                        tableName: 'VendorOrders.orderStatus',
                        aliasName: 'orderStatus',
                    },
                ];
                const orderProductgroupBy = [];
                const orderProductWhereConditions = [];
                orderProductWhereConditions.push({
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'VendorOrders.orderId',
                    op: 'and',
                    value: value.orderId,
                });
                if (startDate && startDate !== '') {
                    orderProductWhereConditions.push({
                        name: '`VendorOrders`.`created_date`',
                        op: 'raw',
                        sign: '>=',
                        value: startDate + ' 00:00:00',
                    });
                }
                if (endDate && endDate !== '') {
                    orderProductWhereConditions.push({
                        name: '`VendorOrders`.`created_date`',
                        op: 'raw',
                        sign: '<=',
                        value: endDate + ' 23:59:59',
                    });
                }
                if (amountFrom && amountFrom !== '') {
                    orderProductWhereConditions.push({
                        name: '`VendorOrders`.`total`',
                        op: 'raw',
                        sign: '>=',
                        value: amountFrom,
                    });
                }
                if (amountTo && amountTo !== '') {
                    orderProductWhereConditions.push({
                        name: '`VendorOrders`.`total`',
                        op: 'raw',
                        sign: '<=',
                        value: amountTo,
                    });
                }
                const orderProductSearchConditions = [];
                const orderProductSort = [{
                        name: 'vendorOrderId',
                        order: 'DESC',
                    }];
                const orderProductList = yield this.vendorOrderService.listByQueryBuilder(limit, offset, selectOrderProduct, orderProductWhereConditions, orderProductSearchConditions, orderProductrelations, orderProductgroupBy, orderProductSort, false, true);
                const val = orderProductList.map((element) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = element;
                    if (temp.cancelRequestStatus === 1) {
                        temp.orderStatusName = 'Cancelled';
                    }
                    if (element.taxType !== 0 && (element.companyState) && element.paymentZone !== null) {
                        if (element.companyState.toLowerCase() === element.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'SGST,CGST';
                        }
                        else if (element.companyState.toLowerCase() !== element.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        temp.taxTypeValue = '';
                    }
                    return temp;
                }));
                const orderProductDetails = yield Promise.all(val);
                vendorOrder.orderProduct = orderProductDetails;
                return vendorOrder;
            }));
            const orderListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got total seller sales list',
                data: orderListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Settlement Report List API
    /**
     * @api {get} /api/settlement/settlement-report-list  Settlement Report list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} vendorsId vendorsId
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} settlementFlag 1->settled 2->not settled
     * @apiParam (Request body) {String} orderStatus search by orderStatus
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Settlement report list",
     *      "data": {
     *       "vendorId": "",
     *       "companyName": "",
     *       "companyState": "",
     *       "subOrderStatusId": "",
     *       "vendorOrderId": "",
     *       "vendorOrderDetails": [
     *           {
     *               "vendorOrderId": "",
     *               "orderId": "",
     *               "vendorId": "",
     *               "subOrderStatusId": "",
     *               "orderProductPrefixId": "",
     *               "quantity": "",
     *               "name": "",
     *               "price": "",
     *               "basePrice": "",
     *               "skuName": "",
     *               "taxType": "",
     *               "taxValue": "",
     *               "total": "",
     *               "subOrderId": "",
     *               "commission": "",
     *               "createdDate": "",
     *               "currencySymbolLeft": "",
     *               "currencySymbolRight": "",
     *               "productName": "",
     *               "paymentZone": "",
     *               "cancelRequestStatus": "",
     *               "orderStatusName": "",
     *               "orderColorCode": "",
     *               "makeSettlement": "",
     *               "invoiceNo": "",
     *               "invoicePrefix": "",
     *               "taxTypeValue": "",
     *               "settlementStatus": ""
     *           }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement/settlement-report-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    settlementReportList(limit, offset, vendorsId, startDate, endDate, settlementFlag, orderStatus, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'vendor.vendorId as vendorId',
                'vendor.companyName as companyName',
                'vendor.companyState as companyState',
                'MAX(VendorOrders.subOrderStatusId) as subOrderStatusId',
                'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
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
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.vendorId',
                },
            ];
            const whereConditions = [];
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
            if (vendorsId && vendorsId !== undefined) {
                whereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorsId.split(','),
                });
            }
            if (+(settlementFlag) === 1) {
                whereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 1,
                });
            }
            else if (+(settlementFlag) === 2) {
                whereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 0,
                });
            }
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            if (orderStatus && orderStatus !== undefined) {
                whereConditions.push({
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'IN',
                    value: orderStatus.split(','),
                });
            }
            const searchConditions = [];
            const sort = [{
                    name: 'vendorOrderId',
                    order: 'DESC',
                }];
            if (count) {
                const orderCount = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successCount = {
                    status: 1,
                    message: 'Successfully got sales report count',
                    data: orderCount,
                };
                return response.status(200).send(successCount);
            }
            const orderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const vendorOrder = value;
                const subOrderSelect = [
                    'VendorOrders.vendorOrderId as vendorOrderId',
                    'VendorOrders.orderId as orderId',
                    'VendorOrders.vendorId as vendorId',
                    'VendorOrders.subOrderStatusId as subOrderStatusId',
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
                    'orderProduct.name as productName',
                    'orderProduct.skuName as skuName',
                    'orderDetail.paymentZone as paymentZone',
                    'orderProduct.cancelRequestStatus as cancelRequestStatus',
                    'orderStatus.name as orderStatusName',
                    'orderStatus.colorCode as orderColorCode',
                    'VendorOrders.makeSettlement as makeSettlement',
                    'vendorInvoice.invoiceNo as invoiceNo',
                    'vendorInvoice.invoicePrefix as invoicePrefix',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'VendorOrders.vendor',
                        aliasName: 'vendor',
                    },
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'orderDetail.vendorInvoice',
                        aliasName: 'vendorInvoice',
                    },
                    {
                        tableName: 'VendorOrders.orderStatus',
                        aliasName: 'orderStatus',
                    },
                ];
                const subOrderWhereConditions = [];
                subOrderWhereConditions.push({
                    name: 'VendorOrders.vendor_id',
                    op: 'and',
                    value: value.vendorId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
                });
                if (vendorsId && vendorsId !== undefined) {
                    subOrderWhereConditions.push({
                        name: 'vendor.vendorId',
                        op: 'IN',
                        value: vendorsId.split(','),
                    });
                }
                if (orderStatus && orderStatus !== undefined) {
                    subOrderWhereConditions.push({
                        name: 'VendorOrders.subOrderStatusId',
                        op: 'IN',
                        value: orderStatus.split(','),
                    });
                }
                if (+(settlementFlag) === 1) {
                    subOrderWhereConditions.push({
                        name: 'VendorOrders.makeSettlement',
                        op: 'and',
                        value: 1,
                    });
                }
                else if (+(settlementFlag) === 2) {
                    subOrderWhereConditions.push({
                        name: 'VendorOrders.makeSettlement',
                        op: 'and',
                        value: 0,
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
                const vendorOrderList = yield this.vendorOrderService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
                const val = vendorOrderList.map((element) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = element;
                    if (temp.cancelRequestStatus === 1) {
                        temp.orderStatusName = 'Cancelled';
                    }
                    if (element.taxType !== 0 && (value.companyState) && element.paymentZone !== null) {
                        if (value.companyState.toLowerCase() === element.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'SGST,CGST';
                        }
                        else if (value.companyState.toLowerCase() !== element.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        temp.taxTypeValue = '';
                    }
                    if (element.makeSettlement === 1) {
                        temp.settlementStatus = 'Settled';
                    }
                    else {
                        temp.settlementStatus = 'Not Settled';
                    }
                    return temp;
                }));
                const product = yield Promise.all(val);
                vendorOrder.vendorOrderDetails = product;
                vendorOrder.vendorOrderDetailsCount = yield this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], true, true);
                return vendorOrder;
            }));
            const orderListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got settlement report list',
                data: orderListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Total sales report Download
    /**
     * @api {get} /api/settlement/total-sales-report-excel Total sales report excel download
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by amountFrom
     * @apiParam (Request body) {String} amountTo search by amountTo
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download total sales report excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/settlement/total-sales-report-excel
     * @apiErrorExample {json} Total sales report excel error
     * HTTP/1.1 500 Internal Server Error
     */
    totalSalesExcelView(amountFrom, startDate, endDate, amountTo, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Total Sales Export sheet', { properties: { defaultColWidth: 25 } });
            const rows = [];
            const select = [
                'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.orderId as orderId',
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
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.orderId',
                },
            ];
            const whereConditions = [];
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
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
            const orderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            let grandQuantity = 0;
            let grandBasePrice = 0;
            let grandTax = 0;
            let grandTotal = 0;
            let left;
            let right;
            for (const orderData of orderList) {
                rows.push(['Order No']);
                rows.push([orderData.orderPrefixId]);
                rows.push(['Order Line No', 'OrderDate', 'Invoice', 'Item', 'Description', 'Quantity', 'Base Value', 'Tax', 'Tax Type', 'Total Value', 'Order Status']);
                const subOrderSelect = [
                    'VendorOrders.vendorOrderId as vendorOrderId',
                    'VendorOrders.orderId as orderId',
                    'VendorOrders.vendorId as vendorId',
                    'vendor.companyState as companyState',
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
                    'orderDetail.paymentZone as paymentZone',
                    'orderProduct.cancelRequestStatus as cancelRequestStatus',
                    'orderProduct.name as productName',
                    'orderProduct.skuName as skuName',
                    'orderStatus.name as orderStatusName',
                    'orderStatus.colorCode as orderColorCode',
                ];
                const subOrderRelations = [
                    {
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
                    },
                ];
                const subOrderWhereConditions = [];
                subOrderWhereConditions.push({
                    name: 'VendorOrders.order_id',
                    op: 'and',
                    value: orderData.orderId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
                });
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
                const vendorOrderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
                let quantity = 0;
                let basePrice = 0;
                let tax = 0;
                let total = 0;
                let currencySymbolLeft = undefined;
                let currencySymbolRight = undefined;
                for (const vendOrder of vendorOrderList) {
                    if (vendOrder.cancelRequestStatus === 1) {
                        vendOrder.orderStatusName = 'Cancelled';
                    }
                    if (vendOrder.taxType !== 0 && (vendOrder.companyState) && (vendOrder.paymentZone !== null)) {
                        if (vendOrder.companyState.toLowerCase() === vendOrder.paymentZone.toLowerCase()) {
                            vendOrder.taxTypeValue = 'SGST,CGST';
                        }
                        else if (vendOrder.companyState.toLowerCase() !== vendOrder.paymentZone.toLowerCase()) {
                            vendOrder.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        vendOrder.taxTypeValue = '';
                    }
                    const invoice = yield this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: vendOrder.orderId, vendorId: vendOrder.vendorId } });
                    let taxValueInAmount;
                    if (vendOrder.taxType === 2) {
                        taxValueInAmount = (vendOrder.basePrice * (vendOrder.taxValue / 100)).toFixed(2);
                    }
                    else {
                        taxValueInAmount = vendOrder.taxValue;
                    }
                    quantity += parseFloat(vendOrder.quantity);
                    basePrice += parseFloat(vendOrder.basePrice);
                    tax += parseFloat(taxValueInAmount);
                    total += parseFloat(vendOrder.total);
                    currencySymbolLeft = vendOrder.currencySymbolLeft;
                    currencySymbolRight = vendOrder.currencySymbolRight;
                    rows.push([vendOrder.orderProductPrefixId, vendOrder.createdDate, invoice ? invoice.invoiceNo : '', vendOrder.skuName, vendOrder.name, vendOrder.quantity, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.basePrice + (currencySymbolRight ? currencySymbolRight : ''),
                        (currencySymbolLeft ? currencySymbolLeft : '') + taxValueInAmount + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.taxTypeValue, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.total + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.orderStatusName]);
                }
                grandQuantity += quantity;
                grandBasePrice += basePrice;
                grandTax += tax;
                grandTotal += total;
                left = (currencySymbolLeft !== undefined) ? currencySymbolLeft : '';
                right = (currencySymbolRight !== undefined) ? currencySymbolRight : '';
                rows.push(['', '', '', '', 'Sub total', quantity, (left ? left : '') + basePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + tax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + total.toFixed(2) + (right ? right : ''), '']);
            }
            rows.push(['', '', '', '', 'Grand total', grandQuantity, (left ? left : '') + grandBasePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + grandTax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + grandTotal.toFixed(2) + (right ? right : ''), '']);
            // Add all rows data in sheet
            worksheet.addRows(rows);
            worksheet.eachRow({ includeEmpty: true }, ((row, rowNumber) => {
                if (row.values.includes('Order No') || row.values.includes('Order Line No')) {
                    worksheet.getRow(rowNumber).font = { bold: true };
                }
                else {
                    row.eachCell({ includeEmpty: true }, ((cell, colNumber) => {
                        if (cell.value === 'Sub total' || cell.value === 'Grand total') {
                            cell.font = { bold: true };
                        }
                    }));
                }
            }));
            const fileName = './TotalSalesReportExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Total vendor sales report Download
    /**
     * @api {get} /api/settlement/total-vendor-sales-report-excel Total Vendor sales report excel download
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} allVendor allVendor
     * @apiParam (Request body) {String} vendorsId vendorsId
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download total sales report excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/settlement/total-vendor-sales-report-excel
     * @apiErrorExample {json} Total vendor sales report excel error
     * HTTP/1.1 500 Internal Server Error
     */
    totalVendorSalesExcelView(allVendor, vendorsId, startDate, endDate, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD');
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Total Vendor Sales Export sheet', { properties: { defaultColWidth: 35 } });
            const rows = [];
            const select = [
                'vendor.vendorId as vendorId',
                'vendor.companyName as companyName',
                'vendor.companyState as companyState',
                'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
                'COUNT(VendorOrders.vendorOrderId) as vendorOrderCount',
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
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.vendorId',
                },
            ];
            const whereConditions = [];
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
            if (vendorsId && vendorsId !== undefined) {
                whereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorsId.split(','),
                });
            }
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            const sort = [{
                    name: 'vendorOrderId',
                    order: 'DESC',
                }];
            const orderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            let grandQuantity = 0;
            let grandBasePrice = 0;
            let grandTax = 0;
            let grandTotal = 0;
            let left;
            let right;
            for (const orderData of orderList) {
                rows.push(['Member', 'Records']);
                rows.push([orderData.companyName, orderData.vendorOrderCount]);
                rows.push(['Order Line No', 'OrderDate', 'Invoice', 'Item', 'Description', 'Quantity', 'Base Value', 'Tax', 'Tax Type', 'Total Value', 'Order Status']);
                const subOrderSelect = [
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
                    'orderProduct.taxType as taxType',
                    'orderProduct.taxValue as taxValue',
                    'VendorOrders.total as total',
                    'VendorOrders.subOrderId as subOrderId',
                    'VendorOrders.commission as commission',
                    'VendorOrders.createdDate as createdDate',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderProduct.name as productName',
                    'orderDetail.paymentZone as paymentZone',
                    'orderProduct.cancelRequestStatus as cancelRequestStatus',
                    'orderProduct.skuName as skuName',
                    'orderStatus.name as orderStatusName',
                    'orderStatus.colorCode as orderColorCode',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'VendorOrders.orderStatus',
                        aliasName: 'orderStatus',
                    },
                ];
                const subOrderWhereConditions = [];
                subOrderWhereConditions.push({
                    name: 'VendorOrders.vendor_id',
                    op: 'and',
                    value: orderData.vendorId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
                });
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
                        value: endDate + '23:59:59',
                    });
                }
                const sortOrder = [{
                        name: 'vendorOrderId',
                        order: 'DESC',
                    }];
                const vendorOrderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
                let quantity = 0;
                let basePrice = 0;
                let tax = 0;
                let total = 0;
                let currencySymbolLeft = undefined;
                let currencySymbolRight = undefined;
                for (const vendOrder of vendorOrderList) {
                    if (vendOrder.cancelRequestStatus === 1) {
                        vendOrder.orderStatusName = 'Cancelled';
                    }
                    if (vendOrder.taxType !== 0 && (orderData.companyState) && vendOrder.paymentZone !== null) {
                        if (orderData.companyState.toLowerCase() === vendOrder.paymentZone.toLowerCase()) {
                            vendOrder.taxTypeValue = 'SGST,CGST';
                        }
                        else if (orderData.companyState.toLowerCase() !== vendOrder.paymentZone.toLowerCase()) {
                            vendOrder.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        vendOrder.taxTypeValue = '';
                    }
                    const invoice = yield this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: vendOrder.orderId, vendorId: vendOrder.vendorId } });
                    const invoiceNo = invoice ? invoice.invoiceNo : '';
                    let taxValueInAmount;
                    if (vendOrder.taxType === 2) {
                        taxValueInAmount = (vendOrder.basePrice * (vendOrder.taxValue / 100)).toFixed(2);
                    }
                    else {
                        taxValueInAmount = vendOrder.taxValue;
                    }
                    quantity += parseFloat(vendOrder.quantity);
                    basePrice += parseFloat(vendOrder.basePrice);
                    tax += parseFloat(taxValueInAmount);
                    total += parseFloat(vendOrder.total);
                    currencySymbolLeft = vendOrder.currencySymbolLeft;
                    currencySymbolRight = vendOrder.currencySymbolRight;
                    rows.push([vendOrder.orderProductPrefixId, vendOrder.createdDate, invoiceNo, vendOrder.skuName, vendOrder.name, vendOrder.quantity, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.basePrice + (currencySymbolRight ? currencySymbolRight : ''),
                        (currencySymbolLeft ? currencySymbolLeft : '') + taxValueInAmount + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.taxTypeValue, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.total + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.orderStatusName]);
                }
                grandQuantity += quantity;
                grandBasePrice += basePrice;
                grandTax += tax;
                grandTotal += total;
                left = (currencySymbolLeft !== undefined) ? currencySymbolLeft : '';
                right = (currencySymbolRight !== undefined) ? currencySymbolRight : '';
                rows.push(['', '', '', '', 'Sub total', quantity, (left ? left : '') + basePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + tax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + total.toFixed(2) + (right ? right : ''), '']);
            }
            rows.push(['', '', '', '', 'Grand total', grandQuantity, (left ? left : '') + grandBasePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + grandTax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + grandTotal.toFixed(2) + (right ? right : ''), '']);
            worksheet.addRows(rows);
            worksheet.eachRow({ includeEmpty: true }, ((row, rowNumber) => {
                if (row.values.includes('Member') || row.values.includes('Order Line No')) {
                    worksheet.getRow(rowNumber).font = { bold: true };
                }
                else {
                    row.eachCell({ includeEmpty: true }, ((cell, colNumber) => {
                        if (cell.value === 'Sub total' || cell.value === 'Grand total') {
                            cell.font = { bold: true };
                        }
                    }));
                }
            }));
            const fileName = './TotalVendorSalesReportExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Settlement report Download
    /**
     * @api {get} /api/settlement/settlement-report-excel Settlement Report excel download
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} vendorsId vendorsId
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} settlementFlag 1->settled 2->not settled
     * @apiParam (Request body) {String} orderStatus
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download total settlement report excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/settlement/settlement-report-excel
     * @apiErrorExample {json} Settlement report excel error
     * HTTP/1.1 500 Internal Server Error
     */
    settlementReportView(limit, offset, vendorsId, orderStatus, startDate, endDate, settlementFlag, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Settlement Export sheet', { properties: { defaultColWidth: 35 } });
            const rows = [];
            const select = [
                'vendor.vendorId as vendorId',
                'vendor.companyName as companyName',
                'vendor.companyState as companyState',
                'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
                'COUNT(VendorOrders.vendorOrderId) as vendorOrderCount',
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
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.vendorId',
                },
            ];
            const whereConditions = [];
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
            if (orderStatus && orderStatus !== undefined) {
                whereConditions.push({
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'IN',
                    value: orderStatus.split(','),
                });
            }
            if (vendorsId && vendorsId !== undefined) {
                whereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorsId.split(','),
                });
            }
            if (+(settlementFlag) === 1) {
                whereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 1,
                });
            }
            else if (+(settlementFlag) === 2) {
                whereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 0,
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
            const orderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            let grandQuantity = 0;
            let grandBasePrice = 0;
            let grandTax = 0;
            let grandTotal = 0;
            let left;
            let right;
            for (const orderData of orderList) {
                rows.push(['Member', 'Records']);
                rows.push([orderData.companyName, orderData.vendorOrderCount]);
                rows.push(['Order Line No', 'OrderDate', 'Invoice', 'Item', 'Description', 'Settlement Status', 'Quantity', 'Base Value', 'Tax', 'Tax Type', 'Total Value', 'Order Status']);
                const subOrderSelect = [
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
                    'orderProduct.taxType as taxType',
                    'orderProduct.taxValue as taxValue',
                    'VendorOrders.total as total',
                    'VendorOrders.subOrderId as subOrderId',
                    'VendorOrders.commission as commission',
                    'VendorOrders.createdDate as createdDate',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderProduct.name as productName',
                    'orderProduct.skuName as skuName',
                    'orderStatus.name as orderStatusName',
                    'orderStatus.colorCode as orderColorCode',
                    'VendorOrders.makeSettlement as makeSettlement',
                    'orderDetail.paymentZone as paymentZone',
                    'orderProduct.cancelRequestStatus as cancelRequestStatus',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'VendorOrders.vendor',
                        aliasName: 'vendor',
                    },
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'VendorOrders.orderStatus',
                        aliasName: 'orderStatus',
                    },
                ];
                const subOrderWhereConditions = [];
                subOrderWhereConditions.push({
                    name: 'VendorOrders.vendor_id',
                    op: 'and',
                    value: orderData.vendorId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
                });
                if (+(settlementFlag) === 1) {
                    subOrderWhereConditions.push({
                        name: 'VendorOrders.makeSettlement',
                        op: 'and',
                        value: 1,
                    });
                }
                else if (+(settlementFlag) === 2) {
                    subOrderWhereConditions.push({
                        name: 'VendorOrders.makeSettlement',
                        op: 'and',
                        value: 0,
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
                if (vendorsId && vendorsId !== undefined) {
                    subOrderWhereConditions.push({
                        name: 'vendor.vendorId',
                        op: 'IN',
                        value: vendorsId.split(','),
                    });
                }
                if (orderStatus && orderStatus !== undefined) {
                    subOrderWhereConditions.push({
                        name: 'VendorOrders.subOrderStatusId',
                        op: 'IN',
                        value: orderStatus.split(','),
                    });
                }
                const sortOrder = [{
                        name: 'vendorOrderId',
                        order: 'DESC',
                    }];
                const vendorOrderList = yield this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
                let quantity = 0;
                let basePrice = 0;
                let tax = 0;
                let total = 0;
                let currencySymbolLeft = undefined;
                let currencySymbolRight = undefined;
                for (const vendOrder of vendorOrderList) {
                    if (vendOrder.cancelRequestStatus === 1) {
                        vendOrder.orderStatusName = 'Cancelled';
                    }
                    if (vendOrder.taxType !== 0 && (orderData.companyState) && vendOrder.paymentZone !== null) {
                        if (orderData.companyState.toLowerCase() === vendOrder.paymentZone.toLowerCase()) {
                            vendOrder.taxTypeValue = 'SGST,CGST';
                        }
                        else if (orderData.companyState.toLowerCase() !== vendOrder.paymentZone.toLowerCase()) {
                            vendOrder.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        vendOrder.taxTypeValue = '';
                    }
                    const invoice = yield this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: vendOrder.orderId, vendorId: vendOrder.vendorId } });
                    const invoiceNo = invoice ? invoice.invoiceNo : '';
                    let taxValueInAmount;
                    if (vendOrder.taxType === 2) {
                        taxValueInAmount = (vendOrder.basePrice * (vendOrder.taxValue / 100)).toFixed(2);
                    }
                    else {
                        taxValueInAmount = vendOrder.taxValue;
                    }
                    quantity += parseFloat(vendOrder.quantity);
                    basePrice += parseFloat(vendOrder.basePrice);
                    tax += parseFloat(taxValueInAmount);
                    total += parseFloat(vendOrder.total);
                    currencySymbolLeft = vendOrder.currencySymbolLeft;
                    currencySymbolRight = vendOrder.currencySymbolRight;
                    let settlementStatus;
                    if (vendOrder.makeSettlement === 1) {
                        settlementStatus = 'Settled';
                    }
                    else {
                        settlementStatus = 'Not Settled';
                    }
                    rows.push([vendOrder.orderProductPrefixId, vendOrder.createdDate, invoiceNo, vendOrder.skuName, vendOrder.name, settlementStatus, vendOrder.quantity, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.basePrice + (currencySymbolRight ? currencySymbolRight : ''),
                        (currencySymbolLeft ? currencySymbolLeft : '') + taxValueInAmount + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.taxTypeValue, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.total + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.orderStatusName]);
                }
                grandQuantity += quantity;
                grandBasePrice += basePrice;
                grandTax += tax;
                grandTotal += total;
                left = (currencySymbolLeft !== undefined) ? currencySymbolLeft : '';
                right = (currencySymbolRight !== undefined) ? currencySymbolRight : '';
                rows.push(['', '', '', '', '', 'Sub total', quantity, (left ? left : '') + basePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + tax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + total.toFixed(2) + (right ? right : ''), '']);
            }
            rows.push(['', '', '', '', '', 'Grand total', grandQuantity, (left ? left : '') + grandBasePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + grandTax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + grandTotal.toFixed(2) + (right ? right : ''), '']);
            // Add all rows data in sheet
            worksheet.addRows(rows);
            worksheet.eachRow({ includeEmpty: true }, ((row, rowNumber) => {
                if (row.values.includes('Member') || row.values.includes('Order Line No')) {
                    worksheet.getRow(rowNumber).font = { bold: true };
                }
                else {
                    row.eachCell({ includeEmpty: true }, ((cell, colNumber) => {
                        if (cell.value === 'Sub total' || cell.value === 'Grand total') {
                            cell.font = { bold: true };
                        }
                    }));
                }
            }));
            const fileName = './SettlementReportExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'make-settlement']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateSettlementRequest_1.CreateSettlementRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "createSettlement", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'settlement-history-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('amountFrom')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('amountTo')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "orderListtt", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/settlement-export-excel-download'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-excel']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('settlementId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "settlementexcelexport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bulk-export-settlement-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'settlement-bulk-export']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('amountFrom')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('amountTo')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "settlementBulkExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/settlement/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "settlementDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-multiple-settlement'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('settlementId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "deleteMultipleSettlement", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-sales-report-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'sales-by-vendor-report']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('allVendor')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('vendorsId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "vendorSalesReportList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/total-sales-report-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'total-sales-report']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('amountFrom')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('amountTo')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "totalSalesReportList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/settlement-report-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'settlement-report']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('vendorsId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('settlementFlag')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('orderStatus')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "settlementReportList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/total-sales-report-excel'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('amountFrom')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('amountTo')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "totalSalesExcelView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/total-vendor-sales-report-excel'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('allVendor')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('vendorsId')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "totalVendorSalesExcelView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/settlement-report-excel'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('vendorsId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('orderStatus')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('settlementFlag')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementController.prototype, "settlementReportView", null);
SettlementController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/settlement'),
    tslib_1.__metadata("design:paramtypes", [SettlementItemService_1.SettlementItemService, VendorService_1.VendorService, VendorInvoiceService_1.VendorInvoiceService, OrderService_1.OrderService, SettlementService_1.SettlementService, OrderProductService_1.OrderProductService, VendorOrderService_1.VendorOrdersService])
], SettlementController);
exports.SettlementController = SettlementController;
//# sourceMappingURL=SettlementController.js.map