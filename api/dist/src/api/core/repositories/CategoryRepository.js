"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CategoryModel_1 = require("../models/CategoryModel");
let CategoryRepository = class CategoryRepository extends typeorm_1.Repository {
    categorySlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.orWhere('category.name = :name', { name: data });
            return query.getMany();
        });
    }
    categorySlugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.select('category_slug');
            query.orWhere('category.name = :name', { name: data });
            return query.getMany();
        });
    }
    categoryCount(limit, offset, keyword, sortOrder, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.select('COUNT(category.categoryId) as categoryCount');
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
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.where('category.category_slug = :slug', { slug });
            if (id > 0) {
                query.andWhere('category.categoryId != :id', { id });
            }
            return query.getCount();
        });
    }
    findCategory(categoryName, parentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.where('LOWER(category.name) = :categoryName', { categoryName });
            if (parentId !== 0) {
                query.andWhere('category.parentInt = :parentId', { parentId });
            }
            return query.getOne();
        });
    }
};
CategoryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CategoryModel_1.Category)
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map