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
import { Like, Brackets, getConnection, In } from 'typeorm/index';
import { Between } from 'typeorm/index';
import { OrderRepository } from '../repositories/OrderRepository';
import { Order } from '../models/Order';

@Service()
export class OrderService {

    constructor(
        @OrmRepository() private orderRepository: OrderRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create order
    public async create(order: any): Promise<any> {
        this.log.info('Create a new order ');
        return this.orderRepository.save(order);
    }

    // order count
    public find(order: any): Promise<any> {
        return this.orderRepository.find(order);
    }

    // order count
    public findAll(): Promise<any> {
        return this.orderRepository.find();
    }

    // findOne Condition
    public findOne(whereCondition: any): Promise<any> {
        this.log.info('Find Order Detail');
        const condition: any = {};
        if (whereCondition && whereCondition.length > 0) {
            condition.where = whereCondition[0];
            condition.relations = whereCondition[1].relation;
        } else {
            condition.orderId = whereCondition;
        }
        return this.orderRepository.findOne(condition);
    }

    // update order
    public update(id: any, order: any): Promise<any> {
        order.oderId = id;
        return this.orderRepository.save(order);
    }

    public bulkUpdateByIds(ids: number[], payload: Partial<Order>): Promise<any> {
        return this.orderRepository.update({ orderId: In(ids) }, payload);
    }

    // order List
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], relation: any = [], count: number | boolean): Promise<any> {
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
            return this.orderRepository.count(condition);
        } else {
            const query = this.orderRepository.find(condition);
            return query;
        }
    }

    // findOne order
    public findOrder(order: any): Promise<any> {
        return this.orderRepository.findOne(order);
    }

    // delete order
    public async delete(id: number): Promise<any> {
        return await this.orderRepository.delete(id);
    }

    // sales list
    public async salesList(): Promise<any> {
        return await this.orderRepository.salesList();
    }

    // dashboard transaction list
    public async transactionList(year: number): Promise<any> {
        return await this.orderRepository.transactionList(year);
    }

    // find today orders
    public async findAlltodayOrder(todaydate: string): Promise<any> {
        return await this.orderRepository.findAllTodayOrder(todaydate);
    }

    // find today orders count
    public async findAllTodayOrderCount(todaydate: string): Promise<any> {
        return await this.orderRepository.findAllTodayOrderCount(todaydate);
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
        : Promise<Order[] | any> {

        const query: any = await getConnection().getRepository(Order).createQueryBuilder('Order');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
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

    // find total orders
    public async findTotalOrderAmount(): Promise<any> {
        return await this.orderRepository.findTotalOrderAmount();
    }

    // order count
    public async orderCount(orderId: string, orderStatusId: string, totalAmount: string, customerName: string, dateAdded: string): Promise<any> {
        return await this.orderRepository.orderCount(orderId, orderStatusId, totalAmount, customerName, dateAdded);
    }
    // find dashboard Orders Count
    public async dashboardOrdersCount(duration: number): Promise<any> {
        return await this.orderRepository.dashboardOrdersCount(duration);
    }
    // getting orders count
    public async ordersCount(duration: number): Promise<any> {
        return await this.orderRepository.ordersCount(duration);
    }
}
