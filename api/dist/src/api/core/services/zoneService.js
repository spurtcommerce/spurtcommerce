"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const ZoneRepository_1 = require("../repositories/ZoneRepository");
let ZoneService = class ZoneService {
    constructor(zoneRepository, log) {
        this.zoneRepository = zoneRepository;
        this.log = log;
    }
    // create zone
    create(zone) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new zone ');
            return this.zoneRepository.save(zone);
        });
    }
    // find condition
    find(zone) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.zoneRepository.find(zone);
        });
    }
    // find one Condition
    findOne(zone) {
        return this.zoneRepository.findOne(zone);
    }
    // update zone
    update(id, zone) {
        zone.zoneId = id;
        return this.zoneRepository.save(zone);
    }
    // zone List
    list(limit, offset, select = [], search = [], whereConditions = [], relation = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.zoneRepository.count(condition);
        }
        else {
            return this.zoneRepository.find(condition);
        }
    }
    // delete Zone
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.zoneRepository.delete(id);
        });
    }
};
ZoneService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ZoneRepository_1.ZoneRepository, Object])
], ZoneService);
exports.ZoneService = ZoneService;
//# sourceMappingURL=zoneService.js.map