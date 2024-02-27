"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductVarient_1 = require("../models/ProductVarient");
let ProductVarientRepository = class ProductVarientRepository extends typeorm_1.Repository {
};
ProductVarientRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductVarient_1.ProductVarient)
], ProductVarientRepository);
exports.ProductVarientRepository = ProductVarientRepository;
//# sourceMappingURL=ProductVarientRepository.js.map