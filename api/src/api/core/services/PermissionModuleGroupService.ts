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
import { Like } from 'typeorm/index';
import { PermissionModuleGroupRepository } from '../repositories/PermissionModuleGroupRepository';
import { PermissionModuleGroup } from '../models/PermissionModuleGroup';

@Service()
export class PermissionModuleGroupService {

    constructor(
        @OrmRepository() private permissionModuleGroupRepository: PermissionModuleGroupRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create page
    public async create(data: any): Promise<any> {
        this.log.info('Create a new page ');
        return this.permissionModuleGroupRepository.save(data);
    }

    // find one page
    public findOne(data: any): Promise<any> {
        return this.permissionModuleGroupRepository.findOne(data);
    }

    // update page
    public update(id: any, data: PermissionModuleGroup): Promise<any> {
        this.log.info('Update a page');
        data.moduleGroupId = id;
        return this.permissionModuleGroupRepository.save(data);
    }

    // find permission module group
    public async findAll(data: any): Promise<any> {
        return await this.permissionModuleGroupRepository.find(data);
    }

    // page List
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

        condition.order = { sortOrder: 'ASC' };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.permissionModuleGroupRepository.count(condition);
        } else {
            return this.permissionModuleGroupRepository.find(condition);
        }
    }

    // delete page
    public async delete(id: number): Promise<any> {
        return await this.permissionModuleGroupRepository.delete(id);
    }
}
