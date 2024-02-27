"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionDetail = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const ProductVarientOption_1 = require("./ProductVarientOption");
// import { VarientsValue } from './VarientsValue';
const moment = require("moment");
const class_validator_1 = require("class-validator");
const VariantValue_1 = require("./VariantValue");
let ProductVarientOptionDetail = class ProductVarientOptionDetail extends BaseModel_1.BaseModel {
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
], ProductVarientOptionDetail.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_varient_option_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionDetail.prototype, "productVarientOptionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'varients_value_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionDetail.prototype, "variantValueId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_variant_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionDetail.prototype, "productVariantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionDetail.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductVarientOption_1.ProductVarientOption, productVarientOption => productVarientOption.productVarientOptionDetail),
    (0, typeorm_1.JoinColumn)({ name: 'product_varient_option_id' }),
    tslib_1.__metadata("design:type", ProductVarientOption_1.ProductVarientOption)
], ProductVarientOptionDetail.prototype, "productVarientOption", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VariantValue_1.VariantValue, variantValue => variantValue.productVarientOptionDetail),
    (0, typeorm_1.JoinColumn)({ name: 'varients_value_id' }),
    tslib_1.__metadata("design:type", VariantValue_1.VariantValue)
], ProductVarientOptionDetail.prototype, "variantValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOptionDetail.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOptionDetail.prototype, "updateDetails", null);
ProductVarientOptionDetail = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_varient_option_details')
], ProductVarientOptionDetail);
exports.ProductVarientOptionDetail = ProductVarientOptionDetail;
//# sourceMappingURL=ProductVarientOptionDetail.js.map