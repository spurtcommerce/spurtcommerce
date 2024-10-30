"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrdersService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const VendorOrders_1 = require("../models/VendorOrders");
const VendorOrdersRepository_1 = require("../repositories/VendorOrdersRepository");
const typeorm_1 = require("typeorm");
let VendorOrdersService = class VendorOrdersService {
    constructor(vendorOrdersRepository, log) {
        this.vendorOrdersRepository = vendorOrdersRepository;
        this.log = log;
    }
    // find Role
    findOne(findCondition) {
        this.log.info('Find role');
        return this.vendorOrdersRepository.findOne(findCondition);
    }
    // Role list
    list(limit, offset, select = [], relation = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && (table.value !== undefined || table.value !== '')) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                }
            });
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorOrdersRepository.count(condition);
        }
        return this.vendorOrdersRepository.find(condition);
    }
    // create role
    create(vendorOrders) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVendorCategory = yield this.vendorOrdersRepository.save(vendorOrders);
            return newVendorCategory;
        });
    }
    // update role
    update(id, vendorOrders) {
        this.log.info('Update a vendorOrders');
        vendorOrders.vendorOrderId = id;
        return this.vendorOrdersRepository.save(vendorOrders);
    }
    // delete role
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a vendorOrders');
            const deleteVendor = yield this.vendorOrdersRepository.delete(id);
            return deleteVendor;
        });
    }
    // find Services
    findAll(data) {
        return this.vendorOrdersRepository.find(data);
    }
    // create role
    searchOrderList(id, orderDate, startDate, endDate, keyword, deliverylist) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const recentOrder = yield this.vendorOrdersRepository.searchOrderList(id, orderDate, startDate, endDate, keyword, deliverylist);
            return recentOrder;
        });
    }
    searchOrderListt(id, deliverylist) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Order = yield this.vendorOrdersRepository.searchOrderListt(id, deliverylist);
            return Order;
        });
    }
    // find today orders count
    findVendorTodayOrderCount(id, todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.findVendorTodayOrderCount(id, todaydate);
        });
    }
    // find buyer count and sales count
    getBuyersCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.getTotalBuyers(id);
        });
    }
    // find vendor count
    findVendorCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.findVendorCount(id);
        });
    }
    // find vendors
    findVendors(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.findVendors(id);
        });
    }
    // getting each product revenue including commission
    getEachProductRevenue(productId, vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.getEachProductRevenue(productId, vendorId);
        });
    }
    // getting each vendor revenue including commission
    getTotalVendorRevenue(vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.getTotalVendorRevenue(vendorId);
        });
    }
    // getting total amount for each order
    findSumOfAmount(orderId, vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.findSumOfAmount(orderId, vendorId);
        });
    }
    listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count, rawQuery = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield (0, typeorm_1.getConnection)().getRepository(VendorOrders_1.VendorOrders).createQueryBuilder();
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Join
            if (relations && relations.length > 0) {
                relations.forEach((joinTb) => {
                    if (joinTb.op === 'left') {
                        query.leftJoin(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'cond') {
                        query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                    }
                    else {
                        query.innerJoin(joinTb.tableName, joinTb.aliasName);
                    }
                });
            }
            // Where
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((item) => {
                    if (item.op === 'where' && item.sign === undefined) {
                        query.where(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'and' && item.sign === undefined) {
                        query.andWhere(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'and' && item.sign !== undefined) {
                        query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                    else if (item.op === 'raw' && item.sign !== undefined) {
                        query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                    else if (item.op === 'or' && item.sign === undefined) {
                        query.orWhere(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'IN' && item.sign === undefined) {
                        query.andWhere(item.name + ' IN (' + item.value + ')');
                    }
                });
            }
            // Keyword Search
            if (searchConditions && searchConditions.length > 0) {
                searchConditions.forEach((table) => {
                    if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            query.andWhere(new typeorm_1.Brackets(qb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value, subIndex) => {
                                    if (subIndex === 0) {
                                        qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                        return;
                                    }
                                    qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                });
                            }));
                        });
                    }
                    else if (table.name && table.name instanceof Array && table.name.length > 0) {
                        query.andWhere(new typeorm_1.Brackets(qb => {
                            const namesArray = table.name;
                            namesArray.forEach((name, index) => {
                                if (index === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                            });
                        }));
                    }
                    else if (table.value && table.value instanceof Array && table.value.length > 0) {
                        query.andWhere(new typeorm_1.Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value, index) => {
                                if (index === 0) {
                                    qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    }
                });
            }
            // GroupBy
            if (groupBy && groupBy.length > 0) {
                let i = 0;
                groupBy.forEach((item) => {
                    if (i === 0) {
                        query.groupBy(item.name);
                    }
                    else {
                        query.addGroupBy(item.name);
                    }
                    i++;
                });
            }
            // orderBy
            if (sort && sort.length > 0) {
                sort.forEach((item) => {
                    query.orderBy('' + item.name + '', '' + item.order + '');
                });
            }
            // Limit & Offset
            if (limit && limit > 0) {
                query.limit(limit);
                query.offset(offset);
            }
            if (!count) {
                if (rawQuery) {
                    return query.getRawMany();
                }
                return query.getMany();
            }
            else {
                return query.getCount();
            }
        });
    }
    // getting order count based status
    findOrderCountBasedStatus(vendorId, duration, statusId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.findOrderCountBasedStatus(vendorId, duration, statusId);
        });
    }
    // getting order count based duration
    findOrderCountBasedDuration(vendorId, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.findOrderCountBasedDuration(vendorId, duration);
        });
    }
    // finding product sold based in duration
    productSoldBasedOnDuration(vendorId, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.productSoldBasedOnDuration(vendorId, duration);
        });
    }
    // finding delivered order based in duration
    deliveredOrderBasedOnDuration(vendorId, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorOrdersRepository.deliveredOrderBasedOnDuration(vendorId, duration);
        });
    }
};
VendorOrdersService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorOrdersRepository_1.VendorOrdersRepository, Object])
], VendorOrdersService);
exports.VendorOrdersService = VendorOrdersService;
//# sourceMappingURL=VendorOrderService.js.map