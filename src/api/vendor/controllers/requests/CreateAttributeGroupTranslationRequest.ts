/* tslint:disable:max-classes-per-file */

import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class AttributeGroupTranslationView {

    @IsNotEmpty()
    public languageId: number;

    @IsNotEmpty()
    public name: string;

}

export class CreateAttributeGroupTranslationRequest {

    @Type(() => AttributeGroupTranslationView)
    @ValidateNested()
    public attributeGroupTranslation: AttributeGroupTranslationView[];
}
