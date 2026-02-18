"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupTranslation = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const AttributeGroup_1 = require("./AttributeGroup");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
let AttributeGroupTranslation = class AttributeGroupTranslation extends BaseModel_1.BaseModel {
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
exports.AttributeGroupTranslation = AttributeGroupTranslation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroupTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_group_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroupTranslation.prototype, "attributeGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroupTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], AttributeGroupTranslation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroupTranslation.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroupTranslation.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => AttributeGroup_1.AttributeGroup, attributeGroup => attributeGroup.attributeGroupTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'attribute_group_id' }),
    tslib_1.__metadata("design:type", AttributeGroup_1.AttributeGroup)
], AttributeGroupTranslation.prototype, "attributeGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupTranslation.prototype, "updateDetails", null);
exports.AttributeGroupTranslation = AttributeGroupTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attribute_group_translation')
], AttributeGroupTranslation);
//# sourceMappingURL=AttributeGroupTranslation.js.map