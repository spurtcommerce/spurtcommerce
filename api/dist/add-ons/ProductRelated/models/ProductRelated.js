"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRelated = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductModel_1 = require("../../../src/api/core/models/ProductModel");
const class_validator_1 = require("class-validator");
let ProductRelated = class ProductRelated extends BaseModel_1.BaseModel {
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
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'related_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductRelated.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductRelated.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'related_product_id' }),
    tslib_1.__metadata("design:type", String)
], ProductRelated.prototype, "relatedProductId", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductRelated.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => ProductModel_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'related_product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], ProductRelated.prototype, "productRelated", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRelated.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRelated.prototype, "updateDetails", null);
ProductRelated = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_related')
], ProductRelated);
exports.ProductRelated = ProductRelated;
//# sourceMappingURL=ProductRelated.js.map