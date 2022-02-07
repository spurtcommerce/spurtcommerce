/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class UpdateProductRequest {

    @IsNotEmpty()
    public productId: number;

    @IsNotEmpty()
    public productName: string;

    // @IsNotEmpty()
    public productDescription: string;

    @IsNotEmpty()
    public sku: string;

    // @IsNotEmpty()
    public upc: string;

    // @IsNotEmpty()
    public metaTagTitle: string;

    @IsNotEmpty()
    public categoryId: string;

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public model: number;

    @IsNotEmpty()
    public price: string;

    // @IsNotEmpty()
    public location: string;

    public outOfStockStatus: number;

    public requiredShipping: number;

    public dateAvailable: string;

    @IsNotEmpty()
    public condition: number;

    @IsNotEmpty()
    public status: number;

    public sortOrder: number;

    public defaultImage: number;

    }
