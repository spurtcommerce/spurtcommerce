"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTranslationRepository = void 0;
const tslib_1 = require("tslib");
const CategoryTranslation_1 = require("../models/CategoryTranslation");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let CategoryTranslationRepository = class CategoryTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(CategoryTranslation_1.CategoryTranslation);
    }
};
exports.CategoryTranslationRepository = CategoryTranslationRepository;
exports.CategoryTranslationRepository = CategoryTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CategoryTranslationRepository);
//# sourceMappingURL=CategoryTranslationRepository.js.map