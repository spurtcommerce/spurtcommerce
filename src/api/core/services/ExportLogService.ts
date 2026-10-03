/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Brackets, IsNull, Like, Not } from 'typeorm';
import { ExportLogRepository } from '../repositories/ExportLogRepository';
import { ExportLog } from '../models/ExportLog';

@Service()
export class ExportLogService {

    constructor(
        private exportLogRepository: ExportLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.exportLogRepository.repository.findOne(findCondition);
    }

    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], keyword: string, count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR', 'variant'].includes(item.sign)) {
                    return;
                }
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = [

                { module: Like('%' + keyword + '%') },
                { user: { firstName: Like(`%${keyword}%`) } }];
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
            return this.exportLogRepository.repository.count(condition);
        } else {
            return this.exportLogRepository.repository.find(condition);
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
        : Promise<ExportLog | any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(ExportLog).createQueryBuilder('exportLog');
        if (select && select.length > 0) {
            query.select(select);
        }
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
                } else if (item.op === 'IS NULL' && item.sign === undefined) {
                    query.orWhere(`${item.name} IS NULL`);
                } else if (item.op === 'AND NULL' && item.sign === undefined) {
                    query.andWhere(`${item.name} IS NULL`);
                } else if (item.op === 'where' && item.sign === 'like') {
                    query.andWhere(`LOWER(${item.name}) LIKE :likeVal`, { likeVal: `%${item.value}%` });
                } else if (item.op === 'where' && item.sign === 'not like') {
                    query.andWhere(`LOWER(${item.name}) NOT LIKE :notLikeVal`, { notLikeVal: `%${item.value}%` });
                }
            });
        }
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
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
                } else if (table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) {
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
                } else if (table.op === undefined && table.value && table.value instanceof Array && table.value.length > 0) {
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
                } else if (table.op === 'NOT' && table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${name}) NOT LIKE :notTableSearch`, { notTableSearch: `%${table.value}%` });
                                return;
                            }
                            qb.orWhere(`LOWER(${name}) NOT LIKE :notTableSearch`, { notTableSearch: `%${table.value}%` });
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

    public async create(exportLog: ExportLog): Promise<ExportLog> {
        this.log.info('create method called');
        const newExport = await this.exportLogRepository.repository.save(exportLog);
        return newExport;
    }

    public update(id: any, exportLog: ExportLog): Promise<ExportLog> {
        this.log.info('update method called');
        exportLog.id = id;
        return this.exportLogRepository.repository.save(exportLog);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const newExport = await this.exportLogRepository.repository.delete(id);
        return newExport;
    }

    public findAll(findCondition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.exportLogRepository.repository.find(findCondition);
    }

    public async generateExportId(tenantId: number, module: string): Promise<string> {
        const lastRecord = await this.exportLogRepository.repository.findOne({
            order: { id: 'DESC' },
            where: { exportId: Not(IsNull()), tenantId, module },
        });

        let nextNumber = 1;

        if (lastRecord?.exportId) {
            const num = parseInt(lastRecord.exportId.replace('EXP-', ''), 10);
            if (!isNaN(num)) { nextNumber = num + 1; }
        }

        // Format: EXP-001
        const formatted = String(nextNumber).padStart(3, '0');
        return `EXP-${formatted}`;
    }
}
