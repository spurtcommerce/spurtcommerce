/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { SiteMapRepository } from '../repositories/SiteMapRepository';
@Service()
export class SiteMapService {

    constructor(
        private siteMapRepository: SiteMapRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // --
    }

    public async create(siteMap: any): Promise<any> {
        this.log.info('Create a new site map ');
        return this.siteMapRepository.repository.save(siteMap);
    }

    public findOne(siteMap: any): Promise<any> {
        return this.siteMapRepository.repository.findOne(siteMap);
    }

    public update(id: number, siteMap: any): Promise<any> {
        this.log.info('Update a siteMap');
        siteMap.id = id;
        return this.siteMapRepository.repository.save(siteMap);
    }

    public findAll(): Promise<any> {
        return this.siteMapRepository.repository.find();
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.siteMapRepository.repository.count(condition);
        } else {
            return this.siteMapRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        return await this.siteMapRepository.repository.delete(id);
    }
}
