/* tslint:disable:max-classes-per-file */

import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

class TranslationView {

    public id: number;

    @IsNotEmpty()
    public languageId: number;

    @IsNotEmpty()
    public name: string;

    public description: string;

}

export class VendorProductTranslationRequest {

    @IsNotEmpty()
    @IsArray()
    @Type(() => TranslationView)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public productTranslation: TranslationView[];
}
