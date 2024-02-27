"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const AttributeGroup_1 = require("./AttributeGroup");
const AttributeValue_1 = require("./AttributeValue");
const ProductSpecToAttrGroup_1 = require("./ProductSpecToAttrGroup");
const SpecificationToAttributeGroup_1 = require("./SpecificationToAttributeGroup");
let Attribute = class Attribute extends BaseModel_1.BaseModel {
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
], Attribute.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Attribute.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    tslib_1.__metadata("design:type", String)
], Attribute.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_mandatory' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "isMandatory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], Attribute.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'label' }),
    tslib_1.__metadata("design:type", String)
], Attribute.prototype, "label", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'use_as_filter' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "useAsFilter", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'section_name' }),
    tslib_1.__metadata("design:type", String)
], Attribute.prototype, "sectionName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_value' }),
    tslib_1.__metadata("design:type", String)
], Attribute.prototype, "defaultValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => AttributeGroup_1.AttributeGroup, attributeGroup => attributeGroup.attributes),
    (0, typeorm_1.JoinTable)({
        name: 'attribute_to_group',
        joinColumn: { name: 'attribute_id' },
        inverseJoinColumn: { name: 'attribute_group_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], Attribute.prototype, "attributeGroups", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => SpecificationToAttributeGroup_1.SpecificationToAttributeGroup, specificationToAttributeGroup => specificationToAttributeGroup.attributes),
    (0, typeorm_1.JoinTable)({
        name: 'spec_attr_grp_to_attribute',
        joinColumn: { name: 'attribute_id' },
        inverseJoinColumn: { name: 'spec_attr_grp_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], Attribute.prototype, "specificationToAttributeGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => ProductSpecToAttrGroup_1.ProductSpecToAttrGroup, productSpecToAttrGroup => productSpecToAttrGroup.attributes),
    (0, typeorm_1.JoinTable)({
        name: 'prd_spec_attr_grp_to_attribute',
        joinColumn: { name: 'attribute_id' },
        inverseJoinColumn: { name: 'prd_spec_attr_grp_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], Attribute.prototype, "productSpecToAttrGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => AttributeValue_1.AttributeValue, attributeValue => attributeValue.attribute, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Attribute.prototype, "attributeValues", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Attribute.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Attribute.prototype, "updateDetails", null);
Attribute = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attribute')
], Attribute);
exports.Attribute = Attribute;
//# sourceMappingURL=Attribute.js.map