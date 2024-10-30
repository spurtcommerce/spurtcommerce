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
import { SiteFilterSection } from '../models/SiteFilterSection';
import { SiteFilterSectionRepository } from '../repositories/SiteFilterSectionRepository';
import { Like } from 'typeorm';

@Service()
export class SiteFilterSectionService {

    constructor(
        @OrmRepository() private siteFilterSectionRepository: SiteFilterSectionRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(siteFilterSection: any): Promise<any> {
        return this.siteFilterSectionRepository.findOne(siteFilterSection);
    }

    // find all
    public findAll(siteFilterSection: any): Promise<any> {
        this.log.info('Find all');
        return this.siteFilterSectionRepository.find(siteFilterSection);
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
            return this.siteFilterSectionRepository.count(condition);
        } else {
            return this.siteFilterSectionRepository.find(condition);
        }
    }

    // create
    public async create(siteFilterSection: SiteFilterSection): Promise<SiteFilterSection> {
        const newSiteFilterSection = await this.siteFilterSectionRepository.save(siteFilterSection);
        return newSiteFilterSection;
    }

    // update
    public update(id: any, siteFilterSection: SiteFilterSection): Promise<SiteFilterSection> {
        this.log.info('Update');
        siteFilterSection.id = id;
        return this.siteFilterSectionRepository.save(siteFilterSection);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete');
        const newSiteFilter = await this.siteFilterSectionRepository.delete(id);
        return newSiteFilter;
    }
}
