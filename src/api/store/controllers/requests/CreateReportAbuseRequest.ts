/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty, MaxLength} from 'class-validator';

export class AbuseReportRequest {

    @IsNotEmpty()
    public reasonId: number;

    @IsNotEmpty()
    public answerId: number;
    @MaxLength(255, {
        message: 'remark should be maximum 255 character',
    })
    public remark: string;

}
