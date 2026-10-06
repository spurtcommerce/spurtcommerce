/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
/* tslint:disable:max-classes-per-file */

import 'reflect-metadata';
import { IsNotEmpty, IsArray, ValidateNested, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDetail {
    @IsNotEmpty()
    @IsNumber()
    public productId: number;

    @IsOptional()
    @IsNumber()
    public productPrice: number;

    @IsOptional()
    @IsNumber()
    public tirePrice: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    public quantity: number;

    @IsNotEmpty()
    @IsNumber()
    public skuId: number;

    @IsOptional()
    public type: string;
}

export class CreateCartRequest {

    public optionName: string;

    public optionValueName: string;

    public varientName: string;

    public productVarientOptionId: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDetail)
    public cartDetails: ProductDetail[];
}
