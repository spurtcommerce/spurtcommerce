"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductQuestion_1 = require("../models/ProductQuestion");
let ProductQuestionRepository = class ProductQuestionRepository extends typeorm_1.Repository {
};
ProductQuestionRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductQuestion_1.ProductQuestion)
], ProductQuestionRepository);
exports.ProductQuestionRepository = ProductQuestionRepository;
//# sourceMappingURL=ProductQuestionRepository.js.map