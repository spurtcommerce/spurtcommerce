"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const CustomerGroupRepository_1 = require("../repositories/CustomerGroupRepository");
const typeorm_1 = require("typeorm");
let CustomerGroupService = class CustomerGroupService {
    constructor(customerGroupRepository, log) {
        this.customerGroupRepository = customerGroupRepository;
        this.log = log;
    }
    // find Role
    findOne(findCondition) {
        this.log.info('Find role');
        return this.customerGroupRepository.findOne(findCondition);
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
        condition.order = { createdDate: 'DESC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.customerGroupRepository.count(condition);
        }
        return this.customerGroupRepository.find(condition);
    }
    // create role
    create(customerGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCustomerGroup = yield this.customerGroupRepository.save(customerGroup);
            return newCustomerGroup;
        });
    }
    // update role
    update(id, customerGroup) {
        this.log.info('Update a role');
        customerGroup.groupId = id;
        return this.customerGroupRepository.save(customerGroup);
    }
    // delete role
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a role');
            const deleteCustomer = yield this.customerGroupRepository.delete(id);
            return deleteCustomer;
        });
    }
};
CustomerGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CustomerGroupRepository_1.CustomerGroupRepository, Object])
], CustomerGroupService);
exports.CustomerGroupService = CustomerGroupService;
//# sourceMappingURL=CustomerGroupService.js.map