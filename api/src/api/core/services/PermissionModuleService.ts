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
import { PermissionModuleRepository } from '../repositories/PermissionModuleRepository';
import { PermissionModule } from '../models/PermissionModule';

@Service()
export class PermissionModuleService {

    constructor(
        @OrmRepository() private permissionModuleRepository: PermissionModuleRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create permission module
    public async create(data: any): Promise<any> {
        this.log.info('Create a new page ');
        return this.permissionModuleRepository.save(data);
    }

    // find one permission module
    public findOne(data: any): Promise<any> {
        return this.permissionModuleRepository.findOne(data);
    }

    // update permission module
    public update(id: any, data: PermissionModule): Promise<any> {
        this.log.info('Update a page');
        data.moduleGroupId = id;
        return this.permissionModuleRepository.save(data);
    }

    // find permission module
    public async findAll(data: any): Promise<any> {
        return await this.permissionModuleRepository.find(data);
    }

    // permission module List
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
            return this.permissionModuleRepository.count(condition);
        } else {
            return this.permissionModuleRepository.find(condition);
        }
    }

    // delete page
    public async delete(id: number): Promise<any> {
        return await this.permissionModuleRepository.delete(id);
    }
}
