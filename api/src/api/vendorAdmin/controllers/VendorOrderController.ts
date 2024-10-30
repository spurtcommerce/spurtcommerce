/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Get, QueryParam, Authorized, Req, Put, Param, BodyParam } from 'routing-controllers';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { OrderService } from '../../core/services/OrderService';
import { ProductService } from '../../core/services/ProductService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { VendorService } from '../../core/services/VendorService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { VendorOrderLogService } from '../../core/services/VendorOrderLogService';
import { PdfService } from '../../core/services/PdfService';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { SettingService } from '../../core/services/SettingService';
import { VendorInvoiceService } from '../../core/services/VendorInvoiceService';
import { VendorInvoiceItemService } from '../../core/services/VendorInvoiceItemService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { VendorInvoiceItem } from '../../core/models/VendorInvoiceItem';
import { VendorInvoice } from '../../core/models/VendorInvoice';
import { env } from '../../../env';
import { ToWords } from 'to-words';
import moment from 'moment';
import { CustomerService } from '../../core/services/CustomerService';
import * as fs from 'fs';
import { OrderFullfillmentStatusService } from '../../../../src/api/core/services/OrderFullfillmentStatusService';

@JsonController('/admin-vendor-order')
export class VendorAdminOrderController {
    constructor(
        private vendorOrdersService: VendorOrdersService,
        private orderService: OrderService,
        private orderProductService: OrderProductService,
        private vendorService: VendorService,
        private productService: ProductService,
        private productImageService: ProductImageService,
        private vendorOrderLogService: VendorOrderLogService,
        private orderStatusService: OrderStatusService,
        private pdfService: PdfService,
        private settingService: SettingService,
        private s3Service: S3Service,
        private vendorInvoiceService: VendorInvoiceService,
        private vendorInvoiceItemService: VendorInvoiceItemService,
        private vendorProductService: VendorProductService,
        private imageService: ImageService,
        private customerService: CustomerService,
        private orderFullfillmentStatusService: OrderFullfillmentStatusService
    ) {
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
     *      "data":  {
     *       "vendorNames": "",
     *       "customerId": "",
     *       "createdDate": "",
     *       "orderId": "",
     *       "total": "",
     *       "currencySymbolLeft": "",
     *       "currencySymbolRight": "",
     *       "orderPrefixId": "",
     *       "orderStatusId": "",
     *       "shippingFirstName": "",
     *       "shippingCity": "",
     *       "shippingCountry": "",
     *       "orderStatus": {
     *           "orderStatusId": "",
     *           "name": "",
     *           "colorCode": ""
     *       },
     *       "productCount": "",
     *       "vendorCount": "",
     *       "vendorName": [
     *           "picconew"
     *       ]
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-order
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async orderList(
        @QueryParam('keyword') keyword: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string, @QueryParam('orderPrefixId') orderPrefixId: string, @QueryParam('dateAdded') dateAdded: string,
        @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @QueryParam('vendorName') vendorName: string, @Req() request: any, @Res() response: any): Promise<any> {
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'MAX(customer.firstName) as vendorNames',
            'orderDetail.customerId as customerId',
            'orderDetail.createdDate as createdDate',
            'orderDetail.modifiedDate as modifiedDate',
            'MAX(orderDetail.orderId) as orderId',
            'orderDetail.total as total',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.shippingFirstname as shippingFirstName',
            'orderDetail.shippingCity as shippingCity',
            'orderDetail.paymentStatus as paymentStatus',
            'orderDetail.paymentProcess as paymentProcess',
            'orderDetail.shippingCountry as shippingCountry'];

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

        if (dateAdded) {
            searchConditions.push({
                name: ['`orderDetail`.`created_date`'],
                value: dateAdded,
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

        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['shipping_firstname', 'customer.firstName', 'orderDetail.orderPrefixId'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'orderDetail.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderStatus = orderList.map(async (value: any) => {
            const status = await this.orderStatusService.findOne({
                where: { orderStatusId: value.orderStatusId },
                select: ['orderStatusId', 'name', 'colorCode'],
            });
            const vendorOrders = await this.vendorOrdersService.findAll({
                where: { orderId: value.orderId },
            });
            const vendorCount = await this.vendorOrdersService.findVendorCount(value.orderId);
            const temp: any = value;
            temp.orderStatus = status;
            temp.productCount = vendorOrders.length;
            temp.vendorCount = vendorCount.vendorCount;
            const vendorsName: any = await this.vendorOrdersService.findVendors(value.orderId);
            const vendorMapping = vendorsName.map(async (values) => {
                const vendorCustomer = await this.vendorService.findOne({
                    where: {
                        vendorId: values.vendorId,
                    },
                });
                const customerNames = await this.customerService.findOne({
                    where: {
                        id: vendorCustomer.customerId,
                    },
                });
                const vendorNames = customerNames.firstName;
                return vendorNames;
            });
            const result = await Promise.all(vendorMapping);
            temp.vendorName = result;
            return temp;
        });
        const results = await Promise.all(orderStatus);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got count',
                data: results.length,
            };
            return response.status(200).send(Response);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order list',
            data: results,
        };
        return response.status(200).send(successResponse);
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
     *      "data": [
     *          {
     *              "createdDate": "2024-07-11T06:52:23.000Z",
     *              "vendorOrderId": 240,
     *              "subOrderId": "INV-20240711360101",
     *              "vendorId": 10,
     *              "subOrderStatusId": 1,
     *              "orderProductId": 665,
     *              "orderId": 360,
     *              "total": "825.00",
     *              "trackingUrl": null,
     *              "trackingNo": null,
     *              "productList": [
     *                  {
     *                      "orderProductId": 665,
     *                      "productId": 1558,
     *                      "orderProductPrefixId": "INV-202407113601",
     *                      "name": "Sneakers",
     *                      "quantity": 1,
     *                      "discountAmount": "0.00",
     *                      "basePrice": "800.00",
     *                      "taxType": 1,
     *                      "taxValue": 25,
     *                      "total": "825.00",
     *                      "discountedAmount": "0.00",
     *                      "skuName": "Sneakers123",
     *                      "couponDiscountAmount": null,
     *                      "image": "Codify4_1701864306097.jpeg",
     *                      "containerName": "spurtt/"
     *                  }
     *              ],
     *              "customerFirstName": "vhg",
     *              "shippingAddress1": "vhhh",
     *              "shippingAddress2": "zsxfvgbhng",
     *              "shippingCity": "hjhh",
     *              "shippingPostcode": "3696",
     *              "shippingCountry": "India",
     *              "shippingZone": "Tamil Nadu",
     *              "orderPrefixId": "INV-20240711360",
     *              "email": "goyivip327@lucvu.com",
     *              "mobileNumber": "966855",
     *              "orderStatusName": "Order Placed",
     *              "statusColorCode": "#6798e3",
     *              "paymentMethod": "CashOnDelivery",
     *              "currencySymbolLeft": "$",
     *              "currencySymbolRight": "",
     *              "paymentStatus": 0
     *          }
     *      ]
     * }
     * @apiSampleRequest /api/admin-vendor-order/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/order-detail')
    @Authorized()
    public async orderDetail(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'email', 'telephone', 'invoiceNo', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'customerId', 'createdDate', 'modifiedDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight', 'paymentStatus', 'paymentFlag'],
        });
        orderData.productList = await this.vendorOrdersService.findAll({ where: { orderId: orderid }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total'] }).then((val) => {
            const productVal = val.map(async (value: any) => {
                const tempVal: any = value;
                const vendor = await this.vendorService.findOne({
                    where: { vendorId: value.vendorId },
                    select: ['customerId', 'companyName', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId'],
                });
                const vendorOrderProduct = await this.orderProductService.find({
                    select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'couponDiscountAmount', 'orderProductPrefixId', 'skuName', 'orderStatusId', 'trackingUrl', 'trackingNo', 'fullfillmentStatusId', 'tags'],
                    where: { orderProductId: value.orderProductId },
                });
                for (const product of vendorOrderProduct) {
                    const productImage = await this.productImageService.findOne({
                        where: { productId: product.productId, defaultImage: 1 },
                        select: ['image', 'containerName'],
                    });
                    const productDetail = await this.productService.findOne({
                        where: { productId: product.productId },
                        select: ['sku'],
                    });
                    tempVal.basePrice = product.basePrice;
                    tempVal.taxType = product.taxType;
                    tempVal.taxValue = product.taxValue;
                    if (product.taxType === 2) {
                        tempVal.taxValueInAmount = +product.basePrice * ((+product.taxValue) / 100);
                    } else {
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
                    tempVal.trackingUrl = product.trackingUrl ?? '';
                    tempVal.trackingNo = product.trackingNo ?? '';
                    tempVal.tags = product.tags ?? '';
                    const orderStatus = await this.orderStatusService.findOne({
                        where: { orderStatusId: product.orderStatusId },
                        select: ['name', 'colorCode'],
                    });
                    if (orderStatus) {
                        tempVal.orderStatusName = orderStatus.name;
                        tempVal.statusColorCode = orderStatus.colorCode;
                    }
                    const orderFullfillmentStatus = await this.orderFullfillmentStatusService.findOne({
                        where: { id: product.fullfillmentStatusId },
                        select: ['name', 'colorCode'],
                    });
                    tempVal.fullfillmentStatusId = product.fullfillmentStatusId ?? '';
                    tempVal.orderFullfillmentStatusName = orderFullfillmentStatus?.name ?? '';
                    tempVal.orderFullfillmentStatusColorCode = orderFullfillmentStatus?.colorCode ?? '';
                }
                tempVal.companyName = vendor.companyName;
                tempVal.companyAddress1 = vendor.companyAddress1;
                tempVal.companyAddress2 = vendor.companyAddress2;
                tempVal.companyCity = vendor.companyCity;
                tempVal.companyState = vendor.companyState;
                let total = 0;
                for (const id of vendorOrderProduct) {
                    const OrderProductTotal = await this.orderProductService.findOne({ select: ['total', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'], where: { orderProductId: id.orderProductId } });
                    total += +OrderProductTotal.total;
                }
                const subOrderStatus = await this.orderStatusService.findOne({
                    where: { orderStatusId: value.subOrderStatusId },
                    select: ['name', 'colorCode'],
                });
                if (subOrderStatus) {
                    tempVal.subOrderStatusName = subOrderStatus.name;
                    tempVal.subOrderStatusColorCode = subOrderStatus.colorCode;
                }
                tempVal.vendorOrderTotal = total;
                return tempVal;
            });
            const results = Promise.all(productVal);
            return results;
        });
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.orderStatusId },
            select: ['name', 'colorCode'],
        });
        orderData.orderStatusName = orderStatusData?.name;
        orderData.statusColorCode = orderStatusData?.colorCode;
        const productData = orderData.productList;
        let ttl = 0;
        for (const id of productData) {
            const OrderProductTotal = await this.orderProductService.findOne({ select: ['total', 'discountAmount', 'discountedAmount', 'couponDiscountAmount'], where: { orderProductId: id.orderProductId } });
            ttl += +OrderProductTotal.total;
        }
        orderData.total = ttl;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order detail',
            data: orderData,
        };
        return response.status(200).send(successResponse);
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
     *      "data": {
     *       "orderStatusId": 1,
     *       "name": "Order Placed",
     *       "createdDate": "2024-06-10T05:10:45.000Z"
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-order/vendor-order-log-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-order-log-list')
    @Authorized(['admin', 'list-sales'])
    public async orderLogList(@QueryParam('vendorOrderId') vendorOrderId: number, @Res() response: any): Promise<any> {
        const select = ['vendorOrderLogId', 'vendorId', 'vendorOrderId', 'orderId', 'subOrderId', 'subOrderStatusId', 'createdDate', 'modifiedDate'];
        const WhereConditions = [
            {
                name: 'vendorOrderId',
                op: 'where',
                value: vendorOrderId,
            },
        ];
        const orderList = await this.vendorOrderLogService.list(0, 0, select, WhereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name', 'createdDate', 'modifiedDate'], where: { isActive: 1 }, orderBy: { priority: 'ASC' } });
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
            message: 'Successfully got the complete seller order status log list',
            data: result,
        };
        return response.status(200).send(successResponse);
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
     *      "status": "1",
     *       "data": [{
     *                   "createdBy": "",
     *                   "createdDate": "2024-04-03T06:26:26.000Z",
     *                   "modifiedBy": "",
     *                   "modifiedDate": "2024-08-03 10:45:11",
     *                   "orderId": 6,
     *                   "customerId": 2,
     *                   "currencyId": 1,
     *                   "shippingZoneId": "",
     *                   "paymentZoneId": null,
     *                   "shippingCountryId": 99,
     *                   "paymentCountryId": null,
     *                   "invoiceNo": null,
     *                   "invoicePrefix": "INV",
     *                   "firstname": null,
     *                   "lastname": null,
     *                   "email": "piccotalent108@gmail.com",
     *                   "telephone": "8876567656",
     *                   "fax": null,
     *                   "shippingFirstname": "santhosh",
     *                   "shippingLastname": "",
     *                   "shippingCompany": "Santhosh",
     *                   "shippingAddress1": "Chennai",
     *                   "shippingAddress2": "Chennai",
     *                   "shippingCity": "Chennai",
     *                   "shippingPostcode": "606603",
     *                   "shippingCountry": "India",
     *                   "shippingZone": "Tamil Nadu",
     *                   "shippingAddressFormat": "",
     *                   "shippingMethod": null,
     *                   "paymentFirstname": "santhosh",
     *                   "paymentLastname": "",
     *                   "paymentCompany": "Santhosh",
     *                   "paymentAddress1": "Chennai",
     *                   "paymentAddress2": "Chennai",
     *                   "paymentCity": "Chennai",
     *                   "paymentPostcode": "606603",
     *                   "paymentCountry": "India",
     *                   "paymentZone": "Tamil Nadu",
     *                   "paymentAddressFormat": "",
     *                   "paymentMethod": "1",
     *                   "comment": null,
     *                   "couponCode": null,
     *                   "discountAmount": null,
     *                   "amount": null,
     *                   "total": null,
     *                   "reward": null,
     *                   "orderStatusId": 1,
     *                   "orderPrefixId": null,
     *                   "affiliateId": null,
     *                   "commision": null,
     *                   "currencyCode": "INR",
     *                   "currencyValue": null,
     *                   "currencySymbolLeft": "₹",
     *                   "currencySymbolRight": "",
     *                   "ip": "::1",
     *                   "paymentFlag": null,
     *                   "paymentStatus": 0,
     *                   "trackingUrl": null,
     *                   "trackingNo": null,
     *                   "orderName": null,
     *                   "paymentType": null,
     *                   "paymentProcess": 1,
     *                   "paymentDetails": null,
     *                   "backOrders": 0,
     *                   "isActive": 1,
     *                   "customerGstNo": ""
     *  }]
     * }
     * @apiSampleRequest /api/admin-vendor/:orderId
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:orderId')
    @Authorized()
    public async makeArchive(@Param('orderId') orderId: number, @BodyParam('archiveFlag') archiveFlag: number, @Req() request: any, @Res() response: any): Promise<any> {

        const order = await this.orderService.find({ where: { orderId } });
        if (!order) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }

        order.makeArchive = archiveFlag;
        const orderSave = await this.orderService.create(order);
        if (archiveFlag === 0) {
            const sucResponse: any = {
                status: 1,
                message: 'Successfully Revoked this order',
                data: orderSave,
            };
            return response.status(200).send(sucResponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Archived this product',
                data: orderSave,
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/order-export-pdf')
    @Authorized()
    public async orderExportPdf(@QueryParam('orderId') orderId: number, @QueryParam('vendorId') vendorId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId }, select: ['orderId', 'invoicePrefix', 'telephone', 'orderPrefixId', 'customerGstNo', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1', 'shippingAddress2', 'shippingCity',
                'shippingPostcode', 'shippingCountry', 'shippingZone', 'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'telephone',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        if (!orderData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Id',
            };
            return response.status(400).send(errorResponse);
        }
        const vendor = await this.vendorService.findOne({ where: { vendorId } });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Seller Id',
            };
            return response.status(400).send(errorResponse);
        }
        const invoice: any = await this.vendorInvoiceService.findOne({ where: { orderId, vendorId } });
        if (!invoice) {
            const orderProducts = await this.orderProductService.find({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'], where: { orderId } });
            for (const orderProduct of orderProducts) {
                const val = await this.vendorProductService.findOne({ where: { productId: orderProduct.productId } });
                if (val !== undefined) {
                    const newVendorInvoice: any = new VendorInvoice();
                    newVendorInvoice.vendorId = val.vendorId;
                    newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                    newVendorInvoice.orderId = orderData.orderId;
                    newVendorInvoice.email = orderData.email;
                    newVendorInvoice.total = 0;
                    newVendorInvoice.shippingFirstname = orderData.shippingFirstname;
                    newVendorInvoice.shippingLastname = orderData.shippingLastname;
                    await this.vendorInvoiceService.create(newVendorInvoice);
                    const vendorInvoiceData = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    vendorInvoiceData.total = vendorInvoiceData.total + +orderProduct.total;
                    const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                    vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                    await this.vendorInvoiceService.create(vendorInvoiceData);
                    const newVendorInvoiceItem = new VendorInvoiceItem();
                    newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                    newVendorInvoiceItem.orderProductId = orderProduct.orderProductId;
                    await this.vendorInvoiceItemService.create(newVendorInvoiceItem);
                }
            }
        }
        let amount = parseFloat('0.00');
        const invoiceData: any = await this.vendorInvoiceService.findOne({ where: { orderId, vendorId } });
        orderData.productList = await this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: invoiceData.vendorInvoiceId }, select: ['orderProductId', 'vendorInvoiceId', 'vendorInvoiceItemId'] }).then((val) => {
            const productVal = val.map(async (value: any) => {
                const vendorOrderProduct = await this.orderProductService.findOne({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'], where: { orderProductId: value.orderProductId } });
                const product = await this.productService.findOne({ select: ['sku', 'hsn'], where: { productId: vendorOrderProduct.productId } });
                const obj: any = {};
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
                } else {
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
            });
            const results = Promise.all(productVal);
            return results;
        });
        const settings: any = await this.settingService.findOne();
        const settingDetails = settings;
        orderData.vendor = vendor;
        orderData.currencyCode = orderData.currencyCode;
        orderData.symbolLeft = orderData.currencySymbolLeft;
        orderData.symbolRight = orderData.currencySymbolRight;
        orderData.invoiceNo = invoiceData.invoiceNo;
        orderData.invoicePrefix = invoiceData.invoicePrefix;
        let toWords;
        if (orderData.currencyCode === 'INR') {
            toWords = new ToWords({ localeCode: 'en-IN' });
        } else {
            toWords = new ToWords({ localeCode: 'en-US' });
        }
        const words = toWords.convert(amount, { currency: true });
        orderData.currencyInWords = words;
        let image: any;
        if (env.imageserver === 's3') {
            image = await this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '150', '150');
            const error = image?.name || '';
            if (error.toLowerCase() === 'error') {
                return response.status(400).json({
                    status: 0,
                    message: 'Invalid image in S3 bucket',
                });
            }
        } else {
            image = await this.imageService.resizeImageBase64(settingDetails.invoiceLogoPath + settingDetails.invoiceLogo, '150', '150');
        }
        orderData.logo = image;
        const htmlData = await this.pdfService.readHtmlToString('vendor-invoice', orderData);
        const pathName = `./Invoice_${invoiceData.invoiceNo + invoiceData.invoiceNo}.pdf`;
        await this.pdfService.htmlPdf(htmlData, pathName);
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
     *      "data":        {
     *       "vendorOrderId": "",
     *       "orderId": "",
     *       "vendorId": "",
     *       "subOrderId": "",
     *       "createdDate": "",
     *       "currencySymbolLeft": "",
     *       "currencySymbolRight": "",
     *       "customerFirstName": "",
     *       "paymentStatus": "",
     *       "total": "",
     *       "commission": "",
     *       "isActive": "",
     *       "shippingCity": "",
     *       "shippingCountry": "",
     *       "orderProductPrefixId": "",
     *       "orderStatusName": "",
     *       "orderColorCode": "",
     *       "companyName": "",
     *       "CommissionAmount": "",
     *       "NetAmount": ""
     *   }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-order/vendor-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-order-list')
    @Authorized(['admin', 'settlement order list'])
    public async orderListtt(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('vendorIds') vendorIds: string, @QueryParam('orderStatus') orderStatus: string,
        @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('amountFrom') amountFrom: string, @QueryParam('amountTo') amountTo: string,
        @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any, @QueryParam('companyName') companyName: string): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'VendorOrders.vendorOrderId as vendorOrderId',
            'VendorOrders.orderId as orderId',
            'VendorOrders.vendorId as vendorId',
            'VendorOrders.subOrderId as subOrderId',
            'orderDetail.createdDate as createdDate',
            'orderDetail.modifiedDate as modifiedDate',
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
            'vendor.companyName as companyName'];

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

        if (companyName?.trim()) {
            searchConditions.push({
                name: ['vendor.companyName'],
                value: companyName.toLowerCase(),
            });
        }

        const sort = [];
        sort.push({
            name: 'orderDetail.createdDate',
            order: 'DESC',
        });

        if (count) {
            const orderCount = await this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successCount: any = {
                status: 1,
                message: 'Successfully got the seller order count',
                data: orderCount,
            };
            return response.status(200).send(successCount);
        }

        const orderList: any = await this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const temp: any = value;
            const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
            const commission = value.total * (defCommission / 100);
            temp.CommissionAmount = commission.toFixed(2);
            temp.NetAmount = value.total - temp.CommissionAmount;
            return temp;
        });
        const paymentListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order list',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }
}
