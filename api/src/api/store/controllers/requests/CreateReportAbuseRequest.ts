/*
 * spurtcommerce API
 * version 4.8.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
