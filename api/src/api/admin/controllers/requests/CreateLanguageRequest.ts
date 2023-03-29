/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty , Max, MaxLength } from 'class-validator';
export class CreateLanguage {

    @MaxLength(32, {
        message: 'name should be maximum 32 character',
    })
    @IsNotEmpty()
    public name: string;

    @MaxLength(5, {
        message: 'code should be maximum 5 character',
    })
    public code: string;

    public image: string;

    @Max(9999, {
        message: 'Maximum length of sortOrder should be 4',
    })
    public sortOrder: number;

    @IsNotEmpty()
    public status: number;
}
