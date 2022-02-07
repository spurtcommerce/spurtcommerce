/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { OrderProduct } from '../models/OrderProduct';
import { OrderProductRepository } from '../repositories/OrderProductRepository';

@Service()
export class OrderProductService {
    constructor(
        @OrmRepository() private orderProductRepository: OrderProductRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createData(checkoutdata: any): Promise<OrderProduct> {
        this.log.info('create a order product data');
        return this.orderProductRepository.save(checkoutdata);
    }
    public async findData(productid: number , orderid: number , orderProductid: number): Promise<any> {
        this.log.info('find a order product data');
        return this.orderProductRepository.find({where: {productId: productid, orderId: orderid, orderProductId: orderProductid}});

    }

    public find(order: any): Promise<any> {
        return this.orderProductRepository.find(order);
    }

    // public list( limit: number, offset: number, select: any[], relation: any = [], count: number | boolean): Promise<any> {
    //     const condition: any = {};
    //     condition.where = {};
    //     if (relation && relation.length > 0) {
    //         condition.relations = ['productInformationDetail'];
    //     }
    //     if (limit && limit > 0) {
    //         condition.take = limit;
    //         condition.skip = offset;
    //     }
    //     condition.order = {
    //         createdDate : 'DESC',
    //     };
    //     if (count) {
    //         return this.orderProductRepository.count(condition);
    //     } else {
    //         return this.orderProductRepository.find(condition);
    //     }
    // }

    public findOne(productData: any): Promise<any> {
        return this.orderProductRepository.findOne(productData);
    }

    // order list
    public List( limit: number ): Promise<any> {
        return this.orderProductRepository.List(limit);
    }

    // order count
    public findAndCount( where: any ): Promise<any> {
        return this.orderProductRepository.findAndCount(where);
    }
}
