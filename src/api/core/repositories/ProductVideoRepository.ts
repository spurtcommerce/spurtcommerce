/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { ProductVideo } from '../models/ProductVideo';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class ProductVideoRepository {
    public repository: Repository<ProductVideo>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductVideo);
    }
}
