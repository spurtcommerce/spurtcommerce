/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductTirePrice } from '../models/ProductTirePrice';
import { ProductTirePriceRepository } from '../repositories/ProductTirePriceRepository';

@Service()
export class ProductTirePriceService {
    constructor(
        private productTirePriceRepository: ProductTirePriceRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(Data: any): Promise<ProductTirePrice> {
        this.log.info('create method called');
        return this.productTirePriceRepository.repository.save(Data);
    }

    public findOne(id: any): Promise<ProductTirePrice> {
        this.log.info('findOne method called');
        return this.productTirePriceRepository.repository.findOne(id);
    }

    public findAll(productPrice: any): Promise<ProductTirePrice[]> {
        this.log.info('findAll method called');
        return this.productTirePriceRepository.repository.find(productPrice);
    }

    public list(limit: number, offset: number, whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productTirePriceRepository.repository.count(condition);
        } else {
            return this.productTirePriceRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const deleteProductTireValue = await this.productTirePriceRepository.repository.delete(id);
        return deleteProductTireValue;
    }

    public async findTirePrice(productId: number, skuId: string, quantity: number): Promise<any> {
        this.log.info('findTirePrice method called');
        return await this.productTirePriceRepository.findTirePrice(productId, skuId, quantity);
    }
}
