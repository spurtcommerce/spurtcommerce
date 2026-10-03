/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsInt, IsNotEmpty, IsOptional, MaxLength, ValidateIf } from 'class-validator';

export class CustomerAddress {

    @MaxLength(128, {
        message: 'address1 should be maximum 128 character',
    })
    @IsNotEmpty({
        message: 'address1 is required',
    })
    public address1: string;

    @MaxLength(128, {
        message: 'address2 should be maximum 128 character',
    })
    public address2: string;

    @MaxLength(128, {
        message: 'city should be maximum 128 character',
    })
    @IsNotEmpty({
        message: 'city is required',
    })
    public city: string;

    @IsOptional()
    public state: string;

    @MaxLength(6, {
        message: 'postcode should be maximum 6 character',
    })
    @ValidateIf(o => o.postcode !== '')
    public postcode: string;

    @IsInt()
    public countryId: number;

    public company: string;

    @IsNotEmpty({
        message: 'addressType is required',
    })
    @IsInt()
    public addressType: number;

    public zoneId: number;

    public landmark: string;

    public phoneNumber: number;

    @IsNotEmpty()
    public isDefault: number;

    public firstName: string;

    public lastName: string;
}
