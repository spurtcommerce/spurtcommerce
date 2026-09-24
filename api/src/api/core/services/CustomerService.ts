/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

/* tslint:disable:no-string-literal */

import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Brackets, Like } from 'typeorm/index';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { Customer } from '../models/Customer';

@Service()
export class CustomerService {

    constructor(
        private customerRepository: CustomerRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(customer: any): Promise<any> {
        this.log.info('create method called');
        return this.customerRepository.repository.save(customer);
    }

    public findOne(customer: any): Promise<any> {
        this.log.info('findOne method called');
        customer['where'] = {
            ...customer['where'],
            deleteFlag: 0,
        };
        return this.customerRepository.repository.findOne(customer);
    }

    public findAll(): Promise<any> {
        this.log.info('findAll method called');
        return this.customerRepository.repository.find();
    }

    public find(data: any): Promise<any> {
        this.log.info('find method called');
        return this.customerRepository.repository.find(data);
    }

    public async findCustomerById(customerId: number, select?: string[]): Promise<Customer> {
        this.log.info('findCustomerById method called');
        const condition: any = {};
        if (select) {
            condition.select = select;
        }
        condition.where = { id: customerId };
        return await this.customerRepository.repository.findOne(condition);
    }

    public update(id: any, customer: any): Promise<any> {
        this.log.info('update method called');
        customer.id = id;
        return this.customerRepository.repository.update(customer.id, customer);
    }

    public list(limit: any, offset: any, search: any = [], whereConditions: any = [], order: number, count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
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
            return this.customerRepository.repository.count(condition);
        } else {
            return this.customerRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.customerRepository.repository.delete(id);
    }

    public async todayCustomerCount(todaydate: string): Promise<any> {
        this.log.info('todayCustomerCount method called');
        return await this.customerRepository.TodayCustomerCount(todaydate);
    }

    public async dashboardCustomerCount(duration: number): Promise<any> {
        this.log.info('dashboardCustomerCount method called');
        return await this.customerRepository.dashboardCustomerCount(duration);
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
        : Promise<Customer[]> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(Customer).createQueryBuilder();
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
