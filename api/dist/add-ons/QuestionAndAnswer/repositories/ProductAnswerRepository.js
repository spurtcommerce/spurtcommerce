"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductAnswer_1 = require("../models/ProductAnswer");
let ProductAnswerRepository = class ProductAnswerRepository extends typeorm_1.Repository {
};
ProductAnswerRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductAnswer_1.ProductAnswer)
], ProductAnswerRepository);
exports.ProductAnswerRepository = ProductAnswerRepository;
//# sourceMappingURL=ProductAnswerRepository.js.map