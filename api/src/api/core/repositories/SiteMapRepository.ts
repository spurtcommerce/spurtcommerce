/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { SiteMap } from '../../../../src/api/core/models/SiteMapModel';

@Service()
export class SiteMapRepository {
    public repository: Repository<SiteMap>;
    constructor() {
        this.repository = getDataSource().getRepository(SiteMap);
    }
}
