/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBanner {
    @MaxLength(255, {
        message: 'title should be maximum 255 characters',
    })
    @IsNotEmpty()
    public title: string;

    public content: string;

    public link: string;

    public position: string;
    @IsNotEmpty()
    public status: number;

    public linkType: number;
    @IsNotEmpty()
    public bannerImage: any[];
}
