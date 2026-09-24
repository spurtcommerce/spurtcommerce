/* tslint:disable:max-classes-per-file */

import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class WidgetTranslationView {

    @IsNotEmpty()
    public languageId: number;

    @IsNotEmpty()
    public widgetTitle: string;

    @IsNotEmpty()
    public widgetDescription: string;

    @IsNotEmpty()
    public widgetLongTitle: string;

}

export class CreateWidgetTranslationRequest {

    @Type(() => WidgetTranslationView)
    @ValidateNested()
    public widgetTranslation: WidgetTranslationView[];
}
