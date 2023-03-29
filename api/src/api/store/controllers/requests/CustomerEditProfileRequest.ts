/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsNotEmpty, MaxLength, ValidateIf, IsEmail} from 'class-validator';

export class CustomerEditProfileRequest {
    @MaxLength(32, {
        message: 'firstname should be maximum 32 character',
    })
    @IsNotEmpty({
        message: 'First name is required',
    })
    public firstName: string;
    @MaxLength(32, {
        message: 'lastname should be maximum 32 character',
    })
    public lastName: string;

    @MaxLength(96, {
        message: 'email should be maximum 96 character',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    @IsEmail({}, { message: 'Invalid email' })
    public emailId: string;

    @ValidateIf(o => o.phoneNumber !== '')
    @MaxLength(15, {
        message: 'Phone Number should be maximum 15 character',
    })
    public phoneNumber: number;

    public image: string;
}
