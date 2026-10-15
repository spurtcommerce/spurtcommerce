/* tslint:disable:max-classes-per-file */

import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

class ProductSpecificationAttributeGroupAttributeAttributeValue {

    public id: number;

    @IsOptional()
    public attributeValueId: number;

    public value: string;
}

class ProductSpecificationAttributeGroupAttribute {

    public id: number;

    @IsOptional()
    public attributeId: number;

    @IsOptional()
    @IsArray()
    @Type(() => ProductSpecificationAttributeGroupAttributeAttributeValue)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public attributeValues: ProductSpecificationAttributeGroupAttributeAttributeValue[];
}

class ProductSpecificationAttributeGroup {

    public id: number;
    @IsOptional()
    @IsArray()
    @Type(() => ProductSpecificationAttributeGroupAttribute)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public attributes: ProductSpecificationAttributeGroupAttribute[];

}

class ProductSpecification {

    public id: number;

    @IsOptional()
    public specificationId: number;

    @IsOptional()
    @IsArray()
    @Type(() => ProductSpecificationAttributeGroup)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public attributeGroups: ProductSpecificationAttributeGroup[];
}

export class UpdateProductSpecificationRequest {

    @IsNotEmpty()
    public productId: number;

    @IsNotEmpty()
    public deleteSpecificationIds: number[];

    @IsNotEmpty()
    public deleteAttributeGroupIds: number[];

    @IsNotEmpty()
    public deleteAttributeIds: number[];

    @IsNotEmpty()
    public deleteAttributeValueIds: number[];

    @IsOptional()
    @IsArray()
    @Type(() => ProductSpecification)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public productSpecifications: ProductSpecification[];
}
