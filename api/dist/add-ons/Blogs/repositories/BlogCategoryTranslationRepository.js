"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryTranslationRepository = void 0;
const tslib_1 = require("tslib");
const BlogCategoryTranslation_1 = require("../models/BlogCategoryTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let BlogCategoryTranslationRepository = class BlogCategoryTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(BlogCategoryTranslation_1.BlogCategoryTranslation);
    }
};
exports.BlogCategoryTranslationRepository = BlogCategoryTranslationRepository;
exports.BlogCategoryTranslationRepository = BlogCategoryTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], BlogCategoryTranslationRepository);
//# sourceMappingURL=BlogCategoryTranslationRepository.js.map