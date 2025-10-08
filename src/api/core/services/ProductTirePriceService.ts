/*
 * spurtcommerce API
 * version 5.2.0
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

    // create a data
    public async create(Data: any): Promise<ProductTirePrice> {
        this.log.info('create a data');
        return this.productTirePriceRepository.repository.save(Data);
    }
    // findone a data
    public findOne(id: any): Promise<ProductTirePrice> {
        this.log.info('Find a data');
        return this.productTirePriceRepository.repository.findOne(id);
    }
    // find a data
    public findAll(productPrice: any): Promise<ProductTirePrice[]> {
        this.log.info('Find a data');
        return this.productTirePriceRepository.repository.find(productPrice);
    }

    // List
    public list(limit: number, offset: number, whereConditions: any = [], count: number | boolean): Promise<any> {
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

    // delete product tire price
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product option value');
        const deleteProductTireValue = await this.productTirePriceRepository.repository.delete(id);
        return deleteProductTireValue;
    }

    // find Tire Price
    public async findTirePrice(productId: number, skuId: string, quantity: number): Promise<any> {
        return await this.productTirePriceRepository.findTirePrice(productId, skuId, quantity);
    }

}
