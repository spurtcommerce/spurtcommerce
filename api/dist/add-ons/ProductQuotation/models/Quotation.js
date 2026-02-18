"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quotation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const QuotationProduct_1 = require("./QuotationProduct");
const VendorQuotation_1 = require("./VendorQuotation");
const Customer_1 = require("../../../src/api/core/models/Customer");
const moment = require("moment");
const class_validator_1 = require("class-validator");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
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
exports.Quotation = Quotation;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'first_name' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'telephone' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "telephone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'business_name' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "businessName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "postalCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'city' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'state' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'state_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "stateId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'country' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quotation_no' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "quotationNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "currencyId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'ip' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "ip", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'comment' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quotation_status_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "quotationStatusId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'responded_date' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "respondedDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Customer_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], Quotation.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => QuotationProduct_1.QuotationProduct, quotationProduct => quotationProduct.quotation, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Quotation.prototype, "quotationProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorQuotation_1.VendorQuotation, VendorQuotation => VendorQuotation.quotation, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Quotation.prototype, "vendorQuotation", void 0);
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
exports.Quotation = Quotation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('quotation')
], Quotation);
//# sourceMappingURL=Quotation.js.map