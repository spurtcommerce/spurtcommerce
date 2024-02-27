"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrouptoAttr = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AttributeValue_1 = require("./AttributeValue");
const ProductSpecToAttrGroup_1 = require("./ProductSpecToAttrGroup");
const ProductSpecAttrGrpAttrtoAttrVal_1 = require("./ProductSpecAttrGrpAttrtoAttrVal");
let ProductSpecAttrGrouptoAttr = class ProductSpecAttrGrouptoAttr {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecAttrGrouptoAttr.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'prd_spec_attr_grp_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecAttrGrouptoAttr.prototype, "productSpecAttrGrpId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecAttrGrouptoAttr.prototype, "attributeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => AttributeValue_1.AttributeValue, attributeValue => attributeValue, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'prd_spec_attr_grp_attr_to_attr_val',
        joinColumn: { name: 'prd_spec_attr_grp_attr_id' },
        inverseJoinColumn: { name: 'attribute_value_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], ProductSpecAttrGrouptoAttr.prototype, "attributeValues", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => ProductSpecToAttrGroup_1.ProductSpecToAttrGroup, productSpecToAttrGroup => productSpecToAttrGroup),
    (0, typeorm_1.JoinColumn)({ name: 'prd_spec_attr_grp_id' }),
    tslib_1.__metadata("design:type", ProductSpecToAttrGroup_1.ProductSpecToAttrGroup)
], ProductSpecAttrGrouptoAttr.prototype, "productSpecToAttrGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => ProductSpecAttrGrpAttrtoAttrVal_1.ProductSpecAttrGrpAttrToAttrVal, productSpecAttrGrpAttrToAttrVal => productSpecAttrGrpAttrToAttrVal.productSpecAttrGrouptoAttr),
    tslib_1.__metadata("design:type", Array)
], ProductSpecAttrGrouptoAttr.prototype, "productSpecAttrGrpAttrToAttrVal", void 0);
ProductSpecAttrGrouptoAttr = tslib_1.__decorate([
    (0, typeorm_1.Entity)('prd_spec_attr_grp_to_attribute')
], ProductSpecAttrGrouptoAttr);
exports.ProductSpecAttrGrouptoAttr = ProductSpecAttrGrouptoAttr;
//# sourceMappingURL=ProductSpecAttrGrpToAttribute.js.map