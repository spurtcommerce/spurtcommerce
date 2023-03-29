/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { CustomerGroup } from '../models/CustomerGroup';
import { CustomerGroupRepository } from '../repositories/CustomerGroupRepository';
import { Like } from 'typeorm';

@Service()
export class CustomerGroupService {

    constructor(
        @OrmRepository() private customerGroupRepository: CustomerGroupRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Role
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.customerGroupRepository.findOne(findCondition);
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
        condition.order = { createdDate: 'DESC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.customerGroupRepository.count(condition);
        }
        return this.customerGroupRepository.find(condition);
    }

    // create role
    public async create(customerGroup: CustomerGroup): Promise<CustomerGroup> {
        const newCustomerGroup = await this.customerGroupRepository.save(customerGroup);
        return newCustomerGroup;
    }

    // update role
    public update(id: any, customerGroup: CustomerGroup): Promise<CustomerGroup> {
        this.log.info('Update a role');
        customerGroup.groupId = id;
        return this.customerGroupRepository.save(customerGroup);
    }

    // delete role
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a role');
        const deleteCustomer = await this.customerGroupRepository.delete(id);
        return deleteCustomer;
    }
}
