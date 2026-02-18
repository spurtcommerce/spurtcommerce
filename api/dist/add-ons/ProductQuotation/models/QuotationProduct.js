"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationProduct = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const Quotation_1 = require("../models/Quotation");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductModel_1 = require("../../../src/api/core/models/ProductModel");
const VendorQuotation_1 = require("./VendorQuotation");
const class_validator_1 = require("class-validator");
let QuotationProduct = class QuotationProduct extends BaseModel_1.BaseModel {
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
exports.QuotationProduct = QuotationProduct;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'quotation_id' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "quotationId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_name' }),
    tslib_1.__metadata("design:type", String)
], QuotationProduct.prototype, "productName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_price' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "productPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "discountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'base_price' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "basePrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tax_type' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "taxType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tax_value' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "taxValue", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'discounted_amount' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "discountedAmount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'quotation_status_id' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "quotationStatusId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'best_quoted_price' }),
    tslib_1.__metadata("design:type", String)
], QuotationProduct.prototype, "bestQuotedPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reply_message' }),
    tslib_1.__metadata("design:type", String)
], QuotationProduct.prototype, "replyMessage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tax' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "tax", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], QuotationProduct.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sku_name' }),
    tslib_1.__metadata("design:type", String)
], QuotationProduct.prototype, "skuName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductModel_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], QuotationProduct.prototype, "productInformationDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Quotation_1.Quotation, quotation => quotation.quotationProduct),
    (0, typeorm_1.JoinColumn)({ name: 'quotation_id' }),
    tslib_1.__metadata("design:type", Quotation_1.Quotation)
], QuotationProduct.prototype, "quotation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => VendorQuotation_1.VendorQuotation, VendorQuotation => VendorQuotation.quotationProduct),
    tslib_1.__metadata("design:type", VendorQuotation_1.VendorQuotation)
], QuotationProduct.prototype, "vendorQuotation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationProduct.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationProduct.prototype, "updateDetails", null);
exports.QuotationProduct = QuotationProduct = tslib_1.__decorate([
    (0, typeorm_1.Entity)('quotation_product')
], QuotationProduct);
//# sourceMappingURL=QuotationProduct.js.map