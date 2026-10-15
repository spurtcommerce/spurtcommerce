/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAttributeGroup {

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

    public attributeIds: number[];

    public deleteAttributeIds: number[];

}
