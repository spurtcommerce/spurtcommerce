"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorInvoiceItem = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const OrderProduct_1 = require("./OrderProduct");
const VendorInvoice_1 = require("./VendorInvoice");
const class_validator_1 = require("class-validator");
let VendorInvoiceItem = class VendorInvoiceItem extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_invoice_item_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorInvoiceItem.prototype, "vendorInvoiceItemId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_invoice_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorInvoiceItem.prototype, "vendorInvoiceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorInvoiceItem.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => OrderProduct_1.OrderProduct),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", OrderProduct_1.OrderProduct)
], VendorInvoiceItem.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VendorInvoice_1.VendorInvoice, vendorInvoice => vendorInvoice.vendorInvoiceItem),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_invoice_id' }),
    tslib_1.__metadata("design:type", VendorInvoice_1.VendorInvoice)
], VendorInvoiceItem.prototype, "vendorInvoice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorInvoiceItem.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorInvoiceItem.prototype, "updateDetails", null);
VendorInvoiceItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_invoice_item')
], VendorInvoiceItem);
exports.VendorInvoiceItem = VendorInvoiceItem;
//# sourceMappingURL=VendorInvoiceItem.js.map