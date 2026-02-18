"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const tslib_1 = require("tslib");
const Customer_1 = require("../models/Customer");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let CustomerRepository = class CustomerRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Customer_1.Customer);
    }
    TodayCustomerCount(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('customer');
            query.select(['COUNT(customer.id) as customerCount']);
            query.where('DATE(customer.createdDate) = :todaydate', { todaydate });
            return query.getRawOne();
        });
    }
    dashboardCustomerCount(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('Customer');
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
exports.CustomerRepository = CustomerRepository;
exports.CustomerRepository = CustomerRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CustomerRepository);
//# sourceMappingURL=CustomerRepository.js.map