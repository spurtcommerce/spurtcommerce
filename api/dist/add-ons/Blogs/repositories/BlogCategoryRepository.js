"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BlogCategory_1 = require("../models/BlogCategory");
let BlogCategoryRepository = class BlogCategoryRepository extends typeorm_1.Repository {
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(BlogCategory_1.BlogCategory, 'blogCategory');
            query.where('blogCategory.categorySlug = :slug', { slug });
            if (id > 0) {
                query.andWhere('blogCategory.categoryId != :id', { id });
            }
            return query.getCount();
        });
    }
    categoryCount(limit, offset, keyword, sortOrder, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(BlogCategory_1.BlogCategory, 'category');
            query.select('COUNT(category.blogCategoryId) as categoryCount');
            if (status !== '') {
                query.where('category.is_Active = :value', { value: status });
            }
            if (keyword !== undefined && keyword !== '') {
                query.andWhere('category.name LIKE ' + "'%" + keyword + "%'" + ' ');
            }
            query.orderBy('category.created_date', 'DESC');
            query.limit(limit);
            query.offset(offset);
            return query.getRawOne();
        });
    }
};
BlogCategoryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(BlogCategory_1.BlogCategory)
], BlogCategoryRepository);
exports.BlogCategoryRepository = BlogCategoryRepository;
//# sourceMappingURL=BlogCategoryRepository.js.map