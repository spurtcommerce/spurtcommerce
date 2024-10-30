"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const tslib_1 = require("tslib");
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
const typeorm_1 = require("typeorm");
const Customer_1 = require("../models/Customer");
let CustomerRepository = class CustomerRepository extends typeorm_1.Repository {
    TodayCustomerCount(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Customer_1.Customer, 'customer');
            query.select(['COUNT(customer.id) as customerCount']);
            query.where('DATE(customer.createdDate) = :todaydate', { todaydate });
            return query.getRawOne();
        });
    }
    dashboardCustomerCount(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Customer_1.Customer, 'Customer');
            query.where('Customer.deleteFlag = 0');
            if (duration === 1 && duration) {
                query.andWhere('DATE(Customer.created_date) = DATE(NOW())');
            }
            else if (duration === 2 && duration) {
                query.andWhere('WEEK(Customer.created_date) = WEEK(NOW()) AND MONTH(Customer.created_date) = MONTH(NOW()) AND YEAR(Customer.created_date) = YEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('MONTH(Customer.created_date) = MONTH(NOW()) AND YEAR(Customer.created_date) = YEAR(NOW())');
            }
            else if (duration === 4 && duration) {
                query.andWhere('YEAR(Customer.created_date) = YEAR(NOW())');
            }
            return query.getCount();
        });
    }
};
CustomerRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Customer_1.Customer)
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=CustomerRepository.js.map