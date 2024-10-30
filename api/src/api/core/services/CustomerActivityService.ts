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
import { CustomerActivity } from '../models/CustomerActivity';
import { CustomerActivityRepository } from '../repositories/CustomerActivityRepository';
import { Like } from 'typeorm';

@Service()
export class CustomerActivityService {

    constructor(
        @OrmRepository() private customerActivityRepository: CustomerActivityRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Role
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.customerActivityRepository.findOne(findCondition);
    }
    // Role list
    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.customerActivityRepository.count(condition);
        }
        return this.customerActivityRepository.find(condition);
    }

    // create role
    public async create(customerActivity: CustomerActivity): Promise<CustomerActivity> {
        const newCustomerActivity = await this.customerActivityRepository.save(customerActivity);
        return newCustomerActivity;
    }

    // update role
    public update(id: any, customerActivity: CustomerActivity): Promise<CustomerActivity> {
        this.log.info('Update a activity');
        customerActivity.customerActivityId = id;
        return this.customerActivityRepository.save(customerActivity);
    }

    // delete role
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a activity');
        const deleteCustomerActivity = await this.customerActivityRepository.delete(id);
        return deleteCustomerActivity;
    }
}
