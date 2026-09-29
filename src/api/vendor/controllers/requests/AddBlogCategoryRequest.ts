/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';
export class AddBlogCategory {

    @MaxLength(255, {
        message: 'Category name should be maximum 255 character',
    })
    @IsNotEmpty()
    public name: string;
}
