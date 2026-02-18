"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToSpecificationRepository = void 0;
const tslib_1 = require("tslib");
const ProductToSpecification_1 = require("../models/ProductToSpecification");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductToSpecificationRepository = class ProductToSpecificationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductToSpecification_1.ProductToSpecification);
    }
};
exports.ProductToSpecificationRepository = ProductToSpecificationRepository;
exports.ProductToSpecificationRepository = ProductToSpecificationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductToSpecificationRepository);
//# sourceMappingURL=ProductToSpecificationRepository.js.map