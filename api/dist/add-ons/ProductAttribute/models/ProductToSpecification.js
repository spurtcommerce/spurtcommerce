"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToSpecification = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AttributeGroup_1 = require("./AttributeGroup");
const ProductSpecToAttrGroup_1 = require("./ProductSpecToAttrGroup");
let ProductToSpecification = class ProductToSpecification {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], ProductToSpecification.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductToSpecification.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'specification_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductToSpecification.prototype, "specificationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => AttributeGroup_1.AttributeGroup, attributeGroup => attributeGroup.productToSpecification, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'product_spec_to_attribute_group',
        joinColumn: { name: 'product_spec_id' },
        inverseJoinColumn: { name: 'attribute_group_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], ProductToSpecification.prototype, "attributeGroups", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => ProductSpecToAttrGroup_1.ProductSpecToAttrGroup, productSpecToAttrGroup => productSpecToAttrGroup.productToSpecification),
    tslib_1.__metadata("design:type", Array)
], ProductToSpecification.prototype, "productSpecToAttrGroup", void 0);
ProductToSpecification = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_to_specification')
], ProductToSpecification);
exports.ProductToSpecification = ProductToSpecification;
//# sourceMappingURL=ProductToSpecification.js.map