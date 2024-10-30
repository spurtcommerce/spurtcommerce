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
import { ProductToCategory } from '../models/ProductToCategory';
import { ProductToCategoryRepository } from '../repositories/ProductToCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class ProductToCategoryService {

    constructor(
        @OrmRepository() private productToCategoryRepository: ProductToCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // findOne condition
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all product');
        return this.productToCategoryRepository.findOne(findCondition);
    }

    // find all product
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all product');
        return this.productToCategoryRepository.find(findCondition);
    }

    // find all product
    public find(): Promise<any> {
        this.log.info('Find all product');
        return this.productToCategoryRepository.find();
    }

    // product list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], price: number, count: number | boolean): Promise<any> {
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
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (price && price === 1) {
            condition.order = {
                price: 'ASC',
            };
        }

        if (price && price === 2) {
            condition.order = {
                price: 'DESC',
            };
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.productToCategoryRepository.count(condition);
        }
        return this.productToCategoryRepository.find(condition);
    }

    // create product
    public async create(product: ProductToCategory): Promise<ProductToCategory> {
        const newProduct = await this.productToCategoryRepository.save(product);
        return newProduct;
    }

    // update product
    public update(id: any, product: ProductToCategory): Promise<ProductToCategory> {
        this.log.info('Update a product');
        product.productId = id;
        return this.productToCategoryRepository.save(product);
    }

    // delete product
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product');
        const newProduct = await this.productToCategoryRepository.delete(id);
        return newProduct;
    }
}
