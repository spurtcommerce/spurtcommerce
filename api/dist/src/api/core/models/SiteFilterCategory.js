"use strict";
/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterCategory = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const SiteFilter_1 = require("./SiteFilter");
let SiteFilterCategory = class SiteFilterCategory {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'site_filter_id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterCategory.prototype, "filterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterCategory.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => SiteFilter_1.SiteFilter, filter => filter.filterCategory),
    (0, typeorm_1.JoinColumn)({ name: 'site_filter_id' }),
    tslib_1.__metadata("design:type", SiteFilter_1.SiteFilter)
], SiteFilterCategory.prototype, "filterDetail", void 0);
SiteFilterCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('site_filter_category')
], SiteFilterCategory);
exports.SiteFilterCategory = SiteFilterCategory;
//# sourceMappingURL=SiteFilterCategory.js.map