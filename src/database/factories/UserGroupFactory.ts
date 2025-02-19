/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2020 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { UserGroup } from '../../api/core/models/UserGroup';
define(UserGroup, (faker: typeof Faker, settings: { role: string []}) => {
    const usergroup = new UserGroup();
    return usergroup;
});
