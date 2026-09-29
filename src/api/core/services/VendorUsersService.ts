/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Zone } from '../models/Zone';
import { VendorUsersRepository } from '../repositories/VendorUsersRepository';
import { Like } from 'typeorm';
import { VendorUsers } from '../models/VendorUsers';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
@Service()
export class VendorUsersService {

    constructor(
        private vendorUsersRepository: VendorUsersRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // --
    }

    public async create(user: VendorUsers): Promise<VendorUsers> {
        this.log.info('create method called');
        const newUser = await this.vendorUsersRepository.repository.save(user);
        return newUser;
    }

    public update(id: any, user: VendorUsers): Promise<VendorUsers> {
        this.log.info('update method called');
        user.id = id;
        return this.vendorUsersRepository.repository.save(user);
    }

    public async save(vendorUsers: any): Promise<Zone> {
        this.log.info('save method called');
        return this.vendorUsersRepository.repository.save(vendorUsers);
    }

    public async find(vendorUsers: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorUsersRepository.repository.find(vendorUsers);
    }

    public findOne(vendorUsers: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorUsersRepository.repository.findOne(vendorUsers);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.vendorUsersRepository.repository.delete(id);
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
            return this.vendorUsersRepository.repository.count(condition);
        } else {
            return this.vendorUsersRepository.repository.find(condition);
        }
    }
}
