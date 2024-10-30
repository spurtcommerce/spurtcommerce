/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, Max, MaxLength} from 'class-validator';

export interface Image {
    image?: string;
    containerName?: string;
    defaultImage?: number;
}

export interface Video {
    name?: string;
    path?: string;
    type?: number;
}

export class CreateVendorProductRequest {

    @MaxLength(255, {
        message: 'productName should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'productName is required',
    })
    public productName: string;

    public productDescription: string;

    @MaxLength(64, {
        message: 'sku should be maximum 64 character',
    })
    @IsNotEmpty()
    public sku: string;
    @MaxLength(12, {
        message: 'upc should be maximum 12 characters',
    })
    public upc: string;
    @MaxLength(64, {
        message: 'hsn should be maximum 64 characters',
    })
    public hsn: string;
    @MaxLength(255, {
        message: 'productSlug should be maximum 255 characters',
    })
    public productSlug: string;

    @IsNotEmpty()
    public quantity: number;

    @IsNotEmpty()
    public categoryId: [];

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
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

    public productDiscount: [];

    public productSpecial: [];

    public tirePrices: [];

    public hasTirePrice: number;

    public quotationAvailable: number;

    @IsNotEmpty()
    public vendorId: number;

    public productVideo: Video;

    public height: string;

    public weight: string;

    public width: string;

    public length: string;
}
