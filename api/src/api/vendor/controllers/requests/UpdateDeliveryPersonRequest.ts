/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, IsEmail} from 'class-validator';

export class UpdateDeliveryPersonRequest {

    @IsNotEmpty()
    public firstName: string;

    public lastName: string;

    public location: string;

    @IsEmail()
    public emailId: string;

    public password: string;

    public confirmPassword: string;

    public mobileNumber: string;

    public allLocation: number;

    public image: string;

    @IsNotEmpty()
    public status: number;
}
