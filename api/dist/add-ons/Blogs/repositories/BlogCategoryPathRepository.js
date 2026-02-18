"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryPathRepository = void 0;
const tslib_1 = require("tslib");
const BlogCategoryPath_1 = require("../models/BlogCategoryPath");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let BlogCategoryPathRepository = class BlogCategoryPathRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(BlogCategoryPath_1.BlogCategoryPath);
    }
    findOneCategoryLevel(categorySlug) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(BlogCategoryPath_1.BlogCategoryPath, 'blogCategoryPath');
            query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'blogCategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
            query.leftJoin('blogCategoryPath.blogCategory', 'blogCategory');
            query.leftJoin('blogCategoryPath.path', 'path');
            query.andWhere('blogCategoryPath.category_slug = ' + "'" + categorySlug + "'" + ' ');
            query.groupBy('blogCategoryPath.blog_category_id');
            return query.getRawOne();
        });
    }
};
exports.BlogCategoryPathRepository = BlogCategoryPathRepository;
exports.BlogCategoryPathRepository = BlogCategoryPathRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], BlogCategoryPathRepository);
//# sourceMappingURL=BlogCategoryPathRepository.js.map