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
import { OrderCancelReasonRepository } from '../repositories/OrderCancelReasonRepository';
import { OrderCancelReason } from '../models/OrderCancelReason';

@Service()
export class OrderCancelReasonService {

    constructor(
        @OrmRepository() private orderCancelReasonRepository: OrderCancelReasonRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create
    public async create(orderCancelReason: OrderCancelReason): Promise<any> {
        this.log.info('Create a new address ');
        return this.orderCancelReasonRepository.save(orderCancelReason);
    }

    // findOne
    public findOne(orderCancelReason: any): Promise<any> {
        return this.orderCancelReasonRepository.findOne(orderCancelReason);
    }
    // update
    public update(id: number, orderCancelReason: OrderCancelReason): Promise<any> {
        orderCancelReason.id = id;
        return this.orderCancelReasonRepository.save(orderCancelReason);
    }

    // address
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.orderCancelReasonRepository.count(condition);
        } else {
            return this.orderCancelReasonRepository.find(condition);
        }
    }

    // delete
    public async delete(id: number): Promise<any> {
        await this.orderCancelReasonRepository.delete(id);
        return 1;
    }

    // find Al
    public find(address: any): Promise<any> {
        return this.orderCancelReasonRepository.find(address);
    }
}
