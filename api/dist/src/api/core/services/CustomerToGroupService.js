"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerToGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const CustomerToGroupRepository_1 = require("../repositories/CustomerToGroupRepository");
let CustomerToGroupService = class CustomerToGroupService {
    constructor(customerToGroupRepository, log) {
        this.customerToGroupRepository = customerToGroupRepository;
        this.log = log;
    }
    // create job
    create(job) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new job ');
            return this.customerToGroupRepository.save(job);
        });
    }
    // find One job
    findOne(job) {
        return this.customerToGroupRepository.findOne(job);
    }
    // findAll job
    find(job) {
        return this.customerToGroupRepository.find(job);
    }
    // update job
    update(job) {
        return this.customerToGroupRepository.save(job);
    }
    // job List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                return this.customerToGroupRepository.count(condition);
            }
            else {
                return this.customerToGroupRepository.find(condition);
            }
        });
    }
    // delete job
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.customerToGroupRepository.delete(id);
        });
    }
};
CustomerToGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CustomerToGroupRepository_1.CustomerToGroupRepository, Object])
], CustomerToGroupService);
exports.CustomerToGroupService = CustomerToGroupService;
//# sourceMappingURL=CustomerToGroupService.js.map