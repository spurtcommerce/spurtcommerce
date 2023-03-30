/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class CustomerBackorderRequest {
    @MaxLength(32, {
        message: 'shipping first name should be maximum 32 character',
    })
    @MinLength(1, {
        message: 'shipping first name should be minimum 1 character',
    })
    @IsNotEmpty({
        message: 'Shipping First name is required',
    })
    public shippingFirstName: string;
    @MaxLength(32, {
        message: 'shipping last name should be maximum 32 character',
    })
    public shippingLastName: string;
    @MaxLength(128, {
        message: 'shipping address 1  should be maximum 128 character',
    })
    public shippingAddress_1: string;
    @MaxLength(128, {
        message: 'shipping city should be maximum 128 character',
    })
    @IsNotEmpty({
        message: 'Shipping City is required',
    })
    public shippingCity: string;
    @MaxLength(10, {
        message: 'shipping postcode should be maximum 10 character',
    })
    @IsNotEmpty({
        message: 'Shipping Post Code is required',
    })
    public shippingPostCode: number;
    @MaxLength(128, {
        message: 'shipping zone should be maximum 128 character',
    })
    @IsNotEmpty({
        message: 'Shipping Zone is required',
    })
    public shippingZone: string;

    @IsNotEmpty({
        message: 'Phone Number is required',
    })
    public phoneNumber: number;
    @MaxLength(96, {
        message: 'emailId should be maximum 96 character',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;
    @MaxLength(128, {
        message: 'shipping address 2  should be maximum 128 character',
    })
    public shippingAddress_2: string;
    @MaxLength(32, {
        message: 'shipping company should be maximum 32 character',
    })
    public shippingCompany: string;
    @IsNotEmpty({
        message: 'Country is required' ,
    })
    public shippingCountryId: number;
    public shippingAddressFormat: string;
    public password: string;
    public paymentMethod: number;
    @IsNotEmpty()
    public productDetails: [];
    public isMobile: boolean;
}
