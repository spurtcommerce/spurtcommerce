/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { MinLength, MaxLength , IsEmail} from 'class-validator';
export class ForgotPassword {
    @MaxLength(60, {
        message: 'Name is maximum 30 character',
    })
    @MinLength(4, {
        message: 'Name is minimum 4 character',
    })
    @IsEmail()
    public email: string;
}
