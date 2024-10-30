/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MaxLength } from 'class-validator';

export class CreateCountry {

    @MaxLength(30, {
        message: 'name should be maximum 30 characters',
    })
    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;

    @MaxLength(2, {
        message: 'isoCode2 should be maximum 2 characters',
    })
    @IsNotEmpty({
        message: 'isoCode2 is required',
    })
    public isoCode2: string;

    @MaxLength(3, {
        message: 'isoCode3 should be maximum 3 characters',
    })
    @IsNotEmpty({
        message: 'isoCode3 is required',
    })
    public isoCode3: string;
    @IsNotEmpty()
    public postcodeRequired: number;
    @IsNotEmpty()
    public status: number;

}
