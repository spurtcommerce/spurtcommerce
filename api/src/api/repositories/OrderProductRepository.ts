/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { OrderProduct } from '../models/OrderProduct';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends Repository<OrderProduct>  {

    public async List(limit: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['DISTINCT product_id as productId', 'order_id as orderId', 'name as ProductName', 'quantity as Quantity', 'total as Total', ' created_date as CreatedDate']);
        // query.groupBy('productId');
        query.orderBy('created_date', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }
}
