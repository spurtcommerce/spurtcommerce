/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsInt, IsNotEmpty, IsOptional, MaxLength, ValidateIf } from 'class-validator';

export class CreateAddress {

    @IsNotEmpty()
    public customerId: number;
    @MaxLength(128, {
        message: 'address1 should be maximum 128 characters',
    })
    @IsNotEmpty({
        message: 'address1 is required',
    })
    public address1: string;
    @MaxLength(128, {
        message: 'address2 should be maximum 128 characters',
    })
    public address2: string;

    @MaxLength(128, {
        message: 'city should be maximum 128 characters',
    })
    @IsNotEmpty({
        message: 'city is required',
    })
    public city: string;

    public state: string;

    @MaxLength(10, {
        message: 'postcode should be maximum 6 characters',
    })
    @ValidateIf(o => o.postcode !== '')
    public postcode: number;

    @IsNotEmpty()
    public addressType: number;

    @IsInt()
    public countryId: number;
    @MaxLength(32, {
        message: 'company should be maximum 32 character',
    })
    public company: string;

    public zoneId: number;

    @IsOptional()
    public firstName: string;

    public lastName: string;

    @IsOptional()
    public phoneNumber: number;

    public landmark: string;
}
