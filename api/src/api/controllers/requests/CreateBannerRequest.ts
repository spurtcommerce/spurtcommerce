/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateBanner {

    @IsNotEmpty()
    public title: string;

    public content: string;

    @IsNotEmpty()
    public image: string;

    public link: string;

    public position: number;
    @IsNotEmpty()
    public status: number;
}
