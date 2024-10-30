/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , Max, MaxLength } from 'class-validator';
export class CreateLanguage {

    @MaxLength(32, {
        message: 'name should be maximum 32 character',
    })
    @IsNotEmpty()
    public name: string;

    @MaxLength(5, {
        message: 'code should be maximum 5 character',
    })
    public code: string;

    public image: string;

    @Max(9999, {
        message: 'Maximum length of sortOrder should be 4',
    })
    public sortOrder: number;

    @IsNotEmpty()
    public status: number;
}
