"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterCategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const SiteFilterCategoryRepository_1 = require("../repositories/SiteFilterCategoryRepository");
const typeorm_1 = require("typeorm");
let SiteFilterCategoryService = class SiteFilterCategoryService {
    constructor(siteFilterCategoryRepository, log) {
        this.siteFilterCategoryRepository = siteFilterCategoryRepository;
        this.log = log;
    }
    // find one condition
    findOne(siteFilterCategory) {
        return this.siteFilterCategoryRepository.findOne(siteFilterCategory);
    }
    // find all
    findAll(siteFilterCategory) {
        this.log.info('Find all');
        return this.siteFilterCategoryRepository.find(siteFilterCategory);
    }
    // list
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const operator = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.siteFilterCategoryRepository.count(condition);
        }
        else {
            return this.siteFilterCategoryRepository.find(condition);
        }
    }
    // create
    create(siteFilterCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newSiteFilterCategory = yield this.siteFilterCategoryRepository.save(siteFilterCategory);
            return newSiteFilterCategory;
        });
    }
    // update
    update(id, siteFilterCategory) {
        this.log.info('Update');
        siteFilterCategory.id = id;
        return this.siteFilterCategoryRepository.save(siteFilterCategory);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete');
            const newSiteFilter = yield this.siteFilterCategoryRepository.delete(id);
            return newSiteFilter;
        });
    }
    // find user
    findDuplicateCategory(id, filterId) {
        return this.siteFilterCategoryRepository.findDuplicateCategory(id, filterId);
    }
};
SiteFilterCategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SiteFilterCategoryRepository_1.SiteFilterCategoryRepository, Object])
], SiteFilterCategoryService);
exports.SiteFilterCategoryService = SiteFilterCategoryService;
//# sourceMappingURL=SiteFilterCategoryService.js.map