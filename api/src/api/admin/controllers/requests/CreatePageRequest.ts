/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export class CreatePage {

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
    @MaxLength(70, {
        message: 'metatagTitle should be maximum 70 character',
    })
    public metaTagTitle: string;
    @MaxLength(160, {
        message: 'metatagContent should be maximum 160 character',
    })
    public metaTagContent: string;
    @MaxLength(255, {
        message: 'metatagKeyword should be maximum 255 character',
    })
    public metaTagKeyword: string;
    @IsNotEmpty({
        message: 'pageGroupId is required',
    })
    public pageGroupId: number;

    public pageSlug: string;
}
