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
import { ServiceCategory } from '../models/ServiceCategory';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class ServiceCategoryRepository {
    public repository: Repository<ServiceCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(ServiceCategory);
    }
}
