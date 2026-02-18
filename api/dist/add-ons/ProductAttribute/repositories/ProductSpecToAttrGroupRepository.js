"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecToAttrGroupRepository = void 0;
const tslib_1 = require("tslib");
const ProductSpecToAttrGroup_1 = require("../models/ProductSpecToAttrGroup");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductSpecToAttrGroupRepository = class ProductSpecToAttrGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductSpecToAttrGroup_1.ProductSpecToAttrGroup);
    }
};
exports.ProductSpecToAttrGroupRepository = ProductSpecToAttrGroupRepository;
exports.ProductSpecToAttrGroupRepository = ProductSpecToAttrGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductSpecToAttrGroupRepository);
//# sourceMappingURL=ProductSpecToAttrGroupRepository.js.map