"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
const BannerImage_1 = require("./BannerImage");
let Banner = class Banner extends BaseModel_1.BaseModel {
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
], Banner.prototype, "bannerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], Banner.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'url' }),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'link' }),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "link", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'content' }),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'position' }),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "position", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'banner_group_id' }),
    tslib_1.__metadata("design:type", Number)
], Banner.prototype, "bannerGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'container_name' }),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "containerName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'view_page_count' }),
    tslib_1.__metadata("design:type", Number)
], Banner.prototype, "viewPageCount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Banner.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'link_type' }),
    tslib_1.__metadata("design:type", Number)
], Banner.prototype, "linkType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => BannerImage_1.BannerImage, bannerImg => bannerImg.banners, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Banner.prototype, "bannerImages", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Banner.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Banner.prototype, "updateDetails", null);
Banner = tslib_1.__decorate([
    (0, typeorm_1.Entity)('banner')
], Banner);
exports.Banner = Banner;
//# sourceMappingURL=Banner.js.map