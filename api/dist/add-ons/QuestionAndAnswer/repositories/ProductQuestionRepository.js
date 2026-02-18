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
const ProductQuestion_1 = require("../models/ProductQuestion");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductQuestionRepository = class ProductQuestionRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductQuestion_1.ProductQuestion);
    }
};
exports.ProductQuestionRepository = ProductQuestionRepository;
exports.ProductQuestionRepository = ProductQuestionRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductQuestionRepository);
//# sourceMappingURL=ProductQuestionRepository.js.map