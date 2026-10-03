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
import { ServiceEnquiry } from '../models/ServiceEnquiry';

@Service()
export class ServiceEnquiryRepository {
    public repository: Repository<ServiceEnquiry>;
    constructor() {
        this.repository = getDataSource().getRepository(ServiceEnquiry);
    }
}
