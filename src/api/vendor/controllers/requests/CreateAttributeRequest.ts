/* tslint:disable:max-classes-per-file */
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

class AttributeValue {

    public id: number;

    @IsNotEmpty()
    public value: string;
}
export class CreateAttribute {

    @IsNotEmpty({
        message: 'Attribute name is required',
    })
    @MaxLength(255, {
        message: 'attribute name should be maximum 255 characters',
    })
    public name: string;

    @IsNotEmpty({
        message: 'sortOrder is required',
    })
    public sortOrder: number;

    @IsNotEmpty({
        message: 'type is required',
    })
    public type: string;

    public isMandatory: number;

    public useAsFilter: number;

    public isActive: number;

    public description: string;

    public label: string;

    public sectionName: string;

    public defaultValue: string;

    @IsNotEmpty()
    @IsArray()
    @Type(() => AttributeValue)
    @ArrayMinSize(1)
    public attributeValues: AttributeValue[];

    @IsOptional()
    @IsArray()
    public deleteAttributeValueIds: number[];

}
