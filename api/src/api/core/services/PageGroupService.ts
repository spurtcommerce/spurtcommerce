/*
 * spurtcommerce API
 * version 4.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { PageGroupRepository } from '../repositories/PageGroupRepository';
import { PageGroup } from '../models/PageGroup';
import { Like } from 'typeorm';

@Service()
export class PageGroupService {

    constructor(
        @OrmRepository() private pageGroupRepository: PageGroupRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create page group
    public async create(page: any): Promise<any> {
        this.log.info('Create a new page ');
        return this.pageGroupRepository.save(page);
    }

    // find one page group
    public findOne(page: any): Promise<any> {
        return this.pageGroupRepository.findOne(page);
    }

    // update page group
    public update(id: any, pageGroup: PageGroup): Promise<any> {
        this.log.info('Update a page group');
        pageGroup.groupId = id;
        return this.pageGroupRepository.save(pageGroup);
    }

    // page group List
    public list(limit: number, offset: number, select: any = [], search: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.pageGroupRepository.count(condition);
        } else {
            return this.pageGroupRepository.find(condition);
        }
    }

    // delete page group
    public async delete(id: number): Promise<any> {
        return await this.pageGroupRepository.delete(id);
    }
}
