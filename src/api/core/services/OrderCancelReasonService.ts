/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderCancelReasonRepository } from '../repositories/OrderCancelReasonRepository';
import { OrderCancelReason } from '../models/OrderCancelReason';

@Service()
export class OrderCancelReasonService {
    constructor(
        private orderCancelReasonRepository: OrderCancelReasonRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(orderCancelReason: OrderCancelReason): Promise<any> {
        this.log.info('create method called');
        return this.orderCancelReasonRepository.repository.save(orderCancelReason);
    }

    public findOne(orderCancelReason: any): Promise<any> {
        this.log.info('findOne method called');
        return this.orderCancelReasonRepository.repository.findOne(orderCancelReason);
    }

    public update(id: number, orderCancelReason: OrderCancelReason): Promise<any> {
        this.log.info(`update method called for id ${id}`);
        orderCancelReason.id = id;
        return this.orderCancelReasonRepository.repository.save(orderCancelReason);
    }

    public async delete(id: number): Promise<any> {
        this.log.info(`delete method called for id ${id}`);
        await this.orderCancelReasonRepository.repository.delete(id);
        return 1;
    }

    public find(address: any): Promise<any> {
        this.log.info('find method called');
        return this.orderCancelReasonRepository.repository.find(address);
    }

    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.orderCancelReasonRepository.repository.count(condition);
        } else {
            return this.orderCancelReasonRepository.repository.find(condition);
        }
    }
}
