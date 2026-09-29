/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductSpecial } from '../models/ProductSpecial';
import { ProductSpecialRepository } from '../repositories/ProductSpecialRepository';

@Service()
export class ProductSpecialService {
    constructor(
        private productSpecialRepository: ProductSpecialRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(Data: any): Promise<ProductSpecial> {
        this.log.info('create method called');
        return this.productSpecialRepository.repository.save(Data);
    }
    public findOne(id: any): Promise<ProductSpecial> {
        this.log.info('findOne method called');
        return this.productSpecialRepository.repository.findOne(id);
    }
    public findAll(productSpecial: any): Promise<ProductSpecial[]> {
        this.log.info('findAll method called');
        return this.productSpecialRepository.repository.find(productSpecial);
    }

    public find(): Promise<ProductSpecial[]> {
        this.log.info('find method called');
        return this.productSpecialRepository.repository.find();
    }
    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const deleteProductOptionValue = await this.productSpecialRepository.repository.delete(id);
        return deleteProductOptionValue;
    }

    public async findSpecialPrice(productId: number, todayDate: string): Promise<any> {
        this.log.info('findSpecialPrice method called');
        return await this.productSpecialRepository.findSpecialPrice(productId, todayDate);
    }

    public async findSpecialPriceWithSku(productId: number, skuId: number, todayDate: string): Promise<any> {
        this.log.info('findSpecialPriceWithSku method called');
        return await this.productSpecialRepository.findSpecialPriceWithSku(productId, skuId, todayDate);
    }
}
