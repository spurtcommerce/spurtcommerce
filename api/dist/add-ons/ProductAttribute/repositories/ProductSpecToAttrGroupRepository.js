"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecToAttrGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductSpecToAttrGroup_1 = require("../models/ProductSpecToAttrGroup");
let ProductSpecToAttrGroupRepository = class ProductSpecToAttrGroupRepository extends typeorm_1.Repository {
};
ProductSpecToAttrGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductSpecToAttrGroup_1.ProductSpecToAttrGroup)
], ProductSpecToAttrGroupRepository);
exports.ProductSpecToAttrGroupRepository = ProductSpecToAttrGroupRepository;
//# sourceMappingURL=ProductSpecToAttrGroupRepository.js.map