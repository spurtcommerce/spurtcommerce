"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
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
    list(limit = 0, offset = 0, select = [], whereConditions = [], searchCondition, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = (qb) => {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((item) => {
                    if (item.op === 'where') {
                        qb.where(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'and') {
                        qb.andWhere(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'or') {
                        qb.orWhere(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'In') {
                        qb.andWhere(`${item.name} IN (${item.value})`);
                    }
                    else if (item.op === 'raw') {
                        qb.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                });
            }
            if ((searchCondition === null || searchCondition === void 0 ? void 0 : searchCondition.length) > 0) {
                searchCondition.forEach((table) => {
                    if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            qb.andWhere(new index_1.Brackets(subqb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value, subIndex) => {
                                    if (subIndex === 0) {
                                        subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                        return;
                                    }
                                    subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                });
                            }));
                        });
                    }
                    else if (table.name && table.name instanceof Array && table.name.length > 0) {
                        qb.andWhere(new index_1.Brackets(subqb => {
                            const namesArray = table.name;
                            namesArray.forEach((name, index) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                            });
                        }));
                    }
                    else if (table.value && table.value instanceof Array && table.value.length > 0) {
                        qb.andWhere(new index_1.Brackets(subqb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value, index) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    }
                });
            }
        };
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
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