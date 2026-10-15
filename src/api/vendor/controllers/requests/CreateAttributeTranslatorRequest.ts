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

class CreateAttributeValueTranslation {
    @IsNotEmpty()
    public languageId: number;

    public value: string;
}

class CreateAttributeValue {

    @IsNotEmpty()
    public id: number;

    @Type(() => CreateAttributeValueTranslation)
    @ValidateNested()
    public attributeValueTranslation: CreateAttributeValueTranslation[];
}

class CreateAttributeTranslation {

    @IsNotEmpty()
    public languageId: number;

    @IsNotEmpty()
    public attributeName: string;

    public attributeInitialValue: string | number;

    public description: string;

    public label: string;

    public placeHolder: string;

}

export class CreateAttributeTranslatorRequest {

    @IsNotEmpty()
    @Type(() => CreateAttributeTranslation)
    @ValidateNested()
    public attributeTranslation: CreateAttributeTranslation[];

    @Type(() => CreateAttributeValue)
    @ValidateNested()
    public attributeValues: CreateAttributeValue[];
}
