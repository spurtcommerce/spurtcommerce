"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const LoginLogRepository_1 = require("../repositories/LoginLogRepository");
let LoginLogService = class LoginLogService {
    constructor(loginLogRepository, log) {
        this.loginLogRepository = loginLogRepository;
        this.log = log;
    }
    // create banner
    create(loginLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new log ');
            return this.loginLogRepository.repository.save(loginLog);
        });
    }
    // find Condition
    findOne(loginLog) {
        return this.loginLogRepository.repository.findOne(loginLog);
    }
    // update loginlog
    update(id, loginLog) {
        loginLog.id = id;
        return this.loginLogRepository.repository.save(loginLog);
    }
    // log List
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
            return this.loginLogRepository.repository.count(condition);
        }
        else {
            return this.loginLogRepository.repository.find(condition);
        }
    }
    // delete loginlog
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.loginLogRepository.repository.delete(id);
        });
    }
    // log list query
    logList(limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.loginLogRepository.logList(limit);
        });
    }
    // log list query
    customerVisitList(month, year) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.loginLogRepository.customerVisitList(month, year);
        });
    }
};
exports.LoginLogService = LoginLogService;
exports.LoginLogService = LoginLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [LoginLogRepository_1.LoginLogRepository, Object])
], LoginLogService);
//# sourceMappingURL=LoginLogService.js.map