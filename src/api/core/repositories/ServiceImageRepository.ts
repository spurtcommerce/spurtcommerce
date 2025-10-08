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
import { ServiceImage } from '../models/ServiceImage';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class ServiceImageRepository {
    public repository: Repository<ServiceImage>;
    constructor() {
        this.repository = getDataSource().getRepository(ServiceImage);
    }
}
