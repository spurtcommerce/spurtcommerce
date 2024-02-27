"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToSpecificationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductToSpecification_1 = require("../models/ProductToSpecification");
let ProductToSpecificationRepository = class ProductToSpecificationRepository extends typeorm_1.Repository {
};
ProductToSpecificationRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductToSpecification_1.ProductToSpecification)
], ProductToSpecificationRepository);
exports.ProductToSpecificationRepository = ProductToSpecificationRepository;
//# sourceMappingURL=ProductToSpecificationRepository.js.map