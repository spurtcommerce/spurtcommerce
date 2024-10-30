"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPaymentArchive = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const PaymentItems_1 = require("./PaymentItems");
const Vendor_1 = require("./Vendor");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let VendorPaymentArchive = class VendorPaymentArchive extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPaymentArchive.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPaymentArchive.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPaymentArchive.prototype, "vendorOrderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_order_archive' }),
    tslib_1.__metadata("design:type", Number)
], VendorPaymentArchive.prototype, "vendorOrderArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_item_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPaymentArchive.prototype, "paymentItemId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'amount' }),
    tslib_1.__metadata("design:type", Number)
], VendorPaymentArchive.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commission_amount' }),
    tslib_1.__metadata("design:type", Number)
], VendorPaymentArchive.prototype, "commissionAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => PaymentItems_1.PaymentItems, paymentItems => paymentItems.vendorPaymentArchive),
    (0, typeorm_1.JoinColumn)({ name: 'payment_item_id' }),
    tslib_1.__metadata("design:type", PaymentItems_1.PaymentItems)
], VendorPaymentArchive.prototype, "paymentItems", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendorPaymentArchive),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorPaymentArchive.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentArchive.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPaymentArchive.prototype, "updateDetails", null);
VendorPaymentArchive = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_payment_archive')
], VendorPaymentArchive);
exports.VendorPaymentArchive = VendorPaymentArchive;
//# sourceMappingURL=VendorPaymentArchive.js.map