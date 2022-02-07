/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../models/Order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>  {

    public async salesList(): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
        query.groupBy('month');
        query.addGroupBy('year');
        query.orderBy('year', 'ASC');
        query.addOrderBy('month', 'ASC');
        query.limit('12');
        console.log(query.getQuery());
        return query.getRawMany();
    }

    public async findAllTodayOrder(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select([  'order.total as total']);
        query.where('DATE(order.createdDate) = :todaydate', {todaydate});
        console.log(query.getQuery());
        return query.getRawMany();
    }

    public async findAllTodayOrderCount(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select([  'COUNT(order.orderId) as orderCount']);
        query.where('DATE(order.createdDate) = :todaydate', {todaydate});
        console.log(query.getQuery());
        return query.getRawOne();
    }

}
