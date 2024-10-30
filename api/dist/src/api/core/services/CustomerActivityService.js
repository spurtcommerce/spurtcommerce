"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerActivityService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const CustomerActivityRepository_1 = require("../repositories/CustomerActivityRepository");
const typeorm_1 = require("typeorm");
let CustomerActivityService = class CustomerActivityService {
    constructor(customerActivityRepository, log) {
        this.customerActivityRepository = customerActivityRepository;
        this.log = log;
    }
    // find Role
    findOne(findCondition) {
        this.log.info('Find role');
        return this.customerActivityRepository.findOne(findCondition);
    }
    // Role list
    list(limit, offset, select = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table) => {
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
        if (count) {
            return this.customerActivityRepository.count(condition);
        }
        return this.customerActivityRepository.find(condition);
    }
    // create role
    create(customerActivity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCustomerActivity = yield this.customerActivityRepository.save(customerActivity);
            return newCustomerActivity;
        });
    }
    // update role
    update(id, customerActivity) {
        this.log.info('Update a activity');
        customerActivity.customerActivityId = id;
        return this.customerActivityRepository.save(customerActivity);
    }
    // delete role
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a activity');
            const deleteCustomerActivity = yield this.customerActivityRepository.delete(id);
            return deleteCustomerActivity;
        });
    }
};
CustomerActivityService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CustomerActivityRepository_1.CustomerActivityRepository, Object])
], CustomerActivityService);
exports.CustomerActivityService = CustomerActivityService;
//# sourceMappingURL=CustomerActivityService.js.map