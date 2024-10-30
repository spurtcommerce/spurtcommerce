"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductImage_1 = require("../models/ProductImage");
let ProductImageRepository = class ProductImageRepository extends typeorm_1.Repository {
};
ProductImageRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductImage_1.ProductImage)
], ProductImageRepository);
exports.ProductImageRepository = ProductImageRepository;
//# sourceMappingURL=ProductImageRepository.js.map