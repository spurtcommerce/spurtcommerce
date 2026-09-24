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
import { ServiceCategory } from '../models/ServiceCategory';
import { ServiceCategoryRepository } from '../repositories/ServiceCategoryRepository';
import { Like } from 'typeorm/index';

@Service()
export class ServiceCategoryService {
    constructor(
        private serviceCategoryRepository: ServiceCategoryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(category: any): Promise<ServiceCategory> {
        this.log.info('create method called');
        return this.serviceCategoryRepository.repository.save(category);
    }

    public findOne(category: any): Promise<any> {
        this.log.info('findOne method called');
        return this.serviceCategoryRepository.repository.findOne(category);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        await this.serviceCategoryRepository.repository.delete(id);
        return;
    }

    public find(category: any): Promise<any> {
        this.log.info('find method called');
        return this.serviceCategoryRepository.repository.find(category);
    }

    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], sortOrder: number, count: number | boolean): Promise<any> {
        this.log.info('list method called with limit');
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
        condition.order = { sortOrder: (sortOrder === 2) ? 'DESC' : 'ASC' };
        if (count) {
            return this.serviceCategoryRepository.repository.count(condition);
        }
        return this.serviceCategoryRepository.repository.find(condition);
    }
}
