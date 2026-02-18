"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToCategoryRepository = void 0;
const tslib_1 = require("tslib");
const ProductToCategory_1 = require("../models/ProductToCategory");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductToCategoryRepository = class ProductToCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductToCategory_1.ProductToCategory);
    }
};
exports.ProductToCategoryRepository = ProductToCategoryRepository;
exports.ProductToCategoryRepository = ProductToCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductToCategoryRepository);
//# sourceMappingURL=ProductToCategoryRepository.js.map