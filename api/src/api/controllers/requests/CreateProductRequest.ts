/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class AddProductRequest {

    @IsNotEmpty()
    public productName: string;

    // @IsNotEmpty()
    public productDescription: string;

    @IsNotEmpty()
    public sku: string;

    public upc: string;

    public metaTagTitle: string;

    @IsNotEmpty()
    public categoryId: string;

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public model: number;

    @IsNotEmpty()
    public price: string;

    public location: string;

     @IsNotEmpty()
    public outOfStockStatus: number;

    // @IsNotEmpty()
    public requiredShipping: number;

    // @IsNotEmpty()
    public dateAvailable: string;

    @IsNotEmpty()
    public condition: number;

    @IsNotEmpty()
    public status: number;

    // @IsNotEmpty()
    public sortOrder: number;

    public defaultImage: number;

   }
