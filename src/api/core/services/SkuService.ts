/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Sku } from '../models/SkuModel';
import { SkuRepository } from '../repositories/SkuRepository';
import { FindOptionsWhere, Like } from 'typeorm';

@Service()
export class SkuService {

    constructor(
        private skuRepository: SkuRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(sku: any): Promise<any> {
        return this.skuRepository.repository.findOne(sku);
    }

    // find all sku
    public findAll(sku: any): Promise<any> {
        this.log.info('Find all sku');
        return this.skuRepository.repository.find(sku);
    }

    // list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
                const operator: string = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;

        }
        if (count) {
            return this.skuRepository.repository.count(condition);
        } else {
            return this.skuRepository.repository.find(condition);
        }
    }

    // create sku
    public async create(sku: Sku): Promise<Sku> {
        const newSku = await this.skuRepository.repository.save(sku);
        return newSku;
    }

    // update sku
    public update(id: any, sku: Sku): Promise<Sku> {
        this.log.info('Update a sku');
        sku.id = id;
        return this.skuRepository.repository.save(sku);
    }

    // delete sku
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a sku');
        const newSku = await this.skuRepository.repository.delete(id);
        return newSku;
    }

    public async bulkDelete(id: FindOptionsWhere<Sku>): Promise<any> {
        this.log.info('Delete a sku');
        const newSku = await this.skuRepository.repository.delete(id);
        return newSku;
    }
}
