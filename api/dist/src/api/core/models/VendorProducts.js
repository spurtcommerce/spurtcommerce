"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProducts = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductModel_1 = require("./ProductModel");
const Vendor_1 = require("./Vendor");
const SkuModel_1 = require("./SkuModel");
let VendorProducts = class VendorProducts extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_product_id' }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "vendorProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'approval_flag' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "approvalFlag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quotation_available' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "quotationAvailable", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "approvedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'approved_date' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "approvedDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_product_commission' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "vendorProductCommission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'pincode_based_delivery' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "pincodeBasedDelivery", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "sku_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reuse' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "reuse", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reuse_status' }),
    tslib_1.__metadata("design:type", Number)
], VendorProducts.prototype, "reuseStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'common_product_date' }),
    tslib_1.__metadata("design:type", String)
], VendorProducts.prototype, "commonProductDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reject_reason', type: 'json', default: {} }),
    tslib_1.__metadata("design:type", Array)
], VendorProducts.prototype, "rejectReason", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductModel_1.Product, product => product.vendorProducts),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], VendorProducts.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendorProducts),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Vendor_1.Vendor)
], VendorProducts.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => SkuModel_1.Sku),
    (0, typeorm_1.JoinColumn)({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", SkuModel_1.Sku)
], VendorProducts.prototype, "sku", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProducts.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProducts.prototype, "updateDetails", null);
VendorProducts = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_product')
], VendorProducts);
exports.VendorProducts = VendorProducts;
//# sourceMappingURL=VendorProducts.js.map