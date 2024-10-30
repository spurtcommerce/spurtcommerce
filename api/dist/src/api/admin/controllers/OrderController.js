"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const OrderService_1 = require("../../core/services/OrderService");
const UpdateOrderChangeStatus_1 = require("./requests/UpdateOrderChangeStatus");
const DeleteOrderRequest_1 = require("./requests/DeleteOrderRequest");
const OrderLogService_1 = require("../../core/services/OrderLogService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const SettingService_1 = require("../../core/services/SettingService");
const PdfService_1 = require("../../core/services/PdfService");
const CountryService_1 = require("../../core/services/CountryService");
const zoneService_1 = require("../../core/services/zoneService");
const Payment_1 = require("../../core/models/Payment");
const PaymentItems_1 = require("../../core/models/PaymentItems");
const VendorPayment_1 = require("../../core/models/VendorPayment");
const env_1 = require("../../../env");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const PaymentService_1 = require("../../core/services/PaymentService");
const PaymentItemsService_1 = require("../../core/services/PaymentItemsService");
const VendorPaymentService_1 = require("../../core/services/VendorPaymentService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorSettingService_1 = require("../../core/services/VendorSettingService");
const fs = tslib_1.__importStar(require("fs"));
const moment = require("moment");
const OrderProductLog_1 = require("../../core/models/OrderProductLog");
const VendorOrderLog_1 = require("../../core/models/VendorOrderLog");
const OrderProductLogService_1 = require("../../core/services/OrderProductLogService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const VendorOrderLogService_1 = require("../../core/services/VendorOrderLogService");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const mail_services_1 = require("../../../auth/mail.services");
const AddPaymentRequest_1 = require("./requests/AddPaymentRequest");
const PluginService_1 = require("../../core/services/PluginService");
const ProductService_1 = require("../../core/services/ProductService");
const PaymentArchiveService_1 = require("../../core/services/PaymentArchiveService");
const VendorGroupService_1 = require("../../core/services/VendorGroupService");
const ExportLog_1 = require("../../core/models/ExportLog");
const ExportLogService_1 = require("../../core/services/ExportLogService");
let OrderController = class OrderController {
    constructor(orderService, orderLogService, orderProductService, pdfService, countryService, zoneService, settingService, s3Service, imageService, paymentService, paymentItemsService, vendorPaymentService, vendorProductService, vendorService, vendorOrdersService, vendorGlobalSettingService, orderProductLogService, productImageService, vendorOrderLogService, emailTemplateService, pluginService, orderStatusService, productService, paymentArchiveService, vendorGroupService, exportLogService) {
        this.orderService = orderService;
        this.orderLogService = orderLogService;
        this.orderProductService = orderProductService;
        this.pdfService = pdfService;
        this.countryService = countryService;
        this.zoneService = zoneService;
        this.settingService = settingService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.paymentService = paymentService;
        this.paymentItemsService = paymentItemsService;
        this.vendorPaymentService = vendorPaymentService;
        this.vendorProductService = vendorProductService;
        this.vendorService = vendorService;
        this.vendorOrdersService = vendorOrdersService;
        this.vendorGlobalSettingService = vendorGlobalSettingService;
        this.orderProductLogService = orderProductLogService;
        this.productImageService = productImageService;
        this.vendorOrderLogService = vendorOrderLogService;
        this.emailTemplateService = emailTemplateService;
        this.pluginService = pluginService;
        this.orderStatusService = orderStatusService;
        this.productService = productService;
        this.paymentArchiveService = paymentArchiveService;
        this.vendorGroupService = vendorGroupService;
        this.exportLogService = exportLogService;
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
    orderList(limit, offset, orderId, orderStatusId, customerName, totalAmount, dateAdded, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const orderCount = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Successfully got the order count',
                    data: orderCount,
                };
                return response.status(200).send(Response);
            }
            const orderList = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order list',
                data: orderList,
            };
            return response.status(200).send(successResponse);
        });
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
    salesReport(limit, offset, categoryId, productId, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                'order.ip as ipAddress'
            ];
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
            const orderList = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const result = [];
            let total = 0;
            const groupByKey = key => array => array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
            const groupByType = groupByKey('productName');
            const groupByPeriodTypeArray = groupByType(orderList);
            const groupByPeriodTypeObject = Object.keys(groupByPeriodTypeArray);
            if (groupByPeriodTypeObject && groupByPeriodTypeObject.length > 0) {
                groupByPeriodTypeObject.forEach((periodType) => {
                    const temp = {};
                    temp.productName = periodType;
                    temp.buyers = groupByPeriodTypeArray[periodType] && groupByPeriodTypeArray[periodType].length > 0 ? groupByPeriodTypeArray[periodType] : [];
                    for (const val of groupByPeriodTypeArray[periodType]) {
                        total += +val.total;
                    }
                    result.push(temp);
                });
            }
            const orderCount = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the sales report list',
                data: result, total, orderCount,
            };
            return response.status(200).send(successResponse);
        });
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
    transactionList(year, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transactionlist = yield this.orderService.transactionList(year);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the transaction list',
                data: transactionlist,
            });
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
    salesGraphList(year, month, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderList = yield this.orderProductService.salesGraphList(year, month);
            const promises = orderList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                return temp;
            }));
            const finalResult = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully got the sales count list',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
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
    productList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                ('DISTINCT Product.productId as productId'),
                'MAX(productToCategory.productToCategoryId) as productToCategoryId',
                'MAX(productToCategory.categoryId) as categoryId',
                'Product.name as name',
                'MAX(category.name) as categoryName'
            ];
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
            const productData = yield this.productService.listByQueryBuilder(0, 0, select, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            // _.groupBy(productData, 'make')
            const successResponse = {
                status: 1,
                message: 'Limit suggestion Showing Successfully',
                data: productData,
            };
            return response.status(200).send(successResponse);
        });
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
    orderExportPdf(orderid, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.findOrder({
                where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                    'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                    'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Id',
                };
                return response.status(400).send(errorResponse);
            }
            orderData.productList = yield this.orderProductService.find({ where: { orderId: orderid }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const rating = undefined;
                    const tempVal = value;
                    tempVal.taxType = value.taxType;
                    tempVal.taxValue = value.taxValue;
                    if (value.taxType === 2) {
                        const price = value.discountAmount === '0.00' || value.discountAmount === null ? +value.basePrice : +value.discountedAmount;
                        tempVal.taxValueInAmount = (price * (+value.taxValue / 100)).toFixed(2);
                    }
                    else {
                        tempVal.taxValueInAmount = value.taxValue;
                    }
                    if (rating !== undefined) {
                        tempVal.rating = rating.rating;
                        tempVal.review = rating.review;
                    }
                    else {
                        tempVal.rating = 0;
                        tempVal.review = '';
                    }
                    return tempVal;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const select = '';
            const relation = [];
            const WhereConditions = [];
            const limit = 1;
            const settings = yield this.settingService.list(limit, select, relation, WhereConditions);
            const settingDetails = settings[0];
            const countryData = yield this.countryService.findOne({ where: { countryId: settingDetails.countryId } });
            const zoneData = yield this.zoneService.findOne({ where: { zoneId: settingDetails.zoneId } });
            orderData.settingDetails = settingDetails;
            orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ';
            orderData.countryData = (countryData !== undefined) ? countryData : ' ';
            orderData.currencyCode = orderData.currencyCode;
            orderData.symbolLeft = orderData.currencySymbolLeft;
            orderData.symbolRight = orderData.currencySymbolRight;
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderData.orderStatusId },
                select: ['name', 'colorCode'],
            });
            if (orderStatusData) {
                orderData.orderStatusName = orderStatusData.name;
                orderData.statusColorCode = orderStatusData.colorCode;
            }
            let image;
            try {
                if (env_1.env.imageserver === 's3') {
                    image = yield this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '110', '30');
                }
                else {
                    image = yield this.imageService.resizeImageBase64(settingDetails.invoiceLogoPath + settingDetails.invoiceLogo, '110', '30');
                }
            }
            catch (error) {
                return response.status(400).send({
                    data: settingDetails.invoiceLogo,
                    error: error.message,
                });
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('invoice', orderData);
            const pathName = `./Invoice_${orderData.invoicePrefix + orderData.invoiceNo}.pdf`;
            yield this.pdfService.htmlPdf(htmlData, pathName);
            return new Promise((resolve, reject) => {
                response.download(pathName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(pathName);
                        return response.end();
                    }
                });
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
    salesList(year, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderList = yield this.orderService.salesList();
            const promises = orderList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December',
                ];
                const temp = result;
                temp.monthYear = monthNames[result.month] + '-' + result.year;
                return temp;
            }));
            const finalResult = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully got the sales count list',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
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
    totalOrderAmount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let total = 0;
            const order = yield this.orderService.findAll();
            let n = 0;
            for (n; n < order.length; n++) {
                total += +order[n].total;
            }
            if (order) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the total order amount',
                    data: total,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get the total order amount',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    todayOrderAmount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            let total = 0;
            const order = yield this.orderService.findAlltodayOrder(todaydate);
            let n = 0;
            for (n; n < order.length; n++) {
                total += +order[n].total;
            }
            if (order) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the today order amount',
                    data: total,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to got the today order amount',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    orderCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const orderCount = yield this.orderService.findAllTodayOrderCount(todaydate);
            const successResponse = {
                status: 1,
                message: 'Successfully got the Today order count',
                data: orderCount,
            };
            return response.status(200).send(successResponse);
        });
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
    orderChangeStatus(orderChangeStatus, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const val = yield this.orderStatusService.findOne({ where: { orderStatusId: orderChangeStatus.orderStatusId } });
            if (val.isAdmin !== 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Access 2estricted to change status',
                };
                return response.status(400).send(errorResponse);
            }
            const updateOrder = yield this.orderService.findOrder(orderChangeStatus.orderId);
            if (!updateOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Id',
                };
                return response.status(400).send(errorResponse);
            }
            updateOrder.orderStatusId = orderChangeStatus.orderStatusId;
            const order = yield this.orderLogService.create(updateOrder);
            const orderLog = yield this.orderLogService.findOne(order.orderLogId);
            orderLog.orderId = orderChangeStatus.orderId;
            yield this.orderLogService.create(order);
            updateOrder.orderStatusId = orderChangeStatus.orderStatusId;
            const orderSave = yield this.orderService.create(updateOrder);
            if (orderSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the 0rder status',
                    data: orderSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the Order Status',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    excelOrderView(orderId, failedOrder, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const orderList = yield this.orderProductService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                totalData = orderList.length;
                for (const id of orderList) {
                    const right = id.currencySymbolRight;
                    const left = id.currencySymbolLeft;
                    if (left === null && right === null) {
                        rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, id.total, id.createdDate, id.modifiedDate]);
                    }
                    else {
                        if (left !== undefined) {
                            rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, left + id.total, id.createdDate, id.modifiedDate]);
                        }
                        else {
                            rows.push([id.orderPrefixId, id.shippingFirstname + ' ' + id.shippingLastname, id.email, id.telephone, id.total + right, id.createdDate, id.modifiedDate]);
                        }
                    }
                }
            }
            else {
                const orderid = orderId === null || orderId === void 0 ? void 0 : orderId.split(',');
                totalData = orderid.length;
                for (const id of orderid) {
                    const dataId = yield this.orderService.findOrder(id);
                    const right = dataId.currencySymbolRight;
                    const left = dataId.currencySymbolLeft;
                    if (left === null && right === null) {
                        rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total, dataId.createdDate, dataId.modifiedDate]);
                    }
                    else {
                        if (left !== undefined) {
                            rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, left + dataId.total, dataId.createdDate, dataId.modifiedDate]);
                        }
                        else {
                            rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total + right, dataId.createdDate, dataId.modifiedDate]);
                        }
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './OrderExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            // Add export log
            const newExportLog = new ExportLog_1.ExportLog();
            newExportLog.module = failedOrder ? 'Failed Orders' : 'Orders';
            newExportLog.recordAvailable = totalData;
            newExportLog.createdBy = request.user.userId;
            yield this.exportLogService.create(newExportLog);
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
    deleteOrder(orderid, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.find({ where: { orderId: orderid } });
            if (orderData.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteOrder = yield this.orderService.delete(orderid);
            if (deleteOrder) {
                const successResponse = {
                    status: 1,
                    message: 'Order Deleted Successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the Order',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteMultipleOrder(orderDelete, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderIdNo = orderDelete.orderId.toString();
            const orderid = orderIdNo.split(',');
            for (const id of orderid) {
                const orderData = yield this.orderService.find({ where: { orderId: id } });
                if (orderData.length === 0) {
                    const errorResponse = {
                        status: 0,
                        message: 'Please choose a order that you want to delete',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of orderid) {
                const deleteOrderId = parseInt(id, 10);
                yield this.orderService.delete(deleteOrderId);
            }
            const successResponse = {
                status: 1,
                message: 'Order deleted successfully',
            };
            return response.status(200).send(successResponse);
        });
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
    orderLogList(orderId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderId', 'orderPrefixId', 'orderStatusId', 'shippingFirstname', 'total', 'createdDate', 'modifiedDate'];
            const search = [
                {
                    name: 'orderId',
                    op: 'where',
                    value: orderId,
                },
            ];
            const WhereConditions = [];
            const orderList = yield this.orderLogService.list(0, 0, select, search, WhereConditions, 0);
            const orderStatuss = yield this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 } });
            const order = orderStatuss.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const user = orderList.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (user === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = user.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(order);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order Log list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
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
    updatePaymentStatus(orderId, paymentStatusId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateOrder = yield this.orderService.findOrder(orderId);
            if (!updateOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Id',
                };
                return response.status(400).send(errorResponse);
            }
            updateOrder.paymentStatus = paymentStatusId;
            updateOrder.paymentFlag = paymentStatusId;
            const plugin = yield this.pluginService.findOne({ where: { id: updateOrder.paymentMethod } });
            updateOrder.paymentType = plugin.pluginName;
            yield this.orderService.create(updateOrder);
            if (paymentStatusId === 1) {
                const findPayment = yield this.paymentService.findOne({ where: { orderId } });
                if (findPayment) {
                    const errorResponse = {
                        status: 0,
                        message: 'Payment has been made for this order',
                    };
                    return response.status(400).send(errorResponse);
                }
                const paymentParams = new Payment_1.Payment();
                paymentParams.orderId = updateOrder.orderId;
                const date = new Date();
                paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                paymentParams.paymentAmount = updateOrder.total;
                const payments = yield this.paymentService.create(paymentParams);
                let i;
                const orderProduct = yield this.orderProductService.find({ where: { orderId: updateOrder.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] });
                for (i = 0; i < orderProduct.length; i++) {
                    const paymentItems = new PaymentItems_1.PaymentItems();
                    paymentItems.paymentId = payments.paymentId;
                    paymentItems.orderProductId = orderProduct[i].orderProductId;
                    paymentItems.totalAmount = orderProduct[i].total;
                    paymentItems.productName = orderProduct[i].name;
                    paymentItems.productQuantity = orderProduct[i].quantity;
                    paymentItems.productPrice = orderProduct[i].productPrice;
                    const payItem = yield this.paymentItemsService.create(paymentItems);
                    const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
                    if (vendorProduct) {
                        const vendor = yield this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
                        const vendorGroup = yield this.vendorGroupService.findOne({
                            where: {
                                groupId: vendor.vendorGroupId,
                            },
                        });
                        const vendorOrders = yield this.vendorOrdersService.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                        if (vendorOrders) {
                            const vendorPayments = new VendorPayment_1.VendorPayment();
                            vendorPayments.vendorId = vendorProduct.vendorId;
                            vendorPayments.paymentItemId = payItem.paymentItemId;
                            vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                            vendorPayments.amount = orderProduct[i].total;
                            if (+vendorProduct.vendorProductCommission > 0) {
                                vendorPayments.commissionAmount = vendorPayments.amount * (+vendorProduct.vendorProductCommission / 100);
                            }
                            else if (+vendor.commission > 0) {
                                vendorPayments.commissionAmount = vendorPayments.amount * (+vendor.commission / 100);
                            }
                            else if (vendorGroup !== undefined && +vendorGroup.commission > 0) {
                                vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
                            }
                            else {
                                const defaultCommission = yield this.vendorGlobalSettingService.findOne();
                                const defCommission = defaultCommission.defaultCommission;
                                vendorPayments.commissionAmount = vendorPayments.amount * (+defCommission / 100);
                            }
                            yield this.vendorPaymentService.create(vendorPayments);
                        }
                    }
                }
            }
            else {
                const vendorOrder = yield this.vendorOrdersService.findOne({ orderId });
                if (vendorOrder) {
                    const vendorPayment = yield this.vendorPaymentService.findOne({
                        vendorOrderId: vendorOrder.vendorOrderId,
                    });
                    yield this.vendorPaymentService.delete(vendorPayment.vendorPaymentId);
                }
                const paymentArchive = yield this.paymentArchiveService.findOne({
                    where: {
                        orderId,
                    },
                });
                if (paymentArchive) {
                    yield this.paymentArchiveService.delete({ orderId });
                }
                yield this.paymentService.delete({ orderId });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated the Payment Status',
                data: updateOrder,
            };
            return response.status(200).send(successResponse);
        });
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
    updateShippingInformation(orderId, trackingUrl, trackingNo, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateOrder = yield this.orderService.findOrder(orderId);
            if (!updateOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Id',
                };
                return response.status(400).send(errorResponse);
            }
            updateOrder.trackingUrl = trackingUrl;
            updateOrder.trackingNo = trackingNo;
            const orderSave = yield this.orderService.create(updateOrder);
            if (orderSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the Shipping Information',
                    data: orderSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the Shipping Information',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateOrderProductShippingInformation(orderProductId, trackingUrl, trackingNo, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateOrderProduct = yield this.orderProductService.findOne(orderProductId);
            if (!updateOrderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order product Id',
                };
                return response.status(400).send(errorResponse);
            }
            if (updateOrderProduct.cancelRequestStatus === 1) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot update the shipping information as the cancel request for this order is approved',
                };
                return response.status(400).send(errorResponse);
            }
            updateOrderProduct.trackingUrl = trackingUrl;
            updateOrderProduct.trackingNo = trackingNo;
            const orderProductSave = yield this.orderProductService.createData(updateOrderProduct);
            const updateVendorOrder = yield this.vendorOrdersService.findOne({ where: { orderProductId } });
            if (updateVendorOrder) {
                updateVendorOrder.trackingUrl = trackingUrl;
                updateVendorOrder.trackingNo = trackingNo;
                yield this.vendorOrdersService.create(updateVendorOrder);
            }
            if (orderProductSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the Shipping Information',
                    data: orderProductSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the Shipping Information',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateOrderProductStatus(orderProductId, orderStatusId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const val = yield this.orderStatusService.findOne({ where: { orderStatusId } });
            if (val.isAdmin !== 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Access Restricted to change status',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductStatus = yield this.orderProductService.findOne({
                where: {
                    orderProductId,
                },
            });
            if (!orderProductStatus) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            if (orderProductStatus.cancelRequestStatus === 1) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot update the status as the cancel request for this order is approved',
                };
                return response.status(400).send(errorResponse);
            }
            orderProductStatus.orderStatusId = orderStatusId;
            const orderProductStatusUpdate = yield this.orderProductService.update(orderProductStatus.orderProductId, orderProductStatus);
            const orderProductLog = new OrderProductLog_1.OrderProductLog();
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
            yield this.orderProductLogService.create(orderProductLog);
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    orderProductId: orderProductStatusUpdate.orderProductId,
                },
            });
            if (vendorOrder) {
                const vendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
                vendorOrderLog.vendorId = vendorOrder.vendorId;
                vendorOrderLog.vendorOrderId = vendorOrder.vendorOrderId;
                vendorOrderLog.orderId = vendorOrder.orderId;
                vendorOrderLog.subOrderId = vendorOrder.subOrderId;
                vendorOrderLog.subOrderStatusId = orderProductStatusUpdate.orderStatusId;
                vendorOrderLog.total = vendorOrder.total;
                yield this.vendorOrderLogService.create(vendorOrderLog);
                vendorOrder.subOrderStatusId = orderProductStatusUpdate.orderStatusId;
                yield this.vendorOrdersService.update(vendorOrder.vendorOrderId, vendorOrder);
            }
            if (orderProductStatusUpdate !== undefined) {
                const emailContent = yield this.emailTemplateService.findOne(21);
                const logo = yield this.settingService.findOne();
                const order = yield this.orderService.findOrder(orderProductStatus.orderId);
                const orderStatus = yield this.orderStatusService.findOne(orderStatusId);
                const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{title}', orderProductStatusUpdate.name).replace('{status}', orderStatus.name).replace('{order}', order.orderPrefixId);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                console.log('order.email:', order.email);
                mail_services_1.MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the order status',
                    data: orderProductStatusUpdate,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update the order product Status',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    orderProductLogList(orderProductId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderProductLogId', 'orderProductId', 'productId', 'orderId', 'name', 'model', 'quantity', 'trace', 'total', 'tax', 'orderStatusId', 'trackingUrl', 'trackingNo', 'isActive', 'createdDate', 'modifiedDate'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'orderProductId',
                    op: 'where',
                    value: orderProductId,
                },
            ];
            const orderProductList = yield this.orderProductLogService.list(0, 0, select, relation, WhereConditions, 0);
            const orderStatuss = yield this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1, parentId: 7 }, order: { priority: 'ASC' } });
            const orderProduct = orderStatuss.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (user === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = user.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(orderProduct);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete Order Product Log list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
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
    orderCounts(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = {};
            const order = yield this.orderService.findTotalOrderAmount();
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const orderAmount = yield this.orderService.findAlltodayOrder(todaydate);
            const orderCount = yield this.orderService.findAllTodayOrderCount(todaydate);
            const select = [];
            const search = [{
                    name: 'paymentProcess',
                    op: 'where',
                    value: '1',
                }];
            const WhereConditions = [];
            const orderList = yield this.orderService.list(0, 0, select, search, WhereConditions, 0, 1);
            orders.todayOrderCount = orderCount;
            orders.totalOrderAmount = order.total !== null ? order.total : 0;
            orders.todayOrderAmount = orderAmount.total !== null ? orderAmount.total : 0;
            orders.totalOrder = orderList;
            const successResponse = {
                status: 1,
                message: 'Successfully got the order counts',
                data: orders,
            };
            return response.status(200).send(successResponse);
        });
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
    canceledOrderProductList(limit, offset, status, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const orderCount = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Successfully got the order count',
                    data: orderCount,
                };
                return response.status(200).send(Response);
            }
            const orderList = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const promises = orderList.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = results;
                const productImage = yield this.productImageService.findOne({
                    where: { productId: results.productId, defaultImage: 1 },
                    select: ['image', 'containerName'],
                });
                if (productImage !== undefined) {
                    temp.image = productImage.image;
                    temp.containerName = productImage.containerName;
                }
                else {
                    temp.image = '';
                    temp.containerName = '';
                }
                const passingOrderStatus = yield this.orderStatusService.findOne({
                    where: {
                        orderStatusId: results.orderProductStatusId,
                    },
                });
                temp.orderStatusName = passingOrderStatus.name ? passingOrderStatus.name : '';
                temp.orderStatusColorCode = passingOrderStatus.colorCode ? passingOrderStatus.colorCode : '';
                return results;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order product cancel list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
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
    updateOrderCancelStatus(orderProductId, cancelStatusId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            orderProduct.cancelRequestStatus = cancelStatusId;
            const orderProductStatusUpdate = yield this.orderProductService.update(orderProduct.orderProductId, orderProduct);
            const order = yield this.orderService.findOrder({ where: { orderId: orderProduct.orderId } });
            const emailContent = yield this.emailTemplateService.findOne(20);
            let status;
            let res;
            if (orderProductStatusUpdate.cancelRequestStatus === 1) {
                status = 'approved';
                res = 'Successfully accepted the cancelled orders';
            }
            else if (orderProductStatusUpdate.cancelRequestStatus === 2) {
                status = 'rejected';
                res = 'Successfully rejected the cancelled orders';
            }
            else if (orderProductStatusUpdate.cancelRequestStatus === 0) {
                status = 'pending';
            }
            const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{productname}', orderProduct.name).replace('{status}', status);
            const redirectUrl = env_1.env.storeRedirectUrl;
            const logo = yield this.settingService.findOne();
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            console.log('email:', order.email);
            mail_services_1.MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
            if (orderProductStatusUpdate !== undefined) {
                return response.status(200).send({
                    status: 1,
                    message: res,
                    data: orderProductStatusUpdate,
                });
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update the Order cancel status',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateBulkOrderCancelStatus(orderProductId, cancelStatusId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProducts = orderProductId.split(',');
            const arr = [];
            for (const orderProduct of orderProducts) {
                const orderProd = yield this.orderProductService.findOne({
                    where: {
                        orderProductId: orderProduct,
                    },
                });
                if (!orderProd) {
                    arr.push(1);
                }
            }
            if (arr.length > 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            let res;
            for (const orderProduct of orderProducts) {
                const orderProdt = yield this.orderProductService.findOne({
                    where: {
                        orderProductId: orderProduct,
                    },
                });
                orderProdt.cancelRequestStatus = cancelStatusId;
                const orderProductStatusUpdate = yield this.orderProductService.update(orderProdt.orderProductId, orderProdt);
                const order = yield this.orderService.findOrder({ where: { orderId: orderProdt.orderId } });
                const emailContent = yield this.emailTemplateService.findOne(20);
                const logo = yield this.settingService.findOne();
                let status;
                if (orderProductStatusUpdate.cancelRequestStatus === 1) {
                    status = 'approved';
                    res = 'Successfully accepted the cancelled orders';
                }
                else if (orderProductStatusUpdate.cancelRequestStatus === 2) {
                    status = 'rejected';
                    res = 'Successfully rejected the cancelled orders';
                }
                else if (orderProductStatusUpdate.cancelRequestStatus === 0) {
                    status = 'pending';
                }
                const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{productname}', orderProdt.name).replace('{status}', status);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                console.log('order.email:', order.email);
                mail_services_1.MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
            }
            const successResponse = {
                status: 1,
                message: res,
            };
            return response.status(200).send(successResponse);
        });
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
    exportCancelRequest(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Order Detail Sheet');
            const rows = [];
            const orderid = orderProductId.split(',');
            for (const id of orderid) {
                const dataId = yield this.orderProductService.findOne({ where: { orderProductId: id } });
                if (dataId.length === 0) {
                    const errorResponse = {
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
                const data = yield this.orderProductService.findOne(id);
                const dataId = yield this.orderService.findOrder(data.orderId);
                let status;
                if (data.cancelRequestStatus === 1) {
                    status = 'approved';
                }
                else if (data.cancelRequestStatus === 2) {
                    status = 'rejected';
                }
                else if (data.cancelRequestStatus === 0) {
                    status = 'pending';
                }
                const right = dataId.currencySymbolRight;
                const left = dataId.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total, data.cancelReason, status]);
                }
                else {
                    if (left !== undefined) {
                        rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, left + data.total, data.cancelReason, status]);
                    }
                    else {
                        rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total + right, data.cancelReason, status]);
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './OrderCancelExcel_' + Date.now() + '.xlsx';
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
    bulkExportCancelRequest(request, response, status, keyword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const orderProductList = yield this.orderProductService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
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
                const dataId = yield this.orderService.findOrder(data.orderId);
                let requestStatus;
                if (data.cancelRequestStatus === 1) {
                    requestStatus = 'approved';
                }
                else if (data.cancelRequestStatus === 2) {
                    requestStatus = 'rejected';
                }
                else if (data.cancelRequestStatus === 0) {
                    requestStatus = 'pending';
                }
                const right = dataId.currencySymbolRight;
                const left = dataId.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total, data.cancelReason, requestStatus]);
                }
                else {
                    if (left !== undefined) {
                        rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, left + data.total, data.cancelReason, requestStatus]);
                    }
                    else {
                        rows.push([dataId.orderPrefixId, data.orderProductPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, data.name, data.productPrice, data.quantity, data.total + right, data.cancelReason, requestStatus]);
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './BulkOrderCancelExcel_' + Date.now() + '.xlsx';
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
    backOrderProductList(limit, offset, dateAdded, keyword, orderLineNo, orderId, customerName, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                }
            ];
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
                const orderCount = yield this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Successfully got the count',
                    data: orderCount,
                };
                return response.status(200).send(Response);
            }
            const orderList = yield this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const promises = orderList.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = results;
                const productImage = yield this.productImageService.findOne({
                    where: { productId: results.productId, defaultImage: 1 },
                    select: ['image', 'containerName'],
                });
                if (productImage !== undefined) {
                    temp.image = productImage.image;
                    temp.containerName = productImage.containerName;
                }
                else {
                    temp.image = '';
                    temp.containerName = '';
                }
                const passingOrderStatus = yield this.orderStatusService.findOne({
                    where: {
                        orderStatusId: results.orderProductStatusId,
                    },
                });
                temp.orderStatusName = passingOrderStatus.name ? passingOrderStatus.name : '';
                temp.orderStatusColorCode = passingOrderStatus.colorCode ? passingOrderStatus.colorCode : '';
                return results;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully shown the Back Order list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
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
    failedOrderList(limit, offset, orderId, keyword, orderStatusId, customerName, totalAmount, dateAdded, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                search.push({
                    name: 'orderPrefixId',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'shippingFirstname',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'total',
                    op: 'where',
                    value: keyword,
                }, {
                    name: 'createdDate',
                    op: 'like',
                    value: keyword,
                });
            }
            const relations = ['orderProduct'];
            const WhereConditions = [];
            const failedOrderList = yield this.orderService.list(limit, offset, select, search, WhereConditions, relations, count);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully got count',
                    data: failedOrderList,
                };
                return response.status(200).send(Response);
            }
            const orderStatus = failedOrderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const status = yield this.orderStatusService.findOne({
                    where: { orderStatusId: value.orderStatusId },
                    select: ['orderStatusId', 'name', 'colorCode'],
                });
                const temp = value;
                temp.orderStatus = status;
                temp.quantity = value.orderProduct.length;
                delete temp.orderProduct;
                return temp;
            }));
            const results = yield Promise.all(orderStatus);
            const successResponse = {
                status: 1,
                message: 'Successfully got the failed order list',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
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
    updationForMainOrder(paymentParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateOrder = yield this.orderService.findOrder(paymentParam.orderId);
            if (!updateOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Id',
                };
                return response.status(400).send(errorResponse);
            }
            updateOrder.paymentStatus = paymentParam.paymentStatus;
            updateOrder.paymentFlag = paymentParam.paymentStatus;
            const plugin = yield this.pluginService.findOne({ where: { id: paymentParam.paymentMethod } });
            updateOrder.paymentMethod = paymentParam.paymentMethod;
            updateOrder.paymentType = plugin.pluginName;
            updateOrder.paymentDetails = paymentParam.paymentRefId;
            updateOrder.paymentProcess = 1;
            yield this.orderService.create(updateOrder);
            if (paymentParam.paymentStatus === 1) {
                const paymentParams = new Payment_1.Payment();
                paymentParams.orderId = updateOrder.orderId;
                const date = new Date();
                paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                paymentParams.paymentAmount = updateOrder.total;
                paymentParams.paymentNumber = paymentParam.paymentRefId;
                paymentParams.paymentInformation = paymentParam.paymentDetail;
                const payments = yield this.paymentService.create(paymentParams);
                let i;
                const orderProduct = yield this.orderProductService.find({ where: { orderId: updateOrder.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] });
                for (i = 0; i < orderProduct.length; i++) {
                    const paymentItems = new PaymentItems_1.PaymentItems();
                    paymentItems.paymentId = payments.paymentId;
                    paymentItems.orderProductId = orderProduct[i].orderProductId;
                    paymentItems.totalAmount = orderProduct[i].total;
                    paymentItems.productName = orderProduct[i].name;
                    paymentItems.productQuantity = orderProduct[i].quantity;
                    paymentItems.productPrice = orderProduct[i].productPrice;
                    const payItem = yield this.paymentItemsService.create(paymentItems);
                    const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
                    if (vendorProduct) {
                        const vendor = yield this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
                        const vendorGroup = yield this.vendorGroupService.findOne({ where: { groupId: vendor.vendorGroupId, isActive: 1 } });
                        const vendorOrders = yield this.vendorOrdersService.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                        const vendorPayments = new VendorPayment_1.VendorPayment();
                        vendorPayments.vendorId = vendorProduct.vendorId;
                        vendorPayments.paymentItemId = payItem.paymentItemId;
                        vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                        vendorPayments.amount = orderProduct[i].total;
                        if (vendorProduct.vendorProductCommission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendorProduct.vendorProductCommission / 100);
                        }
                        else if (vendor.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendor.commission / 100);
                        }
                        else if (vendorGroup !== undefined && +vendorGroup.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (+vendorGroup.commission / 100);
                        }
                        else {
                            const defaultCommission = yield this.vendorGlobalSettingService.findOne();
                            const defCommission = defaultCommission.defaultCommission;
                            vendorPayments.commissionAmount = vendorPayments.amount * (+defCommission / 100);
                        }
                        yield this.vendorPaymentService.create(vendorPayments);
                    }
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated your order',
            };
            return response.status(200).send(successResponse);
        });
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
    orderCountForList(orderId, orderStatusId, customerName, totalAmount, dateAdded, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderList = yield this.orderService.orderCount(orderId, orderStatusId, totalAmount, customerName, dateAdded);
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order count',
                data: orderList,
            };
            return response.status(200).send(successResponse);
        });
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
    salesExcelReport(limit, offset, productId, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const orderList = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const groupByKey = key => array => array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
            const groupByType = groupByKey('productName');
            const groupByPeriodTypeArray = groupByType(orderList);
            const groupByPeriodTypeObject = Object.keys(groupByPeriodTypeArray);
            if (groupByPeriodTypeObject && groupByPeriodTypeObject.length > 0) {
                groupByPeriodTypeObject.forEach((periodType) => {
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
    orderDetail(orderid, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.findOrder({
                where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                    'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                    'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Id',
                };
                return response.status(400).send(errorResponse);
            }
            orderData.productList = yield this.orderProductService.find({
                where: { orderId: orderid }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'trackingUrl', 'trackingNo', 'orderStatusId', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'orderStatusId',
                    'skuName', 'orderProductPrefixId', 'modifiedDate', 'cancelReason', 'cancelReasonDescription', 'cancelRequestStatus', 'cancelRequest', 'priceGroupDetailId', 'fullfillmentStatusId'],
            }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const rating = undefined;
                    const productImage = yield this.productImageService.findOne({ select: ['image', 'containerName'], where: { productId: value.productId, defaultImage: 1 } });
                    const tempVal = value;
                    tempVal.taxType = value.taxType;
                    tempVal.taxValue = value.taxValue;
                    if (productImage) {
                        tempVal.image = productImage.image;
                        tempVal.containerName = productImage.containerName;
                    }
                    const orderProductStatusData = yield this.orderStatusService.findOne({
                        where: { orderStatusId: value.orderStatusId },
                        select: ['name', 'colorCode'],
                    });
                    if (orderProductStatusData) {
                        tempVal.orderStatusName = orderProductStatusData.name;
                        tempVal.statusColorCode = orderProductStatusData.colorCode;
                    }
                    const orderFullfillmentStatus = yield this.orderStatusService.findOne({
                        where: { orderStatusId: tempVal.fullfillmentStatusId },
                        select: ['name', 'colorCode'],
                    });
                    tempVal.orderFullfillmentStatusName = (_a = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.name) !== null && _a !== void 0 ? _a : '';
                    tempVal.orderFullfillmentStatusColorCode = (_b = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.colorCode) !== null && _b !== void 0 ? _b : '';
                    if (value.taxType === 2) {
                        tempVal.taxValueInAmount = (+value.basePrice * (+value.taxValue / 100)).toFixed(2);
                    }
                    else {
                        tempVal.taxValueInAmount = +value.taxValue;
                    }
                    if (rating !== undefined) {
                        tempVal.rating = rating.rating;
                        tempVal.review = rating.review;
                    }
                    else {
                        tempVal.rating = 0;
                        tempVal.review = '';
                    }
                    return tempVal;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderData.orderStatusId },
                select: ['name', 'colorCode'],
            });
            if (orderStatusData) {
                orderData.orderStatusName = orderStatusData.name;
                orderData.statusColorCode = orderStatusData.colorCode;
            }
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order detail',
                data: orderData,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'list-order']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('orderStatusId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('totalAmount')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/sales-report-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'sales-report-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('categoryId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "salesReport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/transaction-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('year')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "transactionList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/sales-graph-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('year')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('month')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "salesGraphList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-list'),
    (0, routing_controllers_1.Authorized)(''),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "productList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-export-pdf')
    // @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderExportPdf", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/saleslist'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-sales']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('year')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "salesList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/total-order-amount'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "totalOrderAmount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/today-order-amount'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "todayOrderAmount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/today-order-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/order-change-status'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-order-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateOrderChangeStatus_1.UpdateOrderChangeStatus, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderChangeStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-excel-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('failedOrder')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "excelOrderView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-order/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-order']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-order'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteOrderRequest_1.DeleteOrderRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "deleteMultipleOrder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/orderLoglist'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderLogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-payment-status'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('paymentStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updatePaymentStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-shipping-information'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('trackingUrl')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('trackingNo')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateShippingInformation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-order-product-shipping-information'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('trackingUrl')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('trackingNo')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderProductShippingInformation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-order-product-status/:orderProductId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('orderStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderProductStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-product-log-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderProductLogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderCounts", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-cancel-request-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'cancel-request-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "canceledOrderProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-order-cancel-request/:orderProductId'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-cancel-request-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('cancelStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderCancelStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/update-bulk-order-cancel-request'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('cancelStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateBulkOrderCancelStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-cancel-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'cancel-request-export-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "exportCancelRequest", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bulk-order-cancel-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'export-order']),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "bulkExportCancelRequest", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/back-order-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'back-order-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('orderLineNo')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "backOrderProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/failed-order-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'failed-order-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('orderStatusId')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('totalAmount')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "failedOrderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-main-order')
    // @Authorized(['admin', 'move-failed-order-to-main-order'])
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [AddPaymentRequest_1.AddPaymentRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updationForMainOrder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-count-for-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('orderStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('totalAmount')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderCountForList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/sales-report-excel-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'sales-report-export']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "salesExcelReport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:orderId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "orderDetail", null);
OrderController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/order'),
    tslib_1.__metadata("design:paramtypes", [OrderService_1.OrderService,
        OrderLogService_1.OrderLogService,
        OrderProductService_1.OrderProductService,
        PdfService_1.PdfService,
        CountryService_1.CountryService,
        zoneService_1.ZoneService,
        SettingService_1.SettingService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        PaymentService_1.PaymentService,
        PaymentItemsService_1.PaymentItemsService,
        VendorPaymentService_1.VendorPaymentService,
        VendorProductService_1.VendorProductService,
        VendorService_1.VendorService,
        VendorOrderService_1.VendorOrdersService,
        VendorSettingService_1.VendorGlobalSettingService,
        OrderProductLogService_1.OrderProductLogService,
        ProductImageService_1.ProductImageService,
        VendorOrderLogService_1.VendorOrderLogService,
        EmailTemplateService_1.EmailTemplateService,
        PluginService_1.PluginService,
        OrderStatusService_1.OrderStatusService,
        ProductService_1.ProductService,
        PaymentArchiveService_1.PaymentArchiveService,
        VendorGroupService_1.VendorGroupService,
        ExportLogService_1.ExportLogService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map