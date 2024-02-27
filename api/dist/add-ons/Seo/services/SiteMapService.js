"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteMapService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const SiteMapRepository_1 = require("../repositories/SiteMapRepository");
let SiteMapService = class SiteMapService {
    constructor(siteMapRepository, log) {
        this.siteMapRepository = siteMapRepository;
        this.log = log;
    }
    // create site map
    create(siteMap) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new site map ');
            return this.siteMapRepository.save(siteMap);
        });
    }
    // find Condition
    findOne(siteMap) {
        return this.siteMapRepository.findOne(siteMap);
    }
    // update site map
    update(id, siteMap) {
        this.log.info('Update a siteMap');
        siteMap.id = id;
        return this.siteMapRepository.save(siteMap);
    }
    // find all
    findAll() {
        return this.siteMapRepository.find();
    }
    // site map List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.siteMapRepository.count(condition);
        }
        else {
            return this.siteMapRepository.find(condition);
        }
    }
    // delete Site Map
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.siteMapRepository.delete(id);
        });
    }
};
SiteMapService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SiteMapRepository_1.SiteMapRepository, Object])
], SiteMapService);
exports.SiteMapService = SiteMapService;
//# sourceMappingURL=SiteMapService.js.map