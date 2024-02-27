"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOption = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const ProductModel_1 = require("../../../src/api/core/models/ProductModel");
const SkuModel_1 = require("../../../src/api/core/models/SkuModel");
const ProductVarientOptionDetail_1 = require("./ProductVarientOptionDetail");
const ProductVarientOptionImage_1 = require("./ProductVarientOptionImage");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let ProductVarientOption = class ProductVarientOption extends BaseModel_1.BaseModel {
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
], ProductVarientOption.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'varient_name' }),
    tslib_1.__metadata("design:type", String)
], ProductVarientOption.prototype, "varientName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOption.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOption.prototype, "skuId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOption.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => ProductModel_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], ProductVarientOption.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => SkuModel_1.Sku, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", SkuModel_1.Sku)
], ProductVarientOption.prototype, "skuDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ProductVarientOptionDetail_1.ProductVarientOptionDetail, productVarientOptionDetail => productVarientOptionDetail.productVarientOption, { cascade: true }),
    tslib_1.__metadata("design:type", ProductVarientOptionDetail_1.ProductVarientOptionDetail)
], ProductVarientOption.prototype, "productVarientOptionDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ProductVarientOptionImage_1.ProductVarientOptionImage, productVarientOptionImage => productVarientOptionImage.productVarientOption),
    tslib_1.__metadata("design:type", Array)
], ProductVarientOption.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOption.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOption.prototype, "updateDetails", null);
ProductVarientOption = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_varient_option')
], ProductVarientOption);
exports.ProductVarientOption = ProductVarientOption;
//# sourceMappingURL=ProductVarientOption.js.map