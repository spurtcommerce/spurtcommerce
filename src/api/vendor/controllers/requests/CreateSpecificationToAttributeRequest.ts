/* tslint:disable:max-classes-per-file */
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SpecificationAttributeGroup {
    @IsNotEmpty()
    public specificationId: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    public attributeGroupIds: number[];
}

export class CreateSpecificationToAttributeGroup {

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SpecificationAttributeGroup)
    @ArrayMinSize(1)
    public specificationAttributeGroups: SpecificationAttributeGroup[];

}
