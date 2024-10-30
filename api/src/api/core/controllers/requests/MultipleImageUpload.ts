/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class MultipleImageUpload {
    @IsNotEmpty()
    public image: any = [];

    public path: string;

    public fileName: string;

    public fileType: number;
}
