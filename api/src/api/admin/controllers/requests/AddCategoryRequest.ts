/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, Max, MaxLength } from 'class-validator';
export class AddCategory {

    @MaxLength(255, {
        message: 'Category name should be maximum 255 character',
    })
    @IsNotEmpty()
    public name: string;

    public image: string;

    public parentInt: number;

    @Max(9999, {
        message: 'Maximum length of sortOrder should be 4',
    })
    @IsNotEmpty()
    public sortOrder: number;

    @IsNotEmpty()
    public status: number;

    public categorySlug: string;

    public categoryDescription: string;
}
