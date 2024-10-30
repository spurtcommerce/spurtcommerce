"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorInvoice = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const Vendor_1 = require("./Vendor");
const Order_1 = require("./Order");
const VendorInvoiceItem_1 = require("./VendorInvoiceItem");
const class_validator_1 = require("class-validator");
let VendorInvoice = class VendorInvoice extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_invoice_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorInvoice.prototype, "vendorInvoiceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorInvoice.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorInvoice.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'invoice_no' }),
    tslib_1.__metadata("design:type", String)
], VendorInvoice.prototype, "invoiceNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_prefix' }),
    tslib_1.__metadata("design:type", String)
], VendorInvoice.prototype, "invoicePrefix", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", String)
], VendorInvoice.prototype, "total", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], VendorInvoice.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_firstname' }),
    tslib_1.__metadata("design:type", String)
], VendorInvoice.prototype, "shippingFirstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_lastname' }),
    tslib_1.__metadata("design:type", String)
], VendorInvoice.prototype, "shippingLastname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Order_1.Order, order => order.vendorInvoice),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], VendorInvoice.prototype, "orderDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Vendor_1.Vendor),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Vendor_1.Vendor)
], VendorInvoice.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorInvoiceItem_1.VendorInvoiceItem, vendorInvoiceItem => vendorInvoiceItem.vendorInvoice),
    tslib_1.__metadata("design:type", Array)
], VendorInvoice.prototype, "vendorInvoiceItem", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorInvoice.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorInvoice.prototype, "updateDetails", null);
VendorInvoice = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_invoice')
], VendorInvoice);
exports.VendorInvoice = VendorInvoice;
//# sourceMappingURL=VendorInvoice.js.map