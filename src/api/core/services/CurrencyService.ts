/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Brackets } from 'typeorm/index';
import { CurrencyRepository } from '../repositories/CurrencyRepository';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Currency } from '../models/Currency';

@Service()
export class CurrencyService {

    constructor(
        private currencyRepository: CurrencyRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(currency: any): Promise<any> {
        this.log.info('create method called');
        return this.currencyRepository.repository.save(currency);
    }

    public findOne(currency: any): Promise<any> {
        this.log.info('findOne method called');
        return this.currencyRepository.repository.findOne(currency);
    }

    public async find(currency: any): Promise<any> {
        this.log.info('find method called');
        return this.currencyRepository.repository.find(currency);
    }

    public update(id: any, currency: any): Promise<any> {
        this.log.info('update method called');
        currency.currencyId = id;
        return this.currencyRepository.repository.save(currency);
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
        count: boolean = false,
        rawQuery: boolean = false)
        : Promise<any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(Currency).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'leftCond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else if (joinTb.op === 'inner-select') {
                    query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
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

    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], searchCondition: any[], count: number | boolean): Promise<any> {

        this.log.info('list method called');

        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = (qb: { where: (arg0: string, parameters?: any) => void; notWhere: (arg0: string) => void; andWhere: (arg0: string | Brackets, parameters?: any) => void; orWhere: (arg0: string, parameters?: any) => void; }) => {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR', 'variant'].includes(item.sign)) {
                    return;
                }
                    if (item.op === 'where') {
                        qb.where(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                    } else if (item.op === 'and') {
                        qb.andWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                    } else if (item.op === 'or') {
                        qb.orWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                    } else if (item.op === 'In') {
                        qb.andWhere(`${item.name} IN (:...filterValues_${index})`, { [`filterValues_${index}`]: Array.isArray(item.value) ? item.value : [item.value] });
                    } else if (item.op === 'raw') {
                        qb.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                    }
                });
            }
            if (searchCondition?.length > 0) {
                searchCondition.forEach((table: any) => {
                    if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            qb.andWhere(new Brackets(subqb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value: string | number, subIndex: number) => {
                                    if (subIndex === 0) {
                                        subqb.andWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                                        return;
                                    }
                                    subqb.orWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                                });
                            }));
                        });
                    } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                        qb.andWhere(new Brackets(subqb => {
                            const namesArray = table.name;
                            namesArray.forEach((name: string, index: number) => {
                                if (index === 0) {
                                    subqb.andWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                                    return;
                                }
                                subqb.orWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                            });
                        }));
                    } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                        qb.andWhere(new Brackets(subqb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, index: number) => {
                                if (index === 0) {
                                    subqb.andWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
                                    return;
                                }
                                subqb.orWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
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
            return this.currencyRepository.repository.count(condition);
        } else {
            return this.currencyRepository.repository.find(condition);
        }

    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        await this.currencyRepository.repository.delete(id);
        return;
    }
}
