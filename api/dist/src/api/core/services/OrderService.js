"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const index_2 = require("typeorm/index");
const OrderRepository_1 = require("../repositories/OrderRepository");
const Order_1 = require("../models/Order");
let OrderService = class OrderService {
    constructor(orderRepository, log) {
        this.orderRepository = orderRepository;
        this.log = log;
    }
    // create order
    create(order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new order ');
            return this.orderRepository.save(order);
        });
    }
    // order count
    find(order) {
        return this.orderRepository.find(order);
    }
    // order count
    findAll() {
        return this.orderRepository.find();
    }
    // findOne Condition
    findOne(whereCondition) {
        this.log.info('Find Order Detail');
        const condition = {};
        if (whereCondition && whereCondition.length > 0) {
            condition.where = whereCondition[0];
            condition.relations = whereCondition[1].relation;
        }
        else {
            condition.orderId = whereCondition;
        }
        return this.orderRepository.findOne(condition);
    }
    // update order
    update(id, order) {
        order.oderId = id;
        return this.orderRepository.save(order);
    }
    bulkUpdateByIds(ids, payload) {
        return this.orderRepository.update({ orderId: (0, index_1.In)(ids) }, payload);
    }
    // order List
    list(limit, offset, select = [], search = [], whereConditions = [], relation = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value1;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'like' && table.value !== undefined && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
                else if (operator === 'where' && table.value !== undefined && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'between' && table.value1 !== undefined && table.value1 !== '' && table.value2 !== undefined && table.value2 !== '') {
                    condition.where[table.name] = (0, index_2.Between)(table.value1, table.value2);
                }
            });
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.orderRepository.count(condition);
        }
        else {
            const query = this.orderRepository.find(condition);
            return query;
        }
    }
    // findOne order
    findOrder(order) {
        return this.orderRepository.findOne(order);
    }
    // delete order
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.delete(id);
        });
    }
    // sales list
    salesList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.salesList();
        });
    }
    // dashboard transaction list
    transactionList(year) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.transactionList(year);
        });
    }
    // find today orders
    findAlltodayOrder(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.findAllTodayOrder(todaydate);
        });
    }
    // find today orders count
    findAllTodayOrderCount(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.findAllTodayOrderCount(todaydate);
        });
    }
    listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield (0, index_1.getConnection)().getRepository(Order_1.Order).createQueryBuilder('Order');
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
                    else if (joinTb.op === 'left-select') {
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'left-select-cond') {
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName, joinTb.cond);
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
                            query.andWhere(new index_1.Brackets(qb => {
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
                        query.andWhere(new index_1.Brackets(qb => {
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
                        query.andWhere(new index_1.Brackets(qb => {
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
    // find total orders
    findTotalOrderAmount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.findTotalOrderAmount();
        });
    }
    // order count
    orderCount(orderId, orderStatusId, totalAmount, customerName, dateAdded) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.orderCount(orderId, orderStatusId, totalAmount, customerName, dateAdded);
        });
    }
    // find dashboard Orders Count
    dashboardOrdersCount(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.dashboardOrdersCount(duration);
        });
    }
    // getting orders count
    ordersCount(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.ordersCount(duration);
        });
    }
};
OrderService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderRepository_1.OrderRepository, Object])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map