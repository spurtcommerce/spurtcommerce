/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorCategory } from '../models/VendorCategory';
import { VendorCategoryRepository } from '../repositories/VendorCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class VendorCategoryService {

    constructor(
        private vendorCategoryRepository: VendorCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorCategoryRepository.repository.findOne(findCondition);
    }

    public find(findCondition: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorCategoryRepository.repository.find(findCondition);
    }

    public async queryCategoryList(limit: number, offset: number, vendorId: number, keyword: string, count: number | boolean): Promise<any> {
        this.log.info('queryCategoryList method called');
        return await this.vendorCategoryRepository.queryCategoryList(limit, offset, vendorId, keyword, count);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.vendorCategoryRepository.repository.count(condition);
        }
        return this.vendorCategoryRepository.repository.find(condition);
    }

    public async create(vendorCategory: VendorCategory): Promise<VendorCategory> {
        this.log.info('create method called');
        const newVendorCategory = await this.vendorCategoryRepository.repository.save(vendorCategory);
        return newVendorCategory;
    }

    public update(id: any, vendorCategory: VendorCategory): Promise<VendorCategory> {
        this.log.info('update method called');
        vendorCategory.vendorCategoryId = id;
        return this.vendorCategoryRepository.repository.save(vendorCategory);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const deleteUser = await this.vendorCategoryRepository.repository.delete(id);
        return deleteUser;
    }

    public async vendorCategoryCount(id: number): Promise<any> {
        this.log.info('vendorCategoryCount method called');
        return await this.vendorCategoryRepository.vendorCategoryCount(id);
    }

    public findAll(data: any): Promise<any> {
        this.log.info('findAll method called');
        return this.vendorCategoryRepository.repository.find(data);
    }
}
