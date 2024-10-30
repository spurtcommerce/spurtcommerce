/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';
export class AddPaymentRequest {

    @IsNotEmpty()
    public orderId: number;

    @IsNotEmpty()
    public paymentMethod: string;
    @MaxLength(255, {
        message: 'paymentRefId should be maximum 255 character',
    })
    @ValidateIf(o => o.paymentRefId !== '')
    public paymentRefId: string;

    @IsNotEmpty()
    public paymentStatus: number;
    public paymentDetail: string;
}
