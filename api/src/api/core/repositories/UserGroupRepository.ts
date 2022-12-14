/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { UserGroup } from '../models/UserGroup';

@EntityRepository(UserGroup)
export class UserGroupRepository extends Repository<UserGroup>  {

}
