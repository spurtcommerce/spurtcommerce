"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const StockLogRepository_1 = require("../repositories/StockLogRepository");
const index_1 = require("typeorm/index");
let StockLogService = class StockLogService {
    constructor(stockLogRepository, log) {
        this.stockLogRepository = stockLogRepository;
        this.log = log;
    }
    // create
    create(stockLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newStockLog = yield this.stockLogRepository.save(stockLog);
            this.log.info('Create a stockLog');
            return newStockLog;
        });
    }
    // find stock
    findOne(stockLog) {
        return this.stockLogRepository.findOne(stockLog);
    }
    // stock log list
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
        if (count) {
            return this.stockLogRepository.count(condition);
        }
        else {
            return this.stockLogRepository.find(condition);
        }
    }
    // delete StockLog
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.stockLogRepository.delete(id);
        });
    }
};
StockLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [StockLogRepository_1.StockLogRepository, Object])
], StockLogService);
exports.StockLogService = StockLogService;
//# sourceMappingURL=StockLogService.js.map