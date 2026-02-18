"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUsageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const CouponUsageRepository_1 = require("../repository/CouponUsageRepository");
const index_1 = require("typeorm/index");
let CouponUsageService = class CouponUsageService {
    constructor(couponUsageRepository, log) {
        this.couponUsageRepository = couponUsageRepository;
        this.log = log;
    }
    // create Country
    create(country) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new country ');
            return this.couponUsageRepository.repository.save(country);
        });
    }
    // findCondition
    findOne(country) {
        return this.couponUsageRepository.repository.findOne(country);
    }
    // update country
    update(id, country) {
        country.couponUsageId = id;
        return this.couponUsageRepository.repository.save(country);
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
            return this.couponUsageRepository.repository.count(condition);
        }
        else {
            return this.couponUsageRepository.repository.find(condition);
        }
    }
    // delete Country
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.couponUsageRepository.repository.delete(id);
        });
    }
    // find Condition
    findAll(data) {
        return this.couponUsageRepository.repository.find(data);
    }
};
exports.CouponUsageService = CouponUsageService;
exports.CouponUsageService = CouponUsageService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CouponUsageRepository_1.CouponUsageRepository, Object])
], CouponUsageService);
//# sourceMappingURL=CouponUsageService.js.map