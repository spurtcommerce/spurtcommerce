"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageRepository = void 0;
const tslib_1 = require("tslib");
const ProductImage_1 = require("../models/ProductImage");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ProductImageRepository = class ProductImageRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductImage_1.ProductImage);
    }
};
exports.ProductImageRepository = ProductImageRepository;
exports.ProductImageRepository = ProductImageRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductImageRepository);
//# sourceMappingURL=ProductImageRepository.js.map