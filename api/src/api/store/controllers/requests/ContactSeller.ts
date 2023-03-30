/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class ContactSeller {

    @MaxLength(255, {
        message: 'name should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;
    @MaxLength(96, {
        message: 'Email Id should be maximum 96 character',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public email: string;
    @MinLength(6, {
        message: 'mobile number should be minimum 6 character',
    })
    @MaxLength(15, {
        message: 'mobile number should be maximum 15 character',
    })
    public mobileNumber: string;
    @IsNotEmpty({
        message: 'country is required',
    })
    public country: string;
    public requirement: string;
}
