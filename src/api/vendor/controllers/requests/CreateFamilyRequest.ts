/* tslint:disable:max-classes-per-file */

/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';

export class CreateFamily {

    @IsNotEmpty()
    public familyName: string;

    public categoryIds: number[];

    public deleteCategoryIds: number[];
}
