"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Industry = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Vendor_1 = require("./Vendor");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
let Industry = class Industry extends BaseModel_1.BaseModel {
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
], Industry.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Industry.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'slug' }),
    tslib_1.__metadata("design:type", String)
], Industry.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Industry.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], Industry.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => Vendor_1.Vendor, vendor => vendor.industry),
    tslib_1.__metadata("design:type", Array)
], Industry.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Industry.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Industry.prototype, "updateDetails", null);
Industry = tslib_1.__decorate([
    (0, typeorm_1.Entity)('industry')
], Industry);
exports.Industry = Industry;
//# sourceMappingURL=Industry.js.map