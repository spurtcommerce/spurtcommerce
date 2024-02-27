"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorAdminOrderController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const OrderService_1 = require("../../core/services/OrderService");
const ProductService_1 = require("../../core/services/ProductService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const VendorService_1 = require("../../core/services/VendorService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const VendorOrderLogService_1 = require("../../core/services/VendorOrderLogService");
const PdfService_1 = require("../../core/services/PdfService");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const SettingService_1 = require("../../core/services/SettingService");
const VendorInvoiceService_1 = require("../../core/services/VendorInvoiceService");
const VendorInvoiceItemService_1 = require("../../core/services/VendorInvoiceItemService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const VendorInvoiceItem_1 = require("../../core/models/VendorInvoiceItem");
const VendorInvoice_1 = require("../../core/models/VendorInvoice");
const env_1 = require("../../../env");
const to_words_1 = require("to-words");
const moment_1 = tslib_1.__importDefault(require("moment"));
const CustomerService_1 = require("../../core/services/CustomerService");
const fs = tslib_1.__importStar(require("fs"));
let VendorAdminOrderController = class VendorAdminOrderController {
    constructor(vendorOrdersService, orderService, orderProductService, vendorService, productService, productImageService, vendorOrderLogService, orderStatusService, pdfService, settingService, s3Service, vendorInvoiceService, vendorInvoiceItemService, vendorProductService, imageService, customerService) {
        this.vendorOrdersService = vendorOrdersService;
        this.orderService = orderService;
        this.orderProductService = orderProductService;
        this.vendorService = vendorService;
        this.productService = productService;
        this.productImageService = productImageService;
        this.vendorOrderLogService = vendorOrderLogService;
        this.orderStatusService = orderStatusService;
        this.pdfService = pdfService;
        this.settingService = settingService;
        this.s3Service = s3Service;
        this.vendorInvoiceService = vendorInvoiceService;
        this.vendorInvoiceItemService = vendorInvoiceItemService;
        this.vendorProductService = vendorProductService;
        this.imageService = imageService;
        this.customerService = customerService;
    }
    // order List API
    /**
     * @api {get} /api/admin-vendor-order Order List API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
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
     * @apiSampleRequest /api/admin-vendor-order
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderList(limit, offset, customerName, orderPrefixId, startDate, endDate, count, vendorName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'MAX(customer.firstName) as vendorNames',
                'orderDetail.customerId as customerId',
                'orderDetail.createdDate as createdDate',
                'MAX(orderDetail.orderId) as orderId',
                'orderDetail.total as total',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.shippingFirstname as shippingFirstName',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'vendor.customer',
                    aliasName: 'customer',
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.order_id',
                },
            ];
            const whereConditions = [];
            // if (startDate && startDate !== '') {
            //     whereConditions.push({
            //         name: '`orderDetail`.`created_date`',
            //         op: 'raw',
            //         sign: '>=',
            //         value: startDateMin,
            //     });
            // }
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            });
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['shipping_firstname'],
                    value: customerName.toLowerCase(),
                });
            }
            if (startDate && startDate !== '') {
                searchConditions.push({
                    name: ['`orderDetail`.`created_date`'],
                    value: startDate.toLowerCase(),
                });
            }
            if (orderPrefixId && orderPrefixId !== '') {
                searchConditions.push({
                    name: ['orderDetail.orderPrefixId'],
                    value: orderPrefixId.toLowerCase(),
                });
            }
            if (vendorName && vendorName !== '') {
                searchConditions.push({
                    name: ['customer.firstName'],
                    value: vendorName.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully got count.',
                    data: orderList,
                };
                return response.status(200).send(Response);
            }
            const orderStatus = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const status = yield this.orderStatusService.findOne({
                    where: { orderStatusId: value.orderStatusId },
                    select: ['orderStatusId', 'name', 'colorCode'],
                });
                const vendorOrders = yield this.vendorOrdersService.findAll({
                    where: { orderId: value.orderId },
                });
                const vendorCount = yield this.vendorOrdersService.findVendorCount(value.orderId);
                const temp = value;
                temp.orderStatus = status;
                temp.productCount = vendorOrders.length;
                temp.vendorCount = vendorCount.vendorCount;
                const vendorsName = yield this.vendorOrdersService.findVendors(value.orderId);
                const vendorMapping = vendorsName.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const vendorCustomer = yield this.vendorService.findOne({
                        where: {
                            vendorId: values.vendorId,
                        },
                    });
                    const customerNames = yield this.customerService.findOne({
                        where: {
                            id: vendorCustomer.customerId,
                        },
                    });
                    const vendorNames = customerNames.firstName;
                    return vendorNames;
                }));
                const result = yield Promise.all(vendorMapping);
                temp.vendorName = result;
                return temp;
            }));
            const results = yield Promise.all(orderStatus);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order list.',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Order Detail API
    /**
     * @api {get} /api/admin-vendor-order/order-detail  Order Detail API
     * @apiGroup Admin Vendor Order
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
     * @apiSampleRequest /api/admin-vendor-order/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderDetail(orderid, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.findOrder({
                where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'email', 'telephone', 'invoiceNo', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingAddress1',
                    'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight', 'paymentStatus', 'paymentFlag'],
            });
            orderData.productList = yield this.vendorOrdersService.findAll({ where: { orderId: orderid }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const tempVal = value;
                    const vendor = yield this.vendorService.findOne({
                        where: { vendorId: value.vendorId },
                        select: ['customerId', 'companyName', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId'],
                    });
                    const vendorOrderProduct = yield this.orderProductService.find({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'orderProductPrefixId', 'skuName'], where: { orderProductId: value.orderProductId } });
                    for (const product of vendorOrderProduct) {
                        const productImage = yield this.productImageService.findOne({
                            where: { productId: product.productId, defaultImage: 1 },
                            select: ['image', 'containerName'],
                        });
                        const productDetail = yield this.productService.findOne({
                            where: { productId: product.productId },
                            select: ['sku'],
                        });
                        tempVal.basePrice = product.basePrice;
                        tempVal.taxType = product.taxType;
                        tempVal.taxValue = product.taxValue;
                        if (product.taxType === 2) {
                            tempVal.taxValueInAmount = +product.basePrice * ((+product.taxValue) / 100);
                        }
                        else {
                            tempVal.taxValueInAmount = product.taxValue;
                        }
                        tempVal.productId = product.productId;
                        tempVal.name = product.name;
                        tempVal.quantity = product.quantity;
                        tempVal.total = product.total;
                        if (productImage) {
                            tempVal.image = productImage.image;
                            tempVal.containerName = productImage.containerName;
                        }
                        tempVal.sku = productDetail.sku;
                        tempVal.discountAmount = product.discountAmount;
                        tempVal.discountedAmount = product.discountedAmount;
                        tempVal.couponDiscountAmount = product.couponDiscountAmount;
                        tempVal.skuName = product.skuName;
                    }
                    tempVal.companyName = vendor.companyName;
                    tempVal.companyAddress1 = vendor.companyAddress1;
                    tempVal.companyAddress2 = vendor.companyAddress2;
                    tempVal.companyCity = vendor.companyCity;
                    tempVal.companyState = vendor.companyState;
                    let total = 0;
                    for (const id of vendorOrderProduct) {
                        const OrderProductTotal = yield this.orderProductService.findOne({ select: ['total', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'], where: { orderProductId: id.orderProductId } });
                        total += +OrderProductTotal.total;
                    }
                    const subOrderStatus = yield this.orderStatusService.findOne({
                        where: { orderStatusId: value.subOrderStatusId },
                        select: ['name', 'colorCode'],
                    });
                    if (subOrderStatus) {
                        tempVal.subOrderStatusName = subOrderStatus.name;
                        tempVal.subOrderStatusColorCode = subOrderStatus.colorCode;
                    }
                    tempVal.vendorOrderTotal = total;
                    return tempVal;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderData.orderStatusId },
                select: ['name', 'colorCode'],
            });
            orderData.orderStatusName = orderStatusData === null || orderStatusData === void 0 ? void 0 : orderStatusData.name;
            orderData.statusColorCode = orderStatusData === null || orderStatusData === void 0 ? void 0 : orderStatusData.colorCode;
            const productData = orderData.productList;
            let ttl = 0;
            for (const id of productData) {
                const OrderProductTotal = yield this.orderProductService.findOne({ select: ['total', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'], where: { orderProductId: id.orderProductId } });
                ttl += +OrderProductTotal.total;
            }
            orderData.total = ttl;
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order Detail. ',
                data: orderData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // vendor order log List API
    /**
     * @api {get} /api/admin-vendor-order/vendor-order-log-list Vendor Order Log List API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got vendor order log list",
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
     * @apiSampleRequest /api/admin-vendor-order/vendor-order-log-list
     * @apiErrorExample {json} order error
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
            const orderStatuss = yield this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 }, orderBy: { priority: 'ASC' } });
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
                message: 'Successfully got the complete Vendor Order Status Log list.',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Make Archive/revoke  API
    /**
     * @api {put} /api/admin-vendor-order/:orderId Make Archive/revoke API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} archiveFlag archive flag should should be 1 or 0
     * @apiParamExample {json} Input
     * {
     *      "archiveFlag" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully .",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/:orderId
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     */
    makeArchive(orderId, archiveFlag, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderService.findOne({
                where: {
                    orderId,
                },
            });
            if (!order) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order Id.',
                };
                return response.status(400).send(errorResponse);
            }
            order.makeArchive = archiveFlag;
            const orderSave = yield this.orderService.create(order);
            if (archiveFlag === 0) {
                const sucResponse = {
                    status: 1,
                    message: 'Successfully Revoked this order.',
                    data: orderSave,
                };
                return response.status(200).send(sucResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Archived this product.',
                    data: orderSave,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    //  Order Export PDF API
    /**
     * @api {get} /api/admin-vendor-order/order-export-pdf  Order Export PDF API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     *      "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-order/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderExportPdf(orderId, vendorId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.findOrder({
                where: { orderId }, select: ['orderId', 'invoicePrefix', 'telephone', 'orderPrefixId', 'customerGstNo', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1', 'shippingAddress2', 'shippingCity',
                    'shippingPostcode', 'shippingCountry', 'shippingZone', 'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'telephone',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Id',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorService.findOne({ where: { vendorId } });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Id',
                };
                return response.status(400).send(errorResponse);
            }
            const invoice = yield this.vendorInvoiceService.findOne({ where: { orderId, vendorId } });
            if (!invoice) {
                const orderProducts = yield this.orderProductService.find({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'], where: { orderId } });
                for (const orderProduct of orderProducts) {
                    const val = yield this.vendorProductService.findOne({ where: { productId: orderProduct.productId } });
                    if (val !== undefined) {
                        const newVendorInvoice = new VendorInvoice_1.VendorInvoice();
                        newVendorInvoice.vendorId = val.vendorId;
                        newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                        newVendorInvoice.orderId = orderData.orderId;
                        newVendorInvoice.email = orderData.email;
                        newVendorInvoice.total = 0;
                        newVendorInvoice.shippingFirstname = orderData.shippingFirstname;
                        newVendorInvoice.shippingLastname = orderData.shippingLastname;
                        yield this.vendorInvoiceService.create(newVendorInvoice);
                        const vendorInvoiceData = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                        vendorInvoiceData.total = vendorInvoiceData.total + +orderProduct.total;
                        const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                        vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                        yield this.vendorInvoiceService.create(vendorInvoiceData);
                        const newVendorInvoiceItem = new VendorInvoiceItem_1.VendorInvoiceItem();
                        newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                        newVendorInvoiceItem.orderProductId = orderProduct.orderProductId;
                        yield this.vendorInvoiceItemService.create(newVendorInvoiceItem);
                    }
                }
            }
            let amount = parseFloat('0.00');
            const invoiceData = yield this.vendorInvoiceService.findOne({ where: { orderId, vendorId } });
            orderData.productList = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: invoiceData.vendorInvoiceId }, select: ['orderProductId', 'vendorInvoiceId', 'vendorInvoiceItemId'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const vendorOrderProduct = yield this.orderProductService.findOne({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'], where: { orderProductId: value.orderProductId } });
                    const product = yield this.productService.findOne({ select: ['sku', 'hsn'], where: { productId: vendorOrderProduct.productId } });
                    const obj = {};
                    obj.basePrice = vendorOrderProduct.basePrice;
                    obj.taxType = vendorOrderProduct.taxType;
                    obj.taxValue = vendorOrderProduct.taxValue;
                    obj.discountAmount = vendorOrderProduct.discountAmount;
                    obj.discountedAmount = vendorOrderProduct.discountedAmount;
                    obj.couponDiscountAmount = vendorOrderProduct.couponDiscountAmount;
                    obj.sku = product.sku;
                    obj.skuName = vendorOrderProduct.skuName;
                    obj.hsn = product.hsn;
                    if (obj.taxType === 2) {
                        obj.taxValueInAmount = (+vendorOrderProduct.basePrice * ((+vendorOrderProduct.taxValue) / 100)).toFixed(2);
                    }
                    else {
                        obj.taxValueInAmount = vendorOrderProduct.taxValue;
                    }
                    obj.productId = vendorOrderProduct.productId;
                    obj.name = vendorOrderProduct.name;
                    obj.quantity = vendorOrderProduct.quantity;
                    obj.total = vendorOrderProduct.total;
                    obj.productPrice = vendorOrderProduct.productPrice;
                    const amt = vendorOrderProduct.total;
                    amount += parseFloat(amt);
                    return obj;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const settings = yield this.settingService.findOne();
            const settingDetails = settings;
            orderData.vendor = vendor;
            orderData.currencyCode = orderData.currencyCode;
            orderData.symbolLeft = orderData.currencySymbolLeft;
            orderData.symbolRight = orderData.currencySymbolRight;
            orderData.invoiceNo = invoiceData.invoiceNo;
            orderData.invoicePrefix = invoiceData.invoicePrefix;
            let toWords;
            if (orderData.currencyCode === 'INR') {
                toWords = new to_words_1.ToWords({ localeCode: 'en-IN' });
            }
            else {
                toWords = new to_words_1.ToWords({ localeCode: 'en-US' });
            }
            const words = toWords.convert(amount, { currency: true });
            orderData.currencyInWords = words;
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.storeLogo, settingDetails.storeLogoPath, '150', '150');
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.storeLogo, settingDetails.storeLogoPath, '150', '150');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('vendor-invoice', orderData);
            const pathName = `./Invoice_${invoiceData.invoiceNo + invoiceData.invoiceNo}.pdf`;
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
    // Vendor Order List API
    /**
     * @api {get} /api/admin-vendor-order/vendor-order-list  Vendor Order list API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, company name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by starting amount
     * @apiParam (Request body) {String} amountTo search by ending Amount
     * @apiParam (Request body) {String} vendorIds search by vendorIds
     * @apiParam (Request body) {String} orderStatus search by orderStatus
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order list",
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
     * @apiSampleRequest /api/admin-vendor-order/vendor-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderListtt(limit, offset, keyword, vendorIds, orderStatus, startDate, endDate, amountFrom, amountTo, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
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
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'vendor.companyName as companyName'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
            ];
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
                name: 'VendorOrders.makeSettlement',
                op: 'and',
                value: 0,
            }, {
                name: 'orderProduct.cancelRequestStatus',
                op: 'raw',
                sign: '!=',
                value: 1,
            });
            if (vendorIds && vendorIds !== undefined) {
                whereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorIds.split(','),
                });
            }
            if (orderStatus && orderStatus !== undefined) {
                whereConditions.push({
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'IN',
                    value: orderStatus.split(','),
                });
            }
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
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['vendor.companyName', 'orderProduct.orderProductPrefixId'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successCount = {
                    status: 1,
                    message: 'Successfully got the vendor order count.',
                    data: orderCount,
                };
                return response.status(200).send(successCount);
            }
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                const commission = value.total * (defCommission / 100);
                temp.CommissionAmount = commission.toFixed(2);
                temp.NetAmount = value.total - temp.CommissionAmount;
                return temp;
            }));
            const paymentListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order list.',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('customerName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('orderPrefixId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('vendorName')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Object, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminOrderController.prototype, "orderList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminOrderController.prototype, "orderDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-order-log-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-sales']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorOrderId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminOrderController.prototype, "orderLogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:orderId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('archiveFlag')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminOrderController.prototype, "makeArchive", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-export-pdf'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminOrderController.prototype, "orderExportPdf", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-order-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'settlement order list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('vendorIds')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('orderStatus')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('amountFrom')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('amountTo')),
    tslib_1.__param(9, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(10, (0, routing_controllers_1.Req)()),
    tslib_1.__param(11, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorAdminOrderController.prototype, "orderListtt", null);
VendorAdminOrderController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/admin-vendor-order'),
    tslib_1.__metadata("design:paramtypes", [VendorOrderService_1.VendorOrdersService,
        OrderService_1.OrderService,
        OrderProductService_1.OrderProductService,
        VendorService_1.VendorService,
        ProductService_1.ProductService,
        ProductImageService_1.ProductImageService,
        VendorOrderLogService_1.VendorOrderLogService,
        OrderStatusService_1.OrderStatusService,
        PdfService_1.PdfService,
        SettingService_1.SettingService,
        S3Service_1.S3Service,
        VendorInvoiceService_1.VendorInvoiceService,
        VendorInvoiceItemService_1.VendorInvoiceItemService,
        VendorProductService_1.VendorProductService,
        ImageService_1.ImageService,
        CustomerService_1.CustomerService])
], VendorAdminOrderController);
exports.VendorAdminOrderController = VendorAdminOrderController;
//# sourceMappingURL=VendorOrderController.js.map