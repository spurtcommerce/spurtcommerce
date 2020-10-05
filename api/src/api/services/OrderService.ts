/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Logger, LoggerInterface} from '../../decorators/Logger';
import {Like} from 'typeorm/index';
import {OrderRepository} from '../repositories/OrderRepository';

@Service()
export class OrderService {

    constructor(@OrmRepository() private orderRepository: OrderRepository,
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
    public findAll( ): Promise<any> {
        return this.orderRepository.find( );
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

    // order List
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], relation: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
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
            return this.orderRepository.find(condition);
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

    // find today orders
    public async findAlltodayOrder(todaydate: string): Promise<any> {
        return await this.orderRepository.findAllTodayOrder(todaydate);
    }

    // find today orders count
    public async findAllTodayOrderCount(todaydate: string): Promise<any> {
        return await this.orderRepository.findAllTodayOrderCount(todaydate);
    }
}
