"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCategoryRepository = void 0;
const tslib_1 = require("tslib");
const CategoryPath_1 = require("../models/CategoryPath");
const VendorCategory_1 = require("../models/VendorCategory");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorCategoryRepository = class VendorCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorCategory_1.VendorCategory);
    }
    queryCategoryList(limit, offset, vendorId, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(CategoryPath_1.CategoryPath, 'CategoryPath');
            query.select([
                'vendorCategory.vendorCategoryId as vendorCategoryId',
                'vendorCategory.vendorId as vendorId',
                'vendorCategory.categoryId as categoryId',
                'vendorCategory.vendorCategoryCommission as vendorCategoryCommission',
                'category.name as categoryName',
                'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
            ]);
            query.leftJoin('CategoryPath.path', 'path');
            query.leftJoin('CategoryPath.category', 'category');
            query.leftJoin('category.vendorCategory', 'vendorCategory');
            query.where('vendorCategory.vendorId = :id', { id: vendorId });
            query.groupBy('CategoryPath.category_id');
            if (keyword) {
                query.andWhere('category.name LIKE ' + "'%" + keyword + "%'" + ' ');
            }
            query.limit(limit);
            query.offset(offset);
            if (count) {
                return query.getCount();
            }
            return query.getRawMany();
        });
    }
    vendorCategoryCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('vendorCategory');
            query.select(['vendorCategory.vendorId as vendorCategoryCount']);
            query.where('vendorCategory.vendor_id = :value', { value: id });
            query.innerJoin('vendorCategory.vendor', 'vendor');
            return query.getCount();
        });
    }
};
exports.VendorCategoryRepository = VendorCategoryRepository;
exports.VendorCategoryRepository = VendorCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorCategoryRepository);
//# sourceMappingURL=VendorCategoryRepository.js.map