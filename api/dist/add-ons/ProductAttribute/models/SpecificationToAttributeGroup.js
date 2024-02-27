"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToAttributeGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Attribute_1 = require("./Attribute");
let SpecificationToAttributeGroup = class SpecificationToAttributeGroup {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationToAttributeGroup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'specification_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationToAttributeGroup.prototype, "specificationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_group_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationToAttributeGroup.prototype, "attributeGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => Attribute_1.Attribute, attribute => attribute.specificationToAttributeGroup, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'spec_attr_grp_to_attribute',
        joinColumn: { name: 'spec_attr_grp_id' },
        inverseJoinColumn: { name: 'attribute_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], SpecificationToAttributeGroup.prototype, "attributes", void 0);
SpecificationToAttributeGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('specification_to_attribute_group')
], SpecificationToAttributeGroup);
exports.SpecificationToAttributeGroup = SpecificationToAttributeGroup;
//# sourceMappingURL=SpecificationToAttributeGroup.js.map