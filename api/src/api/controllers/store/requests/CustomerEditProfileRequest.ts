/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, IsEmail, IsOptional, MinLength} from 'class-validator';

export class CustomerEditProfileRequest {
    // @IsString()
    @IsNotEmpty({
        message: 'First name is required',
    })
    public firstName: string;

    public lastName: string;

    @IsOptional()
    @MinLength(5, {
        message: 'Old Password is minimum 5 character',
    })
    @IsNotEmpty()
    public password: string;

    @IsEmail({}, {
        message: 'Please provide username as emailId',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    @IsOptional()
    @IsNotEmpty()
    public phoneNumber: number;

    public image: string;
}
