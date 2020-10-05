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
import {OrderStatusRepository} from '../repositories/OrderStatusRepository';
import {Like} from 'typeorm/index';

@Service()
export class OrderStatusService {

    constructor(@OrmRepository() private orderStatusRepository: OrderStatusRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create orderStatus
    public async create(orderStatus: any): Promise<any> {
        const newOrderStatus = await this.orderStatusRepository.save(orderStatus);
        this.log.info('Create a orderStatus');
        return newOrderStatus;
    }

    // find one orderStatus
    public findOne(orderStatus: any): Promise<any> {
        return this.orderStatusRepository.findOne(orderStatus);
    }

    // orderStatus List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.orderStatusRepository.count(condition);
        } else {
            return this.orderStatusRepository.find(condition);
        }
    }

    // delete orderStatus
    public async delete(id: number): Promise<any> {
        return await this.orderStatusRepository.delete(id);
    }
}
