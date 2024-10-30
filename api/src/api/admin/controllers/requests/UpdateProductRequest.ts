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

export class UpdateProductRequest {

    @IsNotEmpty()
    public productId: number;

    @IsNotEmpty()
    @MaxLength(255, {
        message: 'productName should be maximum 60 character',
    })
    public productName: string;
    // @IsNotEmpty()
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
    public categoryId: [];

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public price: number;

    // @IsNotEmpty()
    public location: string;

    public outOfStockStatus: number;

    public requiredShipping: number;

    public dateAvailable: string;

    @IsNotEmpty()
    public status: number;

    @Max(9999, {
        message: 'Maximum length of sortOrder should be 4',
    })
    public sortOrder: number;

    public quotationAvailable: number;

    public defaultImage: number;

    @IsNotEmpty()
    public quantity: number;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public taxType: number;

    public others: number;

    public relatedProductId: string;

    public height: string;

    public weight: string;

    public width: string;

    public length: string;

    public hasTirePrice: number;

    public pincodeBasedDelivery: number;

    public productDiscount: [];

    public productSpecial: [];

    public tirePrices: [];

    public productAttribute: [];

    public productVideo: Video;

}
