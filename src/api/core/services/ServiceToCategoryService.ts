/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ServiceToCategory } from '../models/ServiceToCategory';
import { ServiceToCategoryRepository } from '../repositories/ServiceToCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class ServiceToCategoryService {
    constructor(
        @OrmRepository() private serviceToCategoryRepository: ServiceToCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // create ServiceToCategory
    public async create(data: any): Promise<ServiceToCategory> {
        this.log.info('Create a new ServiceToCategory => ', data.toString());
        return this.serviceToCategoryRepository.save(data);
    }
    // findone ServiceToCategory
    public findOne(data: any): Promise<any> {
        return this.serviceToCategoryRepository.findOne(data);
    }
    // delete ServiceToCategory
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a ServiceToCategory');
        return this.serviceToCategoryRepository.delete(id);
    }
    // find ServiceToCategory
    public find(data: any): Promise<any> {
        return this.serviceToCategoryRepository.find(data);
    }
    // ServiceToCategory List
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
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.serviceToCategoryRepository.count(condition);
        }
        return this.serviceToCategoryRepository.find(condition);
    }
}
