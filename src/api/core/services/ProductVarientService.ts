/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductVarient } from '../models/ProductVarient';
import { ProductVarientRepository } from '../repositories/ProductVarientRepository';
import { FindManyOptions, FindOneOptions, Like } from 'typeorm';

@Service()
export class ProductVarientService {

    constructor(
        private productVarientRepository: ProductVarientRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(data: FindOneOptions<ProductVarient>): Promise<ProductVarient> {
        return this.productVarientRepository.repository.findOne(data);
    }

    public findAll(data: FindManyOptions<ProductVarient>): Promise<ProductVarient[]> {
        this.log.info('Find all');
        return this.productVarientRepository.repository.find(data);
    }

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
            return this.productVarientRepository.repository.count(condition);
        } else {
            return this.productVarientRepository.repository.find(condition);
        }
    }

    public async create(productVarient: ProductVarient): Promise<ProductVarient> {
        const newVarient = await this.productVarientRepository.repository.save(productVarient);
        return newVarient;
    }

    public async bulkSave(productVarient: ProductVarient[]): Promise<ProductVarient[]> {
        const newVarient = await this.productVarientRepository.repository.save(productVarient);
        return newVarient;
    }

    public update(id: any, productVarient: ProductVarient): Promise<ProductVarient> {
        this.log.info('Update a product varient');
        productVarient.id = id;
        return this.productVarientRepository.repository.save(productVarient);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product varient');
        const newVarient = await this.productVarientRepository.repository.delete(id);
        return newVarient;
    }
}
