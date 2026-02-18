"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorQuotation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const Vendor_1 = require("../../../src/api/core/models/Vendor");
const Quotation_1 = require("./Quotation");
const QuotationProduct_1 = require("./QuotationProduct");
const class_validator_1 = require("class-validator");
let VendorQuotation = class VendorQuotation extends BaseModel_1.BaseModel {
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
exports.VendorQuotation = VendorQuotation;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorQuotation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorQuotation.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'quotation_product_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorQuotation.prototype, "quotationProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'quotation_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorQuotation.prototype, "quotationId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], VendorQuotation.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Vendor_1.Vendor),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorQuotation.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => QuotationProduct_1.QuotationProduct, quotationProduct => quotationProduct.vendorQuotation),
    (0, typeorm_1.JoinColumn)({ name: 'quotation_product_id' }),
    tslib_1.__metadata("design:type", QuotationProduct_1.QuotationProduct)
], VendorQuotation.prototype, "quotationProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Quotation_1.Quotation, quotation => quotation.vendorQuotation),
    (0, typeorm_1.JoinColumn)({ name: 'quotation_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorQuotation.prototype, "quotation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Quotation_1.Quotation),
    (0, typeorm_1.JoinColumn)({ name: 'quotation_id' }),
    tslib_1.__metadata("design:type", Quotation_1.Quotation)
], VendorQuotation.prototype, "quotationDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => QuotationProduct_1.QuotationProduct),
    (0, typeorm_1.JoinColumn)({ name: 'quotation_product_id' }),
    tslib_1.__metadata("design:type", QuotationProduct_1.QuotationProduct)
], VendorQuotation.prototype, "quotationProductDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotation.prototype, "updateDetails", null);
exports.VendorQuotation = VendorQuotation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_quotation')
], VendorQuotation);
//# sourceMappingURL=VendorQuotation.js.map