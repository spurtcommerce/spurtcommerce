"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const AuditLog_1 = require("../models/AuditLog");
const AuditLogRepository_1 = require("../repositories/AuditLogRepository");
let AuditLogService = class AuditLogService {
    constructor(auditLogRepository, log) {
        this.auditLogRepository = auditLogRepository;
        this.log = log;
    }
    createOrUpdate(object) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const addedData = yield this.auditLogRepository.save(object);
            return addedData;
        });
    }
    QueryBuilder(limit, offset, whereCondition = [], relations = [], search = [], count, order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('list');
            const queryConditions = yield this.auditLogRepository.createQueryBuilder('AuditLog');
            if (relations && relations.length > 0) {
                relations.forEach((joinTb) => {
                    if (joinTb.val === 1) {
                        queryConditions.leftJoinAndSelect(joinTb.property, joinTb.alias, joinTb.condition);
                    }
                });
            }
            if (whereCondition && whereCondition.length > 0) {
                whereCondition.forEach((item) => {
                    if (item.op === 'And') {
                        queryConditions.andWhere(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'AndOr') {
                        queryConditions.andWhere('(' + item.name1 + ' = ' + item.value1 + ' OR ' + item.name2 + ' = ' + item.value2 + ')');
                    }
                });
            }
            if (search && search.length > 0) {
                search.forEach((table) => {
                    if (table.op === 'and') {
                        queryConditions.andWhere('( ' + table.name + ' LIKE ' + "\'%" + table.value + "%\'" + table.symbol);
                    }
                    else if (table.op === 'or') {
                        queryConditions.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'" + table.symbol);
                    }
                });
            }
            if (order && order > 0) {
                queryConditions.orderBy('AuditLog.auditLogId', ((order === 1 ? 'ASC' : 'DESC')));
            }
            if (limit && limit > 0) {
                queryConditions.skip(offset);
                queryConditions.take(limit);
            }
            if (count) {
                return queryConditions.getCount();
            }
            else {
                return queryConditions.getMany();
            }
        });
    }
    listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield (0, typeorm_1.getConnection)().getRepository(AuditLog_1.AuditLog).createQueryBuilder();
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
                    else if (item.op === 'moreThan' && item.sign === undefined) {
                        query.andWhere(item.name + ' > ' + ' \'' + item.value + '\'');
                    }
                    else if (item.op === 'LIKE' && item.sign === undefined) {
                        query.andWhere(item.name + ' LIKE ' + ' \'' + item.value + '\'');
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
    find(condition) {
        return this.auditLogRepository.find(condition);
    }
    delete(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.auditLogRepository.delete(data);
            return;
        });
    }
    // find One category level
    findAuditLogData(fromDate, toDate) {
        return this.auditLogRepository.findAuditLogData(fromDate, toDate);
    }
};
AuditLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [AuditLogRepository_1.AuditLogRepository, Object])
], AuditLogService);
exports.AuditLogService = AuditLogService;
//# sourceMappingURL=AuditLogService.js.map