"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const BlogCategoryTranslationRepository_1 = require("../repositories/BlogCategoryTranslationRepository");
let BlogCategoryTranslationService = class BlogCategoryTranslationService {
    constructor(blogCategoryTranslationRepository, log) {
        this.blogCategoryTranslationRepository = blogCategoryTranslationRepository;
        this.log = log;
    }
    // find One blog category translation
    findOne(blogCategoryId) {
        this.log.info('findOne a new blog category transaltion');
        return this.blogCategoryTranslationRepository.repository.findOne(blogCategoryId);
    }
    // create blog category translation
    create(blogcategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new blog category transaltion');
            return this.blogCategoryTranslationRepository.repository.save(blogcategory);
        });
    }
    // findAll blog category translation
    findAll(blogcategory) {
        return this.blogCategoryTranslationRepository.repository.find(blogcategory);
    }
};
exports.BlogCategoryTranslationService = BlogCategoryTranslationService;
exports.BlogCategoryTranslationService = BlogCategoryTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [BlogCategoryTranslationRepository_1.BlogCategoryTranslationRepository, Object])
], BlogCategoryTranslationService);
//# sourceMappingURL=BlogCategoryTranslationService.js.map