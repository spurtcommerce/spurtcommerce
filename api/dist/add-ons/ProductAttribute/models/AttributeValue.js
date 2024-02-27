"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValue = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const typeorm_1 = require("typeorm");
const Attribute_1 = require("./Attribute");
const ProductSpecAttrGrpToAttribute_1 = require("./ProductSpecAttrGrpToAttribute");
let AttributeValue = class AttributeValue extends BaseModel_1.BaseModel {
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
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValue.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", String)
], AttributeValue.prototype, "AttributeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'value' }),
    tslib_1.__metadata("design:type", String)
], AttributeValue.prototype, "value", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValue.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], AttributeValue.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Attribute_1.Attribute, attribute => attribute.attributeValues),
    (0, typeorm_1.JoinColumn)({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Attribute_1.Attribute)
], AttributeValue.prototype, "attribute", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr, productSpecAttrGrouptoAttr => productSpecAttrGrouptoAttr.attributeValues),
    (0, typeorm_1.JoinTable)({
        name: 'prd_spec_attr_grp_attr_to_attr_val',
        joinColumn: { name: 'attribute_value_id' },
        inverseJoinColumn: { name: 'prd_spec_attr_grp_attr_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], AttributeValue.prototype, "attributeValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeValue.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeValue.prototype, "updateDetails", null);
AttributeValue = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attribute_value')
], AttributeValue);
exports.AttributeValue = AttributeValue;
//# sourceMappingURL=AttributeValue.js.map