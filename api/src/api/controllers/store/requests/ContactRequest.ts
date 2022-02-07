/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, IsEmail, MinLength} from 'class-validator';
export class ContactRequest {
    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;
    @IsEmail({}, {
        message: 'Please provide a emailId',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public email: string;
    @IsNotEmpty({
        message: 'Phone Number is required',
    })
    public phoneNumber: string;

    @MinLength(6, {
        message: 'Message is minimum 6 character',
    })
    @IsNotEmpty({
        message: 'Message is required',
    })
    public message: string;
}
