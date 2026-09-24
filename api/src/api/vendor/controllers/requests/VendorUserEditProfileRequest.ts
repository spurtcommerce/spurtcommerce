/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class VendorUserEditProfileRequest {

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

    public avatarFileName: string;

    public phoneNumber: string;

    public address: string;

    @IsNotEmpty()
    public personalizedSettings: Personalized;
}

interface Personalized {
    defaultLanguage: number;
    dateFormat: string;
    timeFormat: string;
    timeZone: string;
}
