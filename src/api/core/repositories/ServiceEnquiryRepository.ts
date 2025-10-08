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
import { ServiceEnquiry } from '../models/ServiceEnquiry';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class ServiceEnquiryRepository {
    public repository: Repository<ServiceEnquiry>;
    constructor() {
        this.repository = getDataSource().getRepository(ServiceEnquiry);
    }
}
