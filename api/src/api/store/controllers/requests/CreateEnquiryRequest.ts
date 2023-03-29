/*
 * spurtcommerce API
 * version 4.8.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';

export class EnquiryRequest {

    @IsNotEmpty()
    public serviceId: number;
    @MaxLength(32, {
        message: 'name should be maximum 32 character',
    })
    @MinLength(3, {
        message: 'name should be minimum 3 character',
    })
    @IsNotEmpty()
    public name: string;
    @MaxLength(96, {
        message: 'email should be maximum 96 character',
    })
    @MinLength(3, {
        message: 'email should be minimum 3 character',
    })
    @IsEmail()
    public email: string;
    @MaxLength(15, {
        message: 'mobile number should be maximun 15 digit',
    })
    @MinLength(10, {
        message: 'mobile number should be minimum 10 digit',
    })
    @IsNotEmpty()
    public mobile: number;

    public comments: string;

}
