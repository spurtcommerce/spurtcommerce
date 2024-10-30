"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCategory = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const CategoryModel_1 = require("./CategoryModel");
const Vendor_1 = require("./Vendor");
let VendorCategory = class VendorCategory {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_category_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "vendorCategoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_category_commission' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "vendorCategoryCommission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => CategoryModel_1.Category, category => category.vendorCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", CategoryModel_1.Category)
], VendorCategory.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendorcategory),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Vendor_1.Vendor)
], VendorCategory.prototype, "vendor", void 0);
VendorCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_category')
], VendorCategory);
exports.VendorCategory = VendorCategory;
//# sourceMappingURL=VendorCategory.js.map