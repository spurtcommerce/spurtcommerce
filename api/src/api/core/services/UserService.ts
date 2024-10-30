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
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { Like } from 'typeorm';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userLoginRepository: UserRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find user
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all users');
        return this.userLoginRepository.findOne(findCondition);
    }

    // user list
    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
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
        if (keyword) {
            condition.where = [{
                firstName: Like('%' + keyword + '%'),
            },
            {
                lastName: Like('%' + keyword + '%'),
            }];
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.userLoginRepository.count(condition);
        } else {
            return this.userLoginRepository.find(condition);
        }

    }

    // create user
    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        const newUser = await this.userLoginRepository.save(user);
        return newUser;
    }

    // update user
    public update(id: any, user: User): Promise<User> {
        this.log.info('Update a user');
        user.userId = id;
        return this.userLoginRepository.save(user);
    }

    // delete user
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a user');
        const newUser = await this.userLoginRepository.delete(id);
        return newUser;
    }

    // find user
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all users');
        return this.userLoginRepository.find(findCondition);
    }
}
