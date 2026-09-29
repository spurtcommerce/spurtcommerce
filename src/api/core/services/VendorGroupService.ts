/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorGroup } from '../models/VendorGroup';
import { VendorGroupRepository } from '../repositories/VendorGroupRepository';
import { FindManyOptions, Like } from 'typeorm';

@Service()
export class VendorGroupService {

    constructor(
        private vendorGroupRepository: VendorGroupRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return await this.vendorGroupRepository.repository.findOne(findCondition);
    }

    public async list(limit: any, offset: any, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
            return await this.vendorGroupRepository.repository.count(condition);
        }

        condition.order = {
            createdDate: 'DESC',
        };

        return await this.vendorGroupRepository.repository.find(condition);
    }

    public async create(vendorGroup: VendorGroup): Promise<VendorGroup> {
        this.log.info('create method called');
        return await this.vendorGroupRepository.repository.save(vendorGroup);
    }

    public async update(id: any, vendorGroup: VendorGroup): Promise<VendorGroup> {
        this.log.info('update method called');
        vendorGroup.groupId = id;
        return await this.vendorGroupRepository.repository.save(vendorGroup);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const deleteVendor = await this.vendorGroupRepository.repository.delete(id);
        return deleteVendor;
    }

    public async vendorCount(id: number): Promise<any> {
        this.log.info('vendorCount method called');
        return await this.vendorGroupRepository.getVendorCount(id);
    }
}
