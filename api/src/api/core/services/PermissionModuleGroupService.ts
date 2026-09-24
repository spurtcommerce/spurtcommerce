/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { In, Like, Not } from 'typeorm/index';
import { PermissionModuleGroupRepository } from '../repositories/PermissionModuleGroupRepository';
import { PermissionModuleGroup } from '../models/PermissionModuleGroup';

@Service()
export class PermissionModuleGroupService {

    constructor(
        private permissionModuleGroupRepository: PermissionModuleGroupRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(data: any): Promise<any> {
        this.log.info('create method called');
        return this.permissionModuleGroupRepository.repository.save(data);
    }

    public findOne(data: any): Promise<any> {
        this.log.info('findOne method called');
        return this.permissionModuleGroupRepository.repository.findOne(data);
    }

    public update(id: any, data: PermissionModuleGroup): Promise<any> {
        this.log.info('update method called');
        data.moduleGroupId = id;
        return this.permissionModuleGroupRepository.repository.save(data);
    }

    public async findAll(data: any): Promise<any> {
        this.log.info('findAll method called');
        return await this.permissionModuleGroupRepository.repository.find(data);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
                } else if (operator === 'not-like' && table.value !== undefined) {
                    condition.where[table.name] = Not(Like('%' + table.value + '%'));
                } else if (operator === 'not-in' && table.value !== undefined) {
                    condition.where[table.name] = Not(In(table.value));
                }
            });
        }

        condition.order = { sortOrder: 'ASC' };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.permissionModuleGroupRepository.repository.count(condition);
        } else {
            return this.permissionModuleGroupRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.permissionModuleGroupRepository.repository.delete(id);
    }
}
