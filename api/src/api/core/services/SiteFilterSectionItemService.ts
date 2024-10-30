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
import { SiteFilterSectionItem } from '../models/SiteFilterSectionItem';
import { SiteFilterSectionItemRepository } from '../repositories/SiteFilterSectionItemRepository';
import { Like } from 'typeorm';

@Service()
export class SiteFilterSectionItemService {

    constructor(
        @OrmRepository() private siteFilterSectionItemRepository: SiteFilterSectionItemRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(siteFilterSectionItem: any): Promise<any> {
        return this.siteFilterSectionItemRepository.findOne(siteFilterSectionItem);
    }

    // find all
    public findAll(siteFilterSectionItem: any): Promise<any> {
        this.log.info('Find all');
        return this.siteFilterSectionItemRepository.find(siteFilterSectionItem);
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
            return this.siteFilterSectionItemRepository.count(condition);
        } else {
            return this.siteFilterSectionItemRepository.find(condition);
        }
    }

    // create
    public async create(siteFilterSectionItem: SiteFilterSectionItem): Promise<SiteFilterSectionItem> {
        const newSiteFilterSection = await this.siteFilterSectionItemRepository.save(siteFilterSectionItem);
        return newSiteFilterSection;
    }

    // update
    public update(id: any, siteFilterSectionItem: SiteFilterSectionItem): Promise<SiteFilterSectionItem> {
        this.log.info('Update');
        siteFilterSectionItem.id = id;
        return this.siteFilterSectionItemRepository.save(siteFilterSectionItem);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete');
        const newSiteFilter = await this.siteFilterSectionItemRepository.delete(id);
        return newSiteFilter;
    }
}
