"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const index_1 = require("typeorm/index");
let CategoryService = class CategoryService {
    constructor(categoryRepository, log) {
        this.categoryRepository = categoryRepository;
        this.log = log;
    }
    // create Category
    create(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new category => ', category.toString());
            return this.categoryRepository.save(category);
        });
    }
    // findone category
    findOne(category) {
        return this.categoryRepository.findOne(category);
    }
    // delete Category
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a user');
            yield this.categoryRepository.delete(id);
            return;
        });
    }
    // categoryList
    list(limit, offset, select = [], search = [], whereConditions = [], relation = [], sortOrder, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (relation === null || relation === void 0 ? void 0 : relation.length) {
            condition.relations = [...relation];
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = { sortOrder: (sortOrder === 2) ? 'DESC' : 'ASC', createdDate: 'DESC' };
        if (count) {
            return this.categoryRepository.count(condition);
        }
        return this.categoryRepository.find(condition);
    }
    // find category
    find(category) {
        return this.categoryRepository.find(category);
    }
    slugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.categorySlug(data);
        });
    }
    findAll() {
        this.log.info('Find all setting');
        return this.categoryRepository.find();
    }
    slug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.categorySlugData(data);
        });
    }
    categoryCount(limit, offset, keyword, sortOrder, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.categoryCount(limit, offset, keyword, sortOrder, status);
        });
    }
    checkSlug(slug, id, count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (count > 0) {
                slug = slug + count;
            }
            return yield this.categoryRepository.checkSlugData(slug, id);
        });
    }
    findCategory(categoryName, parentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.findCategory(categoryName, parentId);
        });
    }
};
CategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CategoryRepository_1.CategoryRepository, Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map