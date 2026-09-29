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
import { StockLog } from '../models/StockLog';

@Service()
export class StockLogRepository {
  public repository: Repository<StockLog>;
  constructor() {
    this.repository = getDataSource().getRepository(StockLog);
  }
}
