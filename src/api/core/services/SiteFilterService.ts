/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { SiteFilter } from '../models/SiteFilter';
import { SiteFilterRepository } from '../repositories/SiteFilterRepository';
import { Like } from 'typeorm';

@Service()
export class SiteFilterService {

    constructor(
        private siteFilterRepository: SiteFilterRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(siteFilter: any): Promise<any> {
        this.log.info('findOne method called');
        return this.siteFilterRepository.repository.findOne(siteFilter);
    }

    public findAll(siteFilter: any): Promise<any> {
        this.log.info('findAll method called');
        return this.siteFilterRepository.repository.find(siteFilter);
    }

    public async create(siteFilter: SiteFilter): Promise<SiteFilter> {
        this.log.info('create method called');
        return await this.siteFilterRepository.repository.save(siteFilter);
    }

    public update(id: any, siteFilter: SiteFilter): Promise<SiteFilter> {
        this.log.info('update method called');
        siteFilter.id = id;
        return this.siteFilterRepository.repository.save(siteFilter);
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
            return this.siteFilterRepository.repository.count(condition);
        } else {
            return this.siteFilterRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const newSiteFilter = await this.siteFilterRepository.repository.delete(id);
        return newSiteFilter;
    }
}
