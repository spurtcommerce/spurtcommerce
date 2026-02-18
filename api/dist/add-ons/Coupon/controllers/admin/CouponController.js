"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const VendorCouponService_1 = require("../../service/VendorCouponService");
const VendorCoupon_1 = require("../../models/VendorCoupon");
const VendorCouponProductCategoryService_1 = require("../../service/VendorCouponProductCategoryService");
const VendorCouponProductCategory_1 = require("../../models/VendorCouponProductCategory");
const CreateCouponRequest_1 = require("./requests/CreateCouponRequest");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const CouponUsageProductService_1 = require("../../service/CouponUsageProductService");
const UpdateCouponRequest_1 = require("./requests/UpdateCouponRequest");
const CouponUsageService_1 = require("../../service/CouponUsageService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const ProductSpecialService_1 = require("../../../../src/api/core/services/ProductSpecialService");
const ProductDiscountService_1 = require("../../../../src/api/core/services/ProductDiscountService");
const fs = tslib_1.__importStar(require("fs"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let CouponController = class CouponController {
    constructor(vendorCouponService, vendorCouponProductCategoryService, couponUsageProductService, productService, couponUsageService, productSpecialService, productDiscountService, productImageService) {
        this.vendorCouponService = vendorCouponService;
        this.vendorCouponProductCategoryService = vendorCouponProductCategoryService;
        this.couponUsageProductService = couponUsageProductService;
        this.productService = productService;
        this.couponUsageService = couponUsageService;
        this.productSpecialService = productSpecialService;
        this.productDiscountService = productDiscountService;
        this.productImageService = productImageService;
    }
    // Create Coupon
    /**
     * @api {post} /api/admin-coupon/add-coupon Add Vendor Coupon API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} couponName couponName
     * @apiParam (Request body) {String{..30}} couponCode couponCode
     * @apiParam (Request body) {String} couponType couponType 1-> percentage 2 -> amount
     * @apiParam (Request body) {Number} discount discount
     * @apiParam (Request body) {Number} minimumPurchaseAmount minimumPurchaseAmount
     * @apiParam (Request body) {Number} maximumPurchaseAmount maximumPurchaseAmount
     * @apiParam (Request body) {Number} [couponConjunction] couponConjunction 1->yes 0->no
     * @apiParam (Request body) {Number} [couponAppliesSales] couponAppliesSales 1->yes 0->no
     * @apiParam (Request body) {String{..255}} emailRestrictions emailRestrictions
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
     *      "couponType" : 1,
     *      "discount" : 1,
     *      "minimumPurchaseAmount" : "",
     *      "maximumPurchaseAmount" : "",
     *      "couponConjunction" : 1,
     *      "couponAppliesSales" : "",
     *      "emailRestrictions" : "",
     *      "applicableFor" : "",
     *      "freeShipping" : "",
     *      "startDate" : "",
     *      "endDate" : "",
     *      "maxUserPerCoupon" : "",
     *      "noOfTimeCouponValidPerUser" : "",
     *      "allQualifyingItemsApply" : "",
     *      "appliedCartItemsCount" : "",
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
     *      "message": "Coupon created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-coupon/add-coupon
     * @apiErrorExample {json} Coupon error
     * HTTP/1.1 500 Internal Server Error
     */
    createCoupon(couponParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const price = couponParam.discount;
            const minimumPurchaseAmount = couponParam.minimumPurchaseAmount;
            const maximumPurchaseAmount = couponParam.maximumPurchaseAmount;
            const noOfTimeCouponValidPerUser = couponParam.noOfTimeCouponValidPerUser;
            const maxUserPerCoupon = couponParam.maxUserPerCoupon;
            const appliedCartItemsCount = couponParam.appliedCartItemsCount;
            if (+price < 0 || +maximumPurchaseAmount < 0 || +minimumPurchaseAmount < 0 || +noOfTimeCouponValidPerUser < 0
                || maxUserPerCoupon < 0 || appliedCartItemsCount < 0) {
                const priceErrResponse = {
                    status: 0,
                    message: 'Negative values should not be allowed',
                };
                return response.status(400).send(priceErrResponse);
            }
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
                    message: 'Invalid product as the product price is less than the discount amount. ',
                };
                return response.status(400).send(errResponse);
            }
            const vendorCouponCode = yield this.vendorCouponService.findOne({ where: { couponCode: couponParam.couponCode } });
            if (vendorCouponCode) {
                const errorResponse = {
                    status: 1,
                    message: 'Already there is a coupon with this code.',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorCoupon = new VendorCoupon_1.VendorCoupon();
            vendorCoupon.vendorId = 0;
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
            const startDate = (0, moment_1.default)(couponParam.startDate).format('YYYY-MM-DD HH:mm:ss');
            vendorCoupon.startDate = startDate;
            const endDate = (0, moment_1.default)(couponParam.endDate).format('YYYY-MM-DD HH:mm:ss');
            vendorCoupon.endDate = endDate;
            vendorCoupon.maxUserPerCoupon = couponParam.maxUserPerCoupon;
            vendorCoupon.noOfTimeCouponValidUser = couponParam.noOfTimeCouponValidPerUser;
            vendorCoupon.allQualifyingItemsApply = couponParam.allQualifyingItemsApply ? couponParam.appliedCartItemsCount : 0;
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
                message: 'Coupon Created Successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Coupon List API
    /**
     * @api {get} /api/admin-coupon/admin-coupon-list Admin Vendor Coupon List API
     * @apiGroup Admin Coupon
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
     *      "status" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Vendor Coupon List Successfully"
     *      "data" : {
     *       "createdDate": "",
     *       "vendorCouponId": ,
     *       "vendorId": "",
     *       "couponName": "",
     *       "couponCode": "",
     *       "couponType": "",
     *       "discount": "",
     *       "startDate": "",
     *       "endDate": "",
     *       "isActive": "",
     *       "orders": "",
     *       "leftDays": ""
     *   }
     * }
     * @apiSampleRequest /api/admin-coupon/admin-coupon-list
     * @apiErrorExample {json}  Coupon List API error
     * HTTP/1.1 500 Internal Server Error
     */
    listVendorCoupon(limit, offset, keyword, couponName, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['vendorCouponId', 'vendorId', 'couponName', 'couponCode', 'couponType', 'discount', 'startDate', 'endDate', 'isActive', 'createdDate', 'modifiedDate'];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: 0,
                },
            ];
            if (status === '0' || status === '1') {
                WhereConditions.push({
                    name: 'isActive',
                    op: 'where',
                    value: +status,
                });
            }
            const search = [];
            if (keyword) {
                search.push({
                    name: 'couponName',
                    op: 'like',
                    value: keyword,
                });
            }
            if (couponName) {
                search.push({
                    name: 'couponName',
                    op: 'like',
                    value: couponName,
                });
            }
            const listVendorCoupon = yield this.vendorCouponService.list(limit, offset, select, search, WhereConditions, count);
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
                    if ((Math.round(daysDifference) >= 0)) {
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
     * @api {get} /api/admin-coupon/coupon-usage-list Coupon Usage list API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} couponId couponId
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "coupon usage List Successfully"
     *      "data" : {
     *       "couponUsageId": 1,
     *       "orderId": 1,
     *       "customerId": 1,
     *       "orderProductId": 1,
     *       "quantity": 1,
     *       "amount": "",
     *       "discountAmount": "",
     *       "productName": "",
     *       "orderProductPrefixId": "",
     *       "shippingFirstName": "",
     *       "discountedPrice": ""
     *   },
     * }
     * @apiSampleRequest /api/admin-coupon/coupon-usage-list
     * @apiErrorExample {json} Vendor Coupon Usage List API error
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
            if (couponId && couponId !== 0) {
                whereConditions.push({
                    name: 'couponUsage.couponId',
                    op: 'and',
                    value: +couponId,
                });
            }
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
                temp.discountedPrice = value.amount - (+value.discountAmount);
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
     * @api {get} /api/admin-coupon/coupon-detail Coupon Detail API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorCouponId VendorCouponId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *       "status": "1",
     *       "message": "Successfully got vendor coupon detail",
     *       "data" : {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "vendorCouponId": 1,
     *       "vendorId": 1,
     *       "couponName": "",
     *       "couponCode": "",
     *       "couponType": "",
     *       "discount": 1,
     *       "minimumPurchaseAmount": 1,
     *       "maximumPurchaseAmount": 1,
     *       "couponConjunction": 1,
     *       "couponAppliesSales": "",
     *       "emailRestrictions": "",
     *       "applicableFor": "",
     *       "freeShipping": "",
     *       "startDate": "",
     *       "endDate": "",
     *       "maxUserPerCoupon": "",
     *       "noOfTimeCouponValidUser": "",
     *       "allQualifyingItemsApply": "",
     *       "appliedCartItemsCount": 1,
     *       "isActive": 1,
     *       "applicableProduct": [
     *           {
     *               "productId": 1,
     *               "sku": "",
     *               "name": "",
     *               "quantity": 1,
     *               "price": "",
     *               "image": "",
     *               "imagePath": "",
     *               "isFeatured": "",
     *               "todayDeals": "",
     *               "productSlug": "",
     *               "isActive": 1,
     *               "productImage": {
     *                   "createdBy": 1,
     *                   "createdDate": "",
     *                   "modifiedBy": 1,
     *                   "modifiedDate": "",
     *                   "productImageId": 1,
     *                   "productId": 1,
     *                   "image": 1,
     *                   "containerName": "",
     *                   "sortOrder": "",
     *                   "defaultImage": "",
     *                   "isActive": 1
     *               },
     *               "pricerefer": "",
     *               "flag": ""
     *           }
     *       ]
     *  }
     * }
     * @apiSampleRequest /api/admin-coupon/coupon-detail
     * @apiErrorExample {json} Vendor Coupon Detail API error
     * HTTP/1.1 500 Internal Server Error
     */
    couponDetail(vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const coupon = yield this.vendorCouponService.findOne({
                where: {
                    vendorCouponId,
                },
            });
            if (!coupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid VendorCouponId',
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
                        select: ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'isFeatured', 'todayDeals', 'productSlug', 'isActive'],
                        where: {
                            productId: data.referenceId,
                        },
                    });
                    if (product) {
                        obj.productId = product.productId;
                        obj.sku = product.sku;
                        obj.name = product.name;
                        obj.quantity = product.quantity;
                        obj.price = product.price;
                        obj.image = product.image;
                        obj.imagePath = product.imagePath;
                        obj.isFeatured = product.isFeatured;
                        obj.todayDeals = product.todayDeals;
                        obj.productSlug = product.productSlug;
                        obj.isActive = product.isActive;
                        const defaultValue = yield this.productImageService.findOne({
                            where: {
                                productId: product.productId,
                                defaultImage: 1,
                            },
                        });
                        obj.productImage = defaultValue;
                        const nowDate = new Date();
                        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPrice(product.productId, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPrice(product.productId, todaydate);
                        if (productSpecial !== undefined) {
                            obj.pricerefer = productSpecial.price;
                            obj.flag = 1;
                        }
                        else if (productDiscount !== undefined) {
                            obj.pricerefer = productDiscount.price;
                            obj.flag = 0;
                        }
                        applicableProduct.push(obj);
                    }
                }
            }
            coupon.applicableProduct = applicableProduct;
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor Coupon Detail.',
                data: coupon,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Vendor Coupon
    /**
     * @api {put} /api/admin-coupon/update-coupon/:vendorCouponId Edit Vendor Coupon API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} couponName couponName
     * @apiParam (Request body) {String{..32}} couponCode couponCode
     * @apiParam (Request body) {String} couponType couponType 1-> percentage 2 -> amount
     * @apiParam (Request body) {Number} discount discount
     * @apiParam (Request body) {Number} minimumPurchaseAmount minimumPurchaseAmount
     * @apiParam (Request body) {Number} maximumPurchaseAmount maximumPurchaseAmount
     * @apiParam (Request body) {Number} [couponConjunction] couponConjunction 1->yes 0->no
     * @apiParam (Request body) {Number} [couponAppliesSales] couponAppliesSales 1->yes 0->no
     * @apiParam (Request body) {String{..255}} emailRestrictions emailRestrictions
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
     *      "couponType" : 1,
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
     *      "message": "Coupon updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-coupon/update-coupon/:vendorCouponId
     * @apiErrorExample {json} Coupon error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCoupon(couponParam, vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((couponParam.discount < 0) || (couponParam.minimumPurchaseAmount < 0) || (couponParam.maximumPurchaseAmount < 0)
                || (couponParam.maxUserPerCoupon < 0) || (couponParam.noOfTimeCouponValidPerUser < 0) || (couponParam.appliedCartItemsCount < 0)) {
                const priceErrorResponse = {
                    status: 0,
                    message: 'Negative param value should not be allowed',
                };
                return response.status(400).send(priceErrorResponse);
            }
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
                    message: 'Invalid product as the product price is less than the discount amount.',
                };
                return response.status(400).send(errResponse);
            }
            const vendorCoupon = yield this.vendorCouponService.findOne({ where: { vendorCouponId } });
            if (!vendorCoupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id',
                };
                return response.status(400).send(errorResponse);
            }
            vendorCoupon.vendorId = 0;
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
            const startDate = (0, moment_1.default)(couponParam.startDate).format('YYYY-MM-DD HH:mm:ss');
            vendorCoupon.startDate = startDate;
            const endDate = (0, moment_1.default)(couponParam.endDate).format('YYYY-MM-DD HH:mm:ss');
            vendorCoupon.endDate = endDate;
            vendorCoupon.maxUserPerCoupon = couponParam.maxUserPerCoupon;
            if (+couponParam.allQualifyingItemsApply || +couponParam.appliedCartItemsCount > 0) {
                vendorCoupon.allQualifyingItemsApply = couponParam.allQualifyingItemsApply ? couponParam.allQualifyingItemsApply : 0;
                vendorCoupon.appliedCartItemsCount = couponParam.appliedCartItemsCount ? couponParam.appliedCartItemsCount : 0;
            }
            else {
                return response.status(400).send({
                    status: 0,
                    message: 'validation error',
                });
            }
            vendorCoupon.noOfTimeCouponValidUser = couponParam.noOfTimeCouponValidPerUser;
            const vendorCouponCode = yield this.vendorCouponService.findOne({
                where: {
                    couponCode: couponParam.couponCode,
                    vendorCouponId: (0, typeorm_1.Not)(vendorCouponId),
                },
            });
            if (vendorCouponCode) {
                const errorResponse = {
                    status: 1,
                    message: 'Already there is a coupon with this code.',
                };
                return response.status(400).send(errorResponse);
            }
            const createVendorCoupon = yield this.vendorCouponService.update(vendorCoupon.vendorCouponId, vendorCoupon);
            const couponProduct = yield this.vendorCouponProductCategoryService.findAll({
                where: {
                    vendorCouponId,
                },
            });
            if (couponProduct.length > 0) {
                const couponProductIds = couponProduct.map((couponData) => couponData.id);
                yield this.vendorCouponProductCategoryService.delete({ where: { id: (0, typeorm_1.In)(couponProductIds) } });
            }
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
    // Delete Vendor Coupon API
    /**
     * @api {delete} /api/admin-coupon/delete-coupon/:vendorCouponId Delete Vendor Coupon API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendorCouponId" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor coupon.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-coupon/delete-coupon/:vendorCouponId
     * @apiErrorExample {json} Delete Vendor Coupon API error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteVendorCoupon(vendorCouponId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorCoupon = yield this.vendorCouponService.findOne({
                where: {
                    vendorCouponId,
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
                    message: 'Successfully deleted Coupon',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete the Coupon',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Vendor Coupon API
    /**
     * @api {post} /api/admin-coupon/delete-bulk-coupon Delete Bulk Vendor Coupon API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} vendorCouponId vendorCouponId
     * @apiParamExample {json} Input
     * {
     *      "vendorCouponId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor coupon.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-coupon/delete-bulk-coupon
     * @apiErrorExample {json} Delete Vendor Coupon API error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteBulkVendorCoupon(vendorCouponId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customers = vendorCouponId.toString();
            const customer = customers.split(',');
            const data = customer.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const vendorCoupon = yield this.vendorCouponService.findOne({
                    where: {
                        vendorCouponId: id,
                    },
                });
                if (!vendorCoupon) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Vendor Coupon Id.',
                    };
                    return response.status(400).send(errorResponse);
                }
                yield this.vendorCouponService.delete({ vendorCouponId: vendorCoupon.vendorCouponId });
            }));
            const deleteVendorCoupon = yield Promise.all(data);
            if (deleteVendorCoupon) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Coupon',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete the Coupon',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Vendor Coupon List Bulk Export API
    /**
     * @api {get} /api/admin-coupon/bulk-export-admin-coupon-list Bulk Export of Admin Coupon List API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword Enter Coupon Name
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiSampleRequest /api/admin-coupon/bulk-export-admin-coupon-list
     * @apiErrorExample {json}  Coupon List API error
     * HTTP/1.1 500 Internal Server Error
     */
    bulkExport(limit, offset, keyword, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Coupon Export');
            const rows = [];
            const select = [
                'VendorCoupon.vendorCouponId as vendorCouponId',
                'VendorCoupon.vendorId as vendorId',
                'VendorCoupon.couponCode as couponCode',
                'VendorCoupon.couponName as couponName',
                'VendorCoupon.discount as discount',
                'VendorCoupon.startDate as startDate',
                'VendorCoupon.endDate as endDate',
                'VendorCoupon.isActive as isActive',
                '(SELECT COUNT(cu.coupon_usage_id) FROM `coupon_usage` `cu` WHERE cu.coupon_id = VendorCoupon.vendorCouponId) AS orders',
            ];
            const relations = [];
            const groupBy = [];
            const whereConditions = [];
            const searchConditions = [];
            if (status === '0' || status === '1') {
                whereConditions.push({
                    name: 'VendorCoupon.isActive',
                    op: 'where',
                    value: +status,
                });
            }
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['VendorCoupon.couponName', 'VendorCoupon.couponCode'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorCoupon.createdDate',
                order: 'DESC',
            });
            const couponList = yield this.vendorCouponService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Coupon Name', key: 'couponName', size: 16, width: 15 },
                { header: 'Coupon Code', key: 'CouponCode', size: 16, width: 15 },
                { header: 'Discount Value', key: 'discountValue', size: 16, width: 24 },
                { header: 'Start Date', key: 'startDate', size: 16, width: 15 },
                { header: 'End Date', key: 'mobileNumber', size: 16, width: 15 },
                { header: 'Date Left', key: 'dateLeft', size: 16, width: 15 },
                { header: 'Orders', key: 'orders', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const coupon of couponList) {
                const date2 = new Date(coupon.endDate);
                const nowDate = new Date();
                const days = date2.getTime() - nowDate.getTime();
                const daysDifference = days / (1000 * 3600 * 24);
                let leftDays;
                if ((Math.round(daysDifference) >= 0)) {
                    leftDays = Math.round(daysDifference);
                }
                else {
                    leftDays = 'Expired';
                }
                rows.push([coupon.couponName, coupon.couponCode, coupon.discount, coupon.startDate, coupon.endDate, leftDays, coupon.orders]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './CouponBulkExcel_' + Date.now() + '.xlsx';
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
    // Vendor Coupon List Excel Export API
    /**
     * @api {get} /api/admin-coupon/export-excel-admin-coupon-list Single Export of Admin Coupon List API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorCouponId vendorCouponId
     * @apiParamExample {json} Input
     * {
     *      "vendorCouponId" : "",
     * }
     * @apiSampleRequest /api/admin-coupon/bulk-export-admin-coupon-list
     * @apiErrorExample {json}  Coupon List API error
     * HTTP/1.1 500 Internal Server Error
     */
    singlebulkExport(vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Coupon Export Excel');
            const rows = [];
            const select = [
                'VendorCoupon.vendorCouponId as vendorCouponId',
                'VendorCoupon.vendorId as vendorId',
                'VendorCoupon.couponCode as couponCode',
                'VendorCoupon.couponName as couponName',
                'VendorCoupon.discount as discount',
                'VendorCoupon.startDate as startDate',
                'VendorCoupon.endDate as endDate',
                'VendorCoupon.isActive as isActive',
                '(SELECT COUNT(cu.coupon_usage_id) FROM `coupon_usage` `cu` WHERE cu.coupon_id = VendorCoupon.vendorCouponId) AS orders',
            ];
            const relations = [];
            const groupBy = [];
            const whereConditions = [];
            const searchConditions = [];
            whereConditions.push({
                name: 'VendorCoupon.vendorCouponId',
                op: 'IN',
                value: vendorCouponId,
            });
            const sort = [];
            sort.push({
                name: 'VendorCoupon.createdDate',
                order: 'DESC',
            });
            const couponList = yield this.vendorCouponService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Coupon Name', key: 'couponName', size: 16, width: 15 },
                { header: 'Coupon Code', key: 'CouponCode', size: 16, width: 15 },
                { header: 'Discount Value', key: 'discountValue', size: 16, width: 24 },
                { header: 'Start Date', key: 'startDate', size: 16, width: 15 },
                { header: 'End Date', key: 'mobileNumber', size: 16, width: 15 },
                { header: 'Date Left', key: 'dateLeft', size: 16, width: 15 },
                { header: 'Orders', key: 'orders', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const coupon of couponList) {
                const date2 = new Date(coupon.endDate);
                const nowDate = new Date();
                const days = date2.getTime() - nowDate.getTime();
                const daysDifference = days / (1000 * 3600 * 24);
                let leftDays;
                if ((Math.round(daysDifference) >= 0)) {
                    leftDays = Math.round(daysDifference);
                }
                else {
                    leftDays = 'Expired';
                }
                rows.push([coupon.couponName, coupon.couponCode, coupon.discount, coupon.startDate, coupon.endDate, leftDays, coupon.orders]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './CouponBulkExcel_' + Date.now() + '.xlsx';
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
    // Vendor Coupon Remove API
    /**
     * @api {get} /api/vendor-coupon/remove-coupon  Remove Vendor Coupon
     * @apiGroup vendor coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} param param
     * @apiParamExample {json} Input
     * {
     *      "param" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     * }
     * @apiSampleRequest /api/vendor-coupon/remove-coupon  Remove Vendor Coupon
     * @apiErrorExample {json} Vendor API error
     * HTTP/1.1 500 Internal Server Error
     */
    removeCoupon(param) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const couponProducts = yield this.vendorCouponProductCategoryService.findAll({
                where: {
                    referenceId: param.ProductId, type: param.type,
                },
            });
            for (const couponProduct of couponProducts) {
                yield this.vendorCouponProductCategoryService.delete({ id: couponProduct.id });
            }
        });
    }
};
exports.CouponController = CouponController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-coupon'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-coupon']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCouponRequest_1.CreateCouponRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "createCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/admin-coupon-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-coupon']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('couponName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "listVendorCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/coupon-usage-list'),
    (0, routing_controllers_1.Authorized)(''),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('couponId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "CouponUsageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/coupon-detail'),
    (0, routing_controllers_1.Authorized)(' '),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorCouponId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "couponDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-coupon/:vendorCouponId'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-coupon']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('vendorCouponId')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCouponRequest_1.UpdateCouponRequest, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "updateCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-coupon/:vendorCouponId'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-coupon']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('vendorCouponId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "deleteVendorCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-bulk-coupon'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('vendorCouponId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "deleteBulkVendorCoupon", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bulk-export-admin-coupon-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'bulk-export-admin-coupon-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "bulkExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/export-excel-admin-coupon-list'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorCouponId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "singlebulkExport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/remove-coupon'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('param')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "removeCoupon", null);
exports.CouponController = CouponController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/admin-coupon'),
    tslib_1.__metadata("design:paramtypes", [VendorCouponService_1.VendorCouponService,
        VendorCouponProductCategoryService_1.VendorCouponProductCategoryService,
        CouponUsageProductService_1.CouponUsageProductService,
        ProductService_1.ProductService,
        CouponUsageService_1.CouponUsageService,
        ProductSpecialService_1.ProductSpecialService,
        ProductDiscountService_1.ProductDiscountService,
        ProductImageService_1.ProductImageService])
], CouponController);
//# sourceMappingURL=CouponController.js.map