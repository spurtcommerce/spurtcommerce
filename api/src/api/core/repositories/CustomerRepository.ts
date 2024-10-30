/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../models/Customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>  {

    public async TodayCustomerCount(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Customer, 'customer');
        query.select(['COUNT(customer.id) as customerCount']);
        query.where('DATE(customer.createdDate) = :todaydate', { todaydate });
        return query.getRawOne();
    }

    public async dashboardCustomerCount(duration: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Customer, 'Customer');
        query.where('Customer.deleteFlag = 0');
        if (duration === 1 && duration) {
            query.andWhere('DATE(Customer.created_date) = DATE(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('WEEK(Customer.created_date) = WEEK(NOW()) AND MONTH(Customer.created_date) = MONTH(NOW()) AND YEAR(Customer.created_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(Customer.created_date) = MONTH(NOW()) AND YEAR(Customer.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(Customer.created_date) = YEAR(NOW())');
        }
        return query.getCount();
    }
}
