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
import { ServiceToCategory } from '../models/ServiceToCategory';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class ServiceToCategoryRepository {
    public repository: Repository<ServiceToCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(ServiceToCategory);
    }
}
