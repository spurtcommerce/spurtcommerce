/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductVarientOption } from '../models/ProductVarientOption';
import { ProductVarientOptionRepository } from '../repositories/ProductVarientOptionRepository';
import { FindOptionsWhere, FindManyOptions, FindOneOptions, Like } from 'typeorm';

@Service()
export class ProductVarientOptionService {

    constructor(
        private productVarientOptionRepository: ProductVarientOptionRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public find(data: FindOneOptions<ProductVarientOption>): Promise<any> {
        return this.productVarientOptionRepository.repository.find(data);
    }
    public findOne(data: FindOneOptions<ProductVarientOption>): Promise<ProductVarientOption> {
        return this.productVarientOptionRepository.repository.findOne(data);
    }

    public variantCount(id: number): Promise<any> {
        return this.productVarientOptionRepository.variantCount(id);
    }

    public findAll(data: FindManyOptions<ProductVarientOption>): Promise<ProductVarientOption[]> {
        this.log.info('Find all');
        return this.productVarientOptionRepository.repository.find(data);
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
            return this.productVarientOptionRepository.repository.count(condition);
        } else {
            return this.productVarientOptionRepository.repository.find(condition);
        }
    }

    public async create(productVarient: ProductVarientOption): Promise<ProductVarientOption> {
        const newVarientOption = await this.productVarientOptionRepository.repository.save(productVarient);
        return newVarientOption;
    }

    public update(id: any, productVarient: ProductVarientOption): Promise<ProductVarientOption> {
        this.log.info('Update a product varient option');
        productVarient.id = id;
        return this.productVarientOptionRepository.repository.save(productVarient);
    }

    public async findSkuForProductVarient(productId: number): Promise<any> {
        return await this.productVarientOptionRepository.findSkuForProductVarient(productId);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product varient option');
        const newProductVarientOption = await this.productVarientOptionRepository.repository.delete(id);
        return newProductVarientOption;
    }

    public async bulkDelete(id: FindOptionsWhere<ProductVarientOption>): Promise<any> {
        return await this.productVarientOptionRepository.repository.delete(id);
    }
}
