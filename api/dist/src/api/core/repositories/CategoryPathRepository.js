"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPathRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CategoryPath_1 = require("../models/CategoryPath");
let CategoryPathRepository = class CategoryPathRepository extends typeorm_1.Repository {
    findOneCategoryLevel(categorySlug) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryPath_1.CategoryPath, 'categoryPath');
            query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'categoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
            query.leftJoin('categoryPath.category', 'category');
            query.leftJoin('categoryPath.path', 'path');
            query.andWhere('category.category_slug = ' + "'" + categorySlug + "'" + ' ');
            query.groupBy('categoryPath.category_id');
            return query.getRawOne();
        });
    }
};
CategoryPathRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CategoryPath_1.CategoryPath)
], CategoryPathRepository);
exports.CategoryPathRepository = CategoryPathRepository;
//# sourceMappingURL=CategoryPathRepository.js.map