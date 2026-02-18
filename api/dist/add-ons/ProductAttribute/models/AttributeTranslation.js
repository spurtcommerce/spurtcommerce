"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTranslation = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const typeorm_1 = require("typeorm");
const Attribute_1 = require("./Attribute");
let AttributeTranslation = class AttributeTranslation extends BaseModel_1.BaseModel {
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
exports.AttributeTranslation = AttributeTranslation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeTranslation.prototype, "attributeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], AttributeTranslation.prototype, "attributeName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], AttributeTranslation.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'label' }),
    tslib_1.__metadata("design:type", String)
], AttributeTranslation.prototype, "label", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'section_name' }),
    tslib_1.__metadata("design:type", String)
], AttributeTranslation.prototype, "sectionName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_value' }),
    tslib_1.__metadata("design:type", String)
], AttributeTranslation.prototype, "defaultValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], AttributeTranslation.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], AttributeTranslation.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => Attribute_1.Attribute, attribute => attribute.attributeTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Attribute_1.Attribute)
], AttributeTranslation.prototype, "attribute", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeTranslation.prototype, "updateDetails", null);
exports.AttributeTranslation = AttributeTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attribute_translation')
], AttributeTranslation);
//# sourceMappingURL=AttributeTranslation.js.map