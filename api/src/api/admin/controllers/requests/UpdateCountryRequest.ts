/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty , MaxLength } from 'class-validator';

export class UpdateCountry {

    @IsNotEmpty()
    public countryId: number;

    @MaxLength(30, {
        message: 'name is maximum 30 character',
    })
    @IsNotEmpty()
    public name: string;

    @MaxLength(2, {
        message: 'isoCode2 is maximum 2 character',
    })
    public isoCode2: string;

    @MaxLength(3, {
        message: 'isoCode3 is maximum 3 character',
    })
    public isoCode3: string;

    @IsNotEmpty()
    public postcodeRequired: number;

    public status: number;
}
