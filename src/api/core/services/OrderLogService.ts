/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { OrderLogRepository } from '../repositories/OrderLogRepository';

@Service()
export class OrderLogService {

    constructor(
        private orderLogRepository: OrderLogRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(order: any): Promise<any> {
        this.log.info('create method called');
        return this.orderLogRepository.repository.save(order);
    }

    public findOne(order: any): Promise<any> {
        this.log.info('findOne method called');
        return this.orderLogRepository.repository.findOne(order);
    }

    public update(id: any, order: any): Promise<any> {
        this.log.info(`update method called for orderId ${id}`);
        order.oderId = id;
        return this.orderLogRepository.repository.save(order);
    }

    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
            return this.orderLogRepository.repository.count(condition);
        } else {
            return this.orderLogRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        this.log.info(`delete method called for id ${id}`);
        return await this.orderLogRepository.repository.delete(id);
    }

    public find(): Promise<any> {
        this.log.info('find method called (all records)');
        return this.orderLogRepository.repository.find();
    }

    public findCondition(condition: any): Promise<any> {
        this.log.info('find method called (all records)');
        return this.orderLogRepository.repository.find(condition);
    }
}
