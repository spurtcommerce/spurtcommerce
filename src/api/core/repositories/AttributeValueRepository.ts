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
import { AttributeValue } from '../models/AttributeValue';

@Service()
export class AttributeValueRepository {
    public repository: Repository<AttributeValue>;
    constructor() {
        this.repository = getDataSource().getRepository(AttributeValue);
    }
}
