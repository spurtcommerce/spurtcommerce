/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { StockStatus } from '../models/stockStatus';

@EntityRepository(StockStatus)
export class StockStatusRepository extends Repository<StockStatus>  {

}
