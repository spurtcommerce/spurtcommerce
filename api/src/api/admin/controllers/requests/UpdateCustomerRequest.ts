/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, IsEmail, MaxLength, MinLength} from 'class-validator';
export class UpdateCustomer {

    @IsNotEmpty()
    public customerGroupId: number;
    @MaxLength(96, {
        message: 'user should be maximum 96 characters',
    })
    @IsNotEmpty()
    public username: string;
    @MaxLength(96, {
        message: 'email should be maximum 96 characters',
    })
    @IsEmail()
    public email: string;
    @MaxLength(15, {
        message: 'mobile number should be maximum 15 characters',
    })
    @IsNotEmpty({
        message: 'mobile number is required',
    })
    @MinLength(6, {
        message: 'mobile number should be minimum 6 character',
    })
    public mobileNumber: number;

    public password: string;

    public confirmPassword: string;

    public avatar: string;

    public newsletter: number;

    public realName: string;

    public customerNo: string;

    @IsNotEmpty()
    public mailStatus: number;
    @IsNotEmpty({
        message: 'mobile number is required',
    })
    public status: number;

    @IsNotEmpty()
    public siteId: number;

    public lastName: string;
}
