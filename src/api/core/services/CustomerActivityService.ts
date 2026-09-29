/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { CustomerActivity } from '../models/CustomerActivity';
import { CustomerActivityRepository } from '../repositories/CustomerActivityRepository';
import { Like } from 'typeorm';

@Service()
export class CustomerActivityService {
    constructor(
        private customerActivityRepository: CustomerActivityRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.customerActivityRepository.repository.findOne(findCondition);
    }

    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
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
            return this.customerActivityRepository.repository.count(condition);
        }
        return this.customerActivityRepository.repository.find(condition);
    }

    public async create(customerActivity: CustomerActivity): Promise<CustomerActivity> {
        this.log.info('create method called');
        return await this.customerActivityRepository.repository.save(customerActivity);
    }

    public update(id: any, customerActivity: CustomerActivity): Promise<CustomerActivity> {
        this.log.info('update method called');
        customerActivity.customerActivityId = id;
        return this.customerActivityRepository.repository.save(customerActivity);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const deleteCustomerActivity = await this.customerActivityRepository.repository.delete(id);
        return deleteCustomerActivity;
    }
}
