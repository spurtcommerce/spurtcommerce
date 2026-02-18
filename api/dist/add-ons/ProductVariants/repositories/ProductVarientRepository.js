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
const ProductVarient_1 = require("../models/ProductVarient");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductVarientRepository = class ProductVarientRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarient_1.ProductVarient);
    }
};
exports.ProductVarientRepository = ProductVarientRepository;
exports.ProductVarientRepository = ProductVarientRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductVarientRepository);
//# sourceMappingURL=ProductVarientRepository.js.map