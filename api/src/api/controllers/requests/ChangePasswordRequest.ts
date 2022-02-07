/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MinLength, MaxLength } from 'class-validator';

export class ChangePassword {

    @MaxLength(15, {
        message: 'Old Password is maximum 15 character',
    })
    @MinLength(5, {
        message: 'Old Password is minimum 5 character',
    })
    @IsNotEmpty()
    public oldPassword: string;

    @MaxLength(15, {
        message: 'New Password is maximum 15 character',
    })
    @MinLength(4, {
        message: 'New Password is minimum 4 character',
    })
    @IsNotEmpty({
        message: 'New Password is required',
    })
    public newPassword: string;
}
