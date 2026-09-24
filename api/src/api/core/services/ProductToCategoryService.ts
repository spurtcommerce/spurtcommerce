/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductToCategory } from '../models/ProductToCategory';
import { ProductToCategoryRepository } from '../repositories/ProductToCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class ProductToCategoryService {

    constructor(
        private productToCategoryRepository: ProductToCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.productToCategoryRepository.repository.findOne(findCondition);
    }

    public findAll(findCondition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.productToCategoryRepository.repository.find(findCondition);
    }

    public find(): Promise<any> {
        this.log.info('find method called');
        return this.productToCategoryRepository.repository.find();
    }

    public findCondition(findCondition: any): Promise<any> {
        this.log.info('findCondition method called');
        return this.productToCategoryRepository.repository.find(findCondition);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], price: number, count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
            return this.productToCategoryRepository.repository.count(condition);
        }
        return this.productToCategoryRepository.repository.find(condition);
    }

    public async create(product: ProductToCategory): Promise<ProductToCategory> {
        return await this.productToCategoryRepository.repository.save(product);
    }

    public update(id: any, product: ProductToCategory): Promise<ProductToCategory> {
        this.log.info('update method called');
        product.productId = id;
        return this.productToCategoryRepository.repository.save(product);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        return await this.productToCategoryRepository.repository.delete(id);
    }
}
