/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MaxLength } from 'class-validator';

export class CreateZone {

    @IsNotEmpty()
    public countryId: number;

    @MaxLength(30, {
        message: 'code is maximum 30 character',
    })
    @IsNotEmpty()
    public code: string;

    @MaxLength(30, {
        message: 'name is maximum 30 character',
    })
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public status: number;
}
