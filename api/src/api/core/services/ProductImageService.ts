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
import { Like } from 'typeorm/index';
import { ProductImageRepository } from '../repositories/ProductImageRepository';
import { ProductImage } from '../models/ProductImage';

@Service()
export class ProductImageService {

    constructor(
        @OrmRepository() private productImageRepository: ProductImageRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create product
    public async create(productImage: ProductImage): Promise<ProductImage> {
        this.log.info('Create a new productImage ');
        return this.productImageRepository.save(productImage);
    }
    // find one product image
    public findOne(productImage: any): Promise<ProductImage> {
        return this.productImageRepository.findOne(productImage);
    }

    // find all product images
    public findAll(productImage: any): Promise<any> {
        return this.productImageRepository.find(productImage);
    }

    // find all product images
    public find(): Promise<any> {
        return this.productImageRepository.find();
    }

    // update product images
    public update(id: any, productImage: ProductImage): Promise<ProductImage> {
        this.log.info('Update a productImage');
        productImage.productImageId = id;
        return this.productImageRepository.save(productImage);
    }
    // ProductImage List
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
            return this.productImageRepository.count(condition);
        } else {
            return this.productImageRepository.find(condition);
        }
    }
    // delete product image
    public async delete(id: any): Promise<any> {
        return await this.productImageRepository.delete(id);
    }

    // delete product
    public async deleteProduct(id: number): Promise<any> {
        return await this.productImageRepository.delete({ productId: id });
    }
}
