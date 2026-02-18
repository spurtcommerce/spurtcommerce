"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationService = void 0;
const tslib_1 = require("tslib");
const QuotationRepository_1 = require("../repositories/QuotationRepository");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const Quotation_1 = require("../models/Quotation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
let QuotationService = class QuotationService {
    constructor(quotationRepository) {
        this.quotationRepository = quotationRepository;
    }
    // Create Quotation
    create(quotation) {
        return this.quotationRepository.repository.save(quotation);
    }
    // find Quotation
    find(quotation) {
        return this.quotationRepository.repository.find(quotation);
    }
    // fine all
    findAll() {
        return this.quotationRepository.repository.find();
    }
    // findOne Quotation
    findOne(quotation) {
        return this.quotationRepository.repository.findOne(quotation);
    }
    // CountQuotation
    count(quotation) {
        return this.quotationRepository.repository.count(quotation);
    }
    // update saleOrder Address
    update(id, data) {
        return this.quotationRepository.repository.update(id, data);
    }
    // delete Quotation
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.quotationRepository.repository.delete(id);
        });
    }
    list(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], relation = [], whereConditions = [], count) {
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
                    if (operator === 'where' && table.value !== undefined) {
                        condition.where[table.name] = table.value;
                    }
                    else if (operator === 'like' && table.value !== undefined) {
                        condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                    }
                });
            }
            if (limit && limit > 0) {
                condition.take = limit;
                condition.skip = offset;
            }
            if (count) {
                return yield this.quotationRepository.repository.count(condition);
            }
            return yield this.quotationRepository.repository.find(condition);
        });
    }
    // List By QuerBuilder
    listByQueryBuilder(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
            const query = yield (0, typeormLoader_1.getDataSource)().getRepository(Quotation_1.Quotation).createQueryBuilder();
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
                    else if (joinTb.op === 'left') {
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
};
exports.QuotationService = QuotationService;
exports.QuotationService = QuotationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [QuotationRepository_1.QuotationRepository])
], QuotationService);
//# sourceMappingURL=QuotationService.js.map