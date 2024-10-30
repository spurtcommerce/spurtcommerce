/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, Max, MaxLength } from 'class-validator';

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
export class VendorProductRequest {

    @IsNotEmpty()
    @MaxLength(255, {
        message: 'productName should be maximum 255 character',
    })
    public productName: string;

    public productDescription: string;

    @IsNotEmpty()
    @MaxLength(64, {
        message: 'sku should be maximum 64 character',
    })
    public sku: string;

    public upc: string;

    public hsn: string;

    public productSlug: string;

    @IsNotEmpty()
    public quantity: number;

    @IsNotEmpty()
    public categoryId: [];

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public price: number;

    public location: string;

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

    public productDiscount: [];

    public productSpecial: [];

    public tirePrices: [];

    public hasTirePrice: number;

    public productVideo: Video;

    public width: string;

    public height: string;

    public status: number;

    public weight: string;

    public length: string;

    public fileName: string;

    public containerName: string;

    public productHighlights: string;
}
