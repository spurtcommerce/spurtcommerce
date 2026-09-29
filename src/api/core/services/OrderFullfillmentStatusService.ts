/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderFulfillmentStatusRepository } from '../repositories/OrderFullfillmentStatusRepository';
import { OrderFullfillmentStatus } from '../models/OrderFullfillmentStatus';
import { FindManyOptions, Like } from 'typeorm';

@Service()
export class OrderFullfillmentStatusService {

    constructor(
        private orderFulfillmentStatusRepository: OrderFulfillmentStatusRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(payload: any): Promise<any> {
        this.log.info('create method called');
        return this.orderFulfillmentStatusRepository.repository.save(payload);
    }

    public findOne(payload: any): Promise<OrderFullfillmentStatus> {
        this.log.info('findOne method called');
        return this.orderFulfillmentStatusRepository.repository.findOne(payload);
    }

    public findAll(payload: FindManyOptions<OrderFullfillmentStatus>): Promise<any> {
        this.log.info('findAll method called');
        return this.orderFulfillmentStatusRepository.repository.find(payload);
    }

    public update(payload: any): Promise<any> {
        this.log.info('update method called for id');
        return this.orderFulfillmentStatusRepository.repository.save(payload);
    }

    public async delete(id: number): Promise<any> {
        this.log.info(`delete method called for id ${id}`);
        return await this.orderFulfillmentStatusRepository.repository.delete(id);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.orderFulfillmentStatusRepository.repository.count(condition);
        } else {
            return this.orderFulfillmentStatusRepository.repository.find(condition);
        }
    }

    public async insertOrderStatusesFullfillmentForNewVendor(id: number): Promise<any> {
        this.log.info(`insertOrderStatusesFullfillmentForNewVendor method called for tenantId ${id}`);
        const orderFulfillmentStatus = [
            {
                name: 'Unfullfilled',
                isActive: 1,
                priority: 1,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#ff9f9f',
                tenantId: id,
            },
            {
                name: 'Partially Fulfilled',
                isActive: 1,
                priority: 2,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#ffcb96',
                tenantId: id,
            },
            {
                name: 'In Transit',
                isActive: 1,
                priority: 3,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#96d7ff',
                tenantId: id,
            },
            {
                name: 'Out for Delivery',
                isActive: 1,
                priority: 5,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#fde989',
                tenantId: id,
            },
            {
                name: 'Delivered',
                isActive: 1,
                priority: 6,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#97fea7',
                tenantId: id,
            },
            {
                name: 'Fulfilled',
                isActive: 1,
                priority: 9,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#b4ffaa',
                tenantId: id,
            },
            {
                name: 'Return Processing',
                isActive: 1,
                priority: 8,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#ffcb96',
                tenantId: id,
            },
            {
                name: 'Returned',
                isActive: 1,
                priority: 9,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#29536b',
                tenantId: id,
            },
            {
                name: 'Awaiting Pickup',
                isActive: 1,
                priority: 10,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#1a4465',
                tenantId: id,
            },
            {
                name: 'Shipped',
                isActive: 1,
                priority: 10,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#acd9ff',
                tenantId: id,
            },
            {
                name: 'N/A',
                isActive: 1,
                priority: 13,
                parentId: 0,
                defaultStatus: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                colorCode: '#e8e8e8',
                tenantId: id,
            },
        ];
        await this.orderFulfillmentStatusRepository.repository.save(orderFulfillmentStatus);
    }
}
