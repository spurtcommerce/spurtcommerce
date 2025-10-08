/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { CustomerWishlist } from '../models/CustomerWishlist';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class CustomerWishlistRepository {
    public repository: Repository<CustomerWishlist>;
    constructor() {
        this.repository = getDataSource().getRepository(CustomerWishlist);
    }
}
