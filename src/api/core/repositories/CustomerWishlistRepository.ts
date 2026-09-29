/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { CustomerWishlist } from '../models/CustomerWishlist';

@Service()
export class CustomerWishlistRepository {
  public repository: Repository<CustomerWishlist>;
  constructor() {
    this.repository = getDataSource().getRepository(CustomerWishlist);
  }
}
