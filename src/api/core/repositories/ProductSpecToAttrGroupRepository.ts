/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { ProductSpecToAttrGroup } from '../models/ProductSpecToAttrGroup';

import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class ProductSpecToAttrGroupRepository {
    public repository: Repository<ProductSpecToAttrGroup>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductSpecToAttrGroup);
    }
}
