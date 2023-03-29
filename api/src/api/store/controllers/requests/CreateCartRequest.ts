/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';
export class CreateCartRequest {
    @IsNotEmpty({
        message: 'productId is required',
    })
    public productId: number;

    public productPrice: number;

    public quantity: number;

    public optionName: string;

    public optionValueName: string;

    public varientName: string;

    public productVarientOptionId: string;

    public skuName: string;

    public type: string;
}
