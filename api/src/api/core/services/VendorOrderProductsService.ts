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
import { VendorOrderProducts } from '../models/VendorOrderProducts';
import { VendorOrderProductsRepository } from '../repositories/VendorOrderProductsRepository';
import { Like } from 'typeorm';

@Service()
export class VendorOrderProductsService {

    constructor(
        @OrmRepository() private vendorOrderProductsRepository: VendorOrderProductsRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Role
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.vendorOrderProductsRepository.findOne(findCondition);
    }
    // Role list
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorOrderProductsRepository.count(condition);
        }
        return this.vendorOrderProductsRepository.find(condition);
    }

    // create role
    public async create(vendorOrderProduct: VendorOrderProducts): Promise<VendorOrderProducts> {
        const newvendorOrderProduct = await this.vendorOrderProductsRepository.save(vendorOrderProduct);
        return newvendorOrderProduct;
    }

    // update role
    public update(id: any, vendorOrderProducts: VendorOrderProducts): Promise<VendorOrderProducts> {
        this.log.info('Update a vendorOrders');
        vendorOrderProducts.vendorOrderProductId = id;
        return this.vendorOrderProductsRepository.save(vendorOrderProducts);
    }

    // delete role
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a vendorOrders');
        const deleteVendorOrderProducts = await this.vendorOrderProductsRepository.delete(id);
        return deleteVendorOrderProducts;
    }

    // find Services
    public findAll(data: any): Promise<any> {
        return this.vendorOrderProductsRepository.find(data);
    }

}
