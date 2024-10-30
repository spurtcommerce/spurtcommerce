"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const VendorCategoryRepository_1 = require("../repositories/VendorCategoryRepository");
const typeorm_1 = require("typeorm");
let VendorCategoryService = class VendorCategoryService {
    constructor(vendorCategoryRepository, log) {
        this.vendorCategoryRepository = vendorCategoryRepository;
        this.log = log;
    }
    // find Role
    findOne(findCondition) {
        this.log.info('Find role');
        return this.vendorCategoryRepository.findOne(findCondition);
    }
    // query builder category list
    queryCategoryList(limit, offset, vendorId, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorCategoryRepository.queryCategoryList(limit, offset, vendorId, keyword, count);
        });
    }
    // Role list
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorCategoryRepository.count(condition);
        }
        return this.vendorCategoryRepository.find(condition);
    }
    // create role
    create(vendorCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVendorCategory = yield this.vendorCategoryRepository.save(vendorCategory);
            return newVendorCategory;
        });
    }
    // update role
    update(id, vendorCategory) {
        this.log.info('Update a vendorCategory');
        vendorCategory.vendorCategoryId = id;
        return this.vendorCategoryRepository.save(vendorCategory);
    }
    // delete role
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a vendorCategory');
            const deleteUser = yield this.vendorCategoryRepository.delete(id);
            return deleteUser;
        });
    }
    vendorCategoryCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorCategoryRepository.vendorCategoryCount(id);
        });
    }
    // find Services
    findAll(data) {
        return this.vendorCategoryRepository.find(data);
    }
};
VendorCategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorCategoryRepository_1.VendorCategoryRepository, Object])
], VendorCategoryService);
exports.VendorCategoryService = VendorCategoryService;
//# sourceMappingURL=VendorCategoryService.js.map