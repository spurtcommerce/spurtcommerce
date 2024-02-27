"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationAttrGrpToAttribute = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let SpecificationAttrGrpToAttribute = class SpecificationAttrGrpToAttribute {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationAttrGrpToAttribute.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'spec_attr_grp_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationAttrGrpToAttribute.prototype, "specAttrGrpId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationAttrGrpToAttribute.prototype, "attributeId", void 0);
SpecificationAttrGrpToAttribute = tslib_1.__decorate([
    (0, typeorm_1.Entity)('spec_attr_grp_to_attribute')
], SpecificationAttrGrpToAttribute);
exports.SpecificationAttrGrpToAttribute = SpecificationAttrGrpToAttribute;
//# sourceMappingURL=SpecificationAttributeGrpToAttribute.js.map