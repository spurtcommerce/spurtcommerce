/*
 * spurtcommerce API
 * version 1.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ServiceToCategory } from '../models/ServiceToCategory';
import { ServiceToCategoryRepository } from '../repositories/ServiceToCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class ServiceToCategoryService {
    constructor(
        private serviceToCategoryRepository: ServiceToCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(data: any): Promise<ServiceToCategory> {
        this.log.info('create method called');
        return this.serviceToCategoryRepository.repository.save(data);
    }

    public findOne(data: any): Promise<any> {
        this.log.info('findOne method called');
        return this.serviceToCategoryRepository.repository.findOne(data);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        return this.serviceToCategoryRepository.repository.delete(id);
    }

    public find(data: any): Promise<any> {
        this.log.info('find method called');
        return this.serviceToCategoryRepository.repository.find(data);
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
            return this.serviceToCategoryRepository.repository.count(condition);
        }
        return this.serviceToCategoryRepository.repository.find(condition);
    }
}
