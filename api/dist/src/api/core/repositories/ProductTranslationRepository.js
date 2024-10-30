"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTranslationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductTranslation_1 = require("../models/ProductTranslation");
let ProductTranslationRepository = class ProductTranslationRepository extends typeorm_1.Repository {
};
ProductTranslationRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductTranslation_1.ProductTranslation)
], ProductTranslationRepository);
exports.ProductTranslationRepository = ProductTranslationRepository;
//# sourceMappingURL=ProductTranslationRepository.js.map