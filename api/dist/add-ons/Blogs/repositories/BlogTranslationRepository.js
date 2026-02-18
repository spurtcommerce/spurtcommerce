"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTranslationRepository = void 0;
const tslib_1 = require("tslib");
const BlogTranslation_1 = require("../models/BlogTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let BlogTranslationRepository = class BlogTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(BlogTranslation_1.BlogTranslation);
    }
};
exports.BlogTranslationRepository = BlogTranslationRepository;
exports.BlogTranslationRepository = BlogTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], BlogTranslationRepository);
//# sourceMappingURL=BlogTranslationRepository.js.map