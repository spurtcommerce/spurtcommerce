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
const typeorm_1 = require("typeorm");
const ProductVarientOptionImage_1 = require("../models/ProductVarientOptionImage");
let ProductVarientOptionImageRepository = class ProductVarientOptionImageRepository extends typeorm_1.Repository {
};
ProductVarientOptionImageRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductVarientOptionImage_1.ProductVarientOptionImage)
], ProductVarientOptionImageRepository);
exports.ProductVarientOptionImageRepository = ProductVarientOptionImageRepository;
//# sourceMappingURL=ProductVarientOptionImageRepository.js.map