"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrpToAttrRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductSpecAttrGrpToAttribute_1 = require("../models/ProductSpecAttrGrpToAttribute");
let ProductSpecAttrGrpToAttrRepository = class ProductSpecAttrGrpToAttrRepository extends typeorm_1.Repository {
};
ProductSpecAttrGrpToAttrRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr)
], ProductSpecAttrGrpToAttrRepository);
exports.ProductSpecAttrGrpToAttrRepository = ProductSpecAttrGrpToAttrRepository;
//# sourceMappingURL=ProductSpecAttrGrpToAttrRepository.js.map