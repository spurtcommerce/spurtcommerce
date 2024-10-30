"use strict";
/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionItem = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const SiteFilterSection_1 = require("./SiteFilterSection");
let SiteFilterSectionItem = class SiteFilterSectionItem {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterSectionItem.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'site_filter_section_id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilterSectionItem.prototype, "filterSectionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'item_name' }),
    tslib_1.__metadata("design:type", String)
], SiteFilterSectionItem.prototype, "itemName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'item_slug' }),
    tslib_1.__metadata("design:type", String)
], SiteFilterSectionItem.prototype, "itemSlug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => SiteFilterSection_1.SiteFilterSection, filterSection => filterSection.filterSectionItem),
    (0, typeorm_1.JoinColumn)({ name: 'site_filter_section_id' }),
    tslib_1.__metadata("design:type", SiteFilterSection_1.SiteFilterSection)
], SiteFilterSectionItem.prototype, "filterSectionDetail", void 0);
SiteFilterSectionItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('site_filter_section_item')
], SiteFilterSectionItem);
exports.SiteFilterSectionItem = SiteFilterSectionItem;
//# sourceMappingURL=SiteFilterSectionItem.js.map