"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCustomerGroupPriceService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const VendorCustomerGroupPriceRepository_1 = require("../repositories/VendorCustomerGroupPriceRepository");
const VendorCustomerGroupPrice_1 = require("../models/VendorCustomerGroupPrice");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
let VendorCustomerGroupPriceService = class VendorCustomerGroupPriceService {
    constructor(vendorCustomerGroupPriceRepository) {
        this.vendorCustomerGroupPriceRepository = vendorCustomerGroupPriceRepository;
        // --
    }
    find(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorCustomerGroupPriceRepository.repository.find(condition);
        });
    }
    findOne(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorCustomerGroupPriceRepository.repository.findOne(condition);
        });
    }
    delete(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorCustomerGroupPriceRepository.repository.update(condition, { isDelete: 1 });
        });
    }
    // update
    update(id, priceGroup) {
        priceGroup.id = id;
        return this.vendorCustomerGroupPriceRepository.repository.save(priceGroup);
    }
    bulkSave(sellerBuyerPrice) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorCustomerGroupPriceRepository.repository.save(sellerBuyerPrice);
        });
    }
    listByQueryBuilder(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count, rawQuery = false) {
            const query = yield (0, typeormLoader_1.getDataSource)().getRepository(VendorCustomerGroupPrice_1.VendorCustomerGroupPrice).createQueryBuilder();
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
};
exports.VendorCustomerGroupPriceService = VendorCustomerGroupPriceService;
exports.VendorCustomerGroupPriceService = VendorCustomerGroupPriceService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [VendorCustomerGroupPriceRepository_1.VendorCustomerGroupPriceRepository])
], VendorCustomerGroupPriceService);
//# sourceMappingURL=VendorCustomerGroupPriceService.js.map