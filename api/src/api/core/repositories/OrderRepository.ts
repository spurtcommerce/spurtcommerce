/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../models/Order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>  {

    public async salesList(): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
        query.andWhere('payment_process = :process', { process: 1 });
        query.groupBy('month');
        query.addGroupBy('year');
        query.orderBy('year', 'ASC');
        query.addOrderBy('month', 'ASC');
        query.limit('12');
        return query.getRawMany();
    }

    public async transactionList( year: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'SUM(order.total) as orderAmount']);
        query.where('order.payment_flag = 1 AND order.payment_status = 1');
        if (year) {
        query.andWhere('YEAR(order.created_date) = :year', { year });
        }
        query.groupBy('month');
        query.addGroupBy('YEAR(created_date)');
        query.orderBy('YEAR(created_date)', 'ASC');
        query.addOrderBy('month', 'ASC');
        return query.getRawMany();
    }

    public async findAllTodayOrder(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['SUM(order.total) as total']);
        query.where('DATE(order.createdDate) = :todaydate', { todaydate });
        query.andWhere('payment_process = :process', { process: 1 });
        return query.getRawOne();
    }

    public async findAllTodayOrderCount(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order.orderId) as orderCount']);
        query.where('DATE(order.createdDate) = :todaydate', { todaydate });
        query.andWhere('payment_process = :process', { process: 1 });
        return query.getRawOne();
    }
    public async findTotalOrderAmount(): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['SUM(order.total) as total']);
        query.where('payment_process = :process', { process: 1 });
        return query.getRawOne();
    }

    public async orderCount(orderId: string, orderStatusId: string, totalAmount: string, customerName: string, dateAdded: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(DISTINCT(order.orderId)) as orderCount']);
        query.innerJoin('order.orderProduct', 'orderProduct');
        query.where('payment_process = :process', { process: 1 });
        if (orderId) {
            query.andWhere('order.orderPrefixId = :orderPrefixId', { orderPrefixId: orderId });
        }
        if (orderStatusId) {
            query.andWhere('orderProduct.orderStatusId = :orderStatusId', { orderStatusId });
        }
        if (totalAmount) {
            query.andWhere('order.total = :total', { total: totalAmount });
        }
        if (customerName) {
            query.andWhere('order.shippingFirstname = :shippingFirstname', { shippingFirstname: customerName });
        }
        if (dateAdded) {
            query.andWhere(`order.createdDate Like '%${dateAdded}%'`);
        }
        return query.getRawOne();
    }
    public async dashboardOrdersCount(duration: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Order, 'Order');
        query.select(['COUNT(Order.order_id) as ordersCount', 'COUNT(DISTINCT(vendorOrders.vendor_id)) as vendorsCount']);
        query.leftJoin('Order.vendorOrders', 'vendorOrders');
        query.where('Order.payment_status = 1 AND Order.payment_flag = 1 AND Order.paymentProcess = 1');
        if (duration === 1 && duration) {
            query.andWhere('DATE(Order.created_date) = DATE(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('WEEK(Order.created_date) = WEEK(NOW()) AND MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(Order.created_date) = YEAR(NOW())');
        }
        return query.getRawOne();
    }

    public async ordersCount(duration: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Order, 'Order');
        query.andWhere('Order.paymentFlag = 1 AND Order.paymentStatus = 1 AND Order.paymentProcess = 1');
        if (duration === 1 && duration) {
            query.andWhere('DATE(Order.created_date) = DATE(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('WEEK(Order.created_date) = WEEK(NOW()) AND MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(Order.created_date) = YEAR(NOW())');
        }
        return query.getCount();
    }
}
