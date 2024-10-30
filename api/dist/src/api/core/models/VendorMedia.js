"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorMedia = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const Vendor_1 = require("./Vendor");
let VendorMedia = class VendorMedia extends BaseModel_1.BaseModel {
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
], VendorMedia.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    tslib_1.__metadata("design:type", String)
], VendorMedia.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_path' }),
    tslib_1.__metadata("design:type", String)
], VendorMedia.prototype, "filePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'media_type' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "mediaType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_image' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "defaultImage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'video_type' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "videoType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'show_home_page' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "showHomePage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'url' }),
    tslib_1.__metadata("design:type", String)
], VendorMedia.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], VendorMedia.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VendorMedia.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendorMedia),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Vendor_1.Vendor)
], VendorMedia.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorMedia.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorMedia.prototype, "updateDetails", null);
VendorMedia = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_media')
], VendorMedia);
exports.VendorMedia = VendorMedia;
//# sourceMappingURL=VendorMedia.js.map