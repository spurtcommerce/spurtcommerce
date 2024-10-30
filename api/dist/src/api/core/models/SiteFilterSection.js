"use strict";
/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSection = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const SiteFilter_1 = require("./SiteFilter");
const SiteFilterSectionItem_1 = require("./SiteFilterSectionItem");
let SiteFilterSection = class SiteFilterSection {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterSection.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'site_filter_id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterSection.prototype, "filterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'section_id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterSection.prototype, "sectionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'section_name' }),
    tslib_1.__metadata("design:type", String)
], SiteFilterSection.prototype, "sectionName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'section_type' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterSection.prototype, "sectionType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'section_slug' }),
    tslib_1.__metadata("design:type", String)
], SiteFilterSection.prototype, "sectionSlug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sequence' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterSection.prototype, "sequence", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => SiteFilter_1.SiteFilter, filter => filter.filterSection),
    (0, typeorm_1.JoinColumn)({ name: 'site_filter_id' }),
    tslib_1.__metadata("design:type", SiteFilter_1.SiteFilter)
], SiteFilterSection.prototype, "filterDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SiteFilterSectionItem_1.SiteFilterSectionItem, filterSectionItem => filterSectionItem.filterSectionDetail),
    tslib_1.__metadata("design:type", Array)
], SiteFilterSection.prototype, "filterSectionItem", void 0);
SiteFilterSection = tslib_1.__decorate([
    (0, typeorm_1.Entity)('site_filter_section')
], SiteFilterSection);
exports.SiteFilterSection = SiteFilterSection;
//# sourceMappingURL=SiteFilterSection.js.map