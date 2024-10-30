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
import { Like } from 'typeorm/index';
import { OrderLogRepository } from '../repositories/OrderLogRepository';

@Service()
export class OrderLogService {

    constructor(
        @OrmRepository() private orderLogRepository: OrderLogRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create orderLog
    public async create(order: any): Promise<any> {
        this.log.info('Create a new orderLog ');
        return this.orderLogRepository.save(order);
    }

    // find Condition
    public findOne(whereCondition: any): Promise<any> {
        this.log.info('Find orderLog Detail');
        const condition: any = {};
        if (whereCondition && whereCondition.length > 0) {
            condition.where = whereCondition[0];
            condition.relations = whereCondition[1].relation;
        } else {
            condition.id = whereCondition;
        }
        return this.orderLogRepository.findOne(condition);
    }

    // update orderLog
    public update(id: any, order: any): Promise<any> {
        order.oderId = id;
        return this.orderLogRepository.save(order);
    }

    // orderLog List
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        condition.where = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.orderLogRepository.count(condition);
        } else {
            return this.orderLogRepository.find(condition);
        }
    }

    // delete orderLog
    public async delete(id: number): Promise<any> {
        return await this.orderLogRepository.delete(id);
    }

    // orderLog count
    public find(): Promise<any> {
        return this.orderLogRepository.find();
    }
}
