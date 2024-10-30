/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Brackets, getConnection, Like } from 'typeorm';
import { ExportLogRepository } from '../repositories/ExportLogRepository';
import { ExportLog } from '../models/ExportLog';

@Service()
export class ExportLogService {

    constructor(
        @OrmRepository() private exportLogRepository: ExportLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find exportLog
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all exportLogs');
        return this.exportLogRepository.findOne(findCondition);
    }

    // exportLog list
    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], keyword: string, count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = [{
                module: Like('%' + keyword + '%'),
            }];
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
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
            return this.exportLogRepository.count(condition);
        } else {
            return this.exportLogRepository.find(condition);
        }

    }

    // export list
    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: boolean = false,
        rawQuery: boolean = false)
        : Promise<ExportLog | any> {

        const query: any = await getConnection().getRepository(ExportLog).createQueryBuilder('exportLog');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'leftAndSelect') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else if (joinTb.op === 'inner-cond') {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }
        // Where
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
                } else if (item.op === 'IS NULL' && item.sign === undefined) {
                    query.orWhere(item.name + 'IS NULL' + item.value);
                } else if (item.op === 'AND NULL' && item.sign === undefined) {
                    query.andWhere(item.name + ' IS NULL' + item.value);
                } else if (item.op === 'where' && item.sign === 'like') {
                    query.andWhere('LOWER(' + item.name + ')LIKE \'%' + item.value + '%\'');
                } else if (item.op === 'where' && item.sign === 'not like') {
                    query.andWhere('LOWER(' + item.name + ')NOT LIKE \'%' + item.value + '%\'');
                }
            });
        }

        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
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
                } else if (table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) {
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
                } else if (table.op === undefined && table.value && table.value instanceof Array && table.value.length > 0) {
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
                } else if (table.op === 'NOT' && table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + 'NOT LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' NOT LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                }
            });
        }

        // GroupBy
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
        // orderBy
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
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
        } else {
            return query.getCount();
        }
    }
    // create exportLog
    public async create(exportLog: ExportLog): Promise<ExportLog> {
        this.log.info('Create a new exportLog');
        const newExport = await this.exportLogRepository.save(exportLog);
        return newExport;
    }

    // update exportLog
    public update(id: any, exportLog: ExportLog): Promise<ExportLog> {
        this.log.info('Update a exportLog');
        exportLog.id = id;
        return this.exportLogRepository.save(exportLog);
    }

    // delete exportLog
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a exportLog');
        const newExport = await this.exportLogRepository.delete(id);
        return newExport;
    }

    // find exportLog
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all exportLogs');
        return this.exportLogRepository.find(findCondition);
    }
}
