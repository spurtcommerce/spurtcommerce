"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const LoginLog_1 = require("../models/LoginLog");
let LoginLogRepository = class LoginLogRepository extends typeorm_1.Repository {
    logList(limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(LoginLog_1.LoginLog, 'LoginLog');
            query.select(['COUNT(LoginLog.id) as logcount', 'DATE(created_date) as createdDate']);
            query.groupBy('createdDate');
            query.orderBy('createdDate', 'DESC');
            query.limit(limit);
            return query.getRawMany();
        });
    }
    customerVisitList(month, year) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(LoginLog_1.LoginLog, 'loginLog');
            query.select(['COUNT(loginLog.id) as visitCount', 'MAX(DAYOFMONTH(created_date)) as dayOfMonth', 'MAX(MONTH(created_date)) as month', 'MAX(YEAR(created_date)) as year']);
            if (month && year) {
                query.andWhere('MONTH(loginLog.created_date) = :month AND YEAR(loginLog.created_date) = :year', { month, year });
            }
            query.groupBy('DATE(created_date)');
            query.orderBy('DATE(created_date)', 'ASC');
            return query.getRawMany();
        });
    }
};
LoginLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(LoginLog_1.LoginLog)
], LoginLogRepository);
exports.LoginLogRepository = LoginLogRepository;
//# sourceMappingURL=LoginLogRepository.js.map