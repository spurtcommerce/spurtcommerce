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
import { UserGroup } from '../models/UserGroup';

@Service()
export class UserGroupRepository {
    public repository: Repository<UserGroup>;
    constructor() {
        this.repository = getDataSource().getRepository(UserGroup);
    }
}
