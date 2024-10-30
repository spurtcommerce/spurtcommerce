"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SiteFilterCategory_1 = require("../models/SiteFilterCategory");
let SiteFilterCategoryRepository = class SiteFilterCategoryRepository extends typeorm_1.Repository {
    findDuplicateCategory(id, filterId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(SiteFilterCategory_1.SiteFilterCategory, 'siteFilterCategory');
            query.where('siteFilterCategory.categoryId = :id', { id });
            query.andWhere('siteFilterCategory.filterId != :filterId', { filterId });
            return query.getRawOne();
        });
    }
};
SiteFilterCategoryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(SiteFilterCategory_1.SiteFilterCategory)
], SiteFilterCategoryRepository);
exports.SiteFilterCategoryRepository = SiteFilterCategoryRepository;
//# sourceMappingURL=SiteFilterCategoryRepository.js.map