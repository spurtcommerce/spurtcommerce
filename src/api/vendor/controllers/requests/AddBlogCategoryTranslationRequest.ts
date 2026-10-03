/* tslint:disable:max-classes-per-file */

/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, ValidateNested, IsString } from 'class-validator';

class BlogCategoryTranslation {

    @IsNotEmpty()
    public languageId: number;

    @MaxLength(255, {
        message: 'title should be maximum 255 characters',
    })
    @IsNotEmpty()
    @IsString()
    public name: string;
}
export class BlogCategoryTranslationRequest {

    @Type(() => BlogCategoryTranslation)
    @ValidateNested()
    public blogCategoryTranslation: BlogCategoryTranslation[];
}
