"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const Attribute_1 = require("./Attribute");
const Specification_1 = require("./Specification");
const ProductToSpecification_1 = require("./ProductToSpecification");
let AttributeGroup = class AttributeGroup extends BaseModel_1.BaseModel {
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
], AttributeGroup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], AttributeGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroup.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroup.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroup.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => Attribute_1.Attribute, attributeGroup => attributeGroup.attributeGroups, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'attribute_to_group',
        joinColumn: { name: 'attribute_group_id' },
        inverseJoinColumn: { name: 'attribute_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], AttributeGroup.prototype, "attributes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => Specification_1.Specification, specification => specification.attributeGroups, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'specification_to_attribute_group',
        joinColumn: { name: 'attribute_group_id' },
        inverseJoinColumn: { name: 'specification_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], AttributeGroup.prototype, "specifications", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => ProductToSpecification_1.ProductToSpecification, productToSpecification => productToSpecification.attributeGroups),
    (0, typeorm_1.JoinTable)({
        name: 'product_spec_to_attribute_group',
        joinColumn: { name: 'attribute_group_id' },
        inverseJoinColumn: { name: 'product_spec_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], AttributeGroup.prototype, "productToSpecification", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroup.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroup.prototype, "updateDetails", null);
AttributeGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attribute_group')
], AttributeGroup);
exports.AttributeGroup = AttributeGroup;
//# sourceMappingURL=AttributeGroup.js.map