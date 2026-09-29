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
import { SiteFilterSectionItem } from '../models/SiteFilterSectionItem';

@Service()
export class SiteFilterSectionItemRepository {
    public repository: Repository<SiteFilterSectionItem>;
    constructor() {
        this.repository = getDataSource().getRepository(SiteFilterSectionItem);
    }
}
