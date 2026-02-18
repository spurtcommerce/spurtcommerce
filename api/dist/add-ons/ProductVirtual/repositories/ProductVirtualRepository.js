"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVirtualRepository = void 0;
const tslib_1 = require("tslib");
const ProductVirtual_1 = require("../models/ProductVirtual");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductVirtualRepository = class ProductVirtualRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVirtual_1.ProductVirtual);
    }
};
exports.ProductVirtualRepository = ProductVirtualRepository;
exports.ProductVirtualRepository = ProductVirtualRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductVirtualRepository);
//# sourceMappingURL=ProductVirtualRepository.js.map