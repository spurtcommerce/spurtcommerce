"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelReasonService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const OrderCancelReasonRepository_1 = require("../repositories/OrderCancelReasonRepository");
let OrderCancelReasonService = class OrderCancelReasonService {
    constructor(orderCancelReasonRepository, log) {
        this.orderCancelReasonRepository = orderCancelReasonRepository;
        this.log = log;
    }
    // create
    create(orderCancelReason) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new address ');
            return this.orderCancelReasonRepository.save(orderCancelReason);
        });
    }
    // findOne
    findOne(orderCancelReason) {
        return this.orderCancelReasonRepository.findOne(orderCancelReason);
    }
    // update
    update(id, orderCancelReason) {
        orderCancelReason.id = id;
        return this.orderCancelReasonRepository.save(orderCancelReason);
    }
    // address
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
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.orderCancelReasonRepository.count(condition);
        }
        else {
            return this.orderCancelReasonRepository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.orderCancelReasonRepository.delete(id);
            return 1;
        });
    }
    // find Al
    find(address) {
        return this.orderCancelReasonRepository.find(address);
    }
};
OrderCancelReasonService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderCancelReasonRepository_1.OrderCancelReasonRepository, Object])
], OrderCancelReasonService);
exports.OrderCancelReasonService = OrderCancelReasonService;
//# sourceMappingURL=OrderCancelReasonService.js.map