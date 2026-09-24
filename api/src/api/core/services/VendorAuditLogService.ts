import { Service } from 'typedi';
import { Brackets } from 'typeorm';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorAuditLog } from '../models/VendorAuditLog';
import { VendorAuditLogRepository } from '../repositories/VendorAuditLogRepository';

@Service()
export class VendorAuditLogService {
    constructor(
        private vendorAuditLogRepository: VendorAuditLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createOrUpdate(object: VendorAuditLog): Promise<VendorAuditLog> {
        this.log.info('createOrUpdate method called');
        return await this.vendorAuditLogRepository.repository.save(object);
    }

    public async QueryBuilder(limit: number, offset: number, whereConditions: any = [], relations: any = [], search: any = [], count: number | boolean, order: any): Promise<any> {
        this.log.info('QueryBuilder method called');
        const queryConditions: any = await this.vendorAuditLogRepository.repository.createQueryBuilder('VendorAuditLog');
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.val === 1) {
                    queryConditions.leftJoinAndSelect(joinTb.property, joinTb.alias, joinTb.condition);
                }
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                if (item.op === 'And') {
                    queryConditions.andWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'AndOr') {
                    queryConditions.andWhere('(' + item.name1 + ' = ' + item.value1 + ' OR ' + item.name2 + ' = ' + item.value2 + ')');
                }
            });
        }
        if (search && search.length > 0) {
            search.forEach((table: any) => {
                if (table.op === 'and') {
                    queryConditions.andWhere('( ' + table.name + ' LIKE ' + "\'%" + table.value + "%\'" + table.symbol);
                } else if (table.op === 'or') {
                    queryConditions.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'" + table.symbol);
                }
            });
        }
        if (order && order > 0) {
            queryConditions.orderBy(
                'VendorAuditLog.auditLogId', ((order === 1 ? 'ASC' : 'DESC'))
            );
        }
        if (limit && limit > 0) {
            queryConditions.skip(offset);
            queryConditions.take(limit);
        }
        if (count) {
            return queryConditions.getCount();
        } else {
            return queryConditions.getMany();
        }
    }

    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: number | boolean = false,
        rawQuery: boolean = false)
        : Promise<VendorAuditLog[] | number> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(VendorAuditLog).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                } else if (item.op === 'moreThan' && item.sign === undefined) {
                    query.andWhere(item.name + ' > ' + ' \'' + item.value + '\'');
                } else if (item.op === 'LIKE' && item.sign === undefined) {
                    query.andWhere(item.name + ' LIKE ' + ' \'' + item.value + '\'');
                }
            });
        }
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    });
                } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
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
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item: any) => {
                if (i === 0) {
                    query.groupBy(item.name);
                } else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
                query.orderBy('' + item.name + '', '' + item.order + '');
            });
        }
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        } else {
            return query.getCount();
        }
    }

    public find(condition: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorAuditLogRepository.repository.find(condition);
    }

    public async delete(data: any): Promise<any> {
        this.log.info('delete method called');
        await this.vendorAuditLogRepository.repository.delete(data);
        return;
    }

    public findAuditLogData(fromDate: string, toDate: string, tenantId: number): Promise<any> {
        this.log.info('findAuditLogData method called');
        return this.vendorAuditLogRepository.findAuditLogData(fromDate, toDate, tenantId);
    }
}
