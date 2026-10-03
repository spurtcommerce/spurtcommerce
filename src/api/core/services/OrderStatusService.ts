/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderStatusRepository } from '../repositories/OrderStatusRepository';
import { FindOptionsWhere, Like } from 'typeorm/index';
import { OrderStatus } from '../models/OrderStatus';
import moment from 'moment';

@Service()
export class OrderStatusService {

    constructor(
        private orderStatusRepository: OrderStatusRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(orderStatus: any): Promise<any> {
        this.log.info('create method called');
        return await this.orderStatusRepository.repository.save(orderStatus);
    }

    public async update(condition: FindOptionsWhere<OrderStatus>, orderStatus: Partial<OrderStatus>): Promise<any> {
        this.log.info('update method called');
        return await this.orderStatusRepository.repository.update(condition, orderStatus);
    }

    public findOne(orderStatus: any): Promise<any> {
        this.log.info('findOne method called');
        return this.orderStatusRepository.repository.findOne(orderStatus);
    }

    public findAll(orderStatus: any): Promise<any> {
        this.log.info('findAll method called');
        return this.orderStatusRepository.repository.find(orderStatus);
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
            createdDate: 'DESC',
        };

        if (count) {
            return this.orderStatusRepository.repository.count(condition);
        } else {
            return this.orderStatusRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.orderStatusRepository.repository.delete(id);
    }

    public async insertOrderStatusesForNewVendor(tenantId: number): Promise<any> {

        this.log.info('insertOrderStatusesForNewVendor method called');

        const orderStatuses = [
            {
                name: 'Awaiting Confirmation',
                description: 'Order placed, waiting for buyer or seller confirmation (common in B2B before processing).',
                colorCode: '#F59E0B',
                tenantId,
                statusId: 1,
                priority: 1,
                isActive: 1,
                parentId: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                defaultStatus: 1,
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                name: 'Confirmed',
                description: 'Seller has approved the order, stock and pricing confirmed, preparing invoice.',
                colorCode: '#2563EB',
                tenantId,
                statusId: 2,
                priority: 2,
                isActive: 1,
                parentId: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                defaultStatus: 1,
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                name: 'Dispatched',
                description: 'Goods shipped with logistics partner, tracking available.',
                colorCode: '#7C3AED',
                tenantId,
                statusId: 3,
                priority: 3,
                isActive: 1,
                parentId: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                defaultStatus: 1,
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                name: 'Delivered',
                description: 'Buyer has received goods, GRN (Goods Receipt Note) issued.',
                colorCode: '#16A34A',
                tenantId,
                statusId: 4,
                priority: 4,
                isActive: 1,
                parentId: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                defaultStatus: 1,
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                name: 'Closed',
                description: 'Payment cleared, order cycle officially closed.',
                colorCode: '#6B7280',
                tenantId,
                statusId: 5,
                priority: 5,
                isActive: 1,
                parentId: 0,
                isAdmin: 1,
                isVendor: 1,
                isBuyer: 1,
                isApi: 1,
                defaultStatus: 1,
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
        ];

        await this.orderStatusRepository.repository.save(orderStatuses);
    }
}
