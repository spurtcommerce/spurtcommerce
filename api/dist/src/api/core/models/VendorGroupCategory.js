"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupCategory = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const CategoryModel_1 = require("./CategoryModel");
const VendorGroup_1 = require("./VendorGroup");
let VendorGroupCategory = class VendorGroupCategory extends BaseModel_1.BaseModel {
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
], VendorGroupCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_group_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorGroupCategory.prototype, "vendorGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorGroupCategory.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorGroupCategory.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => CategoryModel_1.Category, category => category.vendorGroupCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", CategoryModel_1.Category)
], VendorGroupCategory.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VendorGroup_1.VendorGroup, vendorGroup => vendorGroup.vendorGroupCategory),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_group_id' }),
    tslib_1.__metadata("design:type", VendorGroup_1.VendorGroup)
], VendorGroupCategory.prototype, "vendorGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupCategory.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroupCategory.prototype, "updateDetails", null);
VendorGroupCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_group_category')
], VendorGroupCategory);
exports.VendorGroupCategory = VendorGroupCategory;
//# sourceMappingURL=VendorGroupCategory.js.map