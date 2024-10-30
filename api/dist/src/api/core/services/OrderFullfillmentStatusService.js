"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFullfillmentStatusService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const OrderFullfillmentStatusRepository_1 = require("../repositories/OrderFullfillmentStatusRepository");
const typeorm_1 = require("typeorm");
let OrderFullfillmentStatusService = class OrderFullfillmentStatusService {
    constructor(orderFulfillmentStatusRepository, log) {
        this.orderFulfillmentStatusRepository = orderFulfillmentStatusRepository;
        this.log = log;
    }
    // create payload
    create(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new payload ');
            return this.orderFulfillmentStatusRepository.save(payload);
        });
    }
    // find One payload
    findOne(payload) {
        return this.orderFulfillmentStatusRepository.findOne(payload);
    }
    // findAll payload
    findAll(payload) {
        return this.orderFulfillmentStatusRepository.find(payload);
    }
    // update payload
    update(payload) {
        return this.orderFulfillmentStatusRepository.save(payload);
    }
    // delete payload
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderFulfillmentStatusRepository.delete(id);
        });
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
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            priority: 'ASC',
        };
        if (count) {
            return this.orderFulfillmentStatusRepository.count(condition);
        }
        else {
            return this.orderFulfillmentStatusRepository.find(condition);
        }
    }
};
OrderFullfillmentStatusService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderFullfillmentStatusRepository_1.OrderFulfillmentStatusRepository, Object])
], OrderFullfillmentStatusService);
exports.OrderFullfillmentStatusService = OrderFullfillmentStatusService;
//# sourceMappingURL=OrderFullfillmentStatusService.js.map