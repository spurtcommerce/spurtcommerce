/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsNotEmpty, MinLength, Matches, MaxLength} from 'class-validator';
export class CustomerRegisterRequest {
    @IsNotEmpty({
        message: 'firstname is required',
    })
    @MaxLength(32, {
        message: 'firstname should be maximum 32 character',
    })
    public name: string;

    public lastName: string;

    @MinLength(8, {
        message: 'password must contain minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, {message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 or at most 128 characters'})
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @IsNotEmpty()
    public confirmPassword: string;
    @MaxLength(96, {
        message: 'emailId should be maximum 96 character',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;
    public phoneNumber: number;
}
