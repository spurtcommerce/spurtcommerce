/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, Max } from 'class-validator';
export class UpdateCategoryRequest {

    @IsNotEmpty()
    public categoryId: number;

    @IsNotEmpty()
    public name: string;

    public image: string;

    public parentInt: number;

    @Max(9999, {
        message: 'Maximum length of sortOrder should be 4',
    })
    @IsNotEmpty()
    public sortOrder: number;

    public status: number;
    public categorySlug: string;
    public categoryDescription: string;
}
