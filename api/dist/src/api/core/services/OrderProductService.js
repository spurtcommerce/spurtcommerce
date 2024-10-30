"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const OrderProduct_1 = require("../models/OrderProduct");
const OrderProductRepository_1 = require("../repositories/OrderProductRepository");
const typeorm_1 = require("typeorm");
let OrderProductService = class OrderProductService {
    constructor(orderProductRepository, log) {
        this.orderProductRepository = orderProductRepository;
        this.log = log;
    }
    createData(checkoutdata) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a order product data');
            return this.orderProductRepository.save(checkoutdata);
        });
    }
    findData(productid, orderid, orderProductid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('find a order product data');
            return this.orderProductRepository.find({ where: { productId: productid, orderId: orderid, orderProductId: orderProductid } });
        });
    }
    find(order) {
        return this.orderProductRepository.find(order);
    }
    findOne(productData) {
        return this.orderProductRepository.findOne(productData);
    }
    // findAll
    findAll(orderProduct) {
        return this.orderProductRepository.find(orderProduct);
    }
    // order list
    List(limit) {
        return this.orderProductRepository.List(limit);
    }
    // order count
    findAndCount(where) {
        return this.orderProductRepository.findAndCount(where);
    }
    // getting earnings
    getEarnings(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.getEarnings(id);
        });
    }
    // getting product without order
    productPaymentProcess(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.productPaymentProcess(id);
        });
    }
    // getting buyed count
    buyedCount(id, customerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.buyedCount(id, customerId);
        });
    }
    // count
    count(productData) {
        return this.orderProductRepository.count(productData);
    }
    listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield (0, typeorm_1.getConnection)().getRepository(OrderProduct_1.OrderProduct).createQueryBuilder();
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
                    else if (joinTb.op === 'left-cond') {
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
                    else if (item.op === 'not' && item.sign === undefined) {
                        query.andWhere(item.name + ' != ' + item.value);
                    }
                    else if (item.op === 'cancel' && item.sign === undefined) {
                        query.andWhere(item.name + ' != ' + item.value);
                    }
                    else if (item.op === 'andWhere' && item.sign === undefined) {
                        query.andWhere(item.name + ' = ' + ' \'' + item.value + '\'');
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
    update(id, orderProduct) {
        this.log.info('Update a order produts');
        orderProduct.orderProductId = id;
        return this.orderProductRepository.save(orderProduct);
    }
    //  find Product varient
    productVarientPaymentProcess(sku) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.productVarientPaymentProcess(sku);
        });
    }
    // top performing products
    topPerformingProducts(limit, offset, count, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.topPerformingProduct(limit, offset, count, duration);
        });
    }
    // sales list
    salesGraphList(year, month) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.salesGraphList(year, month);
        });
    }
    topTenWeeklySalesList(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.topTenWeeklySales(productId);
        });
    }
    // getting sum of total from order products
    dashboardOrderProductsTotal(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.dashboardOrderProductsTotal(duration);
        });
    }
    findVariantSku(skuName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderProductRepository.checkSkuForVariant(skuName);
        });
    }
};
OrderProductService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderProductRepository_1.OrderProductRepository, Object])
], OrderProductService);
exports.OrderProductService = OrderProductService;
//# sourceMappingURL=OrderProductService.js.map