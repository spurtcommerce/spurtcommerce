/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductDiscount } from '../models/ProductDiscount';
import { ProductDiscountRepository } from '../repositories/ProductDiscountRepository';

@Service()
export class ProductDiscountService {
    constructor(
        private productDiscountRepository: ProductDiscountRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(Data: any): Promise<ProductDiscount> {
        this.log.info('create method called');
        return this.productDiscountRepository.repository.save(Data);
    }

    public findOne(id: any): Promise<ProductDiscount> {
        this.log.info(`findOne method called for id ${id}`);
        return this.productDiscountRepository.repository.findOne(id);
    }

    public findOneValue(id: any): Promise<ProductDiscount> {
        this.log.info(`findOneValue method called for id ${id}`);
        return this.productDiscountRepository.repository.findOne(id);
    }

    public findAll(productDiscount: any): Promise<ProductDiscount[]> {
        this.log.info('findAll method called');
        return this.productDiscountRepository.repository.find(productDiscount);
    }

    public find(): Promise<ProductDiscount[]> {
        this.log.info('find method called');
        return this.productDiscountRepository.repository.find();
    }
    public async delete(id: any): Promise<any> {
        this.log.info(`delete method called for id ${id}`);
        return await this.productDiscountRepository.repository.delete(id);
    }

    public async findDiscountPrice(productId: number, todayDate: string): Promise<any> {
        this.log.info(`findDiscountPrice called for productId ${productId} on ${todayDate}`);
        return await this.productDiscountRepository.findDiscountPrice(productId, todayDate);
    }

    public async findDiscountPricewithSku(productId: number, skuId: number, todayDate: string): Promise<any> {
        this.log.info(`findDiscountPricewithSku called for productId ${productId}, skuId ${skuId} on ${todayDate}`);
        return await this.productDiscountRepository.findDiscountPricewithSku(productId, skuId, todayDate);
    }
}
