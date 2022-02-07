/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MinLength} from 'class-validator';

export class ChangePassword {

    @MinLength(5, {
        message: 'Old Password is minimum 5 character',
    })
    @IsNotEmpty()
    public oldPassword: string;

    @MinLength(5, {
        message: 'New Password is minimum 5 character',
    })
    @IsNotEmpty({
        message: 'New Password is required',
    })
    public newPassword: string;
}
