"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quotation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const Customer_1 = require("../../../src/api/core/models/Customer");
const class_validator_1 = require("class-validator");
const ProductModel_1 = require("../../../src/api/core/models/ProductModel");
let Quotation = class Quotation extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quantity_unit' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "quantityUnit", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_value' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "orderValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'purpose' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "purpose", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'comments' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Customer_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], Quotation.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => ProductModel_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], Quotation.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Quotation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Quotation.prototype, "updateDetails", null);
Quotation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('quotation')
], Quotation);
exports.Quotation = Quotation;
//# sourceMappingURL=Quotation.js.map