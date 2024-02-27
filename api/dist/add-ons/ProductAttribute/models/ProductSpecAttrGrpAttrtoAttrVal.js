"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrpAttrToAttrVal = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductSpecAttrGrpToAttribute_1 = require("./ProductSpecAttrGrpToAttribute");
let ProductSpecAttrGrpAttrToAttrVal = class ProductSpecAttrGrpAttrToAttrVal {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: '' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecAttrGrpAttrToAttrVal.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'prd_spec_attr_grp_attr_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecAttrGrpAttrToAttrVal.prototype, "productSpecAttrGrpAttrId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_value_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductSpecAttrGrpAttrToAttrVal.prototype, "attributeValueId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'value' }),
    tslib_1.__metadata("design:type", String)
], ProductSpecAttrGrpAttrToAttrVal.prototype, "value", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr, productSpecAttrGrouptoAttr => productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal),
    (0, typeorm_1.JoinColumn)({ name: 'prd_spec_attr_grp_attr_id' }),
    tslib_1.__metadata("design:type", Array)
], ProductSpecAttrGrpAttrToAttrVal.prototype, "productSpecAttrGrouptoAttr", void 0);
ProductSpecAttrGrpAttrToAttrVal = tslib_1.__decorate([
    (0, typeorm_1.Entity)('prd_spec_attr_grp_attr_to_attr_val')
], ProductSpecAttrGrpAttrToAttrVal);
exports.ProductSpecAttrGrpAttrToAttrVal = ProductSpecAttrGrpAttrToAttrVal;
//# sourceMappingURL=ProductSpecAttrGrpAttrtoAttrVal.js.map