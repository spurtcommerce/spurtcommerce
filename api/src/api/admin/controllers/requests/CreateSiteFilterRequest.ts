/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export interface Section {
    sectionId?: number;
    sectionName?: string;
    sectionItem?: [];
    sectionType?: number;
}

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateSiteFilterRequest {
    @IsNotEmpty()
    public filterName: string;

    @IsNotEmpty()
    public categoryId: [];

    public section: Section[];

}
