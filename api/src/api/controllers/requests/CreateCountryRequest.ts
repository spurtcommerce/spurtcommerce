/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MaxLength } from 'class-validator';

export class CreateCountry {

    @MaxLength(30, {
        message: 'name is maximum 30 character',
    })
    @IsNotEmpty()
    public name: string;

    @MaxLength(2, {
        message: 'isoCode2 is maximum 2 character',
    })
    @IsNotEmpty()
    public isoCode2: string;

    @MaxLength(3, {
        message: 'isoCode3 is maximum 3 character',
    })
    @IsNotEmpty()
    public isoCode3: string;

    @IsNotEmpty()
    public postcodeRequired: number;

    @IsNotEmpty()
    public status: number;

}
