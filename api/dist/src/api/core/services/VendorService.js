"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const tslib_1 = require("tslib");
/* tslint:disable:no-string-literal */
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const VendorRepository_1 = require("../repositories/VendorRepository");
const Vendor_1 = require("../models/Vendor");
let VendorService = class VendorService {
    constructor(vendorRepository, log) {
        this.vendorRepository = vendorRepository;
        this.log = log;
    }
    // create customer
    create(vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new vendor');
            return this.vendorRepository.save(vendor);
        });
    }
    // find Condition
    findOne(vendor) {
        vendor['where'] = Object.assign(Object.assign({}, vendor['where']), { isDelete: 0 });
        return this.vendorRepository.findOne(vendor);
    }
    // find Condition
    findAll(condition) {
        return this.vendorRepository.find(condition ? condition : 1);
    }
    // find Condition
    find(data) {
        return this.vendorRepository.find(data);
    }
    // update vendor
    update(id, vendor) {
        vendor.vendorId = id;
        return this.vendorRepository.save(vendor);
    }
    listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield (0, index_1.getConnection)().getRepository(Vendor_1.Vendor).createQueryBuilder('vendor');
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
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
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
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
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
    // vendor List
    list(limit, offset, select = [], search = [], whereConditions = [], relation = [], order, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const operator = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = (0, index_1.Like)('%' + item.value + '%');
                }
            });
        }
        if (relation && relation.length > 0) {
            condition.relation = relation;
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
        if (order && order > 0) {
            condition.order = {
                createdDate: 'DESC',
            };
            condition.take = 5;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorRepository.count(condition);
        }
        else {
            return this.vendorRepository.find(condition);
        }
    }
    // vendor list
    vendorList(limit, offset, select = [], relations = [], searchConditions = [], whereConditions = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorList(limit, offset, select, relations, searchConditions, whereConditions, count);
        });
    }
    // delete customer
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.delete(id);
        });
    }
    slugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorSlug(data);
        });
    }
    slugDataOne(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorSlugOne(data);
        });
    }
    slugDataWithEmptySlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorSlugEmptySlug(data);
        });
    }
    validateDisplayUrlName(data, checkVendor, vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.validateDisplayUrlName(data, checkVendor, vendorId);
        });
    }
};
VendorService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorRepository_1.VendorRepository, Object])
], VendorService);
exports.VendorService = VendorService;
//# sourceMappingURL=VendorService.js.map