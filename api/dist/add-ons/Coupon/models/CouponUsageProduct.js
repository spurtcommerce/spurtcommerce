"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUsageProduct = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const CouponUsage_1 = require("./CouponUsage");
const class_validator_1 = require("class-validator");
let CouponUsageProduct = class CouponUsageProduct extends BaseModel_1.BaseModel {
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
exports.CouponUsageProduct = CouponUsageProduct;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'coupon_usage_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "couponUsageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'amount' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount' }),
    tslib_1.__metadata("design:type", Number)
], CouponUsageProduct.prototype, "discountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => CouponUsage_1.CouponUsage, couponUsage => couponUsage.couponUsageProduct),
    (0, typeorm_1.JoinColumn)({ name: 'coupon_usage_id' }),
    tslib_1.__metadata("design:type", Array)
], CouponUsageProduct.prototype, "couponUsage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CouponUsageProduct.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CouponUsageProduct.prototype, "updateDetails", null);
exports.CouponUsageProduct = CouponUsageProduct = tslib_1.__decorate([
    (0, typeorm_1.Entity)('coupon_usage_product')
], CouponUsageProduct);
//# sourceMappingURL=CouponUsageProduct.js.map