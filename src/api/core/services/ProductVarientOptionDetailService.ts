/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductVarientOptionDetail } from '../models/ProductVarientOptionDetail';
import { ProductVarientOptionDetailRepository } from '../repositories/ProductVarientOptionDetailRepository';
import { FindOptionsWhere, FindManyOptions, FindOneOptions, Like } from 'typeorm';

@Service()
export class ProductVarientOptionDetailService {

    constructor(
        private productVarientOptionDetailRepository: ProductVarientOptionDetailRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // --
    }

    public findOne(data: FindOneOptions<ProductVarientOptionDetail>): Promise<ProductVarientOptionDetail> {
        return this.productVarientOptionDetailRepository.repository.findOne(data);
    }

    public findAll(data: FindManyOptions<ProductVarientOptionDetail>): Promise<ProductVarientOptionDetail[]> {
        this.log.info('Find all');
        return this.productVarientOptionDetailRepository.repository.find(data);
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
            return this.productVarientOptionDetailRepository.repository.count(condition);
        } else {
            return this.productVarientOptionDetailRepository.repository.find(condition);
        }
    }

    public async create(productVarient: ProductVarientOptionDetail): Promise<ProductVarientOptionDetail> {
        const newVarientOptionDetail = await this.productVarientOptionDetailRepository.repository.save(productVarient);
        return newVarientOptionDetail;
    }

    public async bulkSave(productVarient: ProductVarientOptionDetail[]): Promise<ProductVarientOptionDetail[]> {
        const newVarientOptionDetail = await this.productVarientOptionDetailRepository.repository.save(productVarient);
        return newVarientOptionDetail;
    }

    public update(id: any, productVarient: ProductVarientOptionDetail): Promise<ProductVarientOptionDetail> {
        this.log.info('Update a product varient option');
        productVarient.id = id;
        return this.productVarientOptionDetailRepository.repository.save(productVarient);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product varient option');
        const newProductVarientOptionDetail = await this.productVarientOptionDetailRepository.repository.delete(id);
        return newProductVarientOptionDetail;
    }

    public async bulkDelete(id: FindOptionsWhere<ProductVarientOptionDetail>): Promise<any> {
        this.log.info('Delete a product varient option');
        const newProductVarientOptionDetail = await this.productVarientOptionDetailRepository.repository.delete(id);
        return newProductVarientOptionDetail;
    }
}
