"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const CurrencyRepository_1 = require("../repositories/CurrencyRepository");
let CurrencyService = class CurrencyService {
    constructor(currencyRepository, log) {
        this.currencyRepository = currencyRepository;
        this.log = log;
    }
    // create Currency
    create(currency) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new currency ');
            return this.currencyRepository.save(currency);
        });
    }
    // findCondition
    findOne(country) {
        return this.currencyRepository.findOne(country);
    }
    // update currency
    update(id, currency) {
        currency.currencyId = id;
        return this.currencyRepository.save(currency);
    }
    // currency List
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
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.currencyRepository.count(condition);
        }
        else {
            return this.currencyRepository.find(condition);
        }
    }
    // delete currency
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.currencyRepository.delete(id);
            return;
        });
    }
};
CurrencyService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CurrencyRepository_1.CurrencyRepository, Object])
], CurrencyService);
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=CurrencyService.js.map