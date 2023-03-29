/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty , MaxLength } from 'class-validator';

export class CreateZone {

    @IsNotEmpty()
    public countryId: number;

    @MaxLength(30, {
        message: 'code should be maximum 30 character',
    })
    @IsNotEmpty()
    public code: string;

    @MaxLength(128, {
        message: 'name should be maximum 128 character',
    })
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public status: number;
}
