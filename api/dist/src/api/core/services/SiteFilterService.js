"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const SiteFilterRepository_1 = require("../repositories/SiteFilterRepository");
const typeorm_1 = require("typeorm");
let SiteFilterService = class SiteFilterService {
    constructor(siteFilterRepository, log) {
        this.siteFilterRepository = siteFilterRepository;
        this.log = log;
    }
    // find one condition
    findOne(siteFilter) {
        return this.siteFilterRepository.findOne(siteFilter);
    }
    // find all
    findAll(siteFilter) {
        this.log.info('Find all');
        return this.siteFilterRepository.find(siteFilter);
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
            return this.siteFilterRepository.count(condition);
        }
        else {
            return this.siteFilterRepository.find(condition);
        }
    }
    // create
    create(siteFilter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newSiteFilter = yield this.siteFilterRepository.save(siteFilter);
            return newSiteFilter;
        });
    }
    // update
    update(id, siteFilter) {
        this.log.info('Update');
        siteFilter.id = id;
        return this.siteFilterRepository.save(siteFilter);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete');
            const newSiteFilter = yield this.siteFilterRepository.delete(id);
            return newSiteFilter;
        });
    }
};
SiteFilterService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SiteFilterRepository_1.SiteFilterRepository, Object])
], SiteFilterService);
exports.SiteFilterService = SiteFilterService;
//# sourceMappingURL=SiteFilterService.js.map