"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const SiteFilterSectionRepository_1 = require("../repositories/SiteFilterSectionRepository");
const typeorm_1 = require("typeorm");
let SiteFilterSectionService = class SiteFilterSectionService {
    constructor(siteFilterSectionRepository, log) {
        this.siteFilterSectionRepository = siteFilterSectionRepository;
        this.log = log;
    }
    // find one condition
    findOne(siteFilterSection) {
        return this.siteFilterSectionRepository.findOne(siteFilterSection);
    }
    // find all
    findAll(siteFilterSection) {
        this.log.info('Find all');
        return this.siteFilterSectionRepository.find(siteFilterSection);
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
            return this.siteFilterSectionRepository.count(condition);
        }
        else {
            return this.siteFilterSectionRepository.find(condition);
        }
    }
    // create
    create(siteFilterSection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newSiteFilterSection = yield this.siteFilterSectionRepository.save(siteFilterSection);
            return newSiteFilterSection;
        });
    }
    // update
    update(id, siteFilterSection) {
        this.log.info('Update');
        siteFilterSection.id = id;
        return this.siteFilterSectionRepository.save(siteFilterSection);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete');
            const newSiteFilter = yield this.siteFilterSectionRepository.delete(id);
            return newSiteFilter;
        });
    }
};
SiteFilterSectionService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SiteFilterSectionRepository_1.SiteFilterSectionRepository, Object])
], SiteFilterSectionService);
exports.SiteFilterSectionService = SiteFilterSectionService;
//# sourceMappingURL=SiteFilterSectionService.js.map