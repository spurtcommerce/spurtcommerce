/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';

import { ServiceCategoryPath } from '../models/ServiceCategoryPath';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class ServiceCategoryPathRepository {
    public repository: Repository<ServiceCategoryPath>;
    constructor() {
        this.repository = getDataSource().getRepository(ServiceCategoryPath);
    }
}
