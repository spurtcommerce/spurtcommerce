"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVideoRepository = void 0;
const tslib_1 = require("tslib");
const ProductVideo_1 = require("../models/ProductVideo");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductVideoRepository = class ProductVideoRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVideo_1.ProductVideo);
    }
};
exports.ProductVideoRepository = ProductVideoRepository;
exports.ProductVideoRepository = ProductVideoRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductVideoRepository);
//# sourceMappingURL=ProductVideoRepository.js.map