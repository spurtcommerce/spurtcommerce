/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderStatusRepository } from '../repositories/OrderStatusRepository';
import { FindOptionsWhere, Like } from 'typeorm/index';
import { OrderStatus } from '../models/OrderStatus';

@Service()
export class OrderStatusService {

    constructor(
        private orderStatusRepository: OrderStatusRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create orderStatus
    public async create(orderStatus: any): Promise<any> {
        const newOrderStatus = await this.orderStatusRepository.repository.save(orderStatus);
        this.log.info('Create a orderStatus');
        return newOrderStatus;
    }

    public async update(condition: FindOptionsWhere<OrderStatus>, orderStatus: Partial<OrderStatus>): Promise<any> {
        const newOrderStatus = await this.orderStatusRepository.repository.update(condition, orderStatus);
        return newOrderStatus;
    }

    // find one orderStatus
    public findOne(orderStatus: any): Promise<any> {
        return this.orderStatusRepository.repository.findOne(orderStatus);
    }

    // find one orderStatus
    public findAll(orderStatus: any): Promise<any> {
        return this.orderStatusRepository.repository.find(orderStatus);
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
            createdDate: 'DESC',
        };

        if (count) {
            return this.orderStatusRepository.repository.count(condition);
        } else {
            return this.orderStatusRepository.repository.find(condition);
        }
    }

    // delete orderStatus
    public async delete(id: number): Promise<any> {
        return await this.orderStatusRepository.repository.delete(id);
    }
}
