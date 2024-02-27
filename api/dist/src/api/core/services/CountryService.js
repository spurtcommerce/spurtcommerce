"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const CountryRepository_1 = require("../repositories/CountryRepository");
const index_1 = require("typeorm/index");
let CountryService = class CountryService {
    constructor(countryRepository, log) {
        this.countryRepository = countryRepository;
        this.log = log;
    }
    // create Country
    create(country) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new country ');
            return this.countryRepository.save(country);
        });
    }
    // findCondition
    findOne(country) {
        return this.countryRepository.findOne(country);
    }
    // update country
    update(id, country) {
        country.countryId = id;
        return this.countryRepository.save(country);
    }
    // country List
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
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        condition.order = {
            name: 'ASC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.countryRepository.count(condition);
        }
        else {
            return this.countryRepository.find(condition);
        }
    }
    // delete Country
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.countryRepository.delete(id);
        });
    }
};
CountryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CountryRepository_1.CountryRepository, Object])
], CountryService);
exports.CountryService = CountryService;
//# sourceMappingURL=CountryService.js.map