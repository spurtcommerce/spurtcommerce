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
import { SiteFilter } from '../models/SiteFilter';
import { SiteFilterRepository } from '../repositories/SiteFilterRepository';
import { Like } from 'typeorm';

@Service()
export class SiteFilterService {

    constructor(
        @OrmRepository() private siteFilterRepository: SiteFilterRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(siteFilter: any): Promise<any> {
        return this.siteFilterRepository.findOne(siteFilter);
    }

    // find all
    public findAll(siteFilter: any): Promise<any> {
        this.log.info('Find all');
        return this.siteFilterRepository.find(siteFilter);
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
            return this.siteFilterRepository.count(condition);
        } else {
            return this.siteFilterRepository.find(condition);
        }
    }

    // create
    public async create(siteFilter: SiteFilter): Promise<SiteFilter> {
        const newSiteFilter = await this.siteFilterRepository.save(siteFilter);
        return newSiteFilter;
    }

    // update
    public update(id: any, siteFilter: SiteFilter): Promise<SiteFilter> {
        this.log.info('Update');
        siteFilter.id = id;
        return this.siteFilterRepository.save(siteFilter);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete');
        const newSiteFilter = await this.siteFilterRepository.delete(id);
        return newSiteFilter;
    }
}
