"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrpAttrToAttrValRepository = void 0;
const tslib_1 = require("tslib");
const ProductSpecAttrGrpAttrtoAttrVal_1 = require("../models/ProductSpecAttrGrpAttrtoAttrVal");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductSpecAttrGrpAttrToAttrValRepository = class ProductSpecAttrGrpAttrToAttrValRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductSpecAttrGrpAttrtoAttrVal_1.ProductSpecAttrGrpAttrToAttrVal);
    }
};
exports.ProductSpecAttrGrpAttrToAttrValRepository = ProductSpecAttrGrpAttrToAttrValRepository;
exports.ProductSpecAttrGrpAttrToAttrValRepository = ProductSpecAttrGrpAttrToAttrValRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductSpecAttrGrpAttrToAttrValRepository);
//# sourceMappingURL=ProductSpecAttrGrpAttrToAttrValRepository.js.map