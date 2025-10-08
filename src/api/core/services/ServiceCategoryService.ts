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
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ServiceCategory } from '../models/ServiceCategory';
import { ServiceCategoryRepository } from '../repositories/ServiceCategoryRepository';
import {Like} from 'typeorm/index';

@Service()
export class ServiceCategoryService {
    constructor(
        private serviceCategoryRepository: ServiceCategoryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }
     // create Category
    public async create(category: any): Promise<ServiceCategory> {
        this.log.info('Create a new category => ', category.toString());
        return this.serviceCategoryRepository.repository.save(category);
    }
    // findone category
    public findOne(category: any): Promise<any> {
        return this.serviceCategoryRepository.repository.findOne(category);
    }
     // delete Category
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a Category');
        await this.serviceCategoryRepository.repository.delete(id);
        return;
    }
     // find category
     public find(category: any): Promise<any> {
        return this.serviceCategoryRepository.repository.find(category);
    }

    // Service category List
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], sortOrder: number, count: number | boolean): Promise<any> {
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
        condition.order = { sortOrder: (sortOrder === 2) ? 'DESC' : 'ASC'};
        if (count) {
            return this.serviceCategoryRepository.repository.count(condition);
        }
        return this.serviceCategoryRepository.repository.find(condition);
    }
}
