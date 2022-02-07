/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MaxLength, IsEmail } from 'class-validator';

export class EditProfileRequest {

    @MaxLength(30, {
        message: 'username is maximum 30 character',
    })
    @IsNotEmpty()
    public username: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    public avatar: string;

    @MaxLength(10, {
        message: 'phonenumber is maximum 10 character',
    })
    public phoneNumber: string;

   public address: string;

}
