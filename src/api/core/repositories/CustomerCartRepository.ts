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
import { CustomerCart } from '../models/CustomerCart';

@Service()
export class CustomerCartRepository {
  public repository: Repository<CustomerCart>;
  constructor() {
    this.repository = getDataSource().getRepository(CustomerCart);
  }
}
