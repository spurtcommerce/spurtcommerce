/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Sku } from '../models/SkuModel';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class SkuRepository {
    public repository: Repository<Sku>;
    constructor() {
        this.repository = getDataSource().getRepository(Sku);
    }
}
