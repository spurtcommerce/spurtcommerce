"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const OrderProductLogRepository_1 = require("../repositories/OrderProductLogRepository");
let OrderProductLogService = class OrderProductLogService {
    constructor(orderProductLogRepository, log) {
        this.orderProductLogRepository = orderProductLogRepository;
        this.log = log;
    }
    find(orderProductLog) {
        this.log.info('Find a data');
        return this.orderProductLogRepository.find(orderProductLog);
    }
    findOne(productData) {
        return this.orderProductLogRepository.findOne(productData);
    }
    // order list
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
        const condition = {};
        condition.where = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.orderProductLogRepository.count(condition);
        }
        else {
            return this.orderProductLogRepository.find(condition);
        }
    }
    // order count
    findAndCount(where) {
        return this.orderProductLogRepository.findAndCount(where);
    }
    create(orderProductLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.orderProductLogRepository.save(orderProductLog);
        });
    }
};
OrderProductLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderProductLogRepository_1.OrderProductLogRepository, Object])
], OrderProductLogService);
exports.OrderProductLogService = OrderProductLogService;
//# sourceMappingURL=OrderProductLogService.js.map