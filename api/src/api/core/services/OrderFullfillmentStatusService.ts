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
import { OrderFulfillmentStatusRepository } from '../repositories/OrderFullfillmentStatusRepository';
import { OrderFullfillmentStatus } from '../models/OrderFullfillmentStatus';
import { FindManyOptions, Like } from 'typeorm';

@Service()
export class OrderFullfillmentStatusService {

    constructor(
        @OrmRepository() private orderFulfillmentStatusRepository: OrderFulfillmentStatusRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create payload
    public async create(payload: any): Promise<any> {
        this.log.info('Create a new payload ');
        return this.orderFulfillmentStatusRepository.save(payload);
    }

    // find One payload
    public findOne(payload: any): Promise<OrderFullfillmentStatus> {
        return this.orderFulfillmentStatusRepository.findOne(payload);
    }

    // findAll payload
    public findAll(payload: FindManyOptions<OrderFullfillmentStatus>): Promise<any> {
        return this.orderFulfillmentStatusRepository.find(payload);
    }

    // update payload
    public update(payload: any): Promise<any> {
        return this.orderFulfillmentStatusRepository.save(payload);
    }

    // delete payload
    public async delete(id: number): Promise<any> {
        return await this.orderFulfillmentStatusRepository.delete(id);
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
                if (operator === 'where' && table.value !== '') {
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

        condition.order = {
            priority: 'ASC',
        };

        if (count) {
            return this.orderFulfillmentStatusRepository.count(condition);
        } else {
            return this.orderFulfillmentStatusRepository.find(condition);
        }
    }
}
