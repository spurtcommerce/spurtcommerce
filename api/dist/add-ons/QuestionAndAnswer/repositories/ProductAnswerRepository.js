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
const ProductAnswer_1 = require("../models/ProductAnswer");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductAnswerRepository = class ProductAnswerRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductAnswer_1.ProductAnswer);
    }
};
exports.ProductAnswerRepository = ProductAnswerRepository;
exports.ProductAnswerRepository = ProductAnswerRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductAnswerRepository);
//# sourceMappingURL=ProductAnswerRepository.js.map