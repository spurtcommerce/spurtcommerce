/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, IsEmail , IsString } from 'class-validator';
export class CustomerCheckoutRequest {
    @IsNotEmpty({
        message: 'Shipping First name is required',
    })
    public shippingFirstName: string;

    public shippingLastName: string;
    @IsNotEmpty({
        message: 'Shipping Address 1 is required',
    })
    public shippingAddress_1: string;
    @IsNotEmpty({
        message: 'Shipping City is required',
    })
    @IsString()
    public shippingCity: string;

    @IsNotEmpty({
        message: 'Shipping Post Code is required',
    })
    public shippingPostCode: number;
    @IsNotEmpty({
        message: 'Shipping Country is required',
    })
    @IsString()
    public shippingCountry: string;
    @IsNotEmpty({
        message: 'Shipping Zone is required',
    })
    public shippingZone: string;

    @IsNotEmpty({
        message: 'Phone Number is required',
    })
    public phoneNumber: number;

    @IsEmail()
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;
    public shippingAddress_2: string;
    public shippingCompany: string;
    public shippingAddressFormat: string;

    @IsNotEmpty()
    public productDetails: [];
}
