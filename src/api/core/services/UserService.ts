/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { Like } from 'typeorm';

@Service()
export class UserService {

    constructor(
        private userLoginRepository: UserRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.userLoginRepository.repository.findOne(findCondition);
    }

    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
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
            return this.userLoginRepository.repository.count(condition);
        } else {
            return this.userLoginRepository.repository.find(condition);
        }

    }

    public async create(user: User): Promise<User> {
        this.log.info('create method called');
        const newUser = await this.userLoginRepository.repository.save(user);
        return newUser;
    }

    public update(id: any, user: User): Promise<User> {
        this.log.info('update method called');
        user.userId = id;
        return this.userLoginRepository.repository.save(user);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const newUser = await this.userLoginRepository.repository.delete(id);
        return newUser;
    }

    public findAll(findCondition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.userLoginRepository.repository.find(findCondition);
    }
}
