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
import { VendorGroup } from '../models/VendorGroup';
import { VendorGroupRepository } from '../repositories/VendorGroupRepository';
import { FindManyOptions, Like } from 'typeorm';

@Service()
export class VendorGroupService {

    constructor(
        @OrmRepository() private vendorGroupRepository: VendorGroupRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Group
    public async findOne(findCondition: any): Promise<any> {
        this.log.info('Find group');
        return await this.vendorGroupRepository.findOne(findCondition);
    }

    // Group list
    public async list(limit: any, offset: any, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: FindManyOptions = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return await this.vendorGroupRepository.count(condition);
        }

        condition.order = {
            createdDate: 'DESC',
        };

        return await this.vendorGroupRepository.find(condition);
    }

    // create group
    public async create(vendorGroup: VendorGroup): Promise<VendorGroup> {
        return await this.vendorGroupRepository.save(vendorGroup);
    }

    // update group
    public async update(id: any, vendorGroup: VendorGroup): Promise<VendorGroup> {
        this.log.info('Update a group');
        vendorGroup.groupId = id;
        return await this.vendorGroupRepository.save(vendorGroup);
    }

    // delete group
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a group');
        const deleteVendor = await this.vendorGroupRepository.delete(id);
        return deleteVendor;
    }

    public async vendorCount(id: number): Promise<any> {
        return await this.vendorGroupRepository.getVendorCount(id);
    }
}
