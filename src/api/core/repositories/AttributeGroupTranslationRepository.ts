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
import { AttributeGroupTranslation } from '../models/AttributeGroupTranslation';

@Service()
export class AttributeGroupTranslationRepository {
    public repository: Repository<AttributeGroupTranslation>;
    constructor() {
        this.repository = getDataSource().getRepository(AttributeGroupTranslation);
    }
}
