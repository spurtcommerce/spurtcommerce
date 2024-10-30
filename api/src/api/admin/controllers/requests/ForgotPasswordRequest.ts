/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { MinLength, MaxLength} from 'class-validator';
export class ForgotPassword {
    @MaxLength(96, {
        message: 'email is maximum 96 character',
    })
    @MinLength(4, {
        message: 'email is minimum 4 character',
    })
    public email: string;
}
