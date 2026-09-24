/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';

export class UpdateCustomerUsersRequest {

    public username: string;

    public password: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public phoneNumber: string;

    public address: string;

    public avatar: any;

    public status: number;

    public customerUserGroupId: number;
}
