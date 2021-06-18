/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { CustomerWishlist } from '../models/CustomerWishlist';
import { CustomerWishlistRepository } from '../repositories/CustomerWishlistRepository';

@Service()
export class CustomerWishlistService {
    constructor(
        @OrmRepository() private customerWishlistRepository: CustomerWishlistRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(productdata: any): Promise<CustomerWishlist> {
        this.log.info('create a wishlist product');
        return this.customerWishlistRepository.save(productdata);
    }

    // find Condition
    public findOne(customer: any): Promise<any> {
        return this.customerWishlistRepository.findOne(customer);
    }

    // delete customer wishlist
    public async delete(id: number): Promise<any> {
        this.log.info('delete a wishlist product');
        return await this.customerWishlistRepository.delete(id);
    }

    // customer wishlist
    public list(limit: number , offset: number  , select: any = [] , whereConditions: any = [] , count: number | boolean): Promise<any> {
         const condition: any = {};
         if (select && select.length > 0) {
            condition.select = select;
        }

        if (whereConditions && whereConditions.length > 0) {
                condition.where = whereConditions;
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

         console.log(condition);

        if (count) {
            return this.customerWishlistRepository.count(condition);
        }
        return this.customerWishlistRepository.find(condition);
    }
    // find customer
    public async find(customerId: any): Promise<any> {
        this.log.info('Find a customer');
        return this.customerWishlistRepository.find(customerId);
    }
}
