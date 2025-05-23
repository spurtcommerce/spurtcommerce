/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

// Validation file for creating new service
import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';
export class CreateService {
    @IsNotEmpty()
    public serviceCategoryId: string;
    @MaxLength(255, {
        message: 'title should be maximum 255 characters',
    })
    @IsNotEmpty()
    public title: string;

    public description: string;
    @MaxLength(15, {
        message: 'mobile should be maximum 15 characters',
    })
    public mobile: number;

    public price: number;

    public image: string;
    @MaxLength(70, {
        message: 'metatagTitle should be maximum 70 characters',
    })
    public metaTagTitle: string;
    @MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 character',
    })
    public metaTagDescription: string;
    @MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    })
    public metaTagKeyword: string;

    @IsNotEmpty()
    public status: number;

    public defaultImage: number;

}
