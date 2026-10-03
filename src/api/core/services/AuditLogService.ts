import { Service } from 'typedi';
import { Brackets } from 'typeorm';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { AuditLog } from '../models/AuditLog';
import { AuditLogRepository } from '../repositories/AuditLogRepository';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class AuditLogService {

    constructor(
        private auditLogRepository: AuditLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createOrUpdate(object: AuditLog): Promise<AuditLog> {
        this.log.info('createOrUpdate method called');
        return await this.auditLogRepository.repository.save(object);
    }

    public async QueryBuilder(limit: number, offset: number, whereConditions: any = [], relations: any = [], search: any = [], count: number | boolean, order: any): Promise<any> {

        this.log.info('QueryBuilder method called');

        const queryConditions: any = await this.auditLogRepository.repository.createQueryBuilder('AuditLog');
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.val === 1) {
                    queryConditions.leftJoinAndSelect(joinTb.property, joinTb.alias, joinTb.condition);
                }
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR', 'variant'].includes(item.sign)) {
                    return;
                }
                if (item.op === 'And') {
                    queryConditions.andWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'AndOr') {
                    queryConditions.andWhere(`(${item.name1} = :filterValueA_${index} OR ${item.name2} = :filterValueB_${index})`, { [`filterValueA_${index}`]: item.value1, [`filterValueB_${index}`]: item.value2 });
                }
            });
        }
        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const closingParenthesis = table.symbol === ')' ? ')' : '';
                if (table.op === 'and') {
                    queryConditions.andWhere(`( ${table.name} LIKE :likeVal${closingParenthesis}`, { likeVal: `%${table.value}%` });
                } else if (table.op === 'or') {
                    queryConditions.orWhere(`${table.name} LIKE :likeVal${closingParenthesis}`, { likeVal: `%${table.value}%` });
                }
            });
        }
        if (order && order > 0) {
            queryConditions.orderBy(
                'AuditLog.auditLogId', ((order === 1 ? 'ASC' : 'DESC'))
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
        : Promise<AuditLog[] | number> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(AuditLog).createQueryBuilder();
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
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR', 'variant'].includes(item.sign)) {
                    return;
                }
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(`${item.name} IN (:...filterValues_${index})`, { [`filterValues_${index}`]: Array.isArray(item.value) ? item.value : [item.value] });
                } else if (item.op === 'moreThan' && item.sign === undefined) {
                    query.andWhere(`${item.name} > :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'LIKE' && item.sign === undefined) {
                    query.andWhere(`${item.name} LIKE :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
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
                                    qb.andWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                                    return;
                                }
                                qb.orWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                            });
                        }));
                    });
                } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                                return;
                            }
                            qb.orWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                        });
                    }));
                } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
                                return;
                            }
                            qb.orWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
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
                const direction = typeof item.order === 'string' ? item.order.toUpperCase() : '';

                if (direction === 'ASC' || direction === 'DESC') {

                    query.orderBy(item.name, direction);

                }
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
        return this.auditLogRepository.repository.find(condition);
    }

    public async delete(data: any): Promise<any> {
        this.log.info('delete method called');
        await this.auditLogRepository.repository.delete(data);
        return;
    }

    // find One category level
    public findAuditLogData(fromDate: string, toDate: string): Promise<any> {
        this.log.info('findAuditLogData method called');
        return this.auditLogRepository.findAuditLogData(fromDate, toDate);
    }
}
