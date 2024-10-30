"use strict";
/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalBannerItem = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const PromotionalBanner_1 = require("./PromotionalBanner");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let PromotionalBannerItem = class PromotionalBannerItem extends BaseModel_1.BaseModel {
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
], PromotionalBannerItem.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'banner_id' }),
    tslib_1.__metadata("design:type", Number)
], PromotionalBannerItem.prototype, "bannerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'ref_id' }),
    tslib_1.__metadata("design:type", Number)
], PromotionalBannerItem.prototype, "refId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => PromotionalBanner_1.PromotionalBanner, promotionalBanner => promotionalBanner.promotionalBannerItem),
    (0, typeorm_1.JoinColumn)({ name: 'banner_id' }),
    tslib_1.__metadata("design:type", PromotionalBanner_1.PromotionalBanner)
], PromotionalBannerItem.prototype, "promotionalBanner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerItem.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerItem.prototype, "updateDetails", null);
PromotionalBannerItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('promotional_banner_item')
], PromotionalBannerItem);
exports.PromotionalBannerItem = PromotionalBannerItem;
//# sourceMappingURL=PromotionalBannerItem.js.map