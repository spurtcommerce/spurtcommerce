/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { ProductImageRepository } from '../repositories/ProductImageRepository';
import { ProductImage } from '../models/ProductImage';

@Service()
export class ProductImageService {

    constructor(
        private productImageRepository: ProductImageRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(productImage: ProductImage): Promise<ProductImage> {
        this.log.info('create method called for a new product image');
        return this.productImageRepository.repository.save(productImage);
    }
    public findOne(productImage: any): Promise<ProductImage> {
        this.log.info('findOne method called');
        return this.productImageRepository.repository.findOne(productImage);
    }

    public findAll(productImage: any): Promise<any> {
        this.log.info('findAll method called');
        return this.productImageRepository.repository.find(productImage);
    }

    public find(): Promise<any> {
        this.log.info('find method called');
        return this.productImageRepository.repository.find();
    }

    public update(id: any, productImage: ProductImage): Promise<ProductImage> {
        this.log.info(`update method called for product image with ID ${id}`);
        productImage.productImageId = id;
        return this.productImageRepository.repository.save(productImage);
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
            this.log.info('listing with count');
            return this.productImageRepository.repository.count(condition);
        } else {
            this.log.info('listing without count');
            return this.productImageRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        this.log.info(`delete method called for product image with ID ${id}`);
        return await this.productImageRepository.repository.delete(id);
    }

    public async deleteProduct(id: number): Promise<any> {
        this.log.info(`deleteProduct method called for product with ID ${id}`);
        return await this.productImageRepository.repository.delete({ productId: id });
    }
}
