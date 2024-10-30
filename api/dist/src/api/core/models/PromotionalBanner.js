"use strict";
/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalBanner = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const PromotionalBannerItem_1 = require("./PromotionalBannerItem");
const class_validator_1 = require("class-validator");
let PromotionalBanner = class PromotionalBanner extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'banner_id' }),
    tslib_1.__metadata("design:type", Number)
], PromotionalBanner.prototype, "bannerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'banner_title' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "bannerTitle", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'banner_link_type' }),
    tslib_1.__metadata("design:type", Number)
], PromotionalBanner.prototype, "bannerLinkType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'banner_description' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "bannerDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'position' }),
    tslib_1.__metadata("design:type", Number)
], PromotionalBanner.prototype, "position", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'expire_date' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "expireDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], PromotionalBanner.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], PromotionalBanner.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => PromotionalBannerItem_1.PromotionalBannerItem, promotionalBannerItem => promotionalBannerItem.promotionalBanner),
    tslib_1.__metadata("design:type", Array)
], PromotionalBanner.prototype, "promotionalBannerItem", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBanner.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBanner.prototype, "updateDetails", null);
PromotionalBanner = tslib_1.__decorate([
    (0, typeorm_1.Entity)('promotional_banner')
], PromotionalBanner);
exports.PromotionalBanner = PromotionalBanner;
//# sourceMappingURL=PromotionalBanner.js.map