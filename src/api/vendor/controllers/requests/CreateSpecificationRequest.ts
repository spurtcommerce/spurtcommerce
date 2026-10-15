/* tslint:disable:max-classes-per-file */

/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

class AttributeGroups {

    public attributeGroupId: number;
    public attributeIds: number[];
}

export class CreateSpecification {

    @IsNotEmpty({
        message: 'Attribute name is required',
    })
    @MaxLength(255, {
        message: 'attribute name should be maximum 255 characters',
    })
    public name: string;

    public status: number;

    public attributeGroup: AttributeGroups[];

    public deleteAttributeGroupIds: number[];

    public deleteAttributes: AttributeGroups[];

}
