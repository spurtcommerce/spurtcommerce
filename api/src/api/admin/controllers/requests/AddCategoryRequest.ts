/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
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
