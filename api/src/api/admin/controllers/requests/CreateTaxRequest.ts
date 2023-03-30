/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaxRequest {

    @MaxLength(255, {
        message: 'taxName should be maximum 255 characters',
    })
    public taxName: string;
    public taxPercentage: number;
    @IsNotEmpty()
    public taxStatus: number;
}
