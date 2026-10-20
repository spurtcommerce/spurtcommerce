/* tslint:disable:max-classes-per-file */

/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { ArrayMinSize, IsArray, IsNotEmpty, Max, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateVariantValue {

    public id: number;

    @IsNotEmpty()
    public value: string;

    @IsNotEmpty()
    public sortOrder: number;
}

export class UpdateVariant {
    @MaxLength(255, {
        message: 'name should be maximum 255 character',
    })
    @IsNotEmpty()
    public name: string;

    public type: string;

    @Max(9999, {
        message: 'Maximum length of sortOrder should be 4',
    })
    @IsNotEmpty()
    public sortOrder: number;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateVariantValue)
    @ArrayMinSize(1)
    public variantValue: UpdateVariantValue[];

    public deleteVariantValueIds: number[];
}
