/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { StockStatus } from '../models/stockStatus';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class StockStatusRepository {
    public repository: Repository<StockStatus>;
    constructor() {
        this.repository = getDataSource().getRepository(StockStatus);
    }
}
