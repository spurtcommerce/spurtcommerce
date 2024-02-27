"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValue = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const Variant_1 = require("./Variant");
const moment = require("moment");
const ProductVarientOptionDetail_1 = require("./ProductVarientOptionDetail");
// import { ProductVarientOptionDetail } from './ProductVarientOptionDetail';
let VariantValue = class VariantValue extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VariantValue.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'variant_id' }),
    tslib_1.__metadata("design:type", Number)
], VariantValue.prototype, "variantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'value_name' }),
    tslib_1.__metadata("design:type", String)
], VariantValue.prototype, "value", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], VariantValue.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VariantValue.prototype, "is_active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Variant_1.Variant, variant => variant.variantValue),
    (0, typeorm_1.JoinColumn)({ name: 'variant_id' }),
    tslib_1.__metadata("design:type", Variant_1.Variant)
], VariantValue.prototype, "variant", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ProductVarientOptionDetail_1.ProductVarientOptionDetail, productVarientOptionDetail => productVarientOptionDetail.variantValue),
    tslib_1.__metadata("design:type", Array)
], VariantValue.prototype, "productVarientOptionDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VariantValue.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VariantValue.prototype, "updateDetails", null);
VariantValue = tslib_1.__decorate([
    (0, typeorm_1.Entity)('variant_value')
], VariantValue);
exports.VariantValue = VariantValue;
//# sourceMappingURL=VariantValue.js.map