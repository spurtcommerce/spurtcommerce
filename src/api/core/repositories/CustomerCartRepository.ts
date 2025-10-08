/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { CustomerCart } from '../models/CustomerCart';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class CustomerCartRepository {
    public repository: Repository<CustomerCart>;
    constructor() {
        this.repository = getDataSource().getRepository(CustomerCart);
    }
}
