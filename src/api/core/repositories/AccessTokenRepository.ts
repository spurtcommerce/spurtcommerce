/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { AccessToken } from '../models/AccessTokenModel';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class AccessTokenRepository {
    public repository: Repository<AccessToken>;
    constructor() {
        this.repository = getDataSource().getRepository(AccessToken);
    }
}
