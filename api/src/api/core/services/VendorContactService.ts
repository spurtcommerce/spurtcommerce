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
import { Like } from 'typeorm';
import { VendorContactRepository } from '../repositories/VendorContactRepository';
import { VendorContact } from '../models/VendorContact';

@Service()
export class VendorContactService {

    constructor(
        @OrmRepository() private vendorContactRepository: VendorContactRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find user
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all vendor contact');
        return this.vendorContactRepository.findOne(findCondition);
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
            condition.where = {
                firstName: Like('%' + keyword + '%'),
            };
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorContactRepository.count(condition);
        } else {
            return this.vendorContactRepository.find(condition);
        }

    }

    // create user
    public async create(vendorContact: VendorContact): Promise<any> {
        const newUser = await this.vendorContactRepository.save(vendorContact);
        return newUser;
    }

    // update user
    public update(id: any, vendorContact: VendorContact): Promise<any> {
        return this.vendorContactRepository.save(vendorContact);
    }

    // delete user
    public async delete(id: number): Promise<any> {
        const newUser = await this.vendorContactRepository.delete(id);
        return newUser;
    }

    // find user
    public findAll(findCondition: any): Promise<any> {
        return this.vendorContactRepository.find(findCondition);
    }
}
