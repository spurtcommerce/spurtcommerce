"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrpAttrToAttrValRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductSpecAttrGrpAttrtoAttrVal_1 = require("../models/ProductSpecAttrGrpAttrtoAttrVal");
let ProductSpecAttrGrpAttrToAttrValRepository = class ProductSpecAttrGrpAttrToAttrValRepository extends typeorm_1.Repository {
};
ProductSpecAttrGrpAttrToAttrValRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductSpecAttrGrpAttrtoAttrVal_1.ProductSpecAttrGrpAttrToAttrVal)
], ProductSpecAttrGrpAttrToAttrValRepository);
exports.ProductSpecAttrGrpAttrToAttrValRepository = ProductSpecAttrGrpAttrToAttrValRepository;
//# sourceMappingURL=ProductSpecAttrGrpAttrToAttrValRepository.js.map