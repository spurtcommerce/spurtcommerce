"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCoupon = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const VendorCouponProductCategory_1 = require("./VendorCouponProductCategory");
const CouponUsage_1 = require("./CouponUsage");
const class_validator_1 = require("class-validator");
let VendorCoupon = class VendorCoupon extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.VendorCoupon = VendorCoupon;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_coupon_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "vendorCouponId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'coupon_name' }),
    tslib_1.__metadata("design:type", String)
], VendorCoupon.prototype, "couponName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'coupon_code' }),
    tslib_1.__metadata("design:type", String)
], VendorCoupon.prototype, "couponCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'coupon_type' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "couponType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'discount' }),
    tslib_1.__metadata("design:type", String)
], VendorCoupon.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'minimum_purchase_amount' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "minimumPurchaseAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'maximum_purchase_amount' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "maximumPurchaseAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_conjunction' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "couponConjunction", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_applies_sales' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "couponAppliesSales", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'email_restrictions' }),
    tslib_1.__metadata("design:type", String)
], VendorCoupon.prototype, "emailRestrictions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'applicable_for' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "applicableFor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'free_shipping' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "freeShipping", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    tslib_1.__metadata("design:type", String)
], VendorCoupon.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'end_date' }),
    tslib_1.__metadata("design:type", String)
], VendorCoupon.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'max_user_per_coupon' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "maxUserPerCoupon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'no_of_time_coupon_valid_user' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "noOfTimeCouponValidUser", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'all_qualifying_items_apply' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "allQualifyingItemsApply", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'applied_cart_items_count' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "appliedCartItemsCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorCoupon.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorCouponProductCategory_1.VendorCouponProductCategory, vendorCouponProductCategory => vendorCouponProductCategory.vendorCoupon),
    tslib_1.__metadata("design:type", Array)
], VendorCoupon.prototype, "vendorCouponProductCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => CouponUsage_1.CouponUsage, couponUsage => couponUsage.vendorCoupon),
    tslib_1.__metadata("design:type", Array)
], VendorCoupon.prototype, "couponUsage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCoupon.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCoupon.prototype, "updateDetails", null);
exports.VendorCoupon = VendorCoupon = tslib_1.__decorate([
    (0, typeorm_1.Entity)('coupon')
], VendorCoupon);
//# sourceMappingURL=VendorCoupon.js.map