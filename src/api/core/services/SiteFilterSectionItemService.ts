/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { SiteFilterSectionItem } from '../models/SiteFilterSectionItem';
import { SiteFilterSectionItemRepository } from '../repositories/SiteFilterSectionItemRepository';
import { Like } from 'typeorm';

@Service()
export class SiteFilterSectionItemService {

    constructor(
        private siteFilterSectionItemRepository: SiteFilterSectionItemRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(siteFilterSectionItem: any): Promise<any> {
        this.log.info('findOne method called');
        return this.siteFilterSectionItemRepository.repository.findOne(siteFilterSectionItem);
    }

    public findAll(siteFilterSectionItem: any): Promise<any> {
        this.log.info('findAll method called');
        return this.siteFilterSectionItemRepository.repository.find(siteFilterSectionItem);
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
            return this.siteFilterSectionItemRepository.repository.count(condition);
        } else {
            return this.siteFilterSectionItemRepository.repository.find(condition);
        }
    }

    public async create(siteFilterSectionItem: SiteFilterSectionItem): Promise<SiteFilterSectionItem> {
        this.log.info('create method called');
        return await this.siteFilterSectionItemRepository.repository.save(siteFilterSectionItem);
    }

    public update(id: any, siteFilterSectionItem: SiteFilterSectionItem): Promise<SiteFilterSectionItem> {
        this.log.info('update method called');
        siteFilterSectionItem.id = id;
        return this.siteFilterSectionItemRepository.repository.save(siteFilterSectionItem);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const newSiteFilter = await this.siteFilterSectionItemRepository.repository.delete(id);
        return newSiteFilter;
    }
}
