/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorPayment } from '../models/VendorPayment';

@EntityRepository(VendorPayment)
export class VendorPaymentRepository extends Repository<VendorPayment>  {

    //  sale count
    public async getTotalSales(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorPayment, 'vendorPayment');
        query.select(['COUNT(vendorPayment.vendorPaymentId) as salesCount']);
        query.where('vendorPayment.vendorId = :id', { id });
        return query.getRawOne();
    }

    //  buyer count with login
    public async getTotalBuyers(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorPayment, 'vendorPayment');
        query.select(['COUNT(DISTINCT(order.customer_id)) as buyerCount']);
        query.leftJoin('vendorPayment.vendorOrders', 'vendorOrders');
        query.leftJoin('vendorOrders.order', 'order');
        query.where('vendorPayment.vendorId = :id', { id });
        query.andWhere('order.customerId != :value1', { value1: 0 });
        return query.getRawOne();
    }

    // get total vendor revenue
    public async getTotalVendorRevenue(vendorId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorPayment, 'vendorPayment');
        query.select(['vendorPayment.amount as amount', 'vendorPayment.commissionAmount as commissionAmount']);
        query.where('vendorPayment.vendorId = :id', { id: vendorId });
        return query.getRawMany();
    }

    public async dashboardVendorCommissionTotal(duration: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorPayment, 'vendorPayment');
        query.select(['ROUND(SUM(vendorPayment.commissionAmount), 2) as vendorCommission', 'COUNT(vendorPayment.vendorPaymentId) as vendorCommissionCount']);
        if (duration === 1 && duration) {
            query.andWhere('DATE(vendorPayment.created_date) = DATE(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('WEEK(vendorPayment.created_date) = WEEK(NOW()) AND MONTH(vendorPayment.created_date) = MONTH(NOW()) AND YEAR(vendorPayment.created_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(vendorPayment.created_date) = MONTH(NOW()) AND YEAR(vendorPayment.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(vendorPayment.created_date) = YEAR(NOW())');
        }
        return query.getRawOne();
    }
}
