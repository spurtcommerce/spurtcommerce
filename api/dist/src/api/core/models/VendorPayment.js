"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPayment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const VendorOrders_1 = require("./VendorOrders");
const PaymentItems_1 = require("./PaymentItems");
const Vendor_1 = require("./Vendor");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let VendorPayment = class VendorPayment extends BaseModel_1.BaseModel {
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
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'vendor_payment_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPayment.prototype, "vendorPaymentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPayment.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPayment.prototype, "vendorOrderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'payment_item_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPayment.prototype, "paymentItemId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'amount' }),
    tslib_1.__metadata("design:type", Number)
], VendorPayment.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'commission_amount' }),
    tslib_1.__metadata("design:type", Number)
], VendorPayment.prototype, "commissionAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VendorOrders_1.VendorOrders, vendorOrders => vendorOrders.vendorPayment),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorPayment.prototype, "vendorOrders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => PaymentItems_1.PaymentItems, paymentItems => paymentItems.vendorPayment),
    (0, typeorm_1.JoinColumn)({ name: 'payment_item_id' }),
    tslib_1.__metadata("design:type", PaymentItems_1.PaymentItems)
], VendorPayment.prototype, "paymentItems", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendorPayment),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorPayment.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPayment.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPayment.prototype, "updateDetails", null);
VendorPayment = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_payment')
], VendorPayment);
exports.VendorPayment = VendorPayment;
//# sourceMappingURL=VendorPayment.js.map