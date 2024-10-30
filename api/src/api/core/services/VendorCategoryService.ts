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
import { VendorCategory } from '../models/VendorCategory';
import { VendorCategoryRepository } from '../repositories/VendorCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class VendorCategoryService {

    constructor(
        @OrmRepository() private vendorCategoryRepository: VendorCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Role
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.vendorCategoryRepository.findOne(findCondition);
    }

    // query builder category list
    public async queryCategoryList(limit: number, offset: number, vendorId: number, keyword: string, count: number | boolean): Promise<any> {
        return await this.vendorCategoryRepository.queryCategoryList(limit, offset, vendorId, keyword, count);
    }

    // Role list
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.vendorCategoryRepository.count(condition);
        }
        return this.vendorCategoryRepository.find(condition);
    }

    // create role
    public async create(vendorCategory: VendorCategory): Promise<VendorCategory> {
        const newVendorCategory = await this.vendorCategoryRepository.save(vendorCategory);
        return newVendorCategory;
    }

    // update role
    public update(id: any, vendorCategory: VendorCategory): Promise<VendorCategory> {
        this.log.info('Update a vendorCategory');
        vendorCategory.vendorCategoryId = id;
        return this.vendorCategoryRepository.save(vendorCategory);
    }

    // delete role
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a vendorCategory');
        const deleteUser = await this.vendorCategoryRepository.delete(id);
        return deleteUser;
    }

    public async vendorCategoryCount(id: number): Promise<any> {
        return await this.vendorCategoryRepository.vendorCategoryCount(id);
    }

    // find Services
    public findAll(data: any): Promise<any> {
        return this.vendorCategoryRepository.find(data);
    }
}
