"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCouponProductCategory = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const VendorCoupon_1 = require("./VendorCoupon");
const class_validator_1 = require("class-validator");
let VendorCouponProductCategory = class VendorCouponProductCategory extends BaseModel_1.BaseModel {
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
exports.VendorCouponProductCategory = VendorCouponProductCategory;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCouponProductCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_coupon_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCouponProductCategory.prototype, "vendorCouponId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'type' }),
    tslib_1.__metadata("design:type", Number)
], VendorCouponProductCategory.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reference_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCouponProductCategory.prototype, "referenceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VendorCoupon_1.VendorCoupon, vendorCoupon => vendorCoupon.vendorCouponProductCategory),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_coupon_id' }),
    tslib_1.__metadata("design:type", VendorCoupon_1.VendorCoupon)
], VendorCouponProductCategory.prototype, "vendorCoupon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponProductCategory.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCouponProductCategory.prototype, "updateDetails", null);
exports.VendorCouponProductCategory = VendorCouponProductCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('coupon_product_category')
], VendorCouponProductCategory);
//# sourceMappingURL=VendorCouponProductCategory.js.map