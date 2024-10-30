/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

/* tslint:disable:no-string-literal */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Brackets, Like, getConnection } from 'typeorm/index';
import { VendorRepository } from '../repositories/VendorRepository';
import { Vendor } from '../models/Vendor';

@Service()
export class VendorService {

    constructor(
        @OrmRepository() private vendorRepository: VendorRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create customer
    public async create(vendor: any): Promise<any> {
        this.log.info('Create a new vendor');
        return this.vendorRepository.save(vendor);
    }

    // find Condition
    public findOne(vendor: any): Promise<any> {
        vendor['where'] = {
            ...vendor['where'],
            isDelete: 0,
        };
        return this.vendorRepository.findOne(vendor);
    }

    // find Condition
    public findAll(condition?: any): Promise<any> {
        return this.vendorRepository.find(condition ? condition : 1);
    }

    // find Condition
    public find(data: any): Promise<any> {
        return this.vendorRepository.find(data);
    }

    // update vendor
    public update(id: any, vendor: any): Promise<any> {
        vendor.vendorId = id;
        return this.vendorRepository.save(vendor);
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
        count: boolean | number = false,
        rawQuery: boolean = false)
        : Promise<any> {

        const query: any = await getConnection().getRepository(Vendor).createQueryBuilder('vendor');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'inner') {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'leftCond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
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
                    query.andWhere(item.name + ' IS NULL' + item.value);
                }
            });
        }
        // Keyword Search
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
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
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

    // vendor List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], relation: any = [], order: number, count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (relation && relation.length > 0) {
            condition.relation = relation;
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

        if (order && order > 0) {
            condition.order = {
                createdDate: 'DESC',
            };
            condition.take = 5;
        }
        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorRepository.count(condition);
        } else {
            return this.vendorRepository.find(condition);
        }
    }

    // vendor list
    public async vendorList(limit: number, offset: number, select: any = [], relations: any = [], searchConditions: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        return await this.vendorRepository.vendorList(limit, offset, select, relations, searchConditions, whereConditions, count);
    }
    // delete customer
    public async delete(id: number): Promise<any> {
        return await this.vendorRepository.delete(id);
    }

    public async slugData(data: string): Promise<any> {
        return await this.vendorRepository.vendorSlug(data);
    }

    public async slugDataOne(data: string): Promise<any> {
        return await this.vendorRepository.vendorSlugOne(data);
    }

    public async slugDataWithEmptySlug(data: string): Promise<any> {
        return await this.vendorRepository.vendorSlugEmptySlug(data);
    }

    public async validateDisplayUrlName(data: string, checkVendor: number, vendorId: number): Promise<any> {
        return await this.vendorRepository.validateDisplayUrlName(data, checkVendor, vendorId);
    }

}
