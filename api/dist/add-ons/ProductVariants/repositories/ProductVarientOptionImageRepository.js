"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionImageRepository = void 0;
const tslib_1 = require("tslib");
const ProductVarientOptionImage_1 = require("../models/ProductVarientOptionImage");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductVarientOptionImageRepository = class ProductVarientOptionImageRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarientOptionImage_1.ProductVarientOptionImage);
    }
};
exports.ProductVarientOptionImageRepository = ProductVarientOptionImageRepository;
exports.ProductVarientOptionImageRepository = ProductVarientOptionImageRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductVarientOptionImageRepository);
//# sourceMappingURL=ProductVarientOptionImageRepository.js.map