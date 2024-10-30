"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerImage = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const Banner_1 = require("./Banner");
const BaseModel_1 = require("./BaseModel");
let BannerImage = class BannerImage extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], BannerImage.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image_name' }),
    tslib_1.__metadata("design:type", String)
], BannerImage.prototype, "imageName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], BannerImage.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary' }),
    tslib_1.__metadata("design:type", Number)
], BannerImage.prototype, "isPrimary", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'banner_id' }),
    tslib_1.__metadata("design:type", Number)
], BannerImage.prototype, "bannerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], BannerImage.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], BannerImage.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => Banner_1.Banner, banner => banner.bannerImages),
    (0, typeorm_1.JoinColumn)({ name: 'banner_id' }),
    tslib_1.__metadata("design:type", Banner_1.Banner)
], BannerImage.prototype, "banners", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BannerImage.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BannerImage.prototype, "updateDetails", null);
BannerImage = tslib_1.__decorate([
    (0, typeorm_1.Entity)('banner_images')
], BannerImage);
exports.BannerImage = BannerImage;
//# sourceMappingURL=BannerImage.js.map