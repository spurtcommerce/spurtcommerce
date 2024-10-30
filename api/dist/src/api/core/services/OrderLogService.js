"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const OrderLogRepository_1 = require("../repositories/OrderLogRepository");
let OrderLogService = class OrderLogService {
    constructor(orderLogRepository, log) {
        this.orderLogRepository = orderLogRepository;
        this.log = log;
    }
    // create orderLog
    create(order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new orderLog ');
            return this.orderLogRepository.save(order);
        });
    }
    // find Condition
    findOne(whereCondition) {
        this.log.info('Find orderLog Detail');
        const condition = {};
        if (whereCondition && whereCondition.length > 0) {
            condition.where = whereCondition[0];
            condition.relations = whereCondition[1].relation;
        }
        else {
            condition.id = whereCondition;
        }
        return this.orderLogRepository.findOne(condition);
    }
    // update orderLog
    update(id, order) {
        order.oderId = id;
        return this.orderLogRepository.save(order);
    }
    // orderLog List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        condition.where = {};
        if (select && select.length > 0) {
            condition.select = select;
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
            return this.orderLogRepository.count(condition);
        }
        else {
            return this.orderLogRepository.find(condition);
        }
    }
    // delete orderLog
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderLogRepository.delete(id);
        });
    }
    // orderLog count
    find() {
        return this.orderLogRepository.find();
    }
};
OrderLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderLogRepository_1.OrderLogRepository, Object])
], OrderLogService);
exports.OrderLogService = OrderLogService;
//# sourceMappingURL=OrderLogService.js.map