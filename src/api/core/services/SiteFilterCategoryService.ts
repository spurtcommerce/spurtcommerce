/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { SiteFilterCategory } from '../models/SiteFilterCategory';
import { SiteFilterCategoryRepository } from '../repositories/SiteFilterCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class SiteFilterCategoryService {

    constructor(
        private siteFilterCategoryRepository: SiteFilterCategoryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(siteFilterCategory: any): Promise<any> {
        this.log.info('findOne method called');
        return this.siteFilterCategoryRepository.repository.findOne(siteFilterCategory);
    }

    public findAll(siteFilterCategory: any): Promise<any> {
        this.log.info('findAll method called');
        return this.siteFilterCategoryRepository.repository.find(siteFilterCategory);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
            return this.siteFilterCategoryRepository.repository.count(condition);
        } else {
            return this.siteFilterCategoryRepository.repository.find(condition);
        }
    }

    public async create(siteFilterCategory: SiteFilterCategory): Promise<SiteFilterCategory> {
        this.log.info('create method called');
        return await this.siteFilterCategoryRepository.repository.save(siteFilterCategory);
    }

    public update(id: any, siteFilterCategory: SiteFilterCategory): Promise<SiteFilterCategory> {
        this.log.info('update method called');
        siteFilterCategory.id = id;
        return this.siteFilterCategoryRepository.repository.save(siteFilterCategory);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const newSiteFilter = await this.siteFilterCategoryRepository.repository.delete(id);
        return newSiteFilter;
    }

    public findDuplicateCategory(id: number, filterId: number): Promise<any> {
        this.log.info('findDuplicateCategory method called');
        return this.siteFilterCategoryRepository.findDuplicateCategory(id, filterId);
    }
}
