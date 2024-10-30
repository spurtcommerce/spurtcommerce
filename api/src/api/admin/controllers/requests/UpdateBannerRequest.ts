/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateBanner {

    @IsNotEmpty()
    public bannerId: number;
    @MaxLength(255, {
        message: 'title should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'title is required',
    })
    public title: string;

    public content: string;

    @MaxLength(255, {
        message: 'link should be maximum 255 character',
    })
    public link: string;

    public position: number;
    @IsNotEmpty()
    public status: number;

    public linkType: number;

    public bannerImage: any[];

}
