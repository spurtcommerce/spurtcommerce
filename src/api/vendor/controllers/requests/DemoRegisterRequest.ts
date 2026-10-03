/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';
export class DemoRegisterRequest {
    @IsNotEmpty()
    public firstName: string;

    public lastName: string;

    @IsNotEmpty({
        message: 'Email Id is required',
    })
    @MaxLength(96, {
        message: 'emailId should be maximum 96 character',
    })
    public emailId: string;

    public companyName: string;

    public otp: number;

    @IsNotEmpty()
    public industryId: number;

    public sellingType: SellingType;

    public type: string;

    @IsNotEmpty({ message: 'country Id is required' })
    public countryId: number;

    @IsNotEmpty({ message: 'currency Id is required' })
    public currencyId: number;

    @IsNotEmpty({ message: 'timeZone is required' })
    public timeZone: string;

    @IsNotEmpty({ message: 'language Id is required' })
    public languageId: number;
}

interface SellingType {
    makeMySelf: number;
    digitalProducts: number;
    droppshipping: number;
    services: number;
    printOnDemandProducts: number;
    decideLater: number;
}
