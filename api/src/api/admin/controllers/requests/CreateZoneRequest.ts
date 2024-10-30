/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
