/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MaxLength, IsEmail } from 'class-validator';

export class EditProfileRequest {

    @MaxLength(96, {
        message: 'username is maximum 96 character',
    })
    @IsNotEmpty({
        message: 'username is required',
    })
    public username: string;
    @MaxLength(96, {
        message: 'email is maximum 96 character',
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    public avatar: string;

    @MaxLength(15, {
        message: 'phonenumber is maximum 15 character',
    })
    public phoneNumber: string;
    @MaxLength(255, {
        message: 'address is maximum 255 character',
    })
   public address: string;

}
