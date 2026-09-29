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

class BlogTranslation {

    @IsNotEmpty()
    public languageId: number;

    @MaxLength(255, {
        message: 'title should be maximum 255 characters',
    })
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty({
        message: 'description is required',
    })
    public description: string;
}

export class CreateBlogTranslationRequest {

    @Type(() => BlogTranslation)
    @ValidateNested()
    public blogTranslation: BlogTranslation[];

}
