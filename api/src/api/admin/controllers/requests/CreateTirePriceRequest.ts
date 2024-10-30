/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateTirePriceRequest {
    public hasTirePrice: number;

    @IsNotEmpty()
    public quantity: number;

    @IsNotEmpty()
    public price: string;

    @IsNotEmpty()
    public productId: number;
}
