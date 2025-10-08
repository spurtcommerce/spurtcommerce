/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { PriceUpdateFileLog } from '../models/PriceUpdateFileLog';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class PriceUpdateFileLogRepository {
    public repository: Repository<PriceUpdateFileLog>;
    constructor() {
        this.repository = getDataSource().getRepository(PriceUpdateFileLog);
    }
}
