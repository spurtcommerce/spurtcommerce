"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const OrderService_1 = require("../../core/services/OrderService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const ProductService_1 = require("../../core/services/ProductService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const PluginService_1 = require("../../core/services/PluginService");
const VendorOrderLogService_1 = require("../../core/services/VendorOrderLogService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const VendorOrderLog_1 = require("../../core/models/VendorOrderLog");
const PdfService_1 = require("../../core/services/PdfService");
const CountryService_1 = require("../../core/services/CountryService");
const zoneService_1 = require("../../core/services/zoneService");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const SettingService_1 = require("../../core/services/SettingService");
const env_1 = require("../../../env");
const VendorOrderArchive_1 = require("../../core/models/VendorOrderArchive");
const VendorOrderArchiveLog_1 = require("../../core/models/VendorOrderArchiveLog");
const VendorOrderArchiveLogService_1 = require("../../core/services/VendorOrderArchiveLogService");
const VendorOrderArchiveService_1 = require("../../core/services/VendorOrderArchiveService");
const VendorOrders_1 = require("../../core/models/VendorOrders");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const OrderProductLogService_1 = require("../../core/services/OrderProductLogService");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const OrderProductLog_1 = require("../../core/models/OrderProductLog");
const moment_1 = tslib_1.__importDefault(require("moment"));
const fs = tslib_1.__importStar(require("fs"));
const mail_services_1 = require("../../../auth/mail.services");
const VendorPaymentService_1 = require("../../core/services/VendorPaymentService");
const VendorPaymentArchiveService_1 = require("../../core/services/VendorPaymentArchiveService");
const VendorInvoiceService_1 = require("../../core/services/VendorInvoiceService");
const VendorInvoiceItemService_1 = require("../../core/services/VendorInvoiceItemService");
const VendorPaymentArchive_1 = require("../../core/models/VendorPaymentArchive");
const VendorService_1 = require("../../core/services/VendorService");
const CustomerService_1 = require("../../core/services/CustomerService");
const to_words_1 = require("to-words");
const VendorPayment_1 = require("../../core/models/VendorPayment");
const PaymentItemsService_1 = require("../../core/services/PaymentItemsService");
const PaymentArchiveService_1 = require("../../core/services/PaymentArchiveService");
const PaymentService_1 = require("../../core/services/PaymentService");
const VendorGroupService_1 = require("../../core/services/VendorGroupService");
const VendorSettingService_1 = require("../../core/services/VendorSettingService");
const PaymentItems_1 = require("../../core/models/PaymentItems");
const Payment_1 = require("../../core/models/Payment");
const typeorm_1 = require("typeorm");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const OrderStatusToFullfillmentService_1 = require("../../../../src/api/core/services/OrderStatusToFullfillmentService");
const OrderFullfillmentStatusService_1 = require("../../../../src/api/core/services/OrderFullfillmentStatusService");
// import { In } from 'typeorm';
let VendorOrderController = class VendorOrderController {
    constructor(vendorOrdersService, orderService, orderProductService, pluginService, vendorProductService, productImageService, vendorOrderLogService, productService, pdfService, countryService, zoneService, s3Service, vendorOrderArchiveLogService, vendorOrderArchiveService, orderStatusService, orderProductLogService, emailTemplateService, vendorPaymentService, vendorPaymentArchiveService, vendorInvoiceService, vendorInvoiceItemService, vendorService, imageService, settingService, customerService, paymentItemsService, paymentArchiveService, paymentService, vendorGroupService, vendorGlobalSettingService, skuService, orderStatusToFullfillmentService, orderFullfillmentStatusService) {
        this.vendorOrdersService = vendorOrdersService;
        this.orderService = orderService;
        this.orderProductService = orderProductService;
        this.pluginService = pluginService;
        this.vendorProductService = vendorProductService;
        this.productImageService = productImageService;
        this.vendorOrderLogService = vendorOrderLogService;
        this.productService = productService;
        this.pdfService = pdfService;
        this.countryService = countryService;
        this.zoneService = zoneService;
        this.s3Service = s3Service;
        this.vendorOrderArchiveLogService = vendorOrderArchiveLogService;
        this.vendorOrderArchiveService = vendorOrderArchiveService;
        this.orderStatusService = orderStatusService;
        this.orderProductLogService = orderProductLogService;
        this.emailTemplateService = emailTemplateService;
        this.vendorPaymentService = vendorPaymentService;
        this.vendorPaymentArchiveService = vendorPaymentArchiveService;
        this.vendorInvoiceService = vendorInvoiceService;
        this.vendorInvoiceItemService = vendorInvoiceItemService;
        this.vendorService = vendorService;
        this.imageService = imageService;
        this.settingService = settingService;
        this.customerService = customerService;
        this.paymentItemsService = paymentItemsService;
        this.paymentArchiveService = paymentArchiveService;
        this.paymentService = paymentService;
        this.vendorGroupService = vendorGroupService;
        this.vendorGlobalSettingService = vendorGlobalSettingService;
        this.skuService = skuService;
        this.orderStatusToFullfillmentService = orderStatusToFullfillmentService;
        this.orderFullfillmentStatusService = orderFullfillmentStatusService;
        // --
    }
    // Recent order List API
    /**
     * @api {Get} /api/vendor-order/recent-order-list Recent Vendor Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete order list.",
     *      "data":{
     *      "orderId" : 1,
     *      "orderStatusId" : 1,
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateAdded" : "",
     *      "dateModified" : "",
     *      "status" : 1,
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/recent-order-list
     * @apiErrorExample {json} orderlist error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorRecentOrderList(limit, offset, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'total', 'createdDate'];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: request.user.vendorId,
                },
                {
                    name: 'subOrderStatusId',
                    op: 'where',
                    value: status,
                },
                {
                    name: 'orderDetail.paymentProcess',
                    op: 'where',
                    value: 1,
                },
            ];
            const search = [];
            const relation = ['orderDetail'];
            const orderList = yield this.vendorOrdersService.list(limit, offset, select, relation, search, WhereConditions, count);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully got count',
                    data: orderList,
                };
                return response.status(200).send(Response);
            }
            const ordersList = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const order = yield this.orderService.findOrder({
                    where: { orderId: value.orderId },
                    select: ['orderId', 'orderPrefixId', 'customerId', 'shippingFirstname', 'shippingCountry', 'shippingCity', 'currencySymbolLeft', 'currencySymbolRight'],
                });
                const orderStatus = yield this.orderStatusService.findOne({
                    where: { orderStatusId: value.subOrderStatusId },
                    select: ['name'],
                });
                const temp = value;
                temp.orderPrefixId = order.orderPrefixId;
                temp.productTotal = value.total;
                temp.customerFirstName = order.shippingFirstname;
                temp.city = order.shippingCity;
                temp.country = order.shippingCountry;
                temp.currencySymbolLeft = order.currencySymbolLeft;
                temp.currencySymbolRight = order.currencySymbolRight;
                if (orderStatus) {
                    temp.orderStatusName = orderStatus.name;
                }
                return temp;
            }));
            const results = yield Promise.all(ordersList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order list',
                data: results,
            };
            return response.status(200).send(successResponse);
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
    orderDetail(vendorOrderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorOrdersService.findOne({
                where: { vendorOrderId, vendorId: request.user.vendorId }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total', 'createdDate', 'trackingUrl', 'trackingNo'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid order',
                };
                return response.status(400).send(errorResponse);
            }
            orderData.productList = yield this.orderProductService.find({
                where: { orderProductId: orderData.orderProductId },
                select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'skuName', 'orderProductPrefixId', 'priceGroupDetailId', 'orderStatusId', 'trackingUrl', 'trackingNo', 'fullfillmentStatusId', 'tags'],
            }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d, _e;
                    const ProductImage = yield this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                    const temp = value;
                    if (ProductImage) {
                        temp.image = ProductImage.image;
                        temp.containerName = ProductImage.containerName;
                    }
                    const orderStatus = yield this.orderStatusService.findOne({
                        where: { orderStatusId: temp.orderStatusId },
                        select: ['name', 'colorCode'],
                    });
                    const orderFullfillmentStatus = yield this.orderFullfillmentStatusService.findOne({
                        where: { id: temp.fullfillmentStatusId },
                        select: ['name', 'colorCode'],
                    });
                    temp.orderFullfillmentStatusName = (_a = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.name) !== null && _a !== void 0 ? _a : '';
                    temp.orderFullfillmentStatusColorCode = (_b = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.colorCode) !== null && _b !== void 0 ? _b : '';
                    if (orderStatus) {
                        temp.orderStatusName = orderStatus.name;
                        temp.statusColorCode = orderStatus.colorCode;
                    }
                    temp.tags = (_c = temp.tags) !== null && _c !== void 0 ? _c : '';
                    temp.trackingUrl = (_d = temp.trackingUrl) !== null && _d !== void 0 ? _d : '';
                    temp.trackingNo = (_e = temp.trackingNo) !== null && _e !== void 0 ? _e : '';
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
            });
            const plugin = yield this.pluginService.findOne({ where: { id: order.paymentMethod } });
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderData.subOrderStatusId },
                select: ['name', 'colorCode'],
            });
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
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order detail',
                data: orderData,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Order Detail API
    /**
     * @api {Get} /api/vendor-order/archive-order-detail/:vendorOrderArchiveId  Order Detail API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Archive Order Detail..!!",
     *      "status": "1",
     *      "data": {
     *          "createdDate": "2024-07-22T08:36:38.000Z",
     *          "subOrderId": "INV-20240705330102",
     *          "vendorId": 10,
     *          "subOrderStatusId": 3,
     *          "orderId": 330,
     *          "order_product_Id": 618,
     *          "commission": 10,
     *          "total": "5434.00",
     *          "productList": [
     *              {
     *                  "orderProductId": 618,
     *                  "productId": 1006,
     *                  "orderProductPrefixId": "INV-202407053302",
     *                  "name": "Skybags Rubik 78 Cms Large Check-In Polyester Soft Sided 4 Wheels 360 Degree Rotation Luggage/Speed_Wheel Suitcase/Trolley Bag- Blue, 47 Centimeters",
     *                  "quantity": 1,
     *                  "discountAmount": "0.00",
     *                  "basePrice": "5434.00",
     *                  "taxType": 1,
     *                  "taxValue": 0,
     *                  "total": "5434.00",
     *                  "discountedAmount": "0.00",
     *                  "skuName": "Skybags213",
     *                  "couponDiscountAmount": "",
     *                  "image": "travel5_1717047649884.jpeg",
     *                  "containerName": "new one/"
     *              }
     *          ],
     *          "customerFirstName": "testing",
     *          "shippingAddress1": "vhbbh",
     *          "shippingAddress2": "gghh",
     *          "shippingCity": "bhb",
     *          "shippingPostcode": "996669",
     *          "shippingCountry": "India",
     *          "shippingZone": "Tamil Nadu",
     *          "orderPrefixId": "INV-20240705330",
     *          "email": "piccotalent170@gmail.com",
     *          "mobileNumber": "7373737373",
     *          "orderStatusName": "Packing in progress",
     *          "statusColorCode": "#f71d1d",
     *          "paymentMethod": "CashOnDelivery",
     *          "currencySymbolLeft": "₹",
     *          "currencySymbolRight": "",
     *          "paymentFlag": "",
     *          "paymentStatus": 0
     *      },
     * }
     * @apiSampleRequest /api/vendor-order/archive-order-detail/:vendorOrderArchiveId
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Archive Order Detail Function
    orderArchiveDetail(vendorOrderArchiveId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorOrderArchiveService.findOne({
                where: { vendorOrderArchiveId, vendorId: request.user.vendorId }, select: ['orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'order_product_Id', 'total', 'createdDate', 'commission'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid archive order',
                };
                return response.status(400).send(errorResponse);
            }
            orderData.productList = yield this.orderProductService.find({
                where: { orderProductId: orderData.order_product_Id },
                select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'skuName', 'orderProductPrefixId', 'orderStatusId', 'trackingUrl', 'trackingNo', 'fullfillmentStatusId'],
            }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d;
                    const ProductImage = yield this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                    const temp = value;
                    if (ProductImage) {
                        temp.image = ProductImage.image;
                        temp.containerName = ProductImage.containerName;
                    }
                    const orderStatus = yield this.orderStatusService.findOne({
                        where: { orderStatusId: temp.orderStatusId },
                        select: ['name', 'colorCode'],
                    });
                    const orderFullfillmentStatus = yield this.orderStatusService.findOne({
                        where: { orderStatusId: temp.fullfillmentStatusId },
                        select: ['name', 'colorCode'],
                    });
                    temp.orderFullfillmentStatusName = (_a = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.name) !== null && _a !== void 0 ? _a : '';
                    temp.orderFullfillmentStatusColorCode = (_b = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.colorCode) !== null && _b !== void 0 ? _b : '';
                    if (orderStatus) {
                        temp.orderStatusName = orderStatus.name;
                        temp.statusColorCode = orderStatus.colorCode;
                    }
                    temp.trackingUrl = (_c = temp.trackingUrl) !== null && _c !== void 0 ? _c : '';
                    temp.trackingNo = (_d = temp.trackingNo) !== null && _d !== void 0 ? _d : '';
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                // select: ['shippingFirstname', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingCountry', 'currencySymbolLeft', 'currencySymbolRight', 'shippingZone', 'paymentMethod', 'paymentFlag', 'paymentStatus', 'orderPrefixId', 'email', 'telephone'],
            });
            const plugin = yield this.pluginService.findOne({ where: { id: order.paymentMethod } });
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderData.subOrderStatusId },
                select: ['name', 'colorCode'],
            });
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
            const successResponse = {
                status: 1,
                message: 'Successfully shown the archive order detail',
                data: orderData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Today order count API
    /**
     * @api {Get} /api/vendor-order/today-vendor-order-count Today Vendor Order Count API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data": {
     *        "totalOrderCount": 1,
     *        "todayOrderCount": 1,
     *        "paidCount": 1
     *           }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/today-vendor-order-count
     * @apiErrorExample {json} orderCount error
     * HTTP/1.1 500 Internal Server Error
     */
    orderCount(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const orderCount = yield this.vendorOrdersService.findVendorTodayOrderCount(request.user.vendorId, todaydate);
            const successResponse = {
                status: 1,
                message: 'Successfully get Today order count',
                data: orderCount,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Order Counts
    /**
     * @api {Get} /api/vendor-order/order-counts Order Counts
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *       "data": {
     *        "totalOrderCount": 1,
     *        "todayOrderCount": 1,
     *        "paidCount": 1
     *           }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/order-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderCounts(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const todayOrderCount = yield this.vendorOrdersService.findVendorTodayOrderCount(request.user.vendorId, todaydate);
            const buyerAndRevenueCount = yield this.vendorOrdersService.getBuyersCount(request.user.vendorId);
            const orderList = yield this.vendorOrdersService.searchOrderList(request.user.vendorId, '', '', '', '', 0);
            const successResponse = {
                status: 1,
                message: 'Successfully get Today order count',
                data: {
                    totalOrderCount: orderList.length,
                    todayOrderCount: todayOrderCount.orderCount,
                    paidCount: buyerAndRevenueCount.salesCount,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Order API
    /**
     * @api {Delete} /api/vendor-order/delete-order/:id Delete Vendor Order API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Order Deleted Successfully",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/delete-order/:id
     * @apiErrorExample {json} orderDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteOrder(orderid, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.find({ where: { orderId: orderid } });
            if (orderData.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderId',
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
                    message: 'unable to delete order',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // update Order Status API
    /**
     * @api {Put} /api/vendor-order/update-order-status/:vendorOrderId Update OrderStatus API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} subOrderStatusId OrderStatus subOrderStatusId
     * @apiParamExample {json} Input
     * {
     *      "vendorOrderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "message": "Successfully updated the order status.",
     *  "status": "1",
     *   "data": {
     *   "createdBy": "",
     *   "createdDate": "",
     *   "modifiedBy": "",
     *   "modifiedDate": "",
     *   "vendorOrderId": 251,
     *   "subOrderId": "",
     *   "vendorId": "",
     *   "subOrderStatusId": "",
     *   "orderProductId": "",
     *   "orderId": "",
     *   "total": "",
     *   "commission": "",
     *   "trackingUrl": "",
     *   "trackingNo": "",
     *   "makeSettlement": "",
     *   "name": ""
     *   }
     * }
     * @apiSampleRequest /api/vendor-order/update-order-status/:vendorOrderId
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    orderStatusUpdate(vendorOrderId, subOrderStatusId, fullfillmentStatusId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateVendorStatus = yield this.updateOrderStatus(vendorOrderId, subOrderStatusId, fullfillmentStatusId, request);
            if (updateVendorStatus.status === 0) {
                return response.status(400).send(updateVendorStatus);
            }
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    vendorOrderId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid seller order',
                };
                return errorResponse;
            }
            return response.status(200).send(updateVendorStatus);
        });
    }
    // Update Order Product API
    /**
     * @api {Put} /api/vendor-order/:vendorOrderId/order-product Update Product API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiParamExample {json} Input
     * {
     *      "tags" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "message": "Successfully Updated OrderProduct ..!",
     *  "status": "1",
     * }
     * }
     * @apiSampleRequest /api/vendor-order/:vendorOrderId/order-product
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    orderProductUpdate(vendorOrderId, payload, request, response) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    vendorOrderId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid seller order',
                };
                return errorResponse;
            }
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId: vendorOrder.orderProductId,
                },
            });
            orderProduct.tags = (_a = payload.tags) !== null && _a !== void 0 ? _a : orderProduct.tags;
            yield this.orderProductService.createData(orderProduct);
            return response.status(200).send({
                status: 1,
                message: `Successfully updated order product`,
                data: orderProduct,
            });
        });
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
    updateOrder(payload, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const validVendorOrders = yield this.vendorOrdersService.findAll({ where: { vendorOrderId: (0, typeorm_1.In)(payload.vendorOrderIds), vendorId: request.user.vendorId } });
            const orderIds = validVendorOrders.map((vendorOrder) => vendorOrder.orderId);
            const outOfStockError = [];
            const validBackOrderIds = [];
            for (const id of orderIds) {
                const orderProduct = yield this.orderProductService.findOne({ where: { orderId: id } });
                const sku = yield this.skuService.findOne({ where: { skuName: orderProduct.skuName } });
                if (sku.quantity < orderProduct.quantity) {
                    outOfStockError.push(orderProduct);
                }
                else {
                    sku.quantity -= orderProduct.quantity;
                    yield this.skuService.create(sku);
                    // const product = await this.productService.findOne({ where: { productId: orderProduct.productId } });
                    // await this.productService.update(orderProduct.productId, { quantity: product.quantity - orderProduct.quantity });
                    validBackOrderIds.push(id);
                }
            }
            yield this.orderService.bulkUpdateByIds(validBackOrderIds, { backOrders: payload.backOrder });
            return response.status(200).send({
                status: 1,
                message: `Successfully updated order`,
                data: {
                    error: outOfStockError,
                },
            });
        });
    }
    // Bulk update Order Status API
    /**
     * @api {put} /api/vendor-order/bulk-update-order-status Bulk Update OrderStatus API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number[]} vendorOrderIds vendorOrderIds
     * @apiParam (Request body) {Number} subOrderStatusId subOrderStatusId
     * @apiParamExample {json} Input
     * {
     *      "vendorOrderIds" : [],
     *      "subOrderStatusId": number
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated orderStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/bulk-update-order-status
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    bulkOrderStatusUpdate(params, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrderIds = params.vendorOrderIds;
            for (const vendorOrderId of vendorOrderIds) {
                const updateVendorStatus = yield this.updateOrderStatus(vendorOrderId, params.subOrderStatusId, params.fullfillmentStatusId, request);
                if (updateVendorStatus.status === 0) {
                    return response.status(400).send(updateVendorStatus);
                }
            }
            return response.status(200).send({ status: 1, message: 'Successfully updated the order status' });
        });
    }
    updateOrderStatus(vendorOrderId, subOrderStatusId, fullfillmentStatusId, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const val = yield this.orderStatusService.findOne({ where: { orderStatusId: subOrderStatusId } });
            if (val.isVendor !== 1 || val.isActive !== 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Access Restricted to change status',
                };
                return errorResponse;
            }
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    vendorOrderId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid seller Order',
                };
                return errorResponse;
            }
            const orderProductStatus = yield this.orderProductService.findOne({
                where: {
                    orderProductId: vendorOrder.orderProductId,
                },
            });
            if (orderProductStatus.cancelRequestStatus === 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Cancel request for this product is approved, so you cannot update order status',
                };
                return errorResponse;
            }
            const vendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
            vendorOrderLog.vendorId = vendorOrder.vendorId;
            vendorOrderLog.vendorOrderId = vendorOrder.vendorOrderId;
            vendorOrderLog.orderId = vendorOrder.orderId;
            vendorOrderLog.subOrderId = vendorOrder.subOrderId;
            vendorOrderLog.subOrderStatusId = subOrderStatusId;
            vendorOrderLog.total = vendorOrder.total;
            yield this.vendorOrderLogService.create(vendorOrderLog);
            vendorOrder.subOrderStatusId = subOrderStatusId;
            const orderStatusUpdate = yield this.vendorOrdersService.update(vendorOrder.vendorOrderId, vendorOrder);
            orderProductStatus.orderStatusId = subOrderStatusId;
            orderProductStatus.fullfillmentStatusId = fullfillmentStatusId;
            if (subOrderStatusId === 4) {
                orderProductStatus.cancelRequest = 1;
                orderProductStatus.cancelRequestStatus = 1;
                orderProductStatus.cancelReasonDescription = 'Cancelled by Seller';
            }
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
            const vendorOrderStatus = yield this.orderStatusService.findOne({
                where: {
                    orderStatusId: orderStatusUpdate.subOrderStatusId,
                },
            });
            orderStatusUpdate.subOrderStatusId = vendorOrderStatus.orderStatusId;
            orderStatusUpdate.name = vendorOrderStatus.name;
            if (orderStatusUpdate !== undefined) {
                const emailContent = yield this.emailTemplateService.findOne(21);
                const logo = yield this.settingService.findOne();
                const order = yield this.orderService.findOrder(orderProductStatus.orderId);
                const orderStatus = yield this.orderStatusService.findOne(subOrderStatusId);
                const orderFullfillmentStatus = yield this.orderFullfillmentStatusService.findOne(fullfillmentStatusId);
                const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{title}', orderProductStatusUpdate.name).replace('{status}', `${orderStatus.name} ${orderFullfillmentStatus ? `Fullfillment ${orderFullfillmentStatus.name}` : ''}`).replace('{order}', order.orderPrefixId);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                mail_services_1.MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the order status',
                    data: orderStatusUpdate,
                };
                return successResponse;
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to update OrderStatus',
                };
                return errorResponse;
            }
        });
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
    orderStatusList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive', 'defaultStatus', 'isAdmin', 'isVendor', 'isBuyer', 'isApi'];
            const search = [];
            const WhereConditions = [
                {
                    name: 'isVendor',
                    value: 1,
                },
            ];
            if (keyword) {
                search.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            if (status) {
                search.push({
                    name: 'isActive',
                    op: 'like',
                    value: status,
                });
            }
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            if (!count) {
                const orderStatusWithFullFillmentStatusList = yield Promise.all(orderStatusList.map((orderStatus) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const fullFillmentStatusIds = (yield this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: orderStatus.orderStatusId } })).map((orderToFullfillmentStatus) => orderToFullfillmentStatus.orderFulfillmentStatusId);
                    orderStatus.fullfillmentStatus = yield this.orderFullfillmentStatusService.findAll({ where: { id: (0, typeorm_1.In)(fullFillmentStatusIds), isActive: status ? +status : 1 } });
                    return orderStatus;
                })));
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the complete order status list',
                    data: orderStatusWithFullFillmentStatusList,
                });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order status list',
                data: orderStatusList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor order List based on order status API
    /**
     * @api {Get} /api/vendor-order/vendor-orders-based-status-list Vendor order List based on order status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} vendorOrderLimit limit
     * @apiParam (Request body) {Number} vendorOrderOffset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete order status list.",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-orders-based-status-list
     * @apiErrorExample {json} VendorOrderBasedStatusList error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorOrderBasedStatusList(limit, offset, vendorOrderLimit, vendorOrderOffset, keyword, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            const promise = orderStatusList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const selectOrder = [
                    'VendorOrders.vendorOrderId as vendorOrderId',
                    'VendorOrders.subOrderId as subOrderId',
                    'orderDetail.createdDate as createdDate',
                    'VendorOrders.subOrderStatusId as subOrderStatusId',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderDetail.shippingFirstname as firstName',
                    'orderDetail.paymentStatus as paymentStatus',
                    'VendorOrders.total as total',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.couponDiscountAmount as couponDiscountAmount',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderDetail.shippingAddress1 as shippingAdress1',
                    'orderDetail.shippingCity as shippingCity',
                    'orderDetail.shippingZone as shippingZone',
                    'orderDetail.shippingCountry as shippingCountry'
                ];
                const relations = [
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'VendorOrders.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'and',
                    value: value.orderStatusId,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'orderDetail.createdDate',
                    order: 'DESC',
                });
                const orderList = yield this.vendorOrdersService.listByQueryBuilder(vendorOrderLimit, vendorOrderOffset, selectOrder, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                temp.vendorOrders = orderList;
                return temp;
            }));
            const results = yield Promise.all(promise);
            if (results) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete order status list',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Vendor order detail based on order status API
    /**
     * @api {Get} /api/vendor-order/vendor-orders-based-status-details/:orderStatusId Vendor order detail bases on order status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the vendor order details ",
     *       "data": [
     *        {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy":  "",
     *       "modifiedDate": "",
     *       "orderStatusId": 1,
     *       "name": "",
     *       "isActive": "",
     *       "priority": "",
     *       "parentId": "",
     *       "defaultStatus": ""
     *       "isAdmin": "",
     *       "isVendor": "",
     *       "isBuyer": "",
     *       "isApi": "",
     *       "colorCode": ""
     *              }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-orders-based-status-details/:orderStatusId
     * @apiErrorExample {json} VendorOrderStatusDetails error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorOrderStatusDetails(orderStatusId, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const selectOrder = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.subOrderId as subOrderId',
                'orderDetail.createdDate as createdDate',
                'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as firstName',
                'orderDetail.paymentStatus as paymentStatus',
                'VendorOrders.total as total',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount',
                'orderProduct.couponDiscountAmount as couponDiscountAmount',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderDetail.shippingAddress1 as shippingAdress1',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingZone as shippingZone',
                'orderDetail.shippingCountry as shippingCountry'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'VendorOrders.subOrderStatusId',
                op: 'and',
                value: orderStatusId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderListCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, selectOrder, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the seller order count',
                    data: orderListCount,
                });
            }
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, selectOrder, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (orderList) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the seller order details',
                    data: orderList,
                });
            }
        });
    }
    // Vendor order count based on order status API
    /**
     * @api {Get} /api/vendor-order/vendor-orders-based-status-count Vendor order count based on order status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get the vendor order status count",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-orders-based-status-count
     * @apiErrorExample {json} OrderListCount error
     * HTTP/1.1 500 Internal Server Error
     */
    orderListCount(limit, offset, vendorLimit, vendorOffset, keyword, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            const promise = orderStatusList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const selectOrder = [];
                const relations = [
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'VendorOrders.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'and',
                    value: value.orderStatusId,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'orderDetail.createdDate',
                    order: 'DESC',
                });
                const orderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, selectOrder, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                temp.orderCount = orderList;
                return temp;
            }));
            const results = yield Promise.all(promise);
            if (results) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the seller order status count',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    orderLogList(vendorOrderId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['vendorOrderLogId', 'vendorId', 'vendorOrderId', 'orderId', 'subOrderId', 'subOrderStatusId', 'createdDate', 'modifiedDate'];
            const WhereConditions = [
                {
                    name: 'vendorOrderId',
                    op: 'where',
                    value: vendorOrderId,
                },
            ];
            const orderList = yield this.vendorOrderLogService.list(0, 0, select, WhereConditions, 0);
            const orderStatuss = yield this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 }, order: { priority: 'ASC' } });
            const order = orderStatuss.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const user = orderList.find(item => item.subOrderStatusId === value.orderStatusId);
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
                message: 'Successfully got the complete seller Order Status Log list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Top Selling Product List API
    /**
     * @api {Get} /api/vendor-order/top-selling-productlist  Top selling ProductList API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> thisWeek 2-> thisMonth 3-> thisYear
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": "",
     * }
     * @apiSampleRequest /api/vendor-order/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    topSellingProductList(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.vendorProductService.topProductSelling(request.user.vendorId, duration, 4);
            const promise = data.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const product = yield this.productService.findOne({
                    select: ['productId', 'price', 'name'],
                    where: { productId: result.product },
                });
                const temp = result;
                temp.product = product;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got yop selling product',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Update shipping information API
    /**
     * @api {Post} /api/vendor-order/update-shipping-information   Update shipping information API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId VendorOrderId
     * @apiParam (Request body) {String} trackingUrl shipping tracking url
     * @apiParam (Request body) {String} trackingNo shipping tracking no
     * @apiParamExample {json} Input
     * {
     *   "VendorOrderId" : "",
     *   "trackingUrl" : "",
     *   "trackingNo" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated shipping information.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-shipping-information
     * @apiErrorExample {json} UpdateShippingInformation error
     * HTTP/1.1 500 Internal Server Error
     */
    updateShippingInformation(vendorOrderId, trackingUrl, trackingNo, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateOrder = yield this.vendorOrdersService.findOne({ where: { vendorOrderId, vendorId: request.user.vendorId } });
            if (!updateOrder) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid seller order',
                };
                return response.status(400).send(errResponse);
            }
            const updateOrderProduct = yield this.orderProductService.findOne(updateOrder.orderProductId);
            if (updateOrderProduct.cancelRequestStatus === 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Cancel request for this product is approved, so you cannot update order status',
                };
                return response.status(400).send(errorResponse);
            }
            updateOrder.trackingUrl = trackingUrl;
            updateOrder.trackingNo = trackingNo;
            const orderSave = yield this.vendorOrdersService.create(updateOrder);
            updateOrderProduct.trackingUrl = trackingUrl;
            updateOrderProduct.trackingNo = trackingNo;
            yield this.orderProductService.createData(updateOrderProduct);
            if (orderSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated Shipping Information',
                    data: orderSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update Shipping Information',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //  Order Export PDF API
    /**
     * @api {Get} /api/vendor-order/order-export-pdf  Order Export PDF API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiParamExample {json} Input
     * {
     *      "vendorOrderId" : "",
     * }
     * @apiSampleRequest /api/vendor-order/order-export-pdf
     * @apiErrorExample {json} OrderExportPdf error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderExportPdf(vendorOrderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorOrdersService.findOne({
                where: { vendorOrderId, vendorId: request.user.vendorId }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total', 'createdDate'],
            });
            if (!orderData) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid seller Order',
                };
                return response.status(400).send(errResponse);
            }
            const vendor = yield this.vendorService.findOne({ where: { vendorId: orderData.vendorId } });
            orderData.vendor = vendor;
            orderData.productList = yield this.orderProductService.find({ where: { orderProductId: orderData.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'] }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const ProductImage = yield this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                    const temp = value;
                    if (ProductImage) {
                        temp.image = ProductImage.image;
                        temp.containerName = ProductImage.containerName;
                    }
                    if (value.taxType === 2) {
                        const price = value.discountAmount === '0.00' || value.discountAmount === null ? +value.basePrice : +value.discountedAmount;
                        temp.taxValueInAmount = (price * (+value.taxValue / 100)).toFixed(2);
                    }
                    else {
                        temp.taxValueInAmount = value.taxValue;
                    }
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                select: ['invoicePrefix', 'invoiceNo', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingCountry',
                    'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'currencyCode',
                    'paymentPostcode', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'shippingZone', 'paymentMethod'],
            });
            const plugin = yield this.pluginService.findOne({ where: { id: order.paymentMethod } });
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
            orderData.shippingFirstname = order.shippingFirstname;
            orderData.shippingLastname = order.shippingLastname;
            orderData.shippingAddress1 = order.shippingAddress1;
            orderData.shippingAddress2 = order.shippingAddress2;
            orderData.shippingCity = order.shippingCity;
            orderData.shippingPostcode = order.shippingPostcode;
            orderData.paymentFirstname = order.paymentFirstname;
            orderData.paymentLastname = order.paymentLastname;
            orderData.paymentAddress1 = order.paymentAddress1;
            orderData.paymentAddress2 = order.paymentAddress2;
            orderData.paymentCity = order.paymentCity;
            orderData.paymentPostcode = order.paymentPostcode;
            orderData.paymentMethod = plugin.pluginName;
            orderData.symbolLeft = order.currencySymbolLeft;
            orderData.symbolRight = order.currencySymbolRight;
            orderData.invoiceNo = order.invoiceNo;
            orderData.invoicePrefix = order.invoicePrefix;
            orderData.orderPrefixId = order.orderPrefixId;
            orderData.currencyCode = order.currencyCode;
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
                const error = (image === null || image === void 0 ? void 0 : image.name) || '';
                if (error.toLowerCase() === 'error') {
                    return response.status(400).json({
                        status: 0,
                        message: 'Invalid image in S3 bucket',
                    });
                }
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.invoiceLogoPath + settingDetails.invoiceLogo, '50', '50');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('vendor-invoice', orderData);
            const pathName = `./ Invoice_${order.invoicePrefix + order.invoiceNo}.pdf`;
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
    // Make Vendor Order Archive API
    /**
     * @api {Post} /api/vendor-order/make-vendor-order-archive Make Vendor Order Archive API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId Vendor Order Id
     * @apiParamExample {json} Input
     * {
     *   "vendorOrderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully order archived",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/make-vendor-order-archive
     * @apiErrorExample {json} MakeArchive error
     * HTTP/1.1 500 Internal Server Error
     */
    makeArchive(vendorOrderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    vendorOrderId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid seller Order',
                };
                return response.status(400).send(errorResponse);
            }
            const newVendorOrderArchive = new VendorOrderArchive_1.VendorOrderArchive();
            newVendorOrderArchive.vendorId = vendorOrder.vendorId;
            newVendorOrderArchive.orderId = vendorOrder.orderId;
            newVendorOrderArchive.subOrderId = vendorOrder.subOrderId;
            newVendorOrderArchive.subOrderStatusId = vendorOrder.subOrderStatusId;
            newVendorOrderArchive.order_product_Id = vendorOrder.orderProductId;
            newVendorOrderArchive.total = vendorOrder.total;
            newVendorOrderArchive.commission = vendorOrder.commission;
            newVendorOrderArchive.trackingUrl = vendorOrder.trackingUrl;
            newVendorOrderArchive.trackingNo = vendorOrder.trackingNo;
            const archive = yield this.vendorOrderArchiveService.create(newVendorOrderArchive);
            const vendorOrderLog = yield this.vendorOrderLogService.find({
                where: {
                    vendorOrderId,
                },
            });
            const arr = [];
            for (const data of vendorOrderLog) {
                const newVendorOrderArchiveLog = new VendorOrderArchiveLog_1.VendorOrderArchiveLog();
                newVendorOrderArchiveLog.vendorOrderArchiveId = archive.vendorOrderArchiveId;
                newVendorOrderArchiveLog.vendorId = data.vendorId;
                newVendorOrderArchiveLog.orderId = data.orderId;
                newVendorOrderArchiveLog.subOrderId = data.subOrderId;
                newVendorOrderArchiveLog.subOrderStatusId = data.subOrderStatusId;
                newVendorOrderArchiveLog.order_product_Id = vendorOrder.orderProductId;
                newVendorOrderArchiveLog.total = data.total;
                newVendorOrderArchiveLog.commission = data.commission;
                newVendorOrderArchiveLog.trackingUrl = data.trackingUrl;
                newVendorOrderArchiveLog.trackingNo = data.trackingNo;
                arr.push(newVendorOrderArchiveLog);
            }
            yield this.vendorOrderArchiveLogService.create(arr);
            const vendorPayment = yield this.vendorPaymentService.findOne({
                where: {
                    vendorOrderId,
                },
            });
            if (vendorPayment) {
                const newVendorPaymentArchive = new VendorPaymentArchive_1.VendorPaymentArchive();
                newVendorPaymentArchive.vendorId = vendorPayment.vendorId;
                newVendorPaymentArchive.vendorOrderId = archive.vendorOrderArchiveId;
                newVendorPaymentArchive.vendorOrderArchive = 1;
                newVendorPaymentArchive.paymentItemId = vendorPayment.paymentItemId;
                newVendorPaymentArchive.amount = vendorPayment.amount;
                newVendorPaymentArchive.commissionAmount = vendorPayment.commissionAmount;
                yield this.vendorPaymentArchiveService.create(newVendorPaymentArchive);
            }
            yield this.vendorOrdersService.delete(vendorOrder);
            const successResponse = {
                status: 1,
                message: 'Successfully order archived',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Revoke Vendor Order Archive API
    /**
     * @api {Post} /api/vendor-order/revoke-vendor-order-archive Revoke Vendor Order Archive API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderArchiveId Vendor Order Archive Id
     * @apiParamExample {json} Input
     * {
     *   "vendorOrderArchiveId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Revoked Archive",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/revoke-vendor-order-archive
     * @apiErrorExample {json} RevokeArchive error
     * HTTP/1.1 500 Internal Server Error
     */
    revokeArchive(vendorOrderArchiveId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrderArchive = yield this.vendorOrderArchiveService.findOne({
                where: {
                    vendorOrderArchiveId,
                },
            });
            if (!vendorOrderArchive) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid seller order Archive Id',
                };
                return response.status(400).send(errorResponse);
            }
            const newVendorOrders = new VendorOrders_1.VendorOrders();
            console.log('vendorId:', vendorOrderArchive.vendorId);
            newVendorOrders.vendorId = vendorOrderArchive.vendorId;
            newVendorOrders.orderId = vendorOrderArchive.orderId;
            newVendorOrders.subOrderId = vendorOrderArchive.subOrderId;
            newVendorOrders.subOrderStatusId = vendorOrderArchive.subOrderStatusId;
            newVendorOrders.orderProductId = vendorOrderArchive.order_product_Id;
            newVendorOrders.total = vendorOrderArchive.total;
            newVendorOrders.commission = vendorOrderArchive.commission;
            newVendorOrders.trackingUrl = vendorOrderArchive.trackingUrl;
            newVendorOrders.trackingNo = vendorOrderArchive.trackingNo;
            const vendorOrders = yield this.vendorOrdersService.create(newVendorOrders);
            console.log('vendorOrderId:', vendorOrders.vendorOrderId);
            const vendorOrderArchiveLog = yield this.vendorOrderArchiveLogService.find({
                where: {
                    vendorOrderArchiveId,
                },
            });
            const arr = [];
            for (const data of vendorOrderArchiveLog) {
                const newVendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
                newVendorOrderLog.vendorOrderId = vendorOrders.vendorOrderId;
                newVendorOrderLog.vendorId = data.vendorId;
                newVendorOrderLog.orderId = data.orderId;
                newVendorOrderLog.subOrderId = data.subOrderId;
                newVendorOrderLog.subOrderStatusId = data.subOrderStatusId;
                newVendorOrderLog.total = data.total;
                arr.push(newVendorOrderLog);
            }
            yield this.vendorOrderLogService.create(arr);
            const vendorPaymentArchive = yield this.vendorPaymentArchiveService.findOne({
                where: {
                    vendorOrderId: vendorOrderArchiveId, vendorOrderArchive: 1,
                },
            });
            console.log('vendorPaymentArchive:', vendorPaymentArchive);
            if (vendorPaymentArchive) {
                const newVendorPayment = new VendorPayment_1.VendorPayment();
                newVendorPayment.vendorId = vendorPaymentArchive.vendorId;
                newVendorPayment.vendorOrderId = vendorOrders.vendorOrderId;
                newVendorPayment.paymentItemId = vendorPaymentArchive.paymentItemId;
                newVendorPayment.amount = vendorPaymentArchive.amount;
                newVendorPayment.commissionAmount = vendorPaymentArchive.commissionAmount;
                yield this.vendorPaymentService.create(newVendorPayment);
                console.log('vendorPayment:', newVendorPayment);
            }
            yield this.vendorOrderArchiveService.delete(vendorOrderArchive);
            const successResponse = {
                status: 1,
                message: 'Successfully archived',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Archive Order List API
    /**
     * @api {Get} /api/vendor-order/archive-order-list  Archive Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete order archive list",
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
     * @apiSampleRequest /api/vendor-order/archive-order-list
     * @apiErrorExample {json} ArchiveOrderList error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderList(limit, offset, keyword, startDate, endDate, deliverylist, orderId, count, dateAdded, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrderArchive.vendorOrderArchiveId as vendorOrderArchiveId',
                'VendorOrderArchive.orderId as orderId',
                'VendorOrderArchive.vendorId as vendorId',
                'VendorOrderArchive.subOrderId as subOrderId',
                'VendorOrderArchive.subOrderStatusId as subOrderStatusId',
                'vendorOrderStatus.name as orderStatusName',
                'vendorOrderStatus.colorCode as orderColorCode',
                'order.orderStatusId as orderStatusId',
                'order.createdDate as createdDate',
                'order.currencySymbolLeft as currencySymbolLeft',
                'order.currencySymbolRight as currencySymbolRight',
                'order.shippingFirstname as customerFirstName',
                'order.paymentStatus as paymentStatus',
                'order.orderPrefixId as orderPrefixId',
                'VendorOrderArchive.total as total',
                'VendorOrderArchive.commission as commission',
                'order.isActive as isActive',
                'order.shippingCity as shippingCity',
                'order.shippingCountry as shippingCountry',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.orderStatusId as orderStatusId',
                'orderProduct.fullfillmentStatusId as fullfillmentStatusId',
                'orderProduct.quantity as quantity',
                'orderProduct.discountedAmount as discountedAmount'
            ];
            const relations = [
                {
                    tableName: 'VendorOrderArchive.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'VendorOrderArchive.orderStatus',
                    aliasName: 'vendorOrderStatus',
                },
                {
                    tableName: 'VendorOrderArchive.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrderArchive.vendorId',
                op: 'and',
                value: request.user.vendorId,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['shipping_firstname', 'order.orderPrefixId'],
                    value: keyword.toLowerCase(),
                });
            }
            if (orderId && orderId !== '') {
                searchConditions.push({
                    name: ['order.orderPrefixId'],
                    value: orderId.toLowerCase(),
                });
            }
            if (dateAdded) {
                searchConditions.push({
                    name: ['order.createdDate'],
                    value: dateAdded,
                });
            }
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            const orderArchiveList = yield this.vendorOrderArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderArchiveResponse = orderArchiveList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                let commission;
                commission = value.total * (defCommission / 100);
                temp.NetAmount = value.total - commission;
                temp.CommissionAmount = commission;
                const orderStatus = yield this.orderStatusService.findOne({
                    where: { orderStatusId: temp.orderStatusId },
                    select: ['name', 'colorCode'],
                });
                const orderFullfillmentStatus = yield this.orderStatusService.findOne({
                    where: { orderStatusId: temp.fullfillmentStatusId },
                    select: ['name', 'colorCode'],
                });
                temp.orderFullfillmentStatusName = (_a = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.name) !== null && _a !== void 0 ? _a : '';
                temp.orderFullfillmentStatusColorCode = (_b = orderFullfillmentStatus === null || orderFullfillmentStatus === void 0 ? void 0 : orderFullfillmentStatus.colorCode) !== null && _b !== void 0 ? _b : '';
                if (orderStatus) {
                    temp.orderStatusName = orderStatus.name;
                    temp.statusColorCode = orderStatus.colorCode;
                }
                return temp;
            }));
            const paymentListDetails = yield Promise.all(orderArchiveResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order archive list',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Archive Order List Count API
    /**
     * @api {Get} /api/vendor-order/archive-order-list-count  Archive Order list count API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete order archive list count",
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
     * @apiSampleRequest /api/vendor-order/archive-order-list-count
     * @apiErrorExample {json} ArchiveOrderListCount error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderListCount(limit, offset, keyword, startDate, endDate, dateAdded, deliverylist, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrderArchive.vendorOrderArchiveId as vendorOrderArchiveId',
                'VendorOrderArchive.orderId as orderId',
                'VendorOrderArchive.vendorId as vendorId',
                'VendorOrderArchive.subOrderId as subOrderId',
                'VendorOrderArchive.subOrderStatusId as subOrderStatusId',
                'vendorOrderStatus.name as orderStatusName',
                'vendorOrderStatus.colorCode as orderColorCode',
                'order.orderStatusId as orderStatusId',
                'order.createdDate as createdDate',
                'order.currencySymbolLeft as currencySymbolLeft',
                'order.currencySymbolRight as currencySymbolRight',
                'order.shippingFirstname as customerFirstName',
                'order.paymentStatus as paymentStatus',
                'VendorOrderArchive.total as total',
                'VendorOrderArchive.commission as commission',
                'order.isActive as isActive',
                'order.shippingCity as shippingCity',
                'order.shippingCountry as shippingCountry',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.couponDiscountAmount as couponDiscountAmount',
                'orderProduct.discountedAmount as discountedAmount'
            ];
            const relations = [
                {
                    tableName: 'VendorOrderArchive.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'VendorOrderArchive.orderStatus',
                    aliasName: 'vendorOrderStatus',
                },
                {
                    tableName: 'VendorOrderArchive.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrderArchive.vendorId',
                op: 'and',
                value: request.user.vendorId,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['shipping_firstname', 'VendorOrderArchive.subOrderId'],
                    value: keyword.toLowerCase(),
                });
            }
            if (dateAdded) {
                searchConditions.push({
                    name: ['order.createdDate'],
                    value: dateAdded,
                });
            }
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            const orderArchiveList = yield this.vendorOrderArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order archive list count',
                data: orderArchiveList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Order List API
    /**
     * @api {Get} /api/vendor-order/order-list  Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParam (Request body) {String} orderId orderId
     * @apiParam (Request body) {Number} amount amount
     * @apiParam (Request body) {String} orderStatus orderStatus
     * @apiParam (Request body) {String} customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} dateAdded search by dateAdded
     * @apiParam (Request body) {Number} deliverylist deliverylist
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete order list.",
     *      "data":[
     *          {
     *       "vendorOrderId": "",
     *       "orderId": "",
     *       "vendorId": "",
     *       "subOrderId": "",
     *       "subOrderStatusId": 1,
     *       "orderStatusName": "",
     *       "orderColorCode": "",
     *       "orderStatusId": "",
     *       "createdDate": "",
     *       "currencySymbolLeft": "",
     *       "currencySymbolRight": "",
     *       "customerFirstName": "",
     *       "paymentStatus": "",
     *       "total": "",
     *       "commission": "",
     *       "isActive": "",
     *       "shippingCity": "",
     *       "orderProductPrefixId": "",
     *       "discountAmount": "",
     *       "discountedAmount": "",
     *       "orderPrefixId": "",
     *       "NetAmount": "",
     *       "CommissionAmount": ""
     *       }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/order-list
     * @apiErrorExample {json} orderList error
     * HTTP/1.1 500 Internal Server Error
     */
    orderListtt(limit, offset, customerName, orderId, amount, keyword, isBackOrder, skuName, paymentProcess, orderStatus, tags, startDate, endDate, sortBy, sortOrder, deliverylist, dateAdded, count, statusType, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.modifiedDate as modifiedDate',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as customerFirstName',
                'orderDetail.paymentStatus as paymentStatus',
                'orderDetail.backOrders as backOrder',
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'orderDetail.isActive as isActive',
                'orderDetail.shippingCity as shippingCity',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.quantity as quantity',
                'orderProduct.tags as tags',
                'orderProduct.fullfillmentStatusId as fullfillmentStatusId',
                'orderFullfillmentStatus.name as orderFullfillmentStatusName',
                'orderFullfillmentStatus.colorCode as orderFullfillmentStatusCode',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.discountedAmount as discountedAmount',
                'order.orderPrefixId as orderPrefixId',
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'orderProduct.orderFullfillmentStatus',
                    op: 'left',
                    aliasName: 'orderFullfillmentStatus',
                },
                {
                    tableName: 'VendorOrders.order',
                    aliasName: 'order',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            const searchConditions = [];
            if (orderId && orderId !== '') {
                searchConditions.push({
                    name: ['order.orderPrefixId'],
                    value: orderId,
                });
            }
            if (+orderStatus && orderStatus !== '') {
                whereConditions.push({
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'and',
                    value: +orderStatus,
                });
            }
            if (amount && amount !== '') {
                searchConditions.push({
                    name: ['VendorOrders.total'],
                    value: amount,
                });
            }
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: paymentProcess ? 1 : 0,
            });
            if (+deliverylist) {
                whereConditions.push({
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
                });
            }
            searchConditions.push({
                name: 'orderDetail.backOrders',
                value: isBackOrder === 1 ? [1] : [0, 2],
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            if (dateAdded) {
                searchConditions.push({
                    name: ['orderDetail.createdDate'],
                    value: dateAdded,
                });
            }
            if (tags) {
                searchConditions.push({
                    name: ['orderProduct.tags'],
                    value: tags,
                });
            }
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['orderDetail.shippingFirstname'],
                    value: customerName,
                });
            }
            if (statusType && statusType !== '') {
                searchConditions.push({
                    name: ['orderStatus.name'],
                    value: statusType,
                });
            }
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['orderDetail.shippingFirstname', 'orderDetail.shippingCity', 'order.orderPrefixId', 'VendorOrders.total', 'orderProduct.tags'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            if (sortBy === 'buyerName') {
                sort.push({
                    name: 'orderDetail.shippingFirstname',
                    order: sortOrder !== null && sortOrder !== void 0 ? sortOrder : 'DESC',
                });
            }
            if (sortBy === 'location') {
                sort.push({
                    name: 'orderDetail.shippingCity',
                    order: sortOrder !== null && sortOrder !== void 0 ? sortOrder : 'DESC',
                });
            }
            if (sortBy === 'orderDate' || !sortBy || sortBy === 'orderId') {
                sort.push({
                    name: 'orderDetail.createdDate',
                    order: sortOrder !== null && sortOrder !== void 0 ? sortOrder : 'DESC',
                });
            }
            if (count) {
                const orderCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the seller orders count',
                    data: orderCount,
                });
            }
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                let commission;
                commission = value.total * (defCommission / 100);
                temp.NetAmount = value.total - commission;
                temp.CommissionAmount = commission;
                return temp;
            }));
            const paymentListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order list',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Order Export API
    /**
     * @api {Get} /api/vendor-order/order-list-export Vendor Order Export API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiSampleRequest /api/vendor-order/order-list-export
     * @apiErrorExample {json} OrderListExport error
     * HTTP/1.1 500 Internal Server Error
     */
    orderListExport(vendorOrderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                // 'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderStatus.name as orderStatusName',
                // 'orderStatus.colorCode as orderColorCode',
                // 'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as customerFirstName',
                'orderDetail.paymentStatus as paymentStatus',
                'VendorOrders.total as total',
                // 'VendorOrders.commission as commission',
                // 'orderDetail.isActive as isActive',
                'orderDetail.shippingCity as shippingCity',
                // 'orderProduct.orderProductPrefixId as orderProductPrefixId',
                // 'orderProduct.discountAmount as discountAmount',
                // 'orderProduct.orderProductPrefixId as orderProductPrefixId',
                // 'orderProduct.discountedAmount as discountedAmount',
                'order.orderPrefixId as orderPrefixId',
                // 'customer.firstName as firstName',
                // 'customer.lastName as lastName',
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'VendorOrders.order',
                    aliasName: 'order',
                },
            ];
            const whereConditions = [];
            if (vendorOrderId === null || vendorOrderId === void 0 ? void 0 : vendorOrderId.length) {
                whereConditions.push({
                    name: 'VendorOrders.vendorOrderId',
                    op: 'IN',
                    value: vendorOrderId,
                });
            }
            const groupBy = [];
            const searchConditions = [];
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.backOrders',
                op: 'and',
                value: 0,
            });
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Archive Order Archive Excel');
            // Excel sheet column define
            worksheet.columns = [
                { header: 'VendorOrderId', key: 'vendorOrderId', size: 16, width: 15 },
                { header: 'OrderId', key: 'orderPrefixId', size: 16, width: 15 },
                { header: 'orderDate', key: 'createdDate', size: 16, width: 15 },
                { header: 'CustomerName', key: 'customerFirstName', size: 16, width: 15 },
                { header: 'CustomerAddress', key: 'shippingCity', size: 16, width: 24 },
                { header: 'TotalAmount', key: 'total', size: 16, width: 15 },
                { header: 'OrderStatusName', key: 'orderStatusName', size: 16, width: 15 },
                // { header: 'NetAmount', key: 'NetAmount', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const rows = [];
            orderList.map((orders) => {
                var _a;
                rows.push([orders.vendorOrderId, orders.orderPrefixId, orders.createdDate, orders.customerFirstName, orders.shippingCity, ((_a = orders === null || orders === void 0 ? void 0 : orders.currencySymbolLeft) !== null && _a !== void 0 ? _a : orders.currencySymbolRight) + ' ' + orders.total, orders.orderStatusName]);
            });
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorOrderExcel_' + Date.now() + '.xlsx';
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
    // Bulk Archive Order Export API
    /**
     * @api {Get} /api/vendor-order/bulk-archive-order-export  Bulk Archive Order Export API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiSampleRequest /api/vendor-order/bulk-archive-order-export
     * @apiErrorExample {json} archiveOrderExportBulk error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderExportBulk(vendorId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Archive Order Archive Excel');
            // Excel sheet column define
            worksheet.columns = [
                { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
                { header: 'orderDate', key: 'orderDate', size: 16, width: 15 },
                { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
                { header: 'CustomerAddress', key: 'CustomerAdress', size: 16, width: 24 },
                { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
                { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
                { header: 'NetAmount', key: 'NetAmount', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const rows = [];
            const select = [
                'VendorOrderArchive.vendorOrderArchiveId as vendorOrderArchiveId',
                'VendorOrderArchive.orderId as orderId',
                'VendorOrderArchive.vendorId as vendorId',
                'VendorOrderArchive.subOrderId as subOrderId',
                'order.orderStatusId as orderStatusId',
                'order.createdDate as createdDate',
                'order.currencySymbolLeft as currencySymbolLeft',
                'order.currencySymbolRight as currencySymbolRight',
                'order.shippingFirstname as customerFirstName',
                'order.paymentStatus as paymentStatus',
                'VendorOrderArchive.total as total',
                'VendorOrderArchive.commission as commission',
                'order.isActive as isActive',
                'order.shippingCity as shippingCity',
                'order.shippingCountry as shippingCountry',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.couponDiscountAmount as couponDiscountAmount',
                'orderProduct.discountedAmount as discountedAmount'
            ];
            const relations = [
                {
                    tableName: 'VendorOrderArchive.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'VendorOrderArchive.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrderArchive.vendorId',
                op: 'and',
                value: vendorId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            const orderArchiveList = yield this.vendorOrderArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            for (const val of orderArchiveList) {
                const defCommission = (val.commission && val.commission > 0) ? val.commission : 0;
                let commission;
                let CommissionAmount;
                let netAmount;
                commission = val.total * (defCommission / 100);
                CommissionAmount = commission;
                netAmount = val.total - commission;
                if (val.currencySymbolLeft !== undefined) {
                    rows.push([val.subOrderId, val.createdDate, val.customerFirstName, val.shippingCity + ',' + val.shippingCountry, val.currencySymbolLeft + (parseFloat(val.total) + parseFloat(val.discountAmount)),
                        val.currencySymbolLeft + CommissionAmount, val.currencySymbolLeft + netAmount]);
                }
                else if (val.currencySymbolRight !== undefined) {
                    rows.push([val.subOrderId, val.createdDate, val.customerFirstName, val.shippingCity + ',' + val.shippingCountry, (parseFloat(val.total) + parseFloat(val.discountAmount)) + val.currencySymbolRight,
                        CommissionAmount + val.currencySymbolLeft, netAmount + val.currencySymbolLeft]);
                }
                else {
                    rows.push([val.subOrderId, val.createdDate, val.customerFirstName, val.shippingCity + ',' + val.shippingCountry, (parseFloat(val.total) + parseFloat(val.discountAmount)),
                        CommissionAmount, netAmount]);
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorOrderArchiveExcel_' + Date.now() + '.xlsx';
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
    // Archive Order Export API
    /**
     * @api {Get} /api/vendor-order/archive-order-export  Archive Order Export API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} vendorOrderArchiveId vendorOrderArchiveId
     * @apiSampleRequest /api/vendor-order/archive-order-export
     * @apiErrorExample {json} ArchiveOrderExport error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderExport(vendorOrderArchiveId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Order Archive Excel');
            // Excel sheet column define
            const splitOrderArchive = vendorOrderArchiveId.split(',');
            for (const record of splitOrderArchive) {
                const dataId = yield this.vendorOrderArchiveService.findOne({ where: { vendorOrderArchiveId: record, vendorId: request.user.vendorId } });
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid ArchiveId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            worksheet.columns = [
                { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
                { header: 'orderDate', key: 'orderDate', size: 16, width: 15 },
                { header: 'ArchiveDate', key: 'archiveDate', size: 16, width: 15 },
                { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
                { header: 'CustomerAddress', key: 'CustomerAdress', size: 16, width: 24 },
                { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
                { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
                { header: 'NetAmount', key: 'NetAmount', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const rows = [];
            for (const val of splitOrderArchive) {
                const orderArchive = yield this.vendorOrderArchiveService.findOne({ where: { vendorOrderArchiveId: val } });
                const order = yield this.orderService.findOrder({ where: { orderId: orderArchive.orderId } });
                const orderProduct = yield this.orderProductService.findOne({ where: { orderProductId: orderArchive.order_product_Id } });
                const defCommission = (orderArchive.commission && orderArchive.commission > 0) ? orderArchive.commission : 0;
                let commission;
                let CommissionAmount;
                let netAmount;
                commission = orderArchive.total * (defCommission / 100);
                CommissionAmount = commission;
                netAmount = orderArchive.total - commission;
                if (order.currencySymbolLeft !== undefined) {
                    rows.push([orderArchive.subOrderId, order.createdDate, orderArchive.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, order.currencySymbolLeft + (parseFloat(orderArchive.total) + parseFloat(orderProduct.discountAmount)),
                        order.currencySymbolLeft + CommissionAmount, order.currencySymbolLeft + netAmount]);
                }
                else if (order.currencySymbolRight !== undefined) {
                    rows.push([orderArchive.subOrderId, order.createdDate, orderArchive.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, (parseFloat(orderArchive.total) + parseFloat(orderProduct.discountAmount)) + order.currencySymbolRight,
                        CommissionAmount + order.currencySymbolLeft, netAmount + order.currencySymbolLeft]);
                }
                else {
                    rows.push([orderArchive.subOrderId, order.createdDate, orderArchive.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, (parseFloat(orderArchive.total) + parseFloat(orderProduct.discountAmount)),
                        CommissionAmount, netAmount]);
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorOrderArchiveExcel_' + Date.now() + '.xlsx';
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
    // Cancel Order List API
    /**
     * @api {get} /api/vendor-order/cancel-order-list  Cancel Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete cancel order list.",
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
     * @apiSampleRequest /api/vendor-order/cancel-order-list
     * @apiErrorExample {json} cancelorderListtt error
     * HTTP/1.1 500 Internal Server Error
     */
    cancelorderListtt(limit, offset, keyword, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as customerFirstName',
                'orderDetail.paymentStatus as paymentStatus',
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'orderDetail.isActive as isActive',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry',
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.name as name',
                'orderProduct.cancelRequest as cancelRequest',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderProduct.cancelReason as cancelReason',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.couponDiscountAmount as couponDiscountAmount',
                'orderProduct.discountedAmount as discountedAmount',
                'orderProduct.cancelReasonDescription as cancelReasonDescription'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderProduct.cancelRequest',
                op: 'and',
                value: 1,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['shipping_firstname', 'orderProduct.orderProductPrefixId'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderListCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successRes = {
                    status: 1,
                    message: 'Successfully got the cancel request count',
                    data: orderListCount,
                };
                return response.status(200).send(successRes);
            }
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                let commission;
                commission = value.total * (defCommission / 100);
                temp.NetAmount = value.total - commission;
                temp.CommissionAmount = commission;
                return temp;
            }));
            const paymentListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete cancel order list',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Vendor Order Cancel Request Status API
    /**
     * @api {Put} /api/vendor-order/update-vendor-order-cancel-request/:orderProductId Update Vendor Order Cancel Request Status API
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
     * @apiSampleRequest /api/vendor-order/update-vendor-order-cancel-request/:orderProductId
     * @apiErrorExample {json} UpdateVendorOrderCancelStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorOrderCancelStatus(orderProductId, cancelStatusId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    orderProductId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderProductId for seller',
                };
                return response.status(400).send(errorResponse);
            }
            orderProduct.cancelRequestStatus = cancelStatusId;
            const orderProductStatusUpdate = yield this.orderProductService.update(orderProduct.orderProductId, orderProduct);
            const order = yield this.orderService.findOrder({ where: { orderId: orderProduct.orderId } });
            const emailContent = yield this.emailTemplateService.findOne(20);
            const logo = yield this.settingService.findOne();
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
            const redirectUrl = env_1.env.vendorRedirectUrl;
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            mail_services_1.MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
            if (orderProductStatusUpdate !== undefined) {
                const successResponse = {
                    status: 1,
                    message: res,
                    data: orderProductStatusUpdate,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to update Order Cancel Status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // update Bulk Order Cancel Request Status API
    /**
     * @api {Get} /api/vendor-order/update-bulk-vendor-order-cancel-request Update bulk Vendor Order Cancel Request Status API
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
     *      "message": "Successfully updated the order cancel status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-bulk-vendor-order-cancel-request
     * @apiErrorExample {json} UpdateBulkVendorOrderCancelStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    updateBulkVendorOrderCancelStatus(orderProductId, cancelStatusId, request, response) {
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
                    message: 'Invalid orderProductId',
                };
                return response.status(400).send(errorResponse);
            }
            for (const orderProduct of orderProducts) {
                const vendorOrder = yield this.vendorOrdersService.findOne({
                    where: {
                        orderProductId: orderProduct, vendorId: request.user.vendorId,
                    },
                });
                if (!vendorOrder) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid orderProductId for seller',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
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
                }
                else if (orderProductStatusUpdate.cancelRequestStatus === 2) {
                    status = 'rejected';
                }
                else if (orderProductStatusUpdate.cancelRequestStatus === 0) {
                    status = 'pending';
                }
                const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{productname}', orderProdt.name).replace('{status}', status);
                const redirectUrl = env_1.env.vendorRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                mail_services_1.MAILService.sendMail(mailContents, order.email, emailContent.subject, false, false, '');
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated the order cancel status',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Export bulk order cancel request
    /**
     * @api {Get} /api/vendor-order/vendor-order-cancel-excel-list Vendor Order Cancel Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderProductId orderProductId
     * @apiSampleRequest /api/vendor-order/vendor-order-cancel-excel-list
     * @apiErrorExample {json} Vendor Order Cancel Excel List error
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
                        message: 'Invalid orderProductId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Sub Order Id', key: 'subOrderId', size: 16, width: 15 },
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
            for (const id of orderid) {
                const vendorOrder = yield this.vendorOrdersService.findOne({
                    where: {
                        orderProductId: id, vendorId: request.user.vendorId,
                    },
                });
                if (vendorOrder) {
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
                        rows.push([vendorOrder.subOrderId, dataId.shippingFirstname, dataId.email, data.name, data.productPrice, data.quantity, data.total, data.cancelReason, status]);
                    }
                    else {
                        if (left !== undefined) {
                            rows.push([vendorOrder.subOrderId, dataId.shippingFirstname, dataId.email, data.name, data.productPrice, data.quantity, left + data.total, data.cancelReason, status]);
                        }
                        else {
                            rows.push([vendorOrder.subOrderId, dataId.shippingFirstname, dataId.email, data.name, data.productPrice, data.quantity, data.total + right, data.cancelReason, status]);
                        }
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
    // Export bulk Vendor order cancel request api
    /**
     * @api {Get} /api/vendor-order/bulk-vendor-order-cancel-excel-list Bulk Order Cancel Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSampleRequest /api/vendor-order/bulk-vendor-order-cancel-excel-list
     * @apiErrorExample {json} BulkExportVendorOrderCancelRequest List error
     * HTTP/1.1 500 Internal Server Error
     */
    bulkExportVendorOrderCancelRequest(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Order Detail Sheet');
            const rows = [];
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.email as email',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as customerFirstName',
                'orderDetail.paymentStatus as paymentStatus',
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'orderDetail.isActive as isActive',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry',
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.cancelRequest as cancelRequest',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderProduct.cancelReason as cancelReason',
                'orderProduct.name as name',
                'orderProduct.productPrice as productPrice',
                'orderProduct.quantity as quantity',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.couponDiscountAmount as couponDiscountAmount',
                'orderProduct.cancelReasonDescription as cancelReasonDescription'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderProduct.cancelRequest',
                op: 'and',
                value: 1,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            // Excel sheet column define
            if (orderList.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'file is empty',
                };
                return response.status(400).send(errorResponse);
            }
            worksheet.columns = [
                { header: 'sub Order Id', key: 'subOrderId', size: 16, width: 15 },
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
            for (const id of orderList) {
                let status;
                if (id.cancelRequestStatus === 1) {
                    status = 'approved';
                }
                else if (id.cancelRequestStatus === 2) {
                    status = 'rejected';
                }
                else if (id.cancelRequestStatus === 0) {
                    status = 'pending';
                }
                const right = id.currencySymbolRight;
                const left = id.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([id.subOrderId, id.customerFirstName, id.email, id.name, id.productPrice, id.quantity, id.total, id.cancelReason, status]);
                }
                else {
                    if (left !== undefined) {
                        rows.push([id.subOrderId, id.customerFirstName, id.email, id.name, id.productPrice, id.quantity, left + id.total, id.cancelReason, status]);
                    }
                    else {
                        rows.push([id.subOrderId, id.customerFirstName, id.email, id.name, id.productPrice, id.quantity, (id.total) + right, id.cancelReason, status]);
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
    // invoice list API
    /**
     * @api {Get} /api/vendor-order/vendor-invoice-list Vendor Invoice List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {String} firstName firstName
     * @apiParam (Request body) {String} lastName lastName
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor invoice list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-invoice-list
     * @apiErrorExample {json} vendor invoice error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorInvoiceList(limit, offset, keyword, startDate, endDate, count, firstName, lastName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorInvoice.vendorInvoiceId as vendorInvoiceId',
                'VendorInvoice.invoiceNo as invoiceNo',
                'VendorInvoice.invoicePrefix as invoicePrefix',
                'VendorInvoice.shippingFirstname as shippingFirstname',
                'VendorInvoice.shippingLastname as shippingLastname',
                'VendorInvoice.orderId as orderId',
                'VendorInvoice.vendorId as vendorId',
                'VendorInvoice.createdDate as createdDate',
                'VendorInvoice.email as email',
                'VendorInvoice.total as total',
                'orderDetail.orderPrefixId as orderPrefixId',
            ];
            const relations = [{
                    tableName: 'VendorInvoice.orderDetail',
                    aliasName: 'orderDetail',
                }];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorInvoice.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.createdDate',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.createdDate',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['VendorInvoice.shippingFirstname', 'VendorInvoice.shippingLastname', 'VendorInvoice.invoiceNo'],
                    value: keyword.toLowerCase(),
                });
            }
            if (firstName && firstName !== '') {
                searchConditions.push({
                    name: ['VendorInvoice.shippingFirstname'],
                    value: firstName,
                });
            }
            if (lastName && lastName !== '') {
                searchConditions.push({
                    name: ['VendorInvoice.shippingLastname'],
                    value: lastName,
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorInvoice.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderListCount = yield this.vendorInvoiceService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successRes = {
                    status: 1,
                    message: 'Successfully got the cancel request count',
                    data: orderListCount,
                };
                return response.status(200).send(successRes);
            }
            const invoiceList = yield this.vendorInvoiceService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const invoiceResponse = invoiceList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const vendorOrder = yield this.vendorInvoiceItemService.findAll({
                    where: {
                        vendorInvoiceId: value.vendorInvoiceId,
                    },
                });
                temp.products = vendorOrder.length;
                return temp;
            }));
            const vendorInvoiceList = yield Promise.all(invoiceResponse);
            if (invoiceList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the vendor invoice list',
                    data: vendorInvoiceList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //  Order invoice export PDF API
    /**
     * @api {Get} /api/vendor-order/order-invoice-export-pdf  Order Invoice Export PDF API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId orderId
     * @apiSampleRequest /api/vendor-order/order-invoice-export-pdf
     * @apiErrorExample {json} OrderInvoiceExportPdf error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderInvoiceExportPdf(orderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorInvoiceService.findOne({
                where: { orderId, vendorId: request.user.vendorId }, select: ['vendorInvoiceId', 'orderId', 'vendorId', 'invoiceNo', 'invoicePrefix', 'shippingFirstname', 'shippingLastname', 'total', 'createdDate'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invoice not found for this order',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'customerId', 'companyName', 'companyLogo', 'companyLogoPath', 'companyMobileNumber', 'companyEmailId', 'companyWebsite', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId', 'pincode', 'companyTaxNumber', 'companyPanNumber', 'paymentInformation', 'commission'],
                where: { vendorId: request.user.vendorId },
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                select: ['paymentFirstname', 'email', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo', 'telephone',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1', 'shippingAddress2', 'shippingCity',
                    'shippingPostcode', 'shippingCountry', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'currencyCode', 'paymentMethod', 'orderPrefixId'],
            });
            let amount = parseFloat('0.00');
            orderData.productList = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: orderData.vendorInvoiceId }, select: ['vendorInvoiceItemId', 'vendorInvoiceId', 'orderProductId'] }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const orderProduct = yield this.orderProductService.findOne({ where: { orderProductId: value.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'skuName'] });
                    const product = yield this.productService.findOne({ select: ['sku', 'hsn'], where: { productId: orderProduct.productId } });
                    const temp = orderProduct;
                    if (orderProduct.taxType === 2) {
                        const price = orderProduct.discountAmount === '0.00' || orderProduct.discountAmount === null ? +orderProduct.basePrice : +orderProduct.discountedAmount;
                        temp.taxValueInAmount = (price * (+orderProduct.taxValue / 100)).toFixed(2);
                    }
                    else {
                        temp.taxValueInAmount = orderProduct.taxValue;
                    }
                    temp.sku = product.sku;
                    temp.hsn = product.hsn;
                    const amt = orderProduct.total;
                    amount += parseFloat(amt);
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const settings = yield this.settingService.findOne();
            const country = yield this.countryService.findOne({ select: ['name'], where: { countryId: vendor.companyCountryId } });
            vendor.countryName = country ? country.name : '';
            orderData.vendor = vendor;
            const settingDetails = settings;
            orderData.symbolLeft = order.currencySymbolLeft;
            orderData.symbolRight = order.currencySymbolRight;
            orderData.currencyCode = order.currencyCode;
            orderData.orderPrefixId = order.orderPrefixId;
            orderData.paymentFirstname = order.paymentFirstname;
            orderData.paymentLastname = order.paymentLastname;
            orderData.paymentAddress1 = order.paymentAddress1;
            orderData.paymentAddress2 = order.paymentAddress2;
            orderData.paymentCity = order.paymentCity;
            orderData.paymentPostcode = order.paymentPostcode;
            orderData.paymentZone = order.paymentZone;
            orderData.paymentCountry = order.paymentCountry;
            orderData.shippingFirstname = order.shippingFirstname;
            orderData.shippingLastname = order.shippingLastname;
            orderData.shippingAddress1 = order.shippingAddress1;
            orderData.shippingAddress2 = order.shippingAddress2;
            orderData.shippingCity = order.shippingCity;
            orderData.shippingPostcode = order.shippingPostcode;
            orderData.shippingZone = order.shippingZone;
            orderData.shippingCountry = order.shippingCountry;
            orderData.customerGstNo = order.customerGstNo;
            orderData.telephone = order.telephone;
            let toWords;
            if (order.currencyCode === 'INR') {
                toWords = new to_words_1.ToWords({ localeCode: 'en-IN' });
            }
            else {
                toWords = new to_words_1.ToWords({ localeCode: 'en-US' });
            }
            const words = toWords.convert(amount, { currency: true });
            orderData.currencyInWords = words;
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '150', '150');
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.invoiceLogoPath + settingDetails.invoiceLogo, '150', '30');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('vendor-invoice', orderData);
            const pathName = `./ Invoice_${orderData.invoicePrefix + orderData.invoiceNo}.pdf`;
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
    // Vendor Report List API
    /**
     * @api {Get} /api/vendor-order/sales-report-list  Sales Report list API
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
     *      "status": "1"
     *      "message": "Successfully got vendor sales list.",
     *     "data": [{
     *       "productName": "Sneakers",
     *       "buyers": [
     *           {
     *               "vendorOrderId": 363,
     *               "orderId": 361,
     *               "companyState": "",
     *               "vendorId": 10,
     *               "orderProductPrefixId": "INV-202407113611",
     *               "quantity": 1,
     *               "name": "Sneakers",
     *               "price": "825.00",
     *               "basePrice": "800.00",
     *               "skuName": "Sneakers123",
     *               "taxType": 1,
     *               "taxValue": 25,
     *               "total": "825.00",
     *               "subOrderId": "INV-20240711361101",
     *               "commission": 10,
     *               "createdDate": "2024-07-24T08:19:08.000Z",
     *               "currencySymbolLeft": "$",
     *               "currencySymbolRight": "",
     *               "cancelRequestStatus": 0,
     *               "paymentZone": "",
     *               "productName": "Sneakers",
     *               "orderStatusName": "Order Placed",
     *               "orderColorCode": "#6798e3",
     *               "invoiceNo": "INV00186",
     *               "invoicePrefix": "INV",
     *               "firstName": "Anangan",
     *               "lastName": "R",
     *               "discountAmount": "0.00",
     *               "couponDiscountAmount": null,
     *               "customerGroup": null,
     *               "paymentType": "CashOnDelivery",
     *               "ipAddress": "2405:201:e061:e03c:58f3:e0f4:e66b:979e"
     *           }
     *       ]
     *   }],
     * "total": 825,
     * "orderCount": 1
     * }
     * @apiSampleRequest /api/vendor-order/sales-report-list
     * @apiErrorExample {json} VendorSalesReportList error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorSalesReportList(limit, offset, startDate, endDate, productId, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                value: request.user.vendorId,
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
                const vendorOrderCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, true, true);
                const countResponse = {
                    status: 1,
                    message: 'Successfully got seller sales count',
                    data: vendorOrderCount,
                };
                return response.status(200).send(countResponse);
            }
            const vendorOrderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
            const result = [];
            let total = 0;
            const groupByKey = key => array => array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
            const groupByType = groupByKey('productName');
            const groupByPeriodTypeArray = groupByType(vendorOrderList);
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
            const orderCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, true, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got seller sales list',
                data: result, total, orderCount,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Total sales report Download
    /**
     * @api {Get} /api/vendor-order/sales-report-export-list Sales report excel download
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} productId
     * @apiSampleRequest /api/vendor-order/sales-report-export-list
     * @apiErrorExample {json} Total sales report excel error
     * HTTP/1.1 500 Internal Server Error
     */
    totalSalesExcelView(limit, offset, productId, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const whereConditions = [];
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
                value: request.user.vendorId,
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
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
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
                    rows.push(['Order Line number', 'Customer Name', 'order date', 'invoice', 'sku', 'Quantity', 'Base Value', 'Discount Amount', 'Coupon Discount Amount', 'TotalValue', 'orderStatus', 'Customer Group Name']);
                    for (const value of buyers) {
                        rows.push([value.orderProductPrefixId, value.firstName + (value.lastName ? value.lastName : ''), value.createdDate, value.invoicePrefix + value.invoiceNo, value.skuName, +value.quantity, +value.basePrice, +value.discountAmount, +value.couponDiscountAmount, +value.total, value.orderStatusName, value.groupName]);
                    }
                });
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
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
    //  Order invoice export send email PDF API
    /**
     * @api {post} /api/vendor-order/order-invoice-export-send-email-pdf  Order Invoice Export Send Email API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId orderId
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
     * @apiSampleRequest /api/vendor-order/order-invoice-export-send-email-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderInvoiceExportSendEmailPdf(orderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorInvoiceService.findOne({
                where: { orderId, vendorId: request.user.vendorId }, select: ['vendorInvoiceId', 'orderId', 'vendorId', 'invoiceNo', 'invoicePrefix', 'shippingFirstname', 'shippingLastname', 'total', 'createdDate'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invoice not found for this order',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'customerId', 'companyName', 'companyLogo', 'companyLogoPath', 'companyMobileNumber', 'companyEmailId', 'companyWebsite', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId', 'pincode', 'companyTaxNumber', 'companyPanNumber', 'paymentInformation', 'commission'],
                where: { vendorId: request.user.vendorId },
            });
            const customer = yield this.customerService.findOne({
                select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'username'],
                where: { id: vendor.customerId },
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                select: ['paymentFirstname', 'email', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo', 'telephone',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1', 'shippingAddress2', 'shippingCity',
                    'shippingPostcode', 'shippingCountry', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'currencyCode', 'paymentMethod', 'orderPrefixId'],
            });
            let amount = parseFloat('0.00');
            orderData.productList = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: orderData.vendorInvoiceId }, select: ['vendorInvoiceItemId', 'vendorInvoiceId', 'orderProductId'] }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const orderProduct = yield this.orderProductService.findOne({ where: { orderProductId: value.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'skuName'] });
                    const product = yield this.productService.findOne({ select: ['sku', 'hsn'], where: { productId: orderProduct.productId } });
                    const temp = orderProduct;
                    if (orderProduct.taxType === 2) {
                        const price = orderProduct.discountAmount === '0.00' || orderProduct.discountAmount === null ? +orderProduct.basePrice : +orderProduct.discountedAmount;
                        temp.taxValueInAmount = (price * (+orderProduct.taxValue / 100)).toFixed(2);
                    }
                    else {
                        temp.taxValueInAmount = orderProduct.taxValue;
                    }
                    if (orderProduct.taxType !== 0 && (vendor.companyState) && vendor.paymentZone !== null) {
                        if (vendor.companyState.toLowerCase() === order.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'SGST,CGST';
                        }
                        else if (vendor.companyState.toLowerCase() !== order.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        temp.taxTypeValue = 0;
                    }
                    temp.sku = product.sku;
                    temp.hsn = product.hsn;
                    const amt = orderProduct.total;
                    amount += parseFloat(amt);
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const settings = yield this.settingService.findOne();
            const country = yield this.countryService.findOne({ select: ['name'], where: { countryId: vendor.companyCountryId } });
            vendor.countryName = country ? country.name : '';
            orderData.vendor = vendor;
            const settingDetails = settings;
            orderData.symbolLeft = order.currencySymbolLeft;
            orderData.symbolRight = order.currencySymbolRight;
            orderData.currencyCode = order.currencyCode;
            orderData.orderPrefixId = order.orderPrefixId;
            orderData.paymentFirstname = order.paymentFirstname;
            orderData.paymentLastname = order.paymentLastname;
            orderData.paymentAddress1 = order.paymentAddress1;
            orderData.paymentAddress2 = order.paymentAddress2;
            orderData.paymentCity = order.paymentCity;
            orderData.paymentPostcode = order.paymentPostcode;
            orderData.paymentZone = order.paymentZone;
            orderData.paymentCountry = order.paymentCountry;
            orderData.shippingFirstname = order.shippingFirstname;
            orderData.shippingLastname = order.shippingLastname;
            orderData.shippingAddress1 = order.shippingAddress1;
            orderData.shippingAddress2 = order.shippingAddress2;
            orderData.shippingCity = order.shippingCity;
            orderData.shippingPostcode = order.shippingPostcode;
            orderData.shippingZone = order.shippingZone;
            orderData.shippingCountry = order.shippingCountry;
            orderData.customerGstNo = order.customerGstNo;
            orderData.telephone = order.telephone;
            orderData.email = order.email;
            const toWords = new to_words_1.ToWords();
            const words = toWords.convert(amount, { currency: true });
            orderData.currencyInWords = words;
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '100', '100');
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.invoiceLogoPath + settingDetails.invoiceLogo, '100', '100');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('vendor-invoice', orderData);
            const pathPrefix = Math.floor((Math.random() * 100) + 1);
            const fileName = `output_${pathPrefix}.pdf`;
            const path = `${process.cwd()} / ${fileName}`;
            yield this.pdfService.htmlPdf(htmlData, path);
            const attachments = [{
                    name: fileName,
                    path,
                }];
            const pdfBinary = fs.readFileSync(fileName);
            console.log(pdfBinary, 'fileNamefileName');
            const emailContent = yield this.emailTemplateService.findOne(24);
            const redirectUrl = env_1.env.vendorRedirectUrl;
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{orderPrefixId}', orderData.orderPrefixId);
            const logo = yield this.settingService.findOne();
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.orderData = orderData;
            mailContents.productDetailData = '';
            console.log(customer.email, 'customer.emailcustomer.email');
            yield mail_services_1.MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, true, attachments);
            yield fs.unlinkSync(path);
            return response.status(200).send({
                status: 1,
                message: 'Mail sent to you',
            });
        });
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
    backOrderProductList(limit, offset, customerName, orderId, amount, dateAdded, keyword, orderStatus, skuName, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                // {
                //     tableName: 'Order.customer',
                //     aliasName: 'customer',
                // }
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
                value: request.user.vendorId,
                // value: 9,
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
            sort.push({
                name: 'Order.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderCount = yield this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Successfully get Count',
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
                temp.orderStatusName = passingOrderStatus.name;
                temp.orderStatusColorCode = passingOrderStatus.colorCode;
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
    // vendor failed order list API
    /**
     * @api {get} /api/vendor-order/vendor-failed-order-list Vendor Failed Order List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor invoice list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-failed-order-list
     * @apiErrorExample {json} vendor invoice error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorFailedOrderList(limit, offset, keyword, startDate, endDate, customerName, orderId, amount, orderStatus, dateAdded, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorInvoice.vendorInvoiceId as vendorInvoiceId',
                'VendorInvoice.invoiceNo as invoiceNo',
                'VendorInvoice.invoicePrefix as invoicePrefix',
                'VendorInvoice.shippingFirstname as shippingFirstname',
                'VendorInvoice.shippingLastname as shippingLastname',
                'VendorInvoice.orderId as orderId',
                'VendorInvoice.vendorId as vendorId',
                'VendorInvoice.createdDate as createdDate',
                'VendorInvoice.email as email',
                'VendorInvoice.total as total',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.orderId as orderId',
            ];
            const relations = [{
                    tableName: 'VendorInvoice.orderDetail',
                    aliasName: 'orderDetail',
                }];
            const groupBy = [];
            const whereConditions = [];
            if (amount && amount !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.total',
                    op: 'raw',
                    sign: '=',
                    value: +amount,
                });
            }
            whereConditions.push({
                name: 'VendorInvoice.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 0,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.createdDate',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.createdDate',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['VendorInvoice.shippingFirstname', 'VendorInvoice.shippingLastname'],
                    value: customerName.toLowerCase(),
                });
            }
            if (dateAdded) {
                searchConditions.push({
                    name: ['VendorInvoice.createdDate'],
                    value: dateAdded,
                });
            }
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['VendorInvoice.shippingFirstname', 'VendorInvoice.shippingLastname', 'VendorInvoice.invoiceNo', 'orderDetail.orderPrefixId', 'VendorInvoice.total'],
                    value: keyword.toLowerCase(),
                });
            }
            if (orderId && orderId !== '') {
                searchConditions.push({
                    name: ['orderDetail.orderPrefixId'],
                    value: orderId.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorInvoice.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderListCount = yield this.vendorInvoiceService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successRes = {
                    status: 1,
                    message: 'Successfully got the cancel request count',
                    data: orderListCount,
                };
                return response.status(200).send(successRes);
            }
            const failedOrderList = yield this.vendorInvoiceService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const failedOrderResponse = failedOrderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                temp.productItems = yield this.vendorInvoiceItemService.findAll({
                    where: { vendorInvoiceId: value.vendorInvoiceId },
                }).then((val) => {
                    const orderProduct = val.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const products = yield this.orderProductService.findOne({ orderProductId: values.orderProductId });
                        const tempVal = values;
                        if (products !== undefined) {
                            tempVal.productName = products.name;
                            tempVal.basePrice = products.basePrice;
                            tempVal.productPrice = products.productPrice;
                            tempVal.discountAmount = products.discountAmount;
                            tempVal.discountedAmount = products.discountedAmount;
                            tempVal.taxType = products.taxType;
                            tempVal.taxValue = products.taxValue;
                            tempVal.quantity = products.quantity;
                            tempVal.skuName = products.skuName;
                            tempVal.total = products.total;
                            tempVal.productId = products.productId;
                            const productImage = yield this.productImageService.findOne({
                                where: { productId: products.productId, defaultImage: 1 },
                                select: ['image', 'containerName'],
                            });
                            if (productImage !== undefined) {
                                tempVal.image = productImage.image;
                                tempVal.containerName = productImage.containerName;
                            }
                            else {
                                tempVal.image = '';
                                tempVal.containerName = '';
                            }
                        }
                        return tempVal;
                    }));
                    const results = Promise.all(orderProduct);
                    return results;
                });
                return temp;
            }));
            const vendorFailedOrderList = yield Promise.all(failedOrderResponse);
            if (failedOrderList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the vendor failed Order list',
                    data: vendorFailedOrderList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get list',
                };
                return response.status(400).send(errorResponse);
            }
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
    bulkExportBackorder(limit, offset, keyword, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                }
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'Order.backOrders',
                op: 'and',
                value: 1,
            }, {
                name: 'vendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
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
            const orderList = yield this.orderService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (orderList.length === 0) {
                const errorResponse = {
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
                }
                else {
                    if (left !== undefined) {
                        rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, left + order.total]);
                    }
                    else {
                        rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, order.total + right]);
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './BulkBackOrderExcel_' + Date.now() + '.xlsx';
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
    backOrderExport(orderProductId, request, response) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                }
            ];
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
                value: request.user.vendorId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'Order.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.orderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (orderList.length === 0) {
                const errorResponse = {
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
                    rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, ((_a = order === null || order === void 0 ? void 0 : order.currencySymbolLeft) !== null && _a !== void 0 ? _a : order === null || order === void 0 ? void 0 : order.currencySymbolRight) + ' ' + order.total]);
                }
                else {
                    if (left !== undefined) {
                        rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, left + order.total]);
                    }
                    else {
                        rows.push([order.orderPrefixId, order.orderProductPrefixId, order.customerFirstName, order.email, order.name, order.productPrice, order.quantity, order.total + right]);
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './BackOrderExcel_' + Date.now() + '.xlsx';
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
    // Export Failed Order list api
    /**
     * @api {Get} /api/vendor-order/failed-order-excel-list Failed order Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderId
     * @apiSampleRequest /api/vendor-order/failed-order-excel-list
     * @apiErrorExample {json} Failed Order Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    failedOrderExportExcel(orderId, request, response) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Failed Order Export excel Sheet', { properties: { defaultColWidth: 30 } });
            const rows = [];
            const select = [
                'VendorInvoice.vendorInvoiceId as vendorInvoiceId',
                'VendorInvoice.invoiceNo as invoiceNo',
                'VendorInvoice.invoicePrefix as invoicePrefix',
                'VendorInvoice.shippingFirstname as shippingFirstname',
                'VendorInvoice.shippingLastname as shippingLastname',
                'VendorInvoice.orderId as orderId',
                'VendorInvoice.vendorId as vendorId',
                'VendorInvoice.createdDate as createdDate',
                'VendorInvoice.email as email',
                'VendorInvoice.total as total',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.orderId as orderId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.orderId as orderId',
            ];
            const relations = [{
                    tableName: 'VendorInvoice.orderDetail',
                    aliasName: 'orderDetail',
                }];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorInvoice.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 0,
            });
            if (orderId && orderId !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.orderId',
                    op: 'IN',
                    value: orderId,
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorInvoice.createdDate',
                order: 'DESC',
            });
            const failedOrderList = yield this.vendorInvoiceService.listByQueryBuilder(0, 0, select, whereConditions, [], relations, groupBy, sort, false, true);
            // Excel sheet column define
            rows.push(['OrderId', 'Customer Name', 'Total', 'Order Created']);
            for (const order of failedOrderList) {
                const right = order.currencySymbolRight;
                const left = order.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([order.orderPrefixId, order.shippingFirstname + '' + (order.shippingLastname ? order.shippingLastname : ''), order.total, order.createdDate]);
                }
                else {
                    if (left !== undefined) {
                        rows.push([order.orderPrefixId, order.shippingFirstname + '' + (order.shippingLastname ? order.shippingLastname : ''), left + order.total, order.createdDate]);
                    }
                    else {
                        rows.push([order.orderPrefixId, order.shippingFirstname + '' + (order.shippingLastname ? order.shippingLastname : ''), order.total + right, order.createdDate]);
                    }
                }
                rows.push(['OrderProductId', 'OrderId', 'Product Name', 'Quantity', 'ProductPrice', 'Discount Amount', 'Coupon Discount Amount', 'Total']);
                const productItems = yield this.vendorInvoiceItemService.findAll({
                    where: { vendorInvoiceId: order.vendorInvoiceId },
                });
                if (productItems.length > 0) {
                    for (const items of productItems) {
                        const products = yield this.orderProductService.findOne({ orderProductId: items.orderProductId });
                        if (products) {
                            rows.push([products.orderProductPrefixId, order.orderPrefixId, products.name, products.quantity, ((_a = order === null || order === void 0 ? void 0 : order.currencySymbolLeft) !== null && _a !== void 0 ? _a : order === null || order === void 0 ? void 0 : order.currencySymbolRight) + ' ' + products.productPrice, ((_b = order === null || order === void 0 ? void 0 : order.currencySymbolLeft) !== null && _b !== void 0 ? _b : order === null || order === void 0 ? void 0 : order.currencySymbolRight) + ' ' + products.discountAmount, (_d = ((_c = order === null || order === void 0 ? void 0 : order.currencySymbolLeft) !== null && _c !== void 0 ? _c : order === null || order === void 0 ? void 0 : order.currencySymbolRight) + ' ' + products.couponDiscountAmount) !== null && _d !== void 0 ? _d : 0.00, ((_e = order === null || order === void 0 ? void 0 : order.currencySymbolLeft) !== null && _e !== void 0 ? _e : order === null || order === void 0 ? void 0 : order.currencySymbolRight) + ' ' + products.total]);
                        }
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            worksheet.eachRow({ includeEmpty: true }, ((row, rowNumber) => {
                if (row.values.includes('OrderId') || row.values.includes('OrderProductId')) {
                    worksheet.getRow(rowNumber).font = { bold: true };
                }
            }));
            const fileName = './FailedOrderExcel_' + Date.now() + '.xlsx';
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
    // Export Failed Order list api
    /**
     * @api {get} /api/vendor-order/bulk-failed-order-excel-list Bulk failed order Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download Failed Order Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/bulk-failed-order-excel-list
     * @apiErrorExample {json} Failed Order Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    BulkfailedOrderExportExcel(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Failed Order Export excel Sheet', { properties: { defaultColWidth: 30 } });
            const rows = [];
            const select = [
                'VendorInvoice.vendorInvoiceId as vendorInvoiceId',
                'VendorInvoice.invoiceNo as invoiceNo',
                'VendorInvoice.invoicePrefix as invoicePrefix',
                'VendorInvoice.shippingFirstname as shippingFirstname',
                'VendorInvoice.shippingLastname as shippingLastname',
                'VendorInvoice.orderId as orderId',
                'VendorInvoice.vendorId as vendorId',
                'VendorInvoice.createdDate as createdDate',
                'VendorInvoice.email as email',
                'VendorInvoice.total as total',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.orderId as orderId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.orderId as orderId',
            ];
            const relations = [{
                    tableName: 'VendorInvoice.orderDetail',
                    aliasName: 'orderDetail',
                }];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorInvoice.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 0,
            });
            const sort = [];
            sort.push({
                name: 'VendorInvoice.createdDate',
                order: 'DESC',
            });
            const failedOrderList = yield this.vendorInvoiceService.listByQueryBuilder(0, 0, select, whereConditions, [], relations, groupBy, sort, false, true);
            // Excel sheet column define
            rows.push(['OrderId', 'Customer Name', 'Total', 'Order Created']);
            for (const order of failedOrderList) {
                const right = order.currencySymbolRight;
                const left = order.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([order.orderPrefixId, order.shippingFirstname + '' + (order.shippingLastname ? order.shippingLastname : ''), order.total, order.createdDate]);
                }
                else {
                    if (left !== undefined) {
                        rows.push([order.orderPrefixId, order.shippingFirstname + '' + (order.shippingLastname ? order.shippingLastname : ''), left + order.total, order.createdDate]);
                    }
                    else {
                        rows.push([order.orderPrefixId, order.shippingFirstname + '' + (order.shippingLastname ? order.shippingLastname : ''), order.total + right, order.createdDate]);
                    }
                }
                rows.push(['OrderPrefixId', 'OrderId', 'Product Name', 'Quantity', 'ProductPrice', 'Discount Amount', 'Coupon Discount Amount', 'Total']);
                const productItems = yield this.vendorInvoiceItemService.findAll({
                    where: { vendorInvoiceId: order.vendorInvoiceId },
                });
                if (productItems.length > 0) {
                    for (const items of productItems) {
                        const products = yield this.orderProductService.findOne({ orderProductId: items.orderProductId });
                        if (products) {
                            rows.push([products.orderProductPrefixId, order.orderPrefixId, products.name, products.quantity, products.productPrice, products.discountAmount, products.couponDiscountAmount, products.total]);
                        }
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            worksheet.eachRow({ includeEmpty: true }, ((row, rowNumber) => {
                if (row.values.includes('OrderId') || row.values.includes('OrderPrefixId')) {
                    worksheet.getRow(rowNumber).font = { bold: true };
                }
            }));
            const fileName = './BulkFailedOrderExcel_' + Date.now() + '.xlsx';
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
    orderStatusListBasedOnParent(limit, offset, parentId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fullfillmentStatusIds = (yield this.orderStatusToFullfillmentService.findAll({ where: { orderStatusId: parentId !== null && parentId !== void 0 ? parentId : 0 } })).map((orderStatusToFullfillment) => orderStatusToFullfillment.orderFulfillmentStatusId);
            const WhereConditions = [];
            WhereConditions.push({
                name: 'id',
                value: (0, typeorm_1.In)(fullfillmentStatusIds),
            }, {
                name: 'isActive',
                value: 1,
            });
            const orderStatusList = yield this.orderFullfillmentStatusService.list(limit, offset, [], [], WhereConditions, false);
            if (orderStatusList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got order status list based on parent',
                    data: orderStatusList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get order status list based on parent',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Purchased Customer List
    /**
     * @api {Get} /api/vendor-order/purchased-customer-list Purchased Customer List
     * @apiGroup Vendor Order
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} email search by email
     * @apiparam (request body) {String} mobileNumber search by mobileNumber
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 ok
     * {
     *      "status": "1",
     *      "message": "Successfully Got Vendor Order List..!",
     *      "data": {},
     * }
     * @apiSampleRequest api/vendor-order/purchased-customer-list
     * @apiErrorExample {json} error
     * HTTP/1.1 500 internal server error
     */
    purchasedCustomers(offset, limit, count, customerName, customerGroupName, email, mobileNumber, status, keyword, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'MAX(order.customerId) as customerId',
                `MAX(order.email) as email`,
                `MAX(order.shippingFirstname) as firstName`,
                `MAX(order.shippingLastname) as lastName`,
                `MAX(order.telephone) as mobileNumber`,
                `orderCustomer.customerGroupId as customerGroupId`,
                `MAX(order.shippingAddress1) as shippingAddress1`,
                `MAX(order.shippingAddress2) as shippingAddress2`,
                `MAX(order.shippingCity) as shippingCity`,
                `MAX(order.shippingZone) as shippingZone`,
                'MAX(order.createdDate) as orderCreatedDate',
                `SUM(order.total) as purched`,
                `orderCustomer.isActive as isActive`,
                `orderCustomer.avatar as imageName`,
                `orderCustomer.avatarPath as containerName`,
                `customerGroup.name as groupName`,
                'COUNT(order.orderId) as ordered',
                'COUNT(orderProduct.orderProductId) as totalOrderProductId',
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'order.customer',
                    op: 'cond',
                    cond: `orderCustomer.email = order.email`,
                    aliasName: 'orderCustomer',
                },
                {
                    tableName: 'orderCustomer.customerGroup',
                    aliasName: 'customerGroup',
                    op: 'left',
                },
                {
                    tableName: 'order.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const whereConditions = [
                {
                    name: 'VendorOrders.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                },
                {
                    name: 'order.paymentProcess',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'order.paymentStatus',
                    op: 'and',
                    value: 1,
                },
            ];
            if (status === 1 || status === 0) {
                whereConditions.push({
                    name: 'orderCustomer.isActive',
                    op: 'and',
                    value: status,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['order.email', 'order.shippingLastname', 'order.shippingFirstname', 'order.telephone', 'customerGroup.name'],
                    value: keyword.toLowerCase(),
                });
            }
            if (customerName === null || customerName === void 0 ? void 0 : customerName.trim()) {
                searchConditions.push({
                    name: ['order.shippingLastname', 'order.shippingFirstname'],
                    value: customerName,
                });
            }
            if (mobileNumber === null || mobileNumber === void 0 ? void 0 : mobileNumber.trim()) {
                searchConditions.push({
                    name: [`order.telephone`],
                    value: mobileNumber,
                });
            }
            if (email === null || email === void 0 ? void 0 : email.trim()) {
                searchConditions.push({
                    name: [`order.email`],
                    value: email,
                });
            }
            if (customerGroupName === null || customerGroupName === void 0 ? void 0 : customerGroupName.trim()) {
                searchConditions.push({
                    name: [`customerGroup.name`],
                    value: customerGroupName,
                });
            }
            const groupBy = [
                {
                    name: 'order.email',
                },
                {
                    name: `orderCustomer.id`,
                },
            ];
            const sort = [
                {
                    name: 'MAX(order.createdDate)',
                    order: 'DESC',
                },
            ];
            const vendorOrders = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Seller Order List`,
                data: vendorOrders instanceof Array ? count ? vendorOrders.length : vendorOrders : vendorOrders,
            });
        });
    }
    // Export Vendor Customer api
    /**
     * @api {Get} /api/vendor-order/export-customer Export Vendor Customer api
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} customerId customerId
     * @apiSampleRequest /api/vendor-order/export-customer
     * @apiErrorExample {json} ExportVendorCustomer List error
     * HTTP/1.1 500 Internal Server Error
     */
    exportVendorCustomer(customerId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Archive Order Archive Excel');
            // Excel sheet column define
            worksheet.columns = [
                { header: 'email', key: 'email', size: 16, width: 15 },
                { header: 'customerName', key: 'customerName', size: 16, width: 15 },
                { header: 'mobileNumber', key: 'mobileNumber', size: 16, width: 24 },
                { header: 'groupName', key: 'groupName', size: 16, width: 15 },
                { header: 'address1', key: 'address1', size: 16, width: 15 },
                { header: 'address2', key: 'address2', size: 16, width: 15 },
                { header: 'purchedProduct', key: 'purchedProduct', size: 16, width: 15 },
                { header: 'status', key: 'status', size: 16, width: 15 },
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
            const select = [
                'DISTINCT order.customerId as customerId',
                `orderCustomer.email as email`,
                `orderCustomer.firstName as firstName`,
                `orderCustomer.lastName as lastName`,
                `orderCustomer.mobileNumber as mobileNumber`,
                `orderCustomer.customerGroupId as customerGroupId`,
                `MAX(order.shippingAddress1) as shippingAddress1`,
                `MAX(order.shippingAddress2) as shippingAddress2`,
                `MAX(order.shippingCity) as shippingCity`,
                `MAX(order.shippingZone) as shippingZone`,
                `SUM(order.total) as purched`,
                `orderCustomer.isActive as isActive`,
                `orderCustomer.avatar as imageName`,
                `orderCustomer.avatarPath as containerName`,
                `customerGroup.name as groupName`,
                'COUNT(order.orderId) as ordered',
                'COUNT(orderProduct.orderProductId) as totalOrderProductId',
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'order.customer',
                    aliasName: 'orderCustomer',
                },
                {
                    tableName: 'orderCustomer.customerGroup',
                    aliasName: 'customerGroup',
                },
                {
                    tableName: 'order.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const whereConditions = [
                {
                    name: 'VendorOrders.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                },
            ];
            if (customerId && customerId !== '') {
                const customerIds = customerId.split(',');
                // const orderIds = await this.orderService.find({ where: { email: In(emailId) }, select: ['orderId'] });
                whereConditions.push({
                    name: 'order.orderId',
                    op: 'IN',
                    value: customerIds,
                });
            }
            const groupBy = [
                {
                    name: 'order.orderId',
                },
                {
                    name: `orderCustomer.id`,
                },
            ];
            const vendorOrders = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, [], relations, groupBy, [], false, true);
            const mappingData = vendorOrders.map((value) => {
                value.isActive = value.isActive === 1 ? 'Active' : 'In-active';
                return value;
            });
            const rows = [];
            for (const data of mappingData) {
                rows.push([data.email, data.firstName + ' ' + data.lastName, data.mobileNumber, data.groupName, data.shippingAddress1, data.shippingAddress2, data.totalOrderProductId, data.isActive]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorCustomerExcel_' + Date.now() + '.xlsx';
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
    // Purchased Customer Product List
    /**
     * @api {Get} /api/vendor-order/customer-purchased-product Purchased Customer Product List
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {String} productName search by productName
     * @apiParam (Request body) {Number} id search by id
     * @apiparam (request body) {String} sku search by sku
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 ok
     * {
     *      "status": "1",
     *      "message": "Successfully Got Order Product List..!",
     *      "data": {},
     * }
     * @apiSampleRequest api/vendor-order/customer-purchased-product
     * @apiErrorExample {json} CustomerPurchasedProductList error
     * HTTP/1.1 500 internal server error
     */
    customerPurchasedProductList(request, response, 
    // @Param('id') customerId: number,
    emailId, limit, offset, count, productName, sku) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'orderProduct.orderProductId as orderProductId',
                'product.sku as sku',
                'orderProduct.name as productName',
                'order.createdDate as orderedDate',
                'orderProduct.productId as productId',
                'order.orderPrefixId as orderPrefixId',
                'order.email as email',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderStatus.name as orderStatus',
                'orderDetail.shippingCity as shippingCity',
                '(SELECT productImage.image from product_image as productImage where productImage.default_image = 1 AND productImage.product_id = productId LIMIT 1) as image',
                '(SELECT productImage.container_name from product_image as productImage where productImage.default_image = 1 AND productImage.product_id = productId LIMIT 1) as containerName',
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'order.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'orderProduct.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'orderProduct.productInformationDetail',
                    aliasName: 'product',
                },
            ];
            const searchConditions = [];
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['orderProduct.name'],
                    value: productName.toLowerCase(),
                });
            }
            if (sku && sku !== '') {
                searchConditions.push({
                    name: ['product.sku'],
                    value: sku.toLowerCase(),
                });
            }
            const whereCondition = [
                {
                    name: 'VendorOrders.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                },
                {
                    name: 'order.paymentProcess',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'order.paymentStatus',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'order.email',
                    op: 'and',
                    value: `'` + emailId + `'`,
                },
            ];
            const sort = [
                {
                    name: 'VendorOrders.createdDate',
                    order: 'DESC',
                },
            ];
            const orderProductList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereCondition, searchConditions, relations, [], sort, false, true);
            if (count) {
                return response.status(200).send({ status: 1, message: 'Successfully got order product count', count: orderProductList.length });
            }
            const orderProductStatusList = yield Promise.all(orderProductList.map((orderProduct) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const orderProductView = orderProduct;
                const orderStatus = yield this.orderProductLogService.find({ where: { orderProductId: orderProduct.orderProductId }, relations: ['orderStatus'] });
                orderProductView.orderStatus = orderStatus.map((orderStat) => {
                    var _a, _b;
                    return ({
                        orderStatusId: (_a = orderStat === null || orderStat === void 0 ? void 0 : orderStat.orderStatus) === null || _a === void 0 ? void 0 : _a.orderStatusId,
                        statusName: (_b = orderStat.orderStatus) === null || _b === void 0 ? void 0 : _b.name,
                        createdOn: orderStat.createdDate,
                    });
                });
                return orderProductView;
            })));
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Order Product List`,
                data: orderProductStatusList,
            });
        });
    }
    // product Viewed Customer
    /**
     * @api {Get} /api/vendor-order/product-viewed-customer Product Viewed Customer
     * @apiGroup Vendor Order
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {String} customerId customerId
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} sku sku
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 ok
     * {
     *      "status": "1",
     *      "message": "Successfully got the customer view log list",
     *      "data": {},
     * }
     * @apiSampleRequest api/vendor-order/product-viewed-customer
     * @apiErrorExample {json} VendorProductViewedCustomer error
     * HTTP/1.1 500 internal server error
     */
    vendorProductViewedCustomer(limit, offset, customerId, productName, sku, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'product.sku as sku',
                'product.productId as productId',
                'product.name as productName',
                'product.keywords as keywords',
                'product.image as image',
                'product.imagePath as imagePath',
                'MAX(productviewlog.createdDate) as createdDate',
                'COUNT(productviewlog.productId) as productViewedCount',
            ];
            const relation = [];
            relation.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            }, {
                tableName: 'product.productviewlog',
                aliasName: 'productviewlog',
            });
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorProducts.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'productviewlog.customerId',
                op: 'and',
                value: customerId,
            });
            const groupBy = [
                {
                    name: 'productviewlog.productId',
                },
            ];
            const searchConditions = [];
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName.toLowerCase(),
                });
            }
            if (sku && sku !== '') {
                searchConditions.push({
                    name: ['product.sku'],
                    value: sku.toLowerCase(),
                });
            }
            const sort = [
                {
                    name: 'MAX(productviewlog.createdDate)',
                    order: 'DESC',
                },
            ];
            const customerViewLogList = yield this.vendorProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relation, groupBy, sort, count, true);
            if (!count) {
                const resultList = yield Promise.all(customerViewLogList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const productImage = yield this.productImageService.findAll({
                        where: {
                            productId: temp.productId,
                        },
                        order: {
                            sortOrder: 'ASC',
                        },
                    });
                    temp.productImage = productImage;
                    return temp;
                })));
                return response.status(200).send({ status: 1, message: 'Successfully got the customer view log list', data: resultList });
            }
            else {
                return response.status(200).send({ status: 1, message: 'Successfully got the customer view log count', data: customerViewLogList });
            }
        });
    }
    // Export Order Ivoice List API
    /**
     * @api {Get} /api/vendor-order/export-order-invoice-list Export Order Ivoice List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} limit limit
     * @apiParam (Request body) {String} vendorInvoiceId vendorInvoiceId
     * @apiParam (Request body) {String} offset offset
     * @apiSampleRequest /api/vendor-order/export-order-invoice-list
     * @apiErrorExample {json} Export Order Ivoice List List error
     * HTTP/1.1 500 Internal Server Error
     */
    exportOrderIvoiceList(vendorInvoiceId, limit, offset, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorInvoiceIds = vendorInvoiceId && vendorInvoiceId !== '' ? vendorInvoiceId.split(',') : [];
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Order-invoice-list');
            const rows = [];
            worksheet.columns = [
                { header: 'InvoiceNo', key: 'InvoiceNo', size: 16, width: 15 },
                { header: 'Customer', key: 'Customer', size: 16, width: 15 },
                { header: 'Amount', key: 'Amount', size: 16, width: 15 },
                { header: 'createdDate', key: 'createdDate', size: 16, width: 24 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const select = [
                'VendorInvoice.vendorInvoiceId as vendorInvoiceId',
                'VendorInvoice.invoiceNo as invoiceNo',
                'VendorInvoice.invoicePrefix as invoicePrefix',
                'VendorInvoice.shippingFirstname as shippingFirstname',
                'VendorInvoice.shippingLastname as shippingLastname',
                'VendorInvoice.orderId as orderId',
                'VendorInvoice.vendorId as vendorId',
                'VendorInvoice.createdDate as createdDate',
                'VendorInvoice.email as email',
                'VendorInvoice.total as total',
                'orderDetail.orderPrefixId as orderPrefixId',
            ];
            const relations = [{
                    tableName: 'VendorInvoice.orderDetail',
                    aliasName: 'orderDetail',
                }];
            const whereConditions = [];
            if (vendorInvoiceIds.length > 0) {
                whereConditions.push({
                    name: 'VendorInvoice.vendorInvoiceId',
                    op: 'IN',
                    value: vendorInvoiceId,
                });
            }
            else {
                whereConditions.push({
                    name: 'VendorInvoice.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                });
            }
            const orderInvoices = yield this.vendorInvoiceService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], false, true);
            for (const vals of orderInvoices) {
                const temp = {};
                temp.InvoiceNo = vals.invoiceNo;
                temp.Customer = vals.shippingFirstname + ' ' + vals.shippingLastname;
                temp.Amount = vals.total;
                temp.createdDate = vals.createdDate;
                rows.push(temp);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorInvoice' + Date.now() + '.xlsx';
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
    //  update payment status API
    /**
     * @api {Post} /api/vendor-order/update-payment-status update payment Status API
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
     *      "status": "1",
     *      "data": {
     *       }
     * }
     * @apiSampleRequest /api/vendor-order/update-payment-status
     * @apiErrorExample {json} UpdatePaymentStatus error
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
                paymentParams.paidDate = (0, moment_1.default)(date).format('YYYY-MM-DD HH:mm:ss');
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
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/recent-order-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorRecentOrderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-detail/:vendorOrderId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/archive-order-detail/:vendorOrderArchiveId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('vendorOrderArchiveId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderArchiveDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/today-vendor-order-count'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-counts'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderCounts", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-order/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "deleteOrder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-order-status/:vendorOrderId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('subOrderStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('fullfillmentStatusId')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderStatusUpdate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:vendorOrderId/order-product'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderProductUpdate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/order'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateOrder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/bulk-update-order-status'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "bulkOrderStatusUpdate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-order-status-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderStatusList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-orders-based-status-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('vendorOrderLimit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('vendorOrderOffset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorOrderBasedStatusList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-orders-based-status-details/:orderStatusId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderStatusId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorOrderStatusDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-orders-based-status-count'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('vendorLimit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('vendorOffset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderListCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendorOrderLoglist'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderLogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/top-selling-productlist'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "topSellingProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-shipping-information'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('trackingUrl')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('trackingNo')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateShippingInformation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-export-pdf'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderExportPdf", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/make-vendor-order-archive'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "makeArchive", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/revoke-vendor-order-archive'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('vendorOrderArchiveId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "revokeArchive", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/archive-order-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('deliverylist')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(9, (0, routing_controllers_1.Req)()),
    tslib_1.__param(10, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, String, Object, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/archive-order-list-count'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('deliverylist')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderListCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('amount')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('isBackOrder')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('skuName')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('paymentProcess')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('orderStatus')),
    tslib_1.__param(10, (0, routing_controllers_1.QueryParam)('tags')),
    tslib_1.__param(11, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(12, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(13, (0, routing_controllers_1.QueryParam)('sortBy')),
    tslib_1.__param(14, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(15, (0, routing_controllers_1.QueryParam)('deliverylist')),
    tslib_1.__param(16, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(17, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(18, (0, routing_controllers_1.QueryParam)('statusType')),
    tslib_1.__param(19, (0, routing_controllers_1.Req)()),
    tslib_1.__param(20, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Number, Number, Number, String, String, String, String, String, String, Number, String, Object, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderListtt", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/order-list-export'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderListExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bulk-archive-order-export'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderExportBulk", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/archive-order-export'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorOrderArchiveId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/cancel-order-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "cancelorderListtt", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-vendor-order-cancel-request/:orderProductId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('cancelStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateVendorOrderCancelStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/update-bulk-vendor-order-cancel-request'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('cancelStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateBulkVendorOrderCancelStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-order-cancel-excel-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "exportCancelRequest", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bulk-vendor-order-cancel-excel-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "bulkExportVendorOrderCancelRequest", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-invoice-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('firstName')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('lastName')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorInvoiceList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-invoice-export-pdf'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderInvoiceExportPdf", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/sales-report-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorSalesReportList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/sales-report-export-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
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
], VendorOrderController.prototype, "totalSalesExcelView", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/order-invoice-export-send-email-pdf'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderInvoiceExportSendEmailPdf", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/back-order-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('amount')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('orderStatus')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('skuName')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(10, (0, routing_controllers_1.Req)()),
    tslib_1.__param(11, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Number, String, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "backOrderProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-failed-order-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('amount')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('orderStatus')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('dateAdded')),
    tslib_1.__param(10, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(11, (0, routing_controllers_1.Req)()),
    tslib_1.__param(12, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorFailedOrderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bulk-back-order-excel-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "bulkExportBackorder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/back-order-excel-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "backOrderExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/failed-order-excel-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "failedOrderExportExcel", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bulk-failed-order-excel-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "BulkfailedOrderExportExcel", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-order-status-list-based-on-parent'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('parentId')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderStatusListBasedOnParent", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/purchased-customer-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('customerGroupName')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('email')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('mobileNumber')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__param(10, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, String, String, String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "purchasedCustomers", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/export-customer'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('customerId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "exportVendorCustomer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer-purchased-product'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('emailId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, String, Number, Number, Object, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "customerPurchasedProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-viewed-customer'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__param(7, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorProductViewedCustomer", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Get)('/export-order-invoice-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorInvoiceId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "exportOrderIvoiceList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-payment-status'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('paymentStatusId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updatePaymentStatus", null);
VendorOrderController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-order'),
    tslib_1.__metadata("design:paramtypes", [VendorOrderService_1.VendorOrdersService,
        OrderService_1.OrderService,
        OrderProductService_1.OrderProductService,
        PluginService_1.PluginService,
        VendorProductService_1.VendorProductService,
        ProductImageService_1.ProductImageService,
        VendorOrderLogService_1.VendorOrderLogService,
        ProductService_1.ProductService,
        PdfService_1.PdfService,
        CountryService_1.CountryService,
        zoneService_1.ZoneService,
        S3Service_1.S3Service,
        VendorOrderArchiveLogService_1.VendorOrderArchiveLogService,
        VendorOrderArchiveService_1.VendorOrderArchiveService,
        OrderStatusService_1.OrderStatusService,
        OrderProductLogService_1.OrderProductLogService,
        EmailTemplateService_1.EmailTemplateService,
        VendorPaymentService_1.VendorPaymentService,
        VendorPaymentArchiveService_1.VendorPaymentArchiveService,
        VendorInvoiceService_1.VendorInvoiceService,
        VendorInvoiceItemService_1.VendorInvoiceItemService,
        VendorService_1.VendorService,
        ImageService_1.ImageService,
        SettingService_1.SettingService,
        CustomerService_1.CustomerService,
        PaymentItemsService_1.PaymentItemsService,
        PaymentArchiveService_1.PaymentArchiveService,
        PaymentService_1.PaymentService,
        VendorGroupService_1.VendorGroupService,
        VendorSettingService_1.VendorGlobalSettingService,
        SkuService_1.SkuService,
        OrderStatusToFullfillmentService_1.OrderStatusToFullfillmentService,
        OrderFullfillmentStatusService_1.OrderFullfillmentStatusService])
], VendorOrderController);
exports.VendorOrderController = VendorOrderController;
//# sourceMappingURL=VendorOrderController.js.map