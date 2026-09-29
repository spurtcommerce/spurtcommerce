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
import { ProductToCategory } from '../models/ProductToCategory';

@Service()
export class ProductToCategoryRepository {
    public repository: Repository<ProductToCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductToCategory);
    }
}
