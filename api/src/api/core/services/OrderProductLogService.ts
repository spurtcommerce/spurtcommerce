/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderProductLogRepository } from '../repositories/OrderProductLogRepository';

@Service()
export class OrderProductLogService {
    constructor(
        private orderProductLogRepository: OrderProductLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(orderProductLog: any): Promise<any> {
        this.log.info('find method called');
        return this.orderProductLogRepository.repository.find(orderProductLog);
    }

    public findOne(productData: any): Promise<any> {
        this.log.info('findOne method called');
        return this.orderProductLogRepository.repository.findOne(productData);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};
        condition.where = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.orderProductLogRepository.repository.count(condition);
        } else {
            return this.orderProductLogRepository.repository.find(condition);
        }
    }

    public findAndCount(where: any): Promise<any> {
        this.log.info('findAndCount method called');
        return this.orderProductLogRepository.repository.findAndCount(where);
    }

    public async create(orderProductLog: any): Promise<any> {
        this.log.info('create method called');
        return this.orderProductLogRepository.repository.save(orderProductLog);
    }
}
