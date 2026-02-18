"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCouponController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const VendorCouponService_1 = require("../../service/VendorCouponService");
const VendorCoupon_1 = require("../../models/VendorCoupon");
const VendorCouponProductCategoryService_1 = require("../../service/VendorCouponProductCategoryService");
const VendorCouponProductCategory_1 = require("../../models/VendorCouponProductCategory");
const CreateCouponRequest_1 = require("../../../../src/api/vendor/controllers/requests/CreateCouponRequest");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const CouponUsageProductService_1 = require("../../service/CouponUsageProductService");
const UpdateCouponRequest_1 = require("../../../../src/api/vendor/controllers/requests/UpdateCouponRequest");
const CouponUsageService_1 = require("../../service/CouponUsageService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typedi_1 = require("typedi");
let VendorCouponController = class VendorCouponController {
    constructor(vendorCouponService, vendorCouponProductCategoryService, couponUsageProductService, productService, couponUsageService) {
        this.vendorCouponService = vendorCouponService;
        this.vendorCouponProductCategoryService = vendorCouponProductCategoryService;
        this.couponUsageProductService = couponUsageProductService;
        this.productService = productService;
        this.couponUsageService = couponUsageService;
    }
    // Create Coupon
    /**
     * @api {post} /api/vendor-coupon/add-coupon Add Vendor Coupon API
     * @apiGroup vendor coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} couponName couponName
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {String} couponType couponType 1-> percentage 2 -> amount
     * @apiParam (Request body) {Number} discount discount
     * @apiParam (Request body) {Number} minimumPurchaseAmount minimumPurchaseAmount
     * @apiParam (Request body) {Number} maximumPurchaseAmount maximumPurchaseAmount
     * @apiParam (Request body) {Number} [couponConjunction] couponConjunction 1->yes 0->no
     * @apiParam (Request body) {Number} [couponAppliesSales] couponAppliesSales 1->yes 0->no
     * @apiParam (Request body) {String} [emailRestrictions] emailRestrictions
     * @apiParam (Request body) {Number} [applicableFor] applicableFor 1-> loginUser
     * @apiParam (Request body) {Number} [freeShipping] freeShipping 1-> yes 0 -> no
     * @apiParam (Request body) {String} [startDate] startDate
     * @apiParam (Request body) {String} [endDate] endDate
     * @apiParam (Request body) {Number} maxUserPerCoupon maximumUserPerCoupon
     * @apiParam (Request body) {Number} noOfTimeCouponValidPerUser noOfTimeCouponValidPerUser
     * @apiParam (Request body) {Number} [allQualifyingItemsApply] allQualifyingItemsApply
     * @apiParam (Request body) {Number} [appliedCartItemsCount] appliedCartItemsCount
     * @apiParam (Request body) {Number} [productType] productType
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "couponName" : "",
     *      "couponCode" : "",
     *      "couponType" : "",
     *      "discount" : 1,
     *      "minimumPurchaseAmount" : 1,
     *      "maximumPurchaseAmount" : 1,
     *      "couponConjunction" : 1,
     *      "couponAppliesSales" : 1,
     *      "emailRestrictions" : "",
     *      "applicableFor" : 1,
     *      "freeShipping" : 1,
     *      "startDate" : "",
     *      "endDate" : "",
     *      "maxUserPerCoupon" : 1,
     *      "noOfTimeCouponValidPerUser" : 1,
     *      "allQualifyingItemsApply" : 1,
     *      "appliedCartItemsCount" : 1,
     *      "productType" : [
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *              ],
     *      "status" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Coupon Saved successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-coupon/add-coupon
     * @apiErrorExample {json} CreateCoupon error
     * HTTP/1.1 500 Internal Server Error
     */
    createCoupon(couponParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const error = [];
            const orderProducts = couponParam.productType;
            if (+couponParam.couponType === 1 && +couponParam.discount > 100) {
                return response.status(400).send({
                    status: 0,
                    message: 'Coupon Discount percentage must be less than or equal to 100',
                });
            }
            for (const val of orderProducts) {
                const product = val.referenceId;
                for (const productId of product) {
                    const value = yield this.productService.findOne({ where: { productId } });
                    if (couponParam.couponType === 2) {
                        if (+value.price < couponParam.discount) {
                            error.push(1);
                        }
                    }
                }
            }
            if (error.length > 0) {
                const errResponse = {
                    status: 0,
                    message: 'Product price cannot be less than the discount price.',
                };
                return response.status(400).send(errResponse);
            }
            const vendorCouponCode = yield this.vendorCouponService.findOne({ where: { couponCode: couponParam.couponCode } });
            if (vendorCouponCode) {
                const errorResponse = {
                    status: 1,
                    message: 'A coupon with this code already exists.',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorCoupon = new VendorCoupon_1.VendorCoupon();
            vendorCoupon.vendorId = request.user.vendorId;
            vendorCoupon.couponName = couponParam.couponName;
            vendorCoupon.couponCode = couponParam.couponCode;
            vendorCoupon.couponType = couponParam.couponType ? couponParam.couponType : 1;
            vendorCoupon.discount = couponParam.discount;
            vendorCoupon.minimumPurchaseAmount = couponParam.minimumPurchaseAmount;
            vendorCoupon.maximumPurchaseAmount = couponParam.maximumPurchaseAmount;
            vendorCoupon.couponConjunction = couponParam.couponConjunction;
            vendorCoupon.couponAppliesSales = couponParam.couponAppliesSales;
            vendorCoupon.isActive = couponParam.status;
            vendorCoupon.emailRestrictions = couponParam.emailRestrictions;
            vendorCoupon.freeShipping = couponParam.freeShipping ? couponParam.freeShipping : 0;
            vendorCoupon.startDate = couponParam.startDate;
            vendorCoupon.endDate = couponParam.endDate;
            vendorCoupon.maxUserPerCoupon = couponParam.maxUserPerCoupon ? couponParam.maxUserPerCoupon : 0;
            vendorCoupon.noOfTimeCouponValidUser = couponParam.noOfTimeCouponValidPerUser ? couponParam.noOfTimeCouponValidPerUser : 0;
            vendorCoupon.allQualifyingItemsApply = couponParam.allQualifyingItemsApply ? couponParam.allQualifyingItemsApply : 0;
            vendorCoupon.appliedCartItemsCount = couponParam.appliedCartItemsCount ? couponParam.appliedCartItemsCount : 0;
            const createVendorCoupon = yield this.vendorCouponService.create(vendorCoupon);
            let reference = [];
            reference = couponParam.productType;
            for (const record of reference) {
                let productId = [];
                productId = record.referenceId;
                for (const rec of productId) {
                    const vendorCouponProductCategory = new VendorCouponProductCategory_1.VendorCouponProductCategory();
                    vendorCouponProductCategory.type = record.type;
                    vendorCouponProductCategory.vendorCouponId = createVendorCoupon.vendorCouponId;
                    vendorCouponProductCategory.referenceId = rec;
                    yield this.vendorCouponProductCategoryService.create(vendorCouponProductCategory);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Coupon Saved successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Coupon List API
    /**
     * @api {get} /api/vendor-coupon/vendor-coupon-list Vendor Coupon List API
     * @apiGroup vendor coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword Enter Coupon Name
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : 1,
     *      "offset" : 1,
     *      "keyword" : "",
     *      "count" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Vendor Coupon List Successfully"
     *      "data" : "{
     *       "vendorCouponId": 1,
     *       "vendorId": 1,
     *       "couponName": "",
     *       "couponCode": "",
     *       "couponType": "",
     *       "discount": 1,
     *       "startDate": "",
     *       "endDate": "",
     *       "isActive": 1,
     *       "orders": "",
     *       "leftDays": ""
     *   }
     * }
     * @apiSampleRequest /api/vendor-coupon/vendor-coupon-list
     * @apiErrorExample {json} Vendor Coupon List API error
     * HTTP/1.1 500 Internal Server Error
     */
    listVendorCoupon(limit, offset, status, keyword, startDate, endDate, count, discount, couponName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = (0, moment_1.default)(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = (0, moment_1.default)(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = ['VendorCoupon.vendorCouponId as vendorCouponId', 'VendorCoupon.vendorId as vendorId', 'VendorCoupon.couponName as couponName', 'VendorCoupon.couponCode as couponCode', 'VendorCoupon.couponType as couponType', 'VendorCoupon.discount as discount', 'VendorCoupon.startDate as startDate', 'VendorCoupon.endDate as endDate', 'VendorCoupon.isActive as isActive'];
            const WhereConditions = [
                {
                    name: 'VendorCoupon.vendorId',
                    op: 'where',
                    value: request.user.vendorId,
                },
            ];
            if (status === '0' || status === '1') {
                WhereConditions.push({
                    name: 'VendorCoupon.isActive',
                    op: 'and',
                    value: +status,
                });
            }
            if (startDate && startDate !== '') {
                WhereConditions.push({
                    name: 'VendorCoupon.startDate',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                WhereConditions.push({
                    name: 'VendorCoupon.endDate',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const search = [];
            const sort = [
                {
                    name: 'VendorCoupon.createdDate',
                    order: 'DESC',
                },
            ];
            if (couponName && couponName !== '') {
                search.push({
                    name: ['VendorCoupon.couponName'],
                    value: couponName.toLowerCase(),
                });
            }
            if (discount && discount !== '') {
                search.push({
                    name: ['VendorCoupon.discount'],
                    value: discount.toLowerCase(),
                });
            }
            if (keyword) {
                search.push({
                    name: ['VendorCoupon.couponName', 'VendorCoupon.discount'],
                    value: keyword.toLowerCase(),
                });
            }
            const listVendorCoupon = yield this.vendorCouponService.listByQueryBuilder(limit, offset, select, WhereConditions, search, [], [], sort, count, true);
            if (listVendorCoupon.length >= 0) {
                const list = listVendorCoupon.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const couponUsage = yield this.couponUsageService.findAll({
                        select: ['couponUsageId'],
                        where: {
                            couponId: value.vendorCouponId,
                        },
                    });
                    temp.orders = couponUsage.length;
                    const date2 = new Date(temp.endDate);
                    const nowDate = new Date();
                    const days = date2.getTime() - nowDate.getTime();
                    const daysDifference = days / (1000 * 3600 * 24);
                    if (temp.endDate >= nowDate) {
                        temp.leftDays = Math.round(daysDifference);
                    }
                    else {
                        temp.leftDays = 'Expired';
                    }
                    return temp;
                }));
                const results = yield Promise.all(list);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got vendor Coupon list',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got vendor Coupon list',
                    data: listVendorCoupon,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Coupon Usage List API
    /**
     * @api {get} /api/vendor-coupon/coupon-usage-list Coupon Usage list API
     * @apiGroup vendor coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} couponId couponId
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : 1,
     *      "offset" : 1,
     *      "couponId" : 1,
     *      "count" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *       "status": "",
     *       "message": "coupon usage List Successfully",
     *       "data" : {
     *       "couponUsageId": 1,
     *       "orderId": 1,
     *       "customerId": 1,
     *       "orderProductId": 1,
     *       "quantity": 1,
     *       "amount": 1,
     *       "discountAmount": 1,
     *       "productName": "",
     *       "orderProductPrefixId": "",
     *       "shippingFirstName": "",
     *       "discountedPrice": ""
     *   }
     * }
     * @apiSampleRequest /api/vendor-coupon/coupon-usage-list
     * @apiErrorExample {json} Vendor Coupon List API error
     * HTTP/1.1 500 Internal Server Error
     */
    CouponUsageList(limit, offset, couponId, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'CouponUsageProduct.couponUsageId as couponUsageId',
                'CouponUsageProduct.orderId as orderId',
                'CouponUsageProduct.customerId as customerId',
                'CouponUsageProduct.orderProductId as orderProductId',
                'CouponUsageProduct.quantity as quantity',
                'CouponUsageProduct.amount as amount',
                'CouponUsageProduct.discountAmount as discountAmount',
                'orderProduct.name as productName',
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'order.orderId as orderId',
                'order.shippingFirstname as shippingFirstName',
            ];
            const relations = [
                {
                    tableName: 'OrderProduct',
                    aliasName: 'orderProduct',
                    condition: 'orderProduct.orderProductId = CouponUsageProduct.id',
                },
                {
                    tableName: 'CouponUsage',
                    aliasName: 'couponUsage',
                    condition: 'couponUsage.couponUsageId = CouponUsageProduct.id ',
                },
                {
                    tableName: 'Order',
                    aliasName: 'order',
                    condition: 'order.orderId = CouponUsageProduct.id',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'couponUsage.couponId',
                op: 'and',
                value: couponId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'CouponUsageProduct.createdDate',
                order: 'DESC',
            });
            if (count) {
                const listCouponCount = yield this.couponUsageProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const countResponse = {
                    status: 1,
                    message: 'Successfully got Coupon Usage count',
                    data: listCouponCount,
                };
                return response.status(200).send(countResponse);
            }
            const listVendorCoupon = yield this.couponUsageProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const list = listVendorCoupon.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                temp.discountedPrice = (value.amount * value.quantity) - (+value.discountAmount);
                return temp;
            }));
            const results = yield Promise.all(list);
            const successResponse = {
                status: 1,
                message: 'Successfully got coupon Usage list',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Coupon Detail API
    /**
     * @api {get} /api/vendor-coupon/vendor-coupon-detail Vendor Coupon Detail API
     * @apiGroup vendor coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorCouponId VendorCouponId
     * @apiParamExample {json} Input
     * {
     *      "vendorCouponId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully got vendor coupon detail",
     *      "data" : {
     *      "createdBy": 1,
     *      "createdDate": "",
     *      "modifiedBy": 1,
     *      "modifiedDate": "",
     *      "vendorCouponId": 1,
     *      "vendorId": 1,
     *      "couponName": "",
     *      "couponCode": "",
     *      "couponType": "",
     *      "discount": 1,
     *      "minimumPurchaseAmount": 1,
     *      "maximumPurchaseAmount": 1,
     *      "couponConjunction": "1,
     *      "couponAppliesSales": "",
     *      "emailRestrictions": "",
     *      "applicableFor": "",
     *      "freeShipping": "",
     *      "startDate": "",
     *      "endDate": "",
     *      "maxUserPerCoupon": 1,
     *      "noOfTimeCouponValidUser": "",
     *      "allQualifyingItemsApply": "",
     *      "appliedCartItemsCount": "",
     *      "isActive": 1,
     *      "applicableProduct": [
     *        {
     *           "type": "",
     *           "productId": 1,
     *           "productName": ""
     *       }
     *   ]
     *  }
     * }
     * @apiSampleRequest /api/vendor-coupon/vendor-coupon-detail
     * @apiErrorExample {json} Vendor Coupon Detail API error
     * HTTP/1.1 500 Internal Server Error
     */
    couponDetail(vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const coupon = yield this.vendorCouponService.findOne({
                where: {
                    vendorCouponId, vendorId: request.user.vendorId,
                },
            });
            if (!coupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id',
                };
                return response.status(400).send(errorResponse);
            }
            const couponProduct = yield this.vendorCouponProductCategoryService.findAll({
                where: {
                    vendorCouponId,
                },
            });
            const applicableProduct = [];
            // type 1 applicable product
            for (const data of couponProduct) {
                const obj = {};
                if (data.type === 1) {
                    const product = yield this.productService.findOne({
                        where: {
                            productId: data.referenceId,
                        },
                    });
                    if (product) {
                        obj.type = data.type;
                        obj.productId = data.referenceId;
                        obj.productName = product.name;
                        applicableProduct.push(obj);
                    }
                }
            }
            coupon.applicableProduct = applicableProduct;
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor Coupon Detail. ',
                data: coupon,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Vendor Coupon
    /**
     * @api {put} /api/vendor-coupon/update-vendor-coupon/:vendorCouponId Edit Vendor Coupon API
     * @apiGroup vendor coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} couponName couponName
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {String} [couponType] couponType 1-> percentage 2 -> amount
     * @apiParam (Request body) {Number} [discount] discount
     * @apiParam (Request body) {Number} [minimumPurchaseAmount] minimumPurchaseAmount
     * @apiParam (Request body) {Number} [maximumPurchaseAmount] maximumPurchaseAmount
     * @apiParam (Request body) {Number} [couponConjunction] couponConjunction 1->yes 0->no
     * @apiParam (Request body) {Number} [couponAppliesSales] couponAppliesSales 1->yes 0->no
     * @apiParam (Request body) {String} [emailRestrictions] emailRestrictions
     * @apiParam (Request body) {Number} [applicableFor] applicableFor 1-> loginUser
     * @apiParam (Request body) {Number} [freeShipping] freeShipping 1-> yes 0 -> no
     * @apiParam (Request body) {String} [startDate] startDate
     * @apiParam (Request body) {String} [endDate] endDate
     * @apiParam (Request body) {Number} [maxUserPerCoupon] maximumUserPerCoupon
     * @apiParam (Request body) {Number} [noOfTimeCouponValidPerUser] noOfTimeCouponValidPerUser
     * @apiParam (Request body) {Number} [allQualifyingItemsApply] allQualifyingItemsApply
     * @apiParam (Request body) {Number} [appliedCartItemsCount] appliedCartItemsCount
     * @apiParam (Request body) {Number} [productType] productType
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "couponName" : "",
     *      "couponCode" : "",
     *      "couponType" : "",
     *      "discount" : 1,
     *      "minimumPurchaseAmount" : 1,
     *      "maximumPurchaseAmount" : 1,
     *      "couponConjunction" : 1,
     *      "couponAppliesSales" : "",
     *      "emailRestrictions" : "",
     *      "applicableFor" : 1,
     *      "freeShipping" : 1,
     *      "startDate" : "",
     *      "endDate" : "",
     *      "maxUserPerCoupon" : 1,
     *      "noOfTimeCouponValidPerUser" : 1,
     *      "allQualifyingItemsApply" : 1,
     *      "appliedCartItemsCount" : 1,
     *      "productType" : [
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *              ],
     *      "status" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Coupon updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-coupon/update-vendor-coupon/:vendorCouponId
     * @apiErrorExample {json} Coupon error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCoupon(couponParam, vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const error = [];
            const orderProducts = couponParam.productType;
            if (+couponParam.couponType === 1 && +couponParam.discount > 100) {
                return response.status(400).send({
                    status: 0,
                    message: 'Coupon Discount percentage must be less than or equal to 100',
                });
            }
            for (const val of orderProducts) {
                let product = [];
                product = val.referenceId;
                for (const productId of product) {
                    const value = yield this.productService.findOne({ where: { productId } });
                    if (couponParam.couponType === 2) {
                        if (!(+value.price > couponParam.discount)) {
                            error.push(1);
                        }
                    }
                }
            }
            if (error.length > 0) {
                const errResponse = {
                    status: 0,
                    message: 'Product price cannot be less than the discount price.',
                };
                return response.status(400).send(errResponse);
            }
            const vendorCoupon = yield this.vendorCouponService.findOne({ where: { vendorCouponId, vendorId: request.user.vendorId } });
            if (!vendorCoupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id.',
                };
                return response.status(400).send(errorResponse);
            }
            vendorCoupon.vendorId = request.user.vendorId;
            vendorCoupon.couponName = couponParam.couponName;
            vendorCoupon.couponCode = couponParam.couponCode;
            vendorCoupon.couponType = couponParam.couponType ? couponParam.couponType : 1;
            vendorCoupon.discount = couponParam.discount;
            vendorCoupon.minimumPurchaseAmount = couponParam.minimumPurchaseAmount;
            vendorCoupon.maximumPurchaseAmount = couponParam.maximumPurchaseAmount;
            vendorCoupon.couponConjunction = couponParam.couponConjunction;
            vendorCoupon.couponAppliesSales = couponParam.couponAppliesSales;
            vendorCoupon.isActive = couponParam.status;
            vendorCoupon.emailRestrictions = couponParam.emailRestrictions;
            vendorCoupon.freeShipping = couponParam.freeShipping ? couponParam.freeShipping : 0;
            vendorCoupon.startDate = couponParam.startDate;
            vendorCoupon.endDate = couponParam.endDate;
            vendorCoupon.maxUserPerCoupon = couponParam.maxUserPerCoupon;
            vendorCoupon.noOfTimeCouponValidUser = couponParam.noOfTimeCouponValidPerUser;
            vendorCoupon.allQualifyingItemsApply = couponParam.allQualifyingItemsApply;
            vendorCoupon.appliedCartItemsCount = couponParam.appliedCartItemsCount ? couponParam.appliedCartItemsCount : 0;
            const vendorCouponCode = yield this.vendorCouponService.findOne({
                where: {
                    couponCode: couponParam.couponCode,
                    vendorCouponId: (0, typeorm_1.Not)(vendorCouponId),
                },
            });
            if (vendorCouponCode) {
                const errorResponse = {
                    status: 1,
                    message: 'A coupon with this code already exists.',
                };
                return response.status(400).send(errorResponse);
            }
            const createVendorCoupon = yield this.vendorCouponService.update(vendorCoupon.vendorCouponId, vendorCoupon);
            const couponProduct = yield this.vendorCouponProductCategoryService.findAll({
                where: {
                    vendorCouponId,
                },
            });
            if (!couponProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id.',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.vendorCouponProductCategoryService.delete({ id: couponProduct.vendorCouponId });
            let reference = [];
            reference = couponParam.productType;
            for (const record of reference) {
                let productId = [];
                productId = record.referenceId;
                for (const rec of productId) {
                    const vendorCouponProductCategory = new VendorCouponProductCategory_1.VendorCouponProductCategory();
                    vendorCouponProductCategory.type = record.type;
                    vendorCouponProductCategory.vendorCouponId = createVendorCoupon.vendorCouponId;
                    vendorCouponProductCategory.referenceId = rec;
                    yield this.vendorCouponProductCategoryService.create(vendorCouponProductCategory);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Coupon Updated Successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Updating Coupon Status
    /**
     * @api {put} /api/vendor-coupon/status-update Update Coupon status API
     * @apiGroup vendor coupon
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} id  id
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "status" : 1,
     *      "id" : "1",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Coupon Status Updated Successfully.",
     *  }
     * @apiSampleRequest /api/vendor-coupon/status-update
     * @apiErrorExample {json} updateContact error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCouponStatus(couponId, status, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereConditions = [];
            whereConditions.push({
                name: 'vendorCouponId',
                op: 'and',
                value: (0, typeorm_1.In)(couponId),
            });
            whereConditions.push({
                name: 'vendorId',
                op: 'and',
                value: request.user.vendorId,
            });
            const couponList = yield this.vendorCouponService.list(0, 0, 0, [], whereConditions, false);
            couponList.map((coupon => coupon.isActive = status));
            yield this.vendorCouponService.create(couponList);
            return response.status(200).send({
                status: 1,
                message: 'Coupon Status Updated Successfully.',
                data: couponList,
            });
        });
    }
    // Delete Vendor Coupon API
    /**
     * @api {delete} /api/vendor-coupon/delete-vendor-coupon/:vendorCouponId Delete Vendor Coupon API
     * @apiGroup vendor coupon
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendorCouponId" : number,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor coupon.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-coupon/delete-vendor-coupon/:vendorCouponId
     * @apiErrorExample {json} Delete Vendor Coupon API error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteVendorCoupon(vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorCoupon = yield this.vendorCouponService.findOne({
                where: {
                    vendorCouponId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorCoupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteVendorCoupon = yield this.vendorCouponService.delete({ vendorCouponId: vendorCoupon.vendorCouponId });
            if (deleteVendorCoupon) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the Vendor Coupon.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the Vendor Coupon.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
exports.VendorCouponController = VendorCouponController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-coupon'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCouponRequest_1.CreateCouponRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponController.prototype, "createCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-coupon-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('discount')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('couponName')),
    tslib_1.__param(9, (0, routing_controllers_1.Req)()),
    tslib_1.__param(10, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Object, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponController.prototype, "listVendorCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/coupon-usage-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('couponId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponController.prototype, "CouponUsageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-coupon-detail'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorCouponId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponController.prototype, "couponDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-vendor-coupon/:vendorCouponId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('vendorCouponId')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCouponRequest_1.UpdateCouponRequest, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponController.prototype, "updateCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/status-update'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponController.prototype, "updateCouponStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-vendor-coupon/:vendorCouponId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('vendorCouponId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponController.prototype, "deleteVendorCoupon", null);
exports.VendorCouponController = VendorCouponController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-coupon'),
    tslib_1.__metadata("design:paramtypes", [VendorCouponService_1.VendorCouponService,
        VendorCouponProductCategoryService_1.VendorCouponProductCategoryService,
        CouponUsageProductService_1.CouponUsageProductService,
        ProductService_1.ProductService,
        CouponUsageService_1.CouponUsageService])
], VendorCouponController);
//# sourceMappingURL=CouponController.js.map