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
import { OrderStatus } from '../models/OrderStatus';

@Service()
export class OrderStatusRepository {
  public repository: Repository<OrderStatus>;
  constructor() {
    this.repository = getDataSource().getRepository(OrderStatus);
  }
}
