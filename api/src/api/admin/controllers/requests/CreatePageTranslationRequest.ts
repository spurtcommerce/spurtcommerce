/* tslint:disable:max-classes-per-file */

/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';

class PageTranslationDTO {

    @MaxLength(255, {
        message: 'title should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'title is required',
    })
    public title: string;

    @IsNotEmpty({
        message: 'content is required',
    })
    public content: string;

    @IsNotEmpty({
        message: 'languageId is required',
    })
    public languageId: number;
}

export class CreatePageTranslationDTO {

    @Type(() => PageTranslationDTO)
    @ValidateNested()
    public pageTranslation: PageTranslationDTO[];

}
