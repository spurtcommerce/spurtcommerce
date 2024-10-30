/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MinLength, Matches, MaxLength } from 'class-validator';
export class VendorRegisterRequest {
    @IsNotEmpty({
        message: 'firstname is required',
    })
    @MaxLength(32, {
        message: 'firstname should be maximum 32 character',
    })
    public firstName: string;
    // @MaxLength(32, {
    //     message: 'lastname should be maximum 32 character',
    // })
    public lastName: string;

    public contactPersonName: string;

    @MinLength(8, {
        message: 'password must contain minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 or at most 128 characters' })
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    @MaxLength(96, {
        message: 'emailId should be maximum 96 character',
    })
    public emailId: string;

    public phoneNumber: number;

    @IsNotEmpty({
        message: 'Company name is required',
    })
    public companyName: string;

    @IsNotEmpty()
    public otp: number;

    @IsNotEmpty()
    public industryId: number;
}
