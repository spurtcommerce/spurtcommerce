"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVideoRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductVideo_1 = require("../models/ProductVideo");
let ProductVideoRepository = class ProductVideoRepository extends typeorm_1.Repository {
};
ProductVideoRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductVideo_1.ProductVideo)
], ProductVideoRepository);
exports.ProductVideoRepository = ProductVideoRepository;
//# sourceMappingURL=ProductVideoRepository.js.map