/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsNotEmpty , IsString, MaxLength, MinLength, Validate, IsEmail, IsNumber } from 'class-validator';
import {EscapeValidation} from './EscapeValidation';
export class CustomerCheckoutRequest {
    @MaxLength(32, {
        message: 'shipping first name should be maximum 32 character',
    })
    @MinLength(1, {
        message: 'shipping first name should be minimum 1 character',
    })
    @Validate(EscapeValidation, {
        message: 'Invalid input for the name',
    })
    @IsNotEmpty({
        message: 'Shipping First name is required',
    })
    public shippingFirstName: string;
    @MaxLength(32, {
        message: 'shipping last name should be maximum 32 character',
    })
    public shippingLastName: string;
    @IsNotEmpty({
        message: 'Shipping Address 1 is required',
    })
    @MaxLength(128, {
        message: 'shipping address 1  should be maximum 128 character',
    })
    public shippingAddress_1: string;
    @IsNotEmpty({
        message: 'Shipping City is required',
    })
    @MaxLength(128, {
        message: 'shipping city should be maximum 128 character',
    })
    @IsString()
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
    @IsEmail({}, { message: 'Invalid email' })
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
    @IsNumber()
    public shippingCountryId: number;
    public shippingAddressFormat: string;

    public password: string;
    public paymentMethod: number;
    @MaxLength(255, {
        message: 'coupon code should be maximum 32 character',
    })
    public couponCode: string;
    public couponDiscountAmount: number;
    public couponData: string;
    @IsNotEmpty()
    public productDetails: [];
    public isMobile: boolean;
    public taxNumber: string;
    @MaxLength(32, {
        message: 'payment first name should be maximum 32 character',
    })
    public paymentFirstName: string;
    @MaxLength(32, {
        message: 'payment last name should be maximum 32 character',
    })
    public paymentLastName: string;
    @MaxLength(128, {
        message: 'payment address 1  should be maximum 128 character',
    })
    public paymentAddress_1: string;
    @MaxLength(128, {
        message: 'payment city  should be maximum 128 character',
    })
    public paymentCity: string;
    @MaxLength(10, {
        message: 'payment postcode should be maximum 10 character',
    })
    public paymentPostCode: number;
    @MaxLength(128, {
        message: 'payment zone should be maximum 128 character',
    })
    public paymentZone: string;
    @MaxLength(128, {
        message: 'paymentAddress2 should be maximum 128 character',
    })
    public paymentAddress_2: string;
    @MaxLength(32, {
        message: 'paymentCompany should be maximum 32 character',
    })
    public paymentCompany: string;
    @IsNumber()
    public paymentCountryId: number;
    }
