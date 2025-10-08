/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Jobs } from '../models/Jobs';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class JobsRepository {
    public repository: Repository<Jobs>;
    constructor() {
        this.repository = getDataSource().getRepository(Jobs);
    }
}
