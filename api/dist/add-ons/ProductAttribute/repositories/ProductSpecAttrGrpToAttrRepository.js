"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrpToAttrRepository = void 0;
const tslib_1 = require("tslib");
const ProductSpecAttrGrpToAttribute_1 = require("../models/ProductSpecAttrGrpToAttribute");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductSpecAttrGrpToAttrRepository = class ProductSpecAttrGrpToAttrRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductSpecAttrGrpToAttribute_1.ProductSpecAttrGrouptoAttr);
    }
};
exports.ProductSpecAttrGrpToAttrRepository = ProductSpecAttrGrpToAttrRepository;
exports.ProductSpecAttrGrpToAttrRepository = ProductSpecAttrGrpToAttrRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductSpecAttrGrpToAttrRepository);
//# sourceMappingURL=ProductSpecAttrGrpToAttrRepository.js.map