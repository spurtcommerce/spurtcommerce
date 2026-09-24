/* tslint:disable:max-classes-per-file */

/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePaymentRuleRequest {

    @MaxLength(255, {
        message: 'name should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;

    public instructions: string;

    public paymentMethodId: number;
}
