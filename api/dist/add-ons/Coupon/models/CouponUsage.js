"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUsage = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const VendorCoupon_1 = require("./VendorCoupon");
const CouponUsageProduct_1 = require("./CouponUsageProduct");
const class_validator_1 = require("class-validator");
let CouponUsage = class CouponUsage extends BaseModel_1.BaseModel {
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
exports.CouponUsage = CouponUsage;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'coupon_usage_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsage.prototype, "couponUsageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'coupon_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsage.prototype, "couponId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsage.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsage.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsage.prototype, "discountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VendorCoupon_1.VendorCoupon, vendorCoupon => vendorCoupon.couponUsage),
    (0, typeorm_1.JoinColumn)({ name: 'coupon_id' }),
    tslib_1.__metadata("design:type", Array)
], CouponUsage.prototype, "vendorCoupon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => CouponUsageProduct_1.CouponUsageProduct, couponUsageProduct => couponUsageProduct.couponUsage),
    tslib_1.__metadata("design:type", Array)
], CouponUsage.prototype, "couponUsageProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CouponUsage.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CouponUsage.prototype, "updateDetails", null);
exports.CouponUsage = CouponUsage = tslib_1.__decorate([
    (0, typeorm_1.Entity)('coupon_usage')
], CouponUsage);
//# sourceMappingURL=CouponUsage.js.map