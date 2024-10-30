/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export class UpdatePage {

    @IsNotEmpty()
    public pageId: number;
    @MaxLength(255, {
        message: 'title should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'title is required',
    })
    public title: string;

    @IsNotEmpty({
        message: 'content is required',
    })
    public content: string;

    @IsNotEmpty()
    public active: number;

    @IsNotEmpty({
        message: 'pageGroupId is required',
    })
    public pageGroupId: number;

    public pageSlug: string;
}
