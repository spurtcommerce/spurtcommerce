"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceUpdateFileLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const PriceUpdateFileLogRepository_1 = require("../repositories/PriceUpdateFileLogRepository");
const typeorm_1 = require("typeorm");
let PriceUpdateFileLogService = class PriceUpdateFileLogService {
    constructor(priceUpdateFileLogRepository, log) {
        this.priceUpdateFileLogRepository = priceUpdateFileLogRepository;
        this.log = log;
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a data');
            return this.priceUpdateFileLogRepository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.priceUpdateFileLogRepository.findOne(id);
    }
    // find a data
    findAll(productSpecial) {
        this.log.info('Find a data');
        return this.priceUpdateFileLogRepository.find(productSpecial);
    }
    // find a data
    find() {
        this.log.info('Find a data');
        return this.priceUpdateFileLogRepository.find();
    }
    // delete product option
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product option value');
            const deleteProductOptionValue = yield this.priceUpdateFileLogRepository.delete(id);
            return deleteProductOptionValue;
        });
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
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
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
            return this.priceUpdateFileLogRepository.count(condition);
        }
        else {
            return this.priceUpdateFileLogRepository.find(condition);
        }
    }
};
PriceUpdateFileLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [PriceUpdateFileLogRepository_1.PriceUpdateFileLogRepository, Object])
], PriceUpdateFileLogService);
exports.PriceUpdateFileLogService = PriceUpdateFileLogService;
//# sourceMappingURL=PriceUpdateFileLogService.js.map