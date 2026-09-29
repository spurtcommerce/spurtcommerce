/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Zone } from '../models/Zone';
import { VendorUserGroupRepository } from '../repositories/VendorUserGroupRepository';
import { VendorUserGroup } from '../models/VendorUserGroup';
import { Like } from 'typeorm';
import { Logger, LoggerInterface } from '../../../decorators/Logger';

@Service()
export class VendorUserGroupService {

    constructor(
        private vendorUserGroupRepository: VendorUserGroupRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // --
    }

    public async save(vendorUserGroup: any): Promise<Zone> {
        this.log.info('save method called');
        return this.vendorUserGroupRepository.repository.save(vendorUserGroup);
    }

    public async find(vendorUserGroup: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorUserGroupRepository.repository.find(vendorUserGroup);
    }

    public findOne(vendorUserGroup: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorUserGroupRepository.repository.findOne(vendorUserGroup);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.vendorUserGroupRepository.repository.delete(id);
    }

    public async create(vendorUserGroup: VendorUserGroup): Promise<VendorUserGroup> {
        this.log.info('create method called');
        return await this.vendorUserGroupRepository.repository.save(vendorUserGroup);
    }

    public update(id: any, vendorUserGroup: VendorUserGroup): Promise<VendorUserGroup> {
        this.log.info('update method called');
        vendorUserGroup.id = id;
        return this.vendorUserGroupRepository.repository.save(vendorUserGroup);
    }

    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
            return this.vendorUserGroupRepository.repository.count(condition);
        }
        return this.vendorUserGroupRepository.repository.find(condition);
    }
}
