"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPathRepository = void 0;
const tslib_1 = require("tslib");
const CategoryPath_1 = require("../models/CategoryPath");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let CategoryPathRepository = class CategoryPathRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(CategoryPath_1.CategoryPath);
    }
    findOneCategoryLevel(categorySlug) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('categoryPath');
            query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'categoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
            query.leftJoin('categoryPath.category', 'category');
            query.leftJoin('categoryPath.path', 'path');
            query.andWhere('category.category_slug = ' + "'" + categorySlug + "'" + ' ');
            query.groupBy('categoryPath.category_id');
            return query.getRawOne();
        });
    }
    categorylevelList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const qb = this.repository.createQueryBuilder('CategoryPath')
                .select([
                'CategoryPath.categoryId AS categoryId',
                'category.sortOrder AS sortOrder',
                'category.parentInt AS parentInt',
                'category.name AS name',
                'category.industryId AS industryId',
                'category.image AS image',
                'category.imagePath AS imagePath',
                'category.isActive AS isActive',
                'category.createdDate AS createdDate',
                'category.categorySlug AS categorySlug',
                `GROUP_CONCAT(path.name ORDER BY CategoryPath.level SEPARATOR ' > ') AS levels`,
            ])
                .innerJoin('CategoryPath.category', 'category')
                .innerJoin('CategoryPath.path', 'path')
                .where('category.isActive = :active', { active: 1 })
                .groupBy('CategoryPath.category_id')
                .having('MAX(CategoryPath.level) <= :level', { level: 1 })
                .orderBy('category.createdDate', 'DESC');
            return qb.getRawMany();
        });
    }
};
exports.CategoryPathRepository = CategoryPathRepository;
exports.CategoryPathRepository = CategoryPathRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CategoryPathRepository);
//# sourceMappingURL=CategoryPathRepository.js.map