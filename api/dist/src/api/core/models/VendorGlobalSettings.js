"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGlobalSetting = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
let VendorGlobalSetting = class VendorGlobalSetting extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_global_setting_id' }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VendorGlobalSetting.prototype, "settingId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'default_commission' }),
    tslib_1.__metadata("design:type", Number)
], VendorGlobalSetting.prototype, "defaultCommission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGlobalSetting.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGlobalSetting.prototype, "updateDetails", null);
VendorGlobalSetting = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_global_setting')
], VendorGlobalSetting);
exports.VendorGlobalSetting = VendorGlobalSetting;
//# sourceMappingURL=VendorGlobalSettings.js.map