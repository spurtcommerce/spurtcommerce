"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const Logger_1 = require("../../../decorators/Logger");
const VendorProducts_1 = require("../models/VendorProducts");
const VendorProductRepository_1 = require("../repositories/VendorProductRepository");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let VendorProductService = class VendorProductService {
    constructor(vendorProductsRepository, log) {
        this.vendorProductsRepository = vendorProductsRepository;
        this.log = log;
    }
    // find user
    findOne(findCondition) {
        this.log.info('Find all users');
        return this.vendorProductsRepository.repository.findOne(findCondition);
    }
    // user list
    list(limit = 0, offset = 0, select = [], relation = [], whereConditions = [], keyword, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
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
            return this.vendorProductsRepository.repository.count(condition);
        }
        else {
            return this.vendorProductsRepository.repository.find(condition);
        }
    }
    // create user
    create(vendorProducts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new vendorProducts => ', vendorProducts.toString());
            const newVendorProducts = yield this.vendorProductsRepository.repository.save(vendorProducts);
            return newVendorProducts;
        });
    }
    // update user
    update(id, vendorProducts) {
        this.log.info('Update a VendorProducts');
        vendorProducts.vendorProductId = id;
        return this.vendorProductsRepository.repository.save(vendorProducts);
    }
    // delete user
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a VendorProducts');
            const vendorProducts = yield this.vendorProductsRepository.repository.delete(id);
            return vendorProducts;
        });
    }
    // find user
    findAll() {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.repository.find();
    }
    // find user
    find(data) {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.repository.find(data);
    }
    // find user
    findVendorActiveProduct(id, limit, offset) {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.vendorActiveProduct(id, limit, offset);
    }
    // Top selling product
    topProductSelling(id, duration, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.topProductSelling(id, duration, limit);
        });
    }
    // finding category mapped for vendor product
    findingProduct(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.findingProduct(categoryId);
        });
    }
    // finding category mapped for vendor product
    vendorProductBasedOnDuration(vendorId, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.vendorProductBasedOnDuration(vendorId, duration);
        });
    }
    // out of stock for simplified product
    outOfStockBasedOnDuration(vendorId, duration, stock) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.outOfStockSBasedOnDuration(vendorId, duration, stock);
        });
    }
    listByQueryBuilder(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
            const query = yield (0, typeormLoader_1.getDataSource)().getRepository(VendorProducts_1.VendorProducts).createQueryBuilder();
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Join
            if (relations && relations.length > 0) {
                relations.forEach((joinTb) => {
                    if (joinTb.op === 'inner') {
                        query.innerJoin(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'leftCond') {
                        query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                    }
                    else {
                        query.leftJoin(joinTb.tableName, joinTb.aliasName);
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
                    else if (item.op === 'IS NULL' && item.sign === undefined) {
                        query.andWhere(item.name + ' IS NULL' + item.value);
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
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
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
    vendorProductsCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.vendorProductsCount(id);
        });
    }
    activeVendorProductCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.activeVendorProductCount(id);
        });
    }
    vendorCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.vendorCount(id);
        });
    }
    vendorCountAndMinPrice(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorProductsRepository.vendorCountAndMinPrice(id);
        });
    }
};
exports.VendorProductService = VendorProductService;
exports.VendorProductService = VendorProductService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorProductRepository_1.VendorProductsRepository, Object])
], VendorProductService);
//# sourceMappingURL=VendorProductService.js.map