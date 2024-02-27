"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const VariantValue_1 = require("./VariantValue");
const moment = require("moment");
const ProductVarient_1 = require("./ProductVarient");
let Variant = class Variant extends BaseModel_1.BaseModel {
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
], Variant.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Variant.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    tslib_1.__metadata("design:type", String)
], Variant.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], Variant.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VariantValue_1.VariantValue, variantValue => variantValue.variant, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Variant.prototype, "variantValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ProductVarient_1.ProductVarient, productVarient => productVarient.varients),
    tslib_1.__metadata("design:type", Array)
], Variant.prototype, "productVarient", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Variant.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Variant.prototype, "updateDetails", null);
Variant = tslib_1.__decorate([
    (0, typeorm_1.Entity)('variant')
], Variant);
exports.Variant = Variant;
//# sourceMappingURL=Variant.js.map