"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const OrderStatusRepository_1 = require("../repositories/OrderStatusRepository");
const index_1 = require("typeorm/index");
let OrderStatusService = class OrderStatusService {
    constructor(orderStatusRepository, log) {
        this.orderStatusRepository = orderStatusRepository;
        this.log = log;
    }
    // create orderStatus
    create(orderStatus) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newOrderStatus = yield this.orderStatusRepository.save(orderStatus);
            this.log.info('Create a orderStatus');
            return newOrderStatus;
        });
    }
    update(condition, orderStatus) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newOrderStatus = yield this.orderStatusRepository.update(condition, orderStatus);
            return newOrderStatus;
        });
    }
    // find one orderStatus
    findOne(orderStatus) {
        return this.orderStatusRepository.findOne(orderStatus);
    }
    // find one orderStatus
    findAll(orderStatus) {
        return this.orderStatusRepository.find(orderStatus);
    }
    // orderStatus List
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
            priority: 'ASC',
            createdDate: 'DESC',
        };
        if (count) {
            return this.orderStatusRepository.count(condition);
        }
        else {
            return this.orderStatusRepository.find(condition);
        }
    }
    // delete orderStatus
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderStatusRepository.delete(id);
        });
    }
};
OrderStatusService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderStatusRepository_1.OrderStatusRepository, Object])
], OrderStatusService);
exports.OrderStatusService = OrderStatusService;
//# sourceMappingURL=OrderStatusService.js.map