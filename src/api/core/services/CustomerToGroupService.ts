/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { FindManyOptions,  FindOptionsWhere, Like } from 'typeorm/index';
import { CustomerToGroupRepository } from '../repositories/CustomerToGroupRepository';
import { CustomerToGroup } from '../models/CustomerToGroup';

@Service()
export class CustomerToGroupService {

    constructor(
        private customerToGroupRepository: CustomerToGroupRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create job
    public async create(job: any): Promise<any> {
        this.log.info('Create a new job ');
        return this.customerToGroupRepository.repository.save(job);
    }

    // find One job
    public findOne(job: any): Promise<any> {
        return this.customerToGroupRepository.repository.findOne(job);
    }

    // findAll job
    public find(job: FindManyOptions<CustomerToGroup>): Promise<CustomerToGroup[]> {
        return this.customerToGroupRepository.repository.find(job);
    }

    // update job
    public update(job: any): Promise<any> {
        return this.customerToGroupRepository.repository.save(job);
    }

    // job List
    public async list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.customerToGroupRepository.repository.count(condition);
        } else {
            return this.customerToGroupRepository.repository.find(condition);
        }
    }

    // delete job
    public async delete(id: FindOptionsWhere<CustomerToGroup>): Promise<any> {
        return await this.customerToGroupRepository.repository.delete(id);
    }
}
