"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTranslationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CategoryTranslation_1 = require("../models/CategoryTranslation");
let CategoryTranslationRepository = class CategoryTranslationRepository extends typeorm_1.Repository {
};
CategoryTranslationRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CategoryTranslation_1.CategoryTranslation)
], CategoryTranslationRepository);
exports.CategoryTranslationRepository = CategoryTranslationRepository;
//# sourceMappingURL=CategoryTranslationRepository.js.map