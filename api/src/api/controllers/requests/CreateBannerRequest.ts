/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
