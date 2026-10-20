/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

/* tslint:disable:max-classes-per-file */

import 'reflect-metadata';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateVariantValueTranslation {

    @IsNotEmpty()
    public languageId: number;

    @IsNotEmpty()
    public value: string;
}

class CreateVariantValue {

    @IsNotEmpty()
    public variantValueId: number;

    @Type(() => CreateVariantValueTranslation)
    @ValidateNested()
    public variantValueTranslation: CreateVariantValueTranslation[];
}

class CreateVariantTranslation {

    @IsNotEmpty()
    public languageId: number;

    @IsNotEmpty()
    public name: string;

}

export class CreateVariantTranslationRequest {

    @IsNotEmpty()
    @Type(() => CreateVariantTranslation)
    @ValidateNested()
    public variantTranslation: CreateVariantTranslation[];

    @Type(() => CreateVariantValue)
    @ValidateNested()
    public variantValues: CreateVariantValue[];
}
