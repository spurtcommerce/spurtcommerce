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
import { UserGroup } from '../models/UserGroup';
import { UserGroupRepository } from '../repositories/UserGroupRepository';
import { Like } from 'typeorm';

@Service()
export class UserGroupService {

    constructor(
        @OrmRepository() private userGroupRepository: UserGroupRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Role
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.userGroupRepository.findOne(findCondition);
    }
    // Role list
    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }
        condition.order = { createdDate: 'DESC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.userGroupRepository.count(condition);
        }
        return this.userGroupRepository.find(condition);
    }

    // create role
    public async create(userGroup: UserGroup): Promise<UserGroup> {
        const newUserGroup = await this.userGroupRepository.save(userGroup);
        return newUserGroup;
    }

    // update role
    public update(id: any, userGroup: UserGroup): Promise<UserGroup> {
        this.log.info('Update a role');
        userGroup.groupId = id;
        return this.userGroupRepository.save(userGroup);
    }

    // delete role
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a role');
        const deleteUser = await this.userGroupRepository.delete(id);
        return deleteUser;
    }
}
