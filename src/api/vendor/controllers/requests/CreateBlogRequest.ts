/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBlog {

    @MaxLength(255, {
        message: 'title should be maximum 255 characters',
    })
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty({
        message: 'categoryId is required',
    })
    public categoryId: number;

    @IsNotEmpty({
        message: 'description is required',
    })
    public description: string;

    public image: string;

    @IsNotEmpty()
    public status: number;

    public relatedBlogId: string;

    public blogSlug: string;
}
