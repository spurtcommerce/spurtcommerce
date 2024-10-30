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
import { SiteFilterCategory } from '../models/SiteFilterCategory';
import { SiteFilterCategoryRepository } from '../repositories/SiteFilterCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class SiteFilterCategoryService {

    constructor(
        @OrmRepository() private siteFilterCategoryRepository: SiteFilterCategoryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(siteFilterCategory: any): Promise<any> {
        return this.siteFilterCategoryRepository.findOne(siteFilterCategory);
    }

    // find all
    public findAll(siteFilterCategory: any): Promise<any> {
        this.log.info('Find all');
        return this.siteFilterCategoryRepository.find(siteFilterCategory);
    }

    // list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;

        }
        if (count) {
            return this.siteFilterCategoryRepository.count(condition);
        } else {
            return this.siteFilterCategoryRepository.find(condition);
        }
    }

    // create
    public async create(siteFilterCategory: SiteFilterCategory): Promise<SiteFilterCategory> {
        const newSiteFilterCategory = await this.siteFilterCategoryRepository.save(siteFilterCategory);
        return newSiteFilterCategory;
    }

    // update
    public update(id: any, siteFilterCategory: SiteFilterCategory): Promise<SiteFilterCategory> {
        this.log.info('Update');
        siteFilterCategory.id = id;
        return this.siteFilterCategoryRepository.save(siteFilterCategory);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete');
        const newSiteFilter = await this.siteFilterCategoryRepository.delete(id);
        return newSiteFilter;
    }

    // find user
    public findDuplicateCategory(id: number, filterId: number): Promise<any> {
        return this.siteFilterCategoryRepository.findDuplicateCategory(id, filterId);
    }
}
