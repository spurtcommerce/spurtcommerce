/* tslint:disable:max-classes-per-file */

import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

class ProductSpecificationAttributeGroupAttributeAttributeValue {

    @IsNotEmpty()
    public attributeValueId: number;

    public value: string;
}

class ProductSpecificationAttributeGroupAttribute {

    @IsNotEmpty()
    public attributeId: number;

    @IsNotEmpty()
    @IsArray()
    @Type(() => ProductSpecificationAttributeGroupAttributeAttributeValue)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public attributeValues: ProductSpecificationAttributeGroupAttributeAttributeValue[];
}

class ProductSpecificationAttributeGroup {

    @IsNotEmpty()
    @IsArray()
    @Type(() => ProductSpecificationAttributeGroupAttribute)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public attributes: ProductSpecificationAttributeGroupAttribute[];

}

class ProductSpecification {

    @IsNotEmpty()
    public specificationId: number;

    @IsNotEmpty()
    @IsArray()
    @Type(() => ProductSpecificationAttributeGroup)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public attributeGroups: ProductSpecificationAttributeGroup[];
}

export class CreateProductSpecificationRequest {

    @IsNotEmpty()
    public productId: number;

    @IsNotEmpty()
    @IsArray()
    @Type(() => ProductSpecification)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public productSpecifications: ProductSpecification[];
}
