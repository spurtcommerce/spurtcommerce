/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorOrders } from '../models/VendorOrders';

@EntityRepository(VendorOrders)
export class VendorOrdersRepository extends Repository<VendorOrders>  {

    public async searchOrderList(id: number, orderDate: string, startDate: string, endDate: string, keyword: string, deliverylist: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['vendorOrder.vendorOrderId as vendorOrderId', 'vendorOrder.orderId as orderId', 'orderProduct.discountAmount as discountAmount', 'orderProduct.discountedAmount as discountedAmount',
            'vendorOrder.vendorId as vendorId', 'vendorOrder.subOrderId as subOrderId', 'vendorOrder.total as total',
            'vendorOrder.commission as commission', 'vendorOrder.orderProductId as orderProductId', 'order.paymentProcess as paymentProcess',
            'vendorOrder.subOrderStatusId as subOrderStatusId', 'DATE(vendorOrder.createdDate) as date',
            'order.shippingFirstname as customerFirstName', 'orderStatus.name as orderStatusName', 'order.shippingCity as shippingCity', 'order.shippingCountry as shippingCountry', 'order.currencySymbolLeft as currencySymbolLeft', 'order.currencySymbolRight as currencySymbolRight', 'order.paymentFlag as paymentFlag', 'order.paymentMethod as paymentMethod']);
        query.leftJoin('vendorOrder.order', 'order');
        query.leftJoin('vendorOrder.orderStatus', 'orderStatus');
        query.leftJoin('vendorOrder.orderProduct', 'orderProduct');
        query.where('vendorOrder.vendorId = :id', { id });
        query.andWhere('order.paymentProcess = :process', { process: 1 });
        if (orderDate !== undefined && orderDate !== '') {
            query.andWhere('DATE(vendorOrder.createdDate) = :value', { value: orderDate });
        }
        if (startDate && endDate) {
            query.andWhere('DATE(vendorOrder.createdDate) >= :value1 AND DATE(vendorOrder.createdDate) <= :value2', { value1: startDate, value2: endDate });
        }
        if (deliverylist) {
            query.andWhere('order.paymentStatus = 1 ');
        }
        if (keyword !== undefined && keyword !== '') {
            query.andWhere('(order.shippingFirstname LIKE ' + "'%" + keyword + "%'" + ' ');
            query.orWhere('vendorOrder.subOrderId LIKE ' + "'%" + keyword + "%'" + ')');
        }
        query.orderBy('vendorOrder.createdDate', 'DESC');
        return query.getRawMany();
    }

    public async findVendorTodayOrderCount(vendorId: number, todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendororder');
        query.select(['COUNT(vendororder.vendorOrderId) as orderCount']);
        query.leftJoin('vendororder.order', 'order');
        query.where('DATE(vendororder.createdDate) = :todaydate', { todaydate });
        query.andWhere('vendororder.vendorId = :vendorId', { vendorId });
        query.andWhere('order.payment_process = :process', { process: 1 });
        return query.getRawOne();
    }
    // get buyers count , sale count and total revenue
    public async getTotalBuyers(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['COUNT(vendorOrder.orderId) as salesCount', 'COUNT(DISTINCT(order.customer_id)) as buyerCount']);
        query.leftJoin('vendorOrder.order', 'order');
        query.leftJoin('vendorOrder.orderProduct', 'orderProduct');
        query.where('vendorOrder.vendorId = :id', { id });
        query.andWhere('order.paymentProcess = :process', { process: 1 });
        query.andWhere('order.paymentStatus = :value1', { value1: 1 });
        return query.getRawOne();
    }

    // find vendor count
    public async findVendorCount(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['COUNT(DISTINCT(vendorOrder.vendorId)) as vendorCount']);
        query.where('vendorOrder.orderId = :id', { id });
        return query.getRawOne();
    }

    // find vendors
  public async findVendors(id: any): Promise<any> {
    const query = await this.manager.createQueryBuilder(
      VendorOrders,
      'vendorOrder'
    );
    query.select(['COUNT(DISTINCT(vendorOrder.vendorId)) as vendorCount, vendorOrder.vendorId as vendorId']);
    query.where('vendorOrder.orderId = :id', { id });
    query.groupBy('vendorOrder.vendorId');
    return query.getRawMany();
  }

    // find sun of amount
    public async findSumOfAmount(orderId: number, vendorId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['SUM(vendorOrder.total) as total']);
        query.where('vendorOrder.orderId = :id', { id: orderId });
        query.andWhere('vendorOrder.vendorId = :vendorId', { vendorId });
        return query.getRawOne();
    }

    // get each product revenue
    public async getEachProductRevenue(productId: number, vendorId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['vendorOrder.total as total', 'vendorOrder.commission as commission', 'orderProduct.discountAmount as discountAmount', 'orderProduct.discountedAmount as discountedAmount']);
        query.leftJoin('vendorOrder.orderProduct', 'orderProduct');
        query.leftJoin('vendorOrder.order', 'order');
        query.where('vendorOrder.vendorId = :id', { id: vendorId });
        query.andWhere('orderProduct.productId = :productId', { productId });
        query.andWhere('order.paymentStatus = :value1', { value1: 1 });
        return query.getRawMany();
    }

    // get total vendor revenue
    public async getTotalVendorRevenue(vendorId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['vendorOrder.total as total', 'vendorOrder.commission as commission', 'orderProduct.discountAmount as discountAmount', 'orderProduct.discountedAmount as discountedAmount']);
        query.leftJoin('vendorOrder.orderProduct', 'orderProduct');
        query.leftJoin('vendorOrder.order', 'order');
        query.where('vendorOrder.vendorId = :id', { id: vendorId });
        query.andWhere('order.paymentStatus = :value1', { value1: 1 });
        return query.getRawMany();
    }

    // findOrderCountBasedStatus
    public async findOrderCountBasedStatus(vendorId: number, duration: number, statusId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['COUNT(vendorOrder.vendorOrderId) as orderCount']);
        query.leftJoin('vendorOrder.order', 'order');
        query.where('vendorOrder.vendorId = :id', { id: vendorId });
        query.andWhere('order.paymentProcess = :paymentProcess', { paymentProcess: 1 });
        query.andWhere('vendorOrder.subOrderStatusId= :value1', { value1: statusId });
        if (duration === 1 && duration) {
            query.andWhere('WEEKOFYEAR(vendorOrder.modified_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('MONTH(vendorOrder.modified_date) = MONTH(NOW()) AND YEAR(vendorOrder.modified_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('YEAR(vendorOrder.modified_date) = YEAR(NOW())');
        }
        return query.getRawOne();
    }

    // findOrderCountBasedStatus
    public async findOrderCountBasedDuration(vendorId: number, duration: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['COUNT(vendorOrder.vendorOrderId) as orderCount']);
        query.leftJoin('vendorOrder.order', 'order');
        query.where('vendorOrder.vendorId = :id', { id: vendorId });
        query.andWhere('order.paymentProcess = :paymentProcess', { paymentProcess: 1 });
        if (duration === 1 && duration) {
            query.andWhere('WEEKOFYEAR(vendorOrder.modified_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('MONTH(vendorOrder.modified_date) = MONTH(NOW()) AND YEAR(vendorOrder.modified_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('YEAR(vendorOrder.modified_date) = YEAR(NOW())');
        }
        return query.getRawOne();
    }

    public async searchOrderListt(id: number, deliverylist: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrder');
        query.select(['vendorOrder.vendorOrderId as vendorOrderId', 'vendorOrder.orderId as orderId', 'vendorOrder.vendorId as vendorId', 'vendorOrder.subOrderId as subOrderId', 'vendorOrder.total as total', 'vendorOrder.commission as commission', 'vendorOrder.orderProductId as orderProductId', 'vendorOrder.subOrderStatusId as subOrderStatusId', 'DATE(vendorOrder.createdDate) as date',
            'order.shippingFirstname as customerFirstName', 'orderStatus.name as orderStatusName', 'orderProduct.discountAmount as discountAmount', 'orderProduct.discountedAmount as discountedAmount', 'order.shippingCity as shippingCity', 'order.shippingCountry as shippingCountry', 'order.currencySymbolLeft as currencySymbolLeft', 'order.currencySymbolRight as currencySymbolRight', 'order.paymentFlag as paymentFlag', 'order.paymentMethod as paymentMethod']);
        query.leftJoin('vendorOrder.order', 'order');
        query.leftJoin('vendorOrder.orderProduct', 'orderProduct');
        query.leftJoin('vendorOrder.orderStatus', 'orderStatus');
        query.where('vendorOrder.vendorOrderId = :id', { id });
        query.andWhere('order.paymentProcess = :value1', { value1: 1 });
        if (deliverylist) {
            query.andWhere('order.paymentStatus = 1 ');
        }
        query.orderBy('vendorOrder.createdDate', 'DESC');
        return query.getRawOne();
    }

    public async productSoldBasedOnDuration(id: number, duration: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrders');
        query.select(['SUM(orderProduct.quantity) as soldCount']);
        query.leftJoin('vendorOrders.order', 'order');
        query.leftJoin('vendorOrders.orderProduct', 'orderProduct');
        query.where('vendorOrders.vendorId = :id', { id });
        query.andWhere('order.payment_process = :paymentProcess', { paymentProcess: 1 });
        query.andWhere('order.payment_status = :paymentStatus', { paymentStatus: 1 });
        query.andWhere('order.payment_flag = :paymentFlag', { paymentFlag: 1 });
        if (duration === 2 && duration) {
            query.andWhere('WEEKOFYEAR(vendorOrders.created_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(vendorOrders.created_date) = MONTH(NOW()) AND YEAR(vendorOrders.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(vendorOrders.created_date) = YEAR(NOW())');
        } else if (duration === 1 && duration) {
            query.andWhere('DATE(vendorOrders.created_date) = CURDATE()');
        }
        return query.getRawMany();
    }

    public async deliveredOrderBasedOnDuration(id: number, duration: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrders');
        query.select(['vendorOrders.vendorOrderId as vendorOrderId']);
        query.leftJoin('vendorOrders.order', 'order');
        query.where('vendorOrders.vendorId = :id', { id });
        query.andWhere('order.payment_process = :paymentProcess', { paymentProcess: 1 });
        query.andWhere('order.payment_status = :paymentStatus', { paymentStatus: 1 });
        query.andWhere('order.payment_flag = :paymentFlag', { paymentFlag: 1 });
        query.andWhere('vendorOrders.sub_order_status_id = :status', { status: 5 });
        if (duration === 2 && duration) {
            query.andWhere('WEEKOFYEAR(vendorOrders.created_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(vendorOrders.created_date) = MONTH(NOW()) AND YEAR(vendorOrders.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(vendorOrders.created_date) = YEAR(NOW())');
        } else if (duration === 1 && duration) {
            query.andWhere('DATE(vendorOrders.created_date) = CURDATE()');
        }
        return query.getCount();
    }
}
