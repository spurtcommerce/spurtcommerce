"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterCategoryRepository = void 0;
const tslib_1 = require("tslib");
const SiteFilterCategory_1 = require("../models/SiteFilterCategory");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let SiteFilterCategoryRepository = class SiteFilterCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SiteFilterCategory_1.SiteFilterCategory);
    }
    findDuplicateCategory(id, filterId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('siteFilterCategory');
            query.where('siteFilterCategory.categoryId = :id', { id });
            query.andWhere('siteFilterCategory.filterId != :filterId', { filterId });
            return query.getRawOne();
        });
    }
};
exports.SiteFilterCategoryRepository = SiteFilterCategoryRepository;
exports.SiteFilterCategoryRepository = SiteFilterCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SiteFilterCategoryRepository);
//# sourceMappingURL=SiteFilterCategoryRepository.js.map