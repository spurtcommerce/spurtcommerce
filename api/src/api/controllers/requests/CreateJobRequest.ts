/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, IsEmail, MaxLength, MinLength} from 'class-validator';

export class CreateJob {

    @IsNotEmpty()
    public jobTitle: string;

    @IsNotEmpty()
    public jobDescription: string;

    public salaryType: string;

    public jobLocation: string;

    public contactPersonName: string;

    @IsEmail()
    public contactPersonEmail: string;

    @MaxLength(15, {
        message: 'mobile number is maximum 15 character',
    })
    @MinLength(8, {
        message: 'mobile number is minimum 8 character',
    })
    public contactPersonMobile: number;

    @IsNotEmpty()
    public status: number;
}
