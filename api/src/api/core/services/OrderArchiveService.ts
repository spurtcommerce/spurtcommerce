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
import { Like, Brackets, In } from 'typeorm/index';
import { Between } from 'typeorm/index';
import { OrderArchiveRepository } from '../repositories/OrderArchiveRepository';
import { OrderArchive } from '../models/OrderArchive';

@Service()
export class OrderArchiveService {

    constructor(
        private orderArchiveRepository: OrderArchiveRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(order: any): Promise<any> {
        this.log.info('create method called');
        return this.orderArchiveRepository.repository.save(order);
    }

    public find(order: any): Promise<any> {
        this.log.info('find method called');
        return this.orderArchiveRepository.repository.find(order);
    }

    public findAll(): Promise<any> {
        this.log.info('findAll method called');
        return this.orderArchiveRepository.repository.find();
    }

    public findOne(whereConditions: any): Promise<any> {
        this.log.info('findOne method called');
        const condition: any = {};
        if (whereConditions && whereConditions.length > 0) {
            condition.where = whereConditions[0];
            condition.relations = whereConditions[1].relation;
        } else {
            condition.where = whereConditions;
        }
        return this.orderArchiveRepository.repository.findOne(condition);
    }

    public update(id: any, order: any): Promise<any> {
        this.log.info('update method called');
        order.oderId = id;
        return this.orderArchiveRepository.repository.save(order);
    }

    public bulkUpdateByIds(ids: number[], payload: Partial<OrderArchive>): Promise<any> {
        this.log.info('update method called');
        return this.orderArchiveRepository.repository.update({ orderId: In(ids) }, payload);
    }

    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], relation: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value1;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'like' && table.value !== undefined && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                } else if (operator === 'where' && table.value !== undefined && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'between' && table.value1 !== undefined && table.value1 !== '' && table.value2 !== undefined && table.value2 !== '') {
                    condition.where[table.name] = Between(table.value1, table.value2);
                }
            });
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.orderArchiveRepository.repository.count(condition);
        } else {
            const query = this.orderArchiveRepository.repository.find(condition);
            return query;
        }
    }

    public findOrder(order: any): Promise<any> {
        this.log.info('findOrder method called');
        return this.orderArchiveRepository.repository.findOne(order);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.orderArchiveRepository.repository.delete(id);
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
        : Promise<OrderArchive[] | any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(OrderArchive).createQueryBuilder('Order');
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'left-select') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'left-select-cond') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName, joinTb.cond);
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
}
