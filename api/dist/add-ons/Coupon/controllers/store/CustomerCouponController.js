"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCouponController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorCouponProductCategoryService_1 = require("../../service/VendorCouponProductCategoryService");
const VendorCouponService_1 = require("../../service/VendorCouponService");
const CouponUsageService_1 = require("../../service/CouponUsageService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let CustomerCouponController = class CustomerCouponController {
    constructor(couponUsageService, couponProductCategoryService, customerService, productService, vendorCouponService) {
        this.couponUsageService = couponUsageService;
        this.couponProductCategoryService = couponProductCategoryService;
        this.customerService = customerService;
        this.productService = productService;
        this.vendorCouponService = vendorCouponService;
    }
    // apply coupon API
    /**
     * @api {post} /api/customer-coupon/apply-coupon Apply Coupon API
     * @apiGroup Customer Coupon
     * @apiParam (Request body) {Number} couponCode
     * @apiParam (Request body) {String} emailId
     * @apiParam (Request body) {object} productDetail
     * @apiParam (Request body) {Number} productDetail.productId
     * @apiParam (Request body) {Number} productDetail.skuName
     * @apiParam (Request body) {Number} productDetail.productPrice
     * @apiParam (Request body) {Number} productDetail.quantity
     * @apiParam (Request body) {Number} productDetail.total
     * @apiParamExample {json} Input
     * {
     *      "couponCode":"",
     *      "emailId":"",
     *      "productDetail" : [
     *      {
     *      "productId" : 1,
     *      "productPrice" : "",
     *      "skuName" : "",
     *      "quantity" : 1,
     *      "total" : 1,
     *      }
     *      ],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added product to cart",
     *      "status": "1",
     *      "data": {
     *       "vendorCouponId": 1,
     *       "couponCode": 1,
     *       "grandDiscountAmount":"" ,
     *       "appliedProducts" : ""
     *    }
     * }
     * @apiSampleRequest /api/customer-coupon/apply-coupon
     * @apiErrorExample {json} customer coupon  error
     * HTTP/1.1 500 Internal Server Error
     */
    applyCoupon(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const crypto = require('crypto');
            const ENCRYPTION_KEY = '@##90kdu(**^$!!hj((&$2jhn^5$%9@q'; // Must be 256 bits (32 characters)
            const IV_LENGTH = 16; // For AES, this is always 16
            const iv = crypto.randomBytes(IV_LENGTH);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            const couponCode = request.body.couponCode;
            const checkCouponCode = yield this.vendorCouponService.findOne({
                where: {
                    couponCode: request.body.couponCode,
                },
            });
            if (!checkCouponCode) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Coupon Code',
                });
            }
            const emailId = request.body.emailId;
            const nowDate = new Date();
            const today = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const validCode = yield this.vendorCouponService.activeCoupon(today, couponCode);
            if (!validCode) {
                const errResponse = {
                    status: 0,
                    message: 'Coupon Code Expired',
                };
                return response.status(400).send(errResponse);
            }
            const validEmail = validCode.emailRestrictions;
            if (validEmail) {
                const arr = [];
                const email = validEmail.split(',').map(data => data.trim());
                for (const val of email) {
                    if (val === emailId) {
                        arr.push(1);
                    }
                }
                if (arr.length === 0) {
                    const errResponse = {
                        status: 0,
                        message: 'Invalid coupon code',
                    };
                    return response.status(400).send(errResponse);
                }
            }
            const whereConditionCoupon = [
                {
                    name: 'couponId',
                    value: validCode.vendorCouponId,
                },
            ];
            const couponUsage = yield this.couponUsageService.list(0, 0, [], [], whereConditionCoupon, true);
            if (+validCode.maxUserPerValidCoupon <= +couponUsage) {
                const errResponse = {
                    status: 0,
                    message: 'Maximum usage of this coupon exceeded',
                };
                return response.status(400).send(errResponse);
            }
            const validCustomer = yield this.customerService.findOne({ where: { email: emailId, deleteFlag: 0 } });
            if (validCustomer) {
                const whereConditions = [
                    {
                        name: 'couponId',
                        value: +validCode.vendorCouponId,
                    },
                    {
                        name: 'customerId',
                        value: +validCustomer.id,
                    },
                ];
                const customerUsagePerCoupon = yield this.couponUsageService.list(0, 0, [], [], whereConditions, true);
                if (+validCode.noOfTimeCouponValidUser <= +customerUsagePerCoupon) {
                    const errResponse = {
                        status: 0,
                        message: 'Maximum usage of this coupon for this user exceeded',
                    };
                    return response.status(400).send(errResponse);
                }
            }
            const select = ['referenceId'];
            const whereCondition = [
                {
                    name: 'vendorCouponId',
                    value: validCode.vendorCouponId,
                },
                {
                    name: 'type',
                    value: 1,
                },
            ];
            const couponProductList = yield this.couponProductCategoryService.list(0, 0, select, [], whereCondition, 0);
            const cartProductList = request.body.productDetail;
            const couponProductIds = [];
            if (couponProductList.length > 0) {
                for (const product of couponProductList) {
                    couponProductIds.push(product.referenceId);
                }
            }
            let eligibleProducts = cartProductList;
            if (couponProductIds.length > 0) {
                eligibleProducts = cartProductList.filter(e => {
                    if (couponProductIds.indexOf(Number(e.productId)) > -1) {
                        return true;
                    }
                    return false;
                });
            }
            if (eligibleProducts.length === 0) {
                const inValidProduct = {
                    status: 0,
                    message: 'Invalid coupon for this products',
                };
                return response.status(400).send(inValidProduct);
            }
            const error = [];
            let grandTotal = 0;
            for (const val of eligibleProducts) {
                grandTotal += +val.total;
                if (validCode.couponType === 2) {
                    if (+val.total < validCode.discount) {
                        error.push(1);
                    }
                }
            }
            if (error.length > 0) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Product, Product price is less than coupon discount price',
                };
                return response.status(400).send(errResponse);
            }
            const validAmount = yield this.vendorCouponService.validAmount(grandTotal, couponCode);
            if (!validAmount) {
                const inValidAmount = {
                    status: 0,
                    message: 'Amount range does not satisfy coupon amount',
                };
                return response.status(400).send(inValidAmount);
            }
            if (validCode.allQualifyingItemsApply === 1) {
                let grandDiscountAmount = 0;
                const appliedProducts = [];
                for (const val of eligibleProducts) {
                    let discountAmount = 0;
                    if (validCode.couponType === 1) {
                        discountAmount = val.total * (validCode.discount / 100);
                    }
                    else {
                        discountAmount = validCode.discount;
                    }
                    const obj = {};
                    obj.productId = val.productId;
                    const product = yield this.productService.findOne({
                        where: {
                            productId: val.productId,
                        },
                    });
                    obj.productName = product ? product.name : 0;
                    obj.actualAmount = val.total;
                    obj.quantity = val.quantity;
                    obj.skuName = val.skuName;
                    obj.discountAmount = discountAmount;
                    grandDiscountAmount += +discountAmount;
                    appliedProducts.push(obj);
                }
                let encrypted = cipher.update(JSON.stringify(appliedProducts));
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                const successResponse = {
                    status: 1,
                    message: 'Coupon applied Successfully',
                    data: {
                        vendorCouponId: validCode.vendorCouponId,
                        couponCode: validCode.couponCode,
                        grandDiscountAmount,
                        appliedProducts,
                    },
                    couponData: iv.toString('hex') + ':' + encrypted.toString('hex'),
                };
                return response.status(200).send(successResponse);
            }
            else {
                let grandDiscountAmount = 0;
                const appliedProducts = [];
                if (validCode.appliedCartItemsCount < eligibleProducts.length) {
                    const reducedCount = eligibleProducts.length - validCode.appliedCartItemsCount;
                    eligibleProducts.length -= reducedCount;
                    for (const val of eligibleProducts) {
                        let discountAmount = 0;
                        if (validCode.couponType === 1) {
                            discountAmount = val.total * (validCode.discount / 100);
                        }
                        else {
                            discountAmount = validCode.discount;
                        }
                        const obj = {};
                        obj.productId = val.productId;
                        const product = yield this.productService.findOne({
                            where: {
                                productId: val.productId,
                            },
                        });
                        obj.productName = product ? product.name : '';
                        obj.actualAmount = val.total;
                        obj.quantity = val.quantity;
                        obj.skuName = val.skuName;
                        obj.discountAmount = discountAmount;
                        grandDiscountAmount += +discountAmount;
                        appliedProducts.push(obj);
                    }
                }
                else {
                    for (const val of eligibleProducts) {
                        let discountAmount = 0;
                        if (validCode.couponType === 1) {
                            discountAmount = val.total * (validCode.discount / 100);
                        }
                        else {
                            discountAmount = validCode.discount;
                        }
                        const obj = {};
                        obj.productId = val.productId;
                        const product = yield this.productService.findOne({
                            where: {
                                productId: val.productId,
                            },
                        });
                        obj.productName = product ? product.name : '';
                        obj.actualAmount = val.total;
                        obj.quantity = val.quantity;
                        obj.skuName = val.skuName;
                        obj.discountAmount = discountAmount;
                        grandDiscountAmount += +discountAmount;
                        appliedProducts.push(obj);
                    }
                }
                let encrypted = cipher.update(JSON.stringify(appliedProducts));
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                const cartResponse = {
                    status: 1,
                    message: 'Coupon applied Successfully',
                    data: {
                        vendorCouponId: validCode.vendorCouponId,
                        couponCode: validCode.couponCode,
                        grandDiscountAmount,
                        appliedProducts,
                    },
                    couponData: iv.toString('hex') + ':' + encrypted.toString('hex'),
                };
                return response.status(200).send(cartResponse);
            }
        });
    }
};
exports.CustomerCouponController = CustomerCouponController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/apply-coupon'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCouponController.prototype, "applyCoupon", null);
exports.CustomerCouponController = CustomerCouponController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/customer-coupon'),
    tslib_1.__metadata("design:paramtypes", [CouponUsageService_1.CouponUsageService,
        VendorCouponProductCategoryService_1.VendorCouponProductCategoryService,
        CustomerService_1.CustomerService,
        ProductService_1.ProductService,
        VendorCouponService_1.VendorCouponService])
], CustomerCouponController);
//# sourceMappingURL=CustomerCouponController.js.map