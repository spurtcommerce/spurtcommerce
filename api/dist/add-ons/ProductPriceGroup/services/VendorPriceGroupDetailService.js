"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupDetailService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const VendorPriceGroupDetail_1 = require("../models/VendorPriceGroupDetail");
const VendorPriceGroupDetailRepository_1 = require("../repositories/VendorPriceGroupDetailRepository");
const typeorm_1 = require("typeorm");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
let VendorPriceGroupDetailService = class VendorPriceGroupDetailService {
    constructor(vendorPriceGroupDetailRepository) {
        this.vendorPriceGroupDetailRepository = vendorPriceGroupDetailRepository;
    }
    // find seller
    findOne(findCondition) {
        return this.vendorPriceGroupDetailRepository.repository.findOne(findCondition);
    }
    getMinPriceForProductByPriceGroupIds(priceGroupIds, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productPriceDetail = yield this.vendorPriceGroupDetailRepository.repository.createQueryBuilder('vendorPriceGroupDetail')
                .select('MIN(vendorPriceGroupDetail.price) as price')
                .where('vendorPriceGroupDetail.priceGroupId IN(:ids)', { ids: priceGroupIds })
                .andWhere('vendorPriceGroupDetail.productId = :productId', { productId })
                .getRawOne();
            const vendorPriceGroupDetail = yield this.vendorPriceGroupDetailRepository.repository.createQueryBuilder('vendorPriceGroupDetail')
                .select('vendorPriceGroupDetail.price as price')
                .addSelect('vendorPriceGroupDetail.id as priceGroupDetailId')
                .addSelect('vendorPriceGroupDetail.priceGroupId as priceGroupId')
                .where('vendorPriceGroupDetail.priceGroupId IN(:ids)', { ids: priceGroupIds })
                .andWhere('vendorPriceGroupDetail.productId = :productId', { productId })
                .andWhere('vendorPriceGroupDetail.price = :price', { price: productPriceDetail.price })
                .getRawOne();
            return vendorPriceGroupDetail;
        });
    }
    // seller list
    list(limit = 0, offset = 0, select = [], relation = [], whereConditions = [], searchCondition, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            const tblJoins = {};
            relation.forEach((tbl) => {
                tblJoins[tbl.name] = tbl.relationDef;
            });
            condition.join = {
                alias: 'sellerPriceGroupDetail',
                leftJoinAndSelect: tblJoins,
            };
        }
        condition.where = (qb) => {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((item) => {
                    if (item.op === 'where') {
                        qb.where(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'and') {
                        qb.andWhere(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'or') {
                        qb.orWhere(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'In') {
                        qb.andWhere(`${item.name} IN (${item.value})`);
                    }
                    else if (item.op === 'raw') {
                        qb.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                });
            }
            if ((searchCondition === null || searchCondition === void 0 ? void 0 : searchCondition.length) > 0) {
                searchCondition.forEach((table) => {
                    if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            qb.andWhere(new typeorm_1.Brackets(subqb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value, subIndex) => {
                                    if (subIndex === 0) {
                                        subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                        return;
                                    }
                                    subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                });
                            }));
                        });
                    }
                    else if (table.name && table.name instanceof Array && table.name.length > 0) {
                        qb.andWhere(new typeorm_1.Brackets(subqb => {
                            const namesArray = table.name;
                            namesArray.forEach((name, index) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                            });
                        }));
                    }
                    else if (table.value && table.value instanceof Array && table.value.length > 0) {
                        qb.andWhere(new typeorm_1.Brackets(subqb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value, index) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    }
                });
            }
        };
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorPriceGroupDetailRepository.repository.count(condition);
        }
        else {
            return this.vendorPriceGroupDetailRepository.repository.find(condition);
        }
    }
    listByQueryBuilder(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count, rawQuery = false) {
            const query = yield (0, typeormLoader_1.getDataSource)().getRepository(VendorPriceGroupDetail_1.VendorPriceGroupDetail).createQueryBuilder();
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Join
            if (relations && relations.length > 0) {
                relations.forEach((joinTb) => {
                    if (joinTb.op === 'left') {
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'leftCond') {
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                    }
                    else if (joinTb.op === 'inner') {
                        query.innerJoin(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'inner-select') {
                        query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
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
                    else if (item.op === 'rawnumber' && item.sign !== undefined) {
                        query.andWhere(item.name + ' ' + item.sign + ' ' + item.value + '');
                    }
                    else if (item.op === 'rawnumberor' && item.sign !== undefined) {
                        query.orWhere(item.name + ' ' + item.sign + ' ' + item.value + '');
                    }
                    else if (item.op === 'or' && item.sign === undefined) {
                        query.orWhere(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'IN' && item.sign === undefined) {
                        query.andWhere(item.name + ' IN (' + item.value + ')');
                    }
                    else if (item.op === 'OR-IN' && item.sign === undefined) {
                        query.orWhere(item.name + ' IN (' + item.value + ')');
                    }
                    else if (item.op === 'like' && item.sign === undefined) {
                        query.andWhere(item.name + ' like ' + ' \'' + item.value + '\'');
                    }
                    else if (item.op === 'IS NULL' && item.sign === undefined) {
                        query.orWhere(item.name + ' IS NULL ' + item.value);
                    }
                });
            }
            // Keyword Search
            if (searchConditions && searchConditions.length > 0) {
                searchConditions.forEach((table) => {
                    if ((table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
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
                    else if (table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) {
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
                    else if (table.op === undefined && table.value && table.value instanceof Array && table.value.length > 0) {
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
                    else if ((table.op === 'attribute' && table.op !== undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            query.andWhere(new typeorm_1.Brackets(qb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value, subIndex) => {
                                    if (subIndex === 0) {
                                        qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + this.addSlashes(value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()) + '%\'');
                                        return;
                                    }
                                    qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + this.addSlashes(value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()) + '%\'');
                                });
                            }));
                        });
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
    addSlashes(str) {
        return (str + '').replace(/'/g, "''");
    }
    // create user
    save(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorPriceGroupDetailRepository.repository.save(data);
        });
    }
    // create user
    bulkSave(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorPriceGroupDetailRepository.repository.save(data);
        });
    }
    // delete user
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorPriceGroupDetailRepository.repository.delete(id);
        });
    }
    softDelete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorPriceGroupDetailRepository.repository.update(id, { isDelete: 1 });
        });
    }
    // bulk delete
    bulkDelete(ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.vendorPriceGroupDetailRepository.repository.update({ id: (0, typeorm_1.In)(ids) }, { isActive: 0, isDelete: 1 });
        });
    }
    // find user
    find(findCondition) {
        return this.vendorPriceGroupDetailRepository.repository.find(findCondition);
    }
    getPriceGroupProductCount(priceGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productCount = yield this.vendorPriceGroupDetailRepository.repository.createQueryBuilder('vendorPriceGroup')
                .select('COUNT(DISTINCT(vendorPriceGroup.sku_id)) as productCount')
                .where('vendorPriceGroup.priceGroupId = :id', { id: priceGroupId })
                .andWhere('vendorPriceGroup.isDelete = :isDelete', { isDelete: 0 })
                .getRawOne();
            return Number(productCount.productCount);
        });
    }
};
exports.VendorPriceGroupDetailService = VendorPriceGroupDetailService;
exports.VendorPriceGroupDetailService = VendorPriceGroupDetailService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [VendorPriceGroupDetailRepository_1.VendorPriceGroupDetailRepository])
], VendorPriceGroupDetailService);
//# sourceMappingURL=VendorPriceGroupDetailService.js.map