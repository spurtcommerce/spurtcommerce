/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../models/Customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>  {

    public async TodayCustomerCount(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Customer, 'customer');
        query.select([  'COUNT(customer.id) as customerCount']);
        query.where('DATE(customer.createdDate) = :todaydate', {todaydate});
        console.log(query.getQuery());
        return query.getRawOne();
    }
}
