/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { OrderStatusToFullfillment } from '../models/OrderStatusToFullfillment';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class OrderStatusToFullfillmentRepository {
     public repository: Repository<OrderStatusToFullfillment>;
  constructor() {
    this.repository = getDataSource().getRepository(OrderStatusToFullfillment);
  }
}
