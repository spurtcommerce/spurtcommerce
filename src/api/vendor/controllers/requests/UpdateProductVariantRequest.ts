/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

/* tslint:disable:max-classes-per-file */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export interface Image {
    image?: string;
    containerName?: string;
    defaultImage?: number;
    sortOrder?: number;
}

export class ProductVarientOption {
    public id: number;

    @IsNotEmpty()
    public varientName: string;

    @IsNotEmpty()
    public price: number;

    @IsNotEmpty()
    public sku: string;

    public isActive: number;

    @IsNotEmpty()
    public quantity: number;

    public variantValueDetails: Array<{ variantId: number, variantValueId: number }>;

    public optionImage: Image[];

    public variantDiscountPrice: [];
    public variantSpecialPrice: [];
}

export class UpdateProductVariantRequest {

    @IsNotEmpty()
    public productId: number;

    public reShuffle: number;

    public productVariants: Array<{ id: number, variantId: number }>;

    public productVariantOptions: ProductVarientOption[];

}
