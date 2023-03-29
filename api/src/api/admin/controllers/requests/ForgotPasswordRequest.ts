/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
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
