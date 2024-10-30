"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionItemService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const SiteFilterSectionItemRepository_1 = require("../repositories/SiteFilterSectionItemRepository");
const typeorm_1 = require("typeorm");
let SiteFilterSectionItemService = class SiteFilterSectionItemService {
    constructor(siteFilterSectionItemRepository, log) {
        this.siteFilterSectionItemRepository = siteFilterSectionItemRepository;
        this.log = log;
    }
    // find one condition
    findOne(siteFilterSectionItem) {
        return this.siteFilterSectionItemRepository.findOne(siteFilterSectionItem);
    }
    // find all
    findAll(siteFilterSectionItem) {
        this.log.info('Find all');
        return this.siteFilterSectionItemRepository.find(siteFilterSectionItem);
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
            return this.siteFilterSectionItemRepository.count(condition);
        }
        else {
            return this.siteFilterSectionItemRepository.find(condition);
        }
    }
    // create
    create(siteFilterSectionItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newSiteFilterSection = yield this.siteFilterSectionItemRepository.save(siteFilterSectionItem);
            return newSiteFilterSection;
        });
    }
    // update
    update(id, siteFilterSectionItem) {
        this.log.info('Update');
        siteFilterSectionItem.id = id;
        return this.siteFilterSectionItemRepository.save(siteFilterSectionItem);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete');
            const newSiteFilter = yield this.siteFilterSectionItemRepository.delete(id);
            return newSiteFilter;
        });
    }
};
SiteFilterSectionItemService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SiteFilterSectionItemRepository_1.SiteFilterSectionItemRepository, Object])
], SiteFilterSectionItemService);
exports.SiteFilterSectionItemService = SiteFilterSectionItemService;
//# sourceMappingURL=SiteFilterSectionItemService.js.map