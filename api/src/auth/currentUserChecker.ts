/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';

import { User } from '../api/core/models/User';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        return action.request.user;
    };
}
