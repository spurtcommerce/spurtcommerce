/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Logger, LoggerInterface} from '../../decorators/Logger';
import {Product} from '../models/ProductModel';
import {ProductRepository} from '../repositories/ProductRepository';
import {Like} from 'typeorm';

@Service()
export class ProductService {

    constructor(@OrmRepository() private productRepository: ProductRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // find product
    public find(product: any): Promise<any> {
        return this.productRepository.find(product);
    }

    // find one product
    public async findOne(findCondition: any): Promise<any> {
        return await this.productRepository.findOne(findCondition);
    }

    // product list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean): Promise<any> {
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

        if (search && search.length > 0) {
            search.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (price && price === 1) {
            condition.order = {
                price: 'ASC',
                createdDate: 'DESC',
            };
        } else if (price && price === 2) {
            condition.order = {
                price: 'DESC',
                createdDate: 'DESC',
            };
        } else {
            condition.order = {
                createdDate: 'DESC',
            };
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        console.log(condition);
        if (count) {
            return this.productRepository.count(condition);
        }
        return this.productRepository.find(condition);
    }

    // create product
    public async create(product: Product): Promise<Product> {
        const newProduct = await this.productRepository.save(product);
        return newProduct;
    }

    // update product
    public update(id: any, product: Product): Promise<Product> {
        this.log.info('Update a product');
        product.productId = id;
        return this.productRepository.save(product);
    }

    // delete product
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a product');
        const newProduct = await this.productRepository.delete(id);
        return newProduct;
    }

    // product list
    public async productList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], priceFrom: string, priceTo: string, price: number, count: number | boolean): Promise<any> {
        return await this.productRepository.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
    }

    // Recent selling product
    public async recentProductSelling(limit: number): Promise<any> {
        return await this.productRepository.recentProductSelling(limit);
    }

    // Maximum Product price
    public async productMaxPrice(maximum: any): Promise<any> {
        return await this.productRepository.productMaxPrice(maximum);
    }

     // product list
     public async customProductList(limit: number, offset: number, categoryId: any = [], manufacturerId: number, condition: number, keyword: string, priceFrom: string, priceTo: string, price: string): Promise<Product[]> {
        return await this.productRepository.customProductList(limit, offset, categoryId, manufacturerId, condition, keyword, priceFrom, priceTo, price);
    }

     // Product count
     public async productCount(keyword: string, manufacturerId: number, categoryId: number, priceFrom: number, priceTo: number): Promise<any> {
        return await this.productRepository.productCount(keyword, manufacturerId, categoryId, priceFrom, priceTo);
    }
}
