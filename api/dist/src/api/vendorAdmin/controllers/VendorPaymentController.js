"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPaymentController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const OrderService_1 = require("../../core/services/OrderService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorPaymentService_1 = require("../../core/services/VendorPaymentService");
const VendorPaymentArchiveService_1 = require("../../core/services/VendorPaymentArchiveService");
const fs = tslib_1.__importStar(require("fs"));
const VendorPaymentArchive_1 = require("../../core/models/VendorPaymentArchive");
const moment_1 = tslib_1.__importDefault(require("moment"));
let VendorPaymentController = class VendorPaymentController {
    constructor(vendorOrdersService, orderService, vendorPaymentService, vendorPaymentArchiveService, vendorService) {
        this.vendorOrdersService = vendorOrdersService;
        this.orderService = orderService;
        this.vendorPaymentService = vendorPaymentService;
        this.vendorPaymentArchiveService = vendorPaymentArchiveService;
        this.vendorService = vendorService;
    }
    // Payment List API
    /**
     * @api {get} /api/admin-vendor-payment/payment-list Payment List API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
     *      "data": {
     *       "vendorPaymentId": "",
     *       "orderId": "",
     *       "orderStatusId": "",
     *       "orderPrefixId": "",
     *       "currencySymbolLeft": "",
     *       "currencySymbolRight" : "",
     *       "shippingFirstname": "",
     *       "total": "",
     *       "createdDate": "",
     *       "paymentType": "",
     *       "paymentDetails": "",
     *       "customerId": "",
     *       "isActive": "",
     *
     *               "price": "",
     *               "discountAmount": "",
     *               "discountedAmount": "",
     *               "couponDiscountAmount": "",
     *               "orderProductPrefixId": "",
     *               "basePrice": "",
     *               "skuName": "",
     *               "total": "",
     *               "subOrderId": "",
     *               "commission": "",
     *               "companyName": "",
     *               "currencySymbolLeft": "",
     *               "currencySymbolRight": "",
     *               "commissionAmount": ""
     *           }
     *       ],
     *       "commissionAmount": ""
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-payment/payment-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderList(limit, offset, customerName, startDate, endDate, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'MAX(VendorPayment.vendorPaymentId) as vendorPaymentId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as shippingFirstname',
                'orderDetail.total as total',
                'MAX(VendorPayment.createdDate) as createdDate',
                'MAX(VendorPayment.modifiedDate) as modifiedDate',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails',
                'orderDetail.customerId as customerId',
                'orderDetail.isActive as isActive'
            ];
            const relations = [
                {
                    tableName: 'VendorPayment.vendorOrders',
                    aliasName: 'vendorOrders',
                },
                {
                    tableName: 'vendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [
                {
                    name: 'vendorOrders.order_id',
                },
            ];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`VendorPayment`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`VendorPayment`.`created_date`',
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
                name: 'createdDate',
                order: 'DESC',
            });
            const paymentList = yield this.vendorPaymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const paymentResponse = paymentList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const payment = value;
                const subOrderSelect = [
                    'orderProduct.quantity as quantity',
                    'orderProduct.name as name',
                    'orderProduct.productPrice as price',
                    'orderProduct.quantity as quantity',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.couponDiscountAmount as couponDiscountAmount',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderProduct.basePrice as basePrice',
                    'orderProduct.skuName as skuName',
                    // 'orderProduct.varientName as varientName',
                    'vendorOrders.total as total',
                    'vendorOrders.subOrderId as subOrderId',
                    'vendorOrders.commission as commission',
                    'vendor.companyName as companyName',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'VendorPayment.vendorOrders',
                        aliasName: 'vendorOrders',
                    },
                    {
                        tableName: 'vendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                    {
                        tableName: 'vendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'vendorOrders.vendor',
                        aliasName: 'vendor',
                    },
                    {
                        tableName: 'orderProduct.productInformationDetail',
                        aliasName: 'productInformationDetail',
                    },
                ];
                const subOrderWhereConditions = [
                    {
                        name: 'vendorOrders.order_id',
                        op: 'where',
                        value: value.orderId,
                    },
                ];
                const vendorOrderList = yield this.vendorPaymentService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
                let commission = 0;
                let total = 0;
                payment.subOrderDetails = vendorOrderList;
                const val = vendorOrderList.map((element) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = element;
                    let commissionAmount;
                    const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
                    total += Number(element.total);
                    commissionAmount = element.total * (commissionPercentage / 100);
                    commission += Number(commissionAmount);
                    temp.commissionAmount = commissionAmount.toFixed(2);
                    return temp;
                }));
                const product = yield Promise.all(val);
                payment.subOrderDetails = product;
                payment.commissionAmount = commission.toFixed(2);
                payment.total = total;
                return payment;
            }));
            const paymentListDetails = yield Promise.all(paymentResponse);
            const successResponse = {
                status: 1,
                message: `Successfully got the complete payment ${count ? 'count' : 'list'}`,
                data: count ? paymentListDetails.length : paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Payment List Count API
    /**
     * @api {get} /api/admin-vendor-payment/payment-list-count Payment List Count API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete payment list",
     *      "data": "20"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-payment/payment-list-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    paymentListCount(limit, offset, customerName, startDate, endDate, keyword, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'MAX(VendorPayment.vendorPaymentId) as vendorPaymentId',
                'orderDetail.orderId as orderId',
                'MAX(orderDetail.orderStatusId) as orderStatusId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as shippingFirstname',
                'MAX(orderDetail.total) as total',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails',
                'MAX(orderDetail.customerId) as customerId',
                'MAX(VendorPayment.createdDate) as createdDate',
                'orderDetail.isActive as isActive'
            ];
            const relations = [
                {
                    tableName: 'VendorPayment.vendorOrders',
                    aliasName: 'vendorOrders',
                },
                {
                    tableName: 'vendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [
                {
                    name: 'vendorOrders.order_id',
                },
            ];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`VendorPayment`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`VendorPayment`.`created_date`',
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
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['orderDetail.shippingFirstname', 'orderDetail.orderPrefixId', 'orderDetail.total'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorPayment.createdDate',
                order: 'DESC',
            });
            const paymentList = yield this.vendorPaymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete payment list',
                data: paymentList.length,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Payment Detail API
    /**
     * @api {get} /api/admin-vendor-payment/payment-detail  Payment Detail API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Got the Payment Detail..!!",
     *      "status": "1",
     *      "data": {
     *       "quantity": "",
     *       "name": "",
     *       "price": "",
     *       "total": "",
     *       "commission": "",
     *       "companyName": ""
     *   },
     * }
     * @apiSampleRequest /api/admin-vendor-payment/payment-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Payment Detail Function
    paymentDetail(orderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'orderProduct.quantity as quantity',
                'orderProduct.name as name',
                'orderProduct.productPrice as price',
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'vendor.companyName as companyName',
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'orderProduct.productInformationDetail',
                    aliasName: 'productInformationDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrders.order_id',
                op: 'and',
                value: orderId,
            });
            const searchConditions = [];
            const paymentList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order Detail',
                data: paymentList,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Payment Dashboard Count API
    /**
     * @api {get} /api/admin-vendor-payment/payment-dashboard-count  Payment Dashboard Count API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Payment Dashboard..!!",
     *      "status": "1",
     *      "data": {
     *       "totalAmount": "",
     *       "totalCommission": "",
     *       "totalOrders": "",
     *       "totalVendor": "",
     *       "totalPaymentCount": ""
     *     }
     * }
     * @apiSampleRequest /api/admin-vendor-payment/payment-dashboard-count
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Payment Detail Function
    paymentDashboardCount(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let select = [
                'SUM(VendorPayment.amount) as totalAmount',
                'SUM(VendorPayment.commissionAmount) as totalCommission',
            ];
            const relations = [
                {
                    tableName: 'VendorPayment.vendorOrders',
                    aliasName: 'vendorOrders',
                },
                {
                    tableName: 'vendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            const searchConditions = [];
            const params = {};
            params.totalAmount = 0;
            params.totalCommission = 0;
            params.totalOrders = 0;
            params.totalVendor = 0;
            const paymentTotalAmountCount = yield this.vendorPaymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
            if (paymentTotalAmountCount && paymentTotalAmountCount.length > 0) {
                params.totalAmount = paymentTotalAmountCount[0].totalAmount ? paymentTotalAmountCount[0].totalAmount : 0;
                params.totalCommission = paymentTotalAmountCount[0].totalCommission ? paymentTotalAmountCount[0].totalCommission : 0;
            }
            select = [
                'count(vendorOrders.order_id) as totalOrders',
            ];
            const subRelations = [
                {
                    tableName: 'VendorPayment.vendorOrders',
                    aliasName: 'vendorOrders',
                },
            ];
            groupBy.push({
                name: 'vendorOrders.order_id',
            });
            const paymentTotalCount = yield this.vendorPaymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, subRelations, groupBy, [], false, true);
            if (paymentTotalCount && paymentTotalCount.length > 0) {
                paymentTotalCount.forEach(element => {
                    params.totalOrders += Number(element.totalOrders);
                });
            }
            const vendorWhereConditions = [
                {
                    name: 'vendor.vendorId',
                    op: 'where',
                    value: 0,
                },
            ];
            const vendorListCount = yield this.vendorService.vendorList(0, 0, [], [], [], vendorWhereConditions, true);
            params.totalVendor = vendorListCount;
            const paymentCountSelect = [];
            const paymentCountWhereConditions = [];
            const paymentCountSearchConditions = [];
            const paymentListCount = yield this.vendorPaymentService.list(0, 0, paymentCountSelect, paymentCountSearchConditions, paymentCountWhereConditions, 1);
            params.totalPaymentCount = paymentListCount;
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order detail',
                data: params,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor order payment export
    /**
     * @api {get} /api/admin-vendor-payment/vendor-order-payment-export Admin vendor order payment export
     * @apiGroup Admin Vendor Payment
     * @apiParam (Request body) {String} orderId orderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor order payment List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-payment/vendor-order-payment-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorOrderPaymentExport(orderId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Vendor order payment export detail');
            const rows = [];
            const splitOrder = orderId.split(',');
            // Excel sheet column define
            worksheet.columns = [
                { header: 'orderId', key: 'orderId', size: 16, width: 15 },
                { header: 'customerName', key: 'customerName', size: 16, width: 15 },
                { header: 'paymentDate', key: 'paymentDate', size: 16, width: 15 },
                { header: 'paymentDetail', key: 'paymentDetails', size: 16, width: 24 },
                { header: 'paymentMethod', key: 'paymentType', size: 16, width: 15 },
                { header: 'amount', key: 'amount', size: 16, width: 15 },
                { header: 'commissionAmount', key: 'commissionAmount', size: 16, width: 15 },
                { header: 'NetAmount', key: 'NetAmount', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const record of splitOrder) {
                const val = parseInt(record, 10);
                const subOrderSelect = [
                    'orderProduct.quantity as quantity',
                    'orderProduct.name as name',
                    'orderProduct.productPrice as price',
                    'orderProduct.quantity as quantity',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.basePrice as basePrice',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.couponDiscountAmount as couponDiscountAmount',
                    'VendorOrders.total as total',
                    'VendorOrders.subOrderId as subOrderId',
                    'VendorOrders.commission as commission',
                    'vendor.companyName as companyName',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
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
                        tableName: 'VendorOrders.vendor',
                        aliasName: 'vendor',
                    },
                    {
                        tableName: 'orderProduct.productInformationDetail',
                        aliasName: 'productInformationDetail',
                    },
                ];
                const subOrderWhereConditions = [
                    {
                        name: 'VendorOrders.order_id',
                        op: 'where',
                        value: val,
                    },
                ];
                const vendorOrderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
                let commission = 0;
                let total = 0;
                vendorOrderList.forEach(element => {
                    const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
                    let commissionAmt;
                    total += Number(element.total);
                    commissionAmt = element.total * (commissionPercentage / 100);
                    commission += Number(commissionAmt);
                });
                const commissionAmount = commission;
                const totalAmount = total;
                const netAmount = totalAmount - commissionAmount;
                const orderData = yield this.orderService.findOrder({
                    where: { orderId: val }, select: ['orderId', 'shippingFirstname', 'orderPrefixId', 'paymentType', 'paymentDetails', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
                });
                rows.push([orderData.orderPrefixId, orderData.shippingFirstname, orderData.createdDate, orderData.paymentDetails, orderData.paymentType, totalAmount, commissionAmount, netAmount]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorOrderPaymentExcel_' + Date.now() + '.xlsx';
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
    // Export Bulk Order Payment List API
    /**
     * @api {get} /api/admin-vendor-payment/export-bulk-order-payment-list Export Bulk Order Payment List API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully export payment list",
     *      "data": "{}",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-payment/export-bulk-order-payment-list
     * @apiErrorExample {json} Export error
     * HTTP/1.1 500 Internal Server Error
     */
    exportBulkOrderPaymentList(customerName, startDate, endDate, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Vendor Order Payment List');
            const rows = [];
            const select = [
                'orderDetail.orderId as orderId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.shippingFirstname as shippingFirstname',
                'orderDetail.createdDate as createdDate',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.vendorPayment',
                    aliasName: 'vendorPayment',
                },
            ];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`vendorPayment`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`vendorPayment`.`created_date`',
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
                name: 'vendorPayment.createdDate',
                order: 'DESC',
            });
            const groupBy = [
                {
                    name: 'VendorOrders.order_id',
                },
            ];
            whereConditions.push({
                name: 'orderDetail.payment_flag',
                op: 'and',
                value: 1,
            });
            const paymentList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
            const paymentResponse = paymentList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const payment = value;
                const subOrderSelect = [
                    'VendorOrders.total as total',
                    'VendorOrders.commission as commission',
                    'VendorOrders.orderId as orderId',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.couponDiscountAmount as couponDiscountAmount',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                ];
                const subOrderWhereConditions = [
                    {
                        name: 'VendorOrders.order_id',
                        op: 'where',
                        value: value.orderId,
                    },
                ];
                const vendorOrderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
                let commission = 0;
                let total = 0;
                payment.subOrderDetails = vendorOrderList;
                vendorOrderList.forEach(element => {
                    const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
                    total += Number(element.total);
                    const commissionAmount = element.total * (commissionPercentage / 100);
                    commission += Number(commissionAmount);
                });
                payment.commissionAmount = commission;
                payment.total = total;
                payment.netAmount = total - commission;
                return payment;
            }));
            const paymentListDetails = yield Promise.all(paymentResponse);
            worksheet.columns = [
                { header: 'OrderId', key: 'orderId', size: 16, width: 20 },
                { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
                { header: 'PaymentDate', key: 'paymentDate', size: 16, width: 15 },
                { header: 'PaymentDetail', key: 'paymentDetail', size: 16, width: 30 },
                { header: 'PaymentMethod', key: 'paymentMethod', size: 16, width: 15 },
                { header: 'TotalAmount', key: 'totalAmount', size: 16, width: 15 },
                { header: 'CommissionAmount', key: 'commissionAmount', size: 16, width: 15 },
                { header: 'NetAmount', key: 'netAmount', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const arr = [];
            for (const data of paymentListDetails) {
                arr.push(data);
            }
            for (const vendorProduct of arr) {
                rows.push([vendorProduct.orderPrefixId, vendorProduct.shippingFirstname, vendorProduct.createdDate, vendorProduct.paymentDetails, vendorProduct.paymentType, vendorProduct.total, vendorProduct.commissionAmount, vendorProduct.netAmount]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorBulkOrderPaymentExcel_' + Date.now() + '.xlsx';
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
    // Make Vendor payment Archive API
    /**
     * @api {post} /api/admin-vendor-payment/make-vendor-payment-archive Make Vendor Payment Archive API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorPaymentId VendorPaymentId
     * @apiParamExample {json} Input
     * {
     *   "vendorPaymentId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Archived Payments",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-payment/make-vendor-payment-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    makePaymentArchive(vendorPaymentId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorPayment = yield this.vendorPaymentService.findOne({
                where: {
                    vendorPaymentId,
                },
            });
            if (!vendorPayment) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid seller Payment Id',
                };
                return response.status(400).send(errorResponse);
            }
            const newVendorPaymentArchive = new VendorPaymentArchive_1.VendorPaymentArchive();
            newVendorPaymentArchive.vendorId = vendorPayment.vendorId;
            newVendorPaymentArchive.vendorOrderId = vendorPayment.vendorOrderId;
            newVendorPaymentArchive.paymentItemId = vendorPayment.paymentItemId;
            newVendorPaymentArchive.amount = vendorPayment.amount;
            newVendorPaymentArchive.commissionAmount = vendorPayment.commissionAmount;
            yield this.vendorPaymentArchiveService.create(newVendorPaymentArchive);
            yield this.vendorPaymentService.delete(vendorPayment.vendorPaymentId);
            const successResponse = {
                status: 1,
                message: 'Successfully archived this payment',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Payment List API
    /**
     * @api {get} /api/admin-vendor-payment/payment-archive-list Vendor Payment Archive List API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment Archive list",
     *      "data":{
     *       'vendorPaymentArchiveId' : "",
     *       'orderId': "",
     *       'orderStatusId': "",
     *       'orderPrefixId': "",
     *       'currencySymbolLeft' : "",
     *       'currencySymbolRight': "",
     *       'shippingFirstname' : "",
     *       'total' : "",
     *       'createdDate': "",
     *       'paymentType': "",
     *       'paymentDetails': "",
     *       'customerId': "",
     *       'isActive: ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-payment/payment-archive-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    paymentArchiveList(limit, offset, customerName, startDate, endDate, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorPaymentArchive.vendorPaymentArchiveId as vendorPaymentArchiveId',
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
                'orderDetail.isActive as isActive'
            ];
            const relations = [
                {
                    tableName: 'VendorPaymentArchive.vendorOrders',
                    aliasName: 'vendorOrders',
                },
                {
                    tableName: 'vendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [
                {
                    name: 'vendorOrders.order_id',
                },
            ];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`VendorPaymentArchive`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`VendorPaymentArchive`.`created_date`',
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
                name: 'VendorPaymentArchive.createdDate',
                order: 'DESC',
            });
            const paymentList = yield this.vendorPaymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
            const paymentResponse = paymentList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const payment = value;
                const subOrderSelect = [
                    'orderProduct.quantity as quantity',
                    'orderProduct.name as name',
                    'orderProduct.productPrice as price',
                    'orderProduct.quantity as quantity',
                    'orderProduct.basePrice as basePrice',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.couponDiscountAmount as couponDiscountAmount',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderProduct.skuName as skuName',
                    'vendorOrders.total as total',
                    'vendorOrders.subOrderId as subOrderId',
                    'vendorOrders.commission as commission',
                    'vendor.companyName as companyName',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'VendorPaymentArchive.vendorOrders',
                        aliasName: 'vendorOrders',
                    },
                    {
                        tableName: 'vendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                    {
                        tableName: 'vendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'vendorOrders.vendor',
                        aliasName: 'vendor',
                    },
                    {
                        tableName: 'orderProduct.productInformationDetail',
                        aliasName: 'productInformationDetail',
                    },
                ];
                const subOrderWhereConditions = [
                    {
                        name: 'vendorOrders.order_id',
                        op: 'where',
                        value: value.orderId,
                    },
                ];
                const vendorOrderList = yield this.vendorPaymentArchiveService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
                let commission = 0;
                let total = 0;
                payment.subOrderDetails = vendorOrderList;
                const val = vendorOrderList.map((element) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = element;
                    const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
                    let commissionAmount;
                    total += Number(element.total);
                    commissionAmount = element.total * (commissionPercentage / 100);
                    commission += Number(commissionAmount);
                    temp.commissionAmount = commissionAmount.toFixed(2);
                    return temp;
                }));
                const product = yield Promise.all(val);
                payment.subOrderDetails = product;
                payment.commissionAmount = commission.toFixed(2);
                payment.total = total;
                return payment;
            }));
            const paymentListDetails = yield Promise.all(paymentResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete payment list',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/payment-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-payment']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "orderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/payment-list-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "paymentListCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/payment-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "paymentDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/payment-dashboard-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "paymentDashboardCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-order-payment-export'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "vendorOrderPaymentExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/export-bulk-order-payment-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-all-payment']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "exportBulkOrderPaymentList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/make-vendor-payment-archive'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('vendorPaymentId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "makePaymentArchive", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/payment-archive-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "paymentArchiveList", null);
VendorPaymentController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/admin-vendor-payment'),
    tslib_1.__metadata("design:paramtypes", [VendorOrderService_1.VendorOrdersService,
        OrderService_1.OrderService,
        VendorPaymentService_1.VendorPaymentService,
        VendorPaymentArchiveService_1.VendorPaymentArchiveService,
        VendorService_1.VendorService])
], VendorPaymentController);
exports.VendorPaymentController = VendorPaymentController;
//# sourceMappingURL=VendorPaymentController.js.map