/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSettlementRequest {
    @IsNotEmpty({
        message: 'title is required',
    })
    @MaxLength(255, {
        message: 'title should be maximum 255 character',
    })
    public title: string;

    @IsNotEmpty()
    public vendorOrderId: [];

}
