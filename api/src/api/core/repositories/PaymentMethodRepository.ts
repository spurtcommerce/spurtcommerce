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
import { PaymentMethod } from '../models/PaymentMethod';

@Service()
export class PaymentMethodRepository {
  public repository: Repository<PaymentMethod>;
  constructor() {
    this.repository = getDataSource().getRepository(PaymentMethod);
  }
}
