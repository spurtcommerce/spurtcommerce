"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValueTranslation = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const VariantValue_1 = require("./VariantValue");
let VariantValueTranslation = class VariantValueTranslation extends BaseModel_1.BaseModel {
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
exports.VariantValueTranslation = VariantValueTranslation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VariantValueTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'value' }),
    tslib_1.__metadata("design:type", String)
], VariantValueTranslation.prototype, "value", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], VariantValueTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'variant_value_id' }),
    tslib_1.__metadata("design:type", Number)
], VariantValueTranslation.prototype, "variantValueId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VariantValueTranslation.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VariantValueTranslation.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => VariantValue_1.VariantValue, variantValue => variantValue.variantValueTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'variant_value_id' }),
    tslib_1.__metadata("design:type", VariantValue_1.VariantValue)
], VariantValueTranslation.prototype, "variantValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VariantValueTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VariantValueTranslation.prototype, "updateDetails", null);
exports.VariantValueTranslation = VariantValueTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('variant_value_translation')
], VariantValueTranslation);
//# sourceMappingURL=VariantValueTranslation.js.map