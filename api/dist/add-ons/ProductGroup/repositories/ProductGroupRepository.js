"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGroupRepository = void 0;
const tslib_1 = require("tslib");
const ProductGroup_1 = require("../models/ProductGroup");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductGroupRepository = class ProductGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductGroup_1.ProductGroup);
    }
};
exports.ProductGroupRepository = ProductGroupRepository;
exports.ProductGroupRepository = ProductGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductGroupRepository);
//# sourceMappingURL=ProductGroupRepository.js.map