/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsInt, IsNotEmpty, Max, MaxLength} from 'class-validator';
export class QuotationRequest {
    @Max(999999999, {
        message: 'quantity should be maximum 9 digit',
    })
    @IsNotEmpty()
    @IsInt()
    public quantity: number;

    @IsNotEmpty()
    public productId: number;

    public quantityUnit: string;
    @MaxLength(255, {
        message: 'orderValue should be maximum 255 character',
    })
    @IsNotEmpty()
    public orderValue: string;

    public purpose: number;

    public comments: string;
}
