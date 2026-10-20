/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { ProductVarientOptionImageRepository } from '../repositories/ProductVarientOptionImageRepository';
import { ProductVarientOptionImage } from '../models/ProductVarientOptionImage';

@Service()
export class ProductVarientOptionImageService {

    constructor(
        private productVarientOptionImageRepository: ProductVarientOptionImageRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(productImage: ProductVarientOptionImage): Promise<ProductVarientOptionImage> {
        this.log.info('Create a new productImage ');
        return this.productVarientOptionImageRepository.repository.save(productImage);
    }

    public async bulkSave(productImage: ProductVarientOptionImage[]): Promise<ProductVarientOptionImage[]> {
        this.log.info('Create a new productImage ');
        return this.productVarientOptionImageRepository.repository.save(productImage);
    }

    public findOne(productImage: any): Promise<ProductVarientOptionImage> {
        return this.productVarientOptionImageRepository.repository.findOne(productImage);
    }

    public findAll(productImage: any): Promise<any> {
        return this.productVarientOptionImageRepository.repository.find(productImage);
    }

    public find(): Promise<any> {
        return this.productVarientOptionImageRepository.repository.find();
    }

    public update(id: any, productImage: ProductVarientOptionImage): Promise<ProductVarientOptionImage> {
        this.log.info('Update a productImage');
        productImage.id = id;
        return this.productVarientOptionImageRepository.repository.save(productImage);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productVarientOptionImageRepository.repository.count(condition);
        } else {
            return this.productVarientOptionImageRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        return await this.productVarientOptionImageRepository.repository.delete(id);
    }
}
