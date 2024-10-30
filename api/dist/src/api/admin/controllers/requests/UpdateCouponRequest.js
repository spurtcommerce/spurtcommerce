"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCouponRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateCouponRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'coupon name should be maximum 255 characters',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'coupon name is required',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCouponRequest.prototype, "couponName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'coupon code should be maximum 32 characters',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'coupon code is required',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCouponRequest.prototype, "couponCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'coupon type is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCouponRequest.prototype, "couponType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'discount is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCouponRequest.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'minimum purchase amount is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCouponRequest.prototype, "minimumPurchaseAmount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'maximum purchase amount is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCouponRequest.prototype, "maximumPurchaseAmount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'email restrictions should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCouponRequest.prototype, "emailRestrictions", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'maxUserPerCoupon is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCouponRequest.prototype, "maxUserPerCoupon", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'noOfTimeCouponValidPerUser is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCouponRequest.prototype, "noOfTimeCouponValidPerUser", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateCouponRequest.prototype, "status", void 0);
exports.UpdateCouponRequest = UpdateCouponRequest;
//# sourceMappingURL=UpdateCouponRequest.js.map