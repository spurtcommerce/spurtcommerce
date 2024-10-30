/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, Max} from 'class-validator';

export interface Image {
    image?: string;
    containerName?: string;
    defaultImage?: number;
}

export class CreateVendorProductRequest {

    @IsNotEmpty()
    public productName: string;

    public productDescription: string;

    @IsNotEmpty()
    public sku: string;

    public upc: string;

    public hsn: string;

    public productSlug: string;

    public quantity: number;

    @IsNotEmpty()
    public categoryId: string;

    @IsNotEmpty()
    public image: string;

    public price: number;

    public outOfStockStatus: number;

    public requiredShipping: number;

    public dateAvailable: string;

    @Max(9999, {
        message: 'Maximum length of sortOrder should be 4',
    })
    public sortOrder: number;

    public defaultImage: number;

    public relatedProductId: string;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public taxType: number;

    public others: number;

    public vendorProductCommission: number;

    public productOptions: [];

    public productDiscount: [];

    public productSpecial: [];

    @IsNotEmpty()
    public vendorId: number;
}
