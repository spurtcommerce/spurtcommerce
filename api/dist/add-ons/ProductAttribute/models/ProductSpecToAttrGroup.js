"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecToAttrGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Attribute_1 = require("./Attribute");
const ProductToSpecification_1 = require("./ProductToSpecification");
const ProductSpecAttrGrpToAttribute_1 = require("./ProductSpecAttrGrpToAttribute");
let ProductSpecToAttrGroup = class ProductSpecToAttrGroup {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecToAttrGroup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_spec_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecToAttrGroup.prototype, "productSpecId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_group_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecToAttrGroup.prototype, "attributeGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => Attribute_1.Attribute, attribute => attribute.productSpecToAttrGroup, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'prd_spec_attr_grp_to_attribute',
        joinColumn: { name: 'prd_spec_attr_grp_id' },
        inverseJoinColumn: { name: 'attribute_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], ProductSpecToAttrGroup.prototype, "attributes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => ProductToSpecification_1.ProductToSpecification, productToSpecification => productToSpecification.productSpecToAttrGroup),
    (0, typeorm_1.JoinColumn)({ name: 'product_spec_id' }),
    tslib_1.__metadata("design:type", Array)
], ProductSpecToAttrGroup.prototype, "productToSpecification", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr, productSpecAttrGrouptoAttr => productSpecAttrGrouptoAttr.productSpecToAttrGroup),
    tslib_1.__metadata("design:type", Array)
], ProductSpecToAttrGroup.prototype, "productSpecAttrGrouptoAttr", void 0);
ProductSpecToAttrGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_spec_to_attribute_group')
], ProductSpecToAttrGroup);
exports.ProductSpecToAttrGroup = ProductSpecToAttrGroup;
//# sourceMappingURL=ProductSpecToAttrGroup.js.map