"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValueTranslation = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const typeorm_1 = require("typeorm");
const AttributeValue_1 = require("./AttributeValue");
let AttributeValueTranslation = class AttributeValueTranslation extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.AttributeValueTranslation = AttributeValueTranslation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValueTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_value_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValueTranslation.prototype, "attributeValueId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValueTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_value' }),
    tslib_1.__metadata("design:type", String)
], AttributeValueTranslation.prototype, "value", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValueTranslation.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValueTranslation.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => AttributeValue_1.AttributeValue, attributeValue => attributeValue.attributeValueTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'attribute_value_id', referencedColumnName: 'id' }),
    tslib_1.__metadata("design:type", AttributeValue_1.AttributeValue)
], AttributeValueTranslation.prototype, "attributeValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeValueTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeValueTranslation.prototype, "updateDetails", null);
exports.AttributeValueTranslation = AttributeValueTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attribute_value_translation')
], AttributeValueTranslation);
//# sourceMappingURL=AttributeValueTranslation.js.map