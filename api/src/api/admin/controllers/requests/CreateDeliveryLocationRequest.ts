/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export class CreateDeliveryLocationRequest {

    @IsNotEmpty()
    public zipCode: number;
    @MaxLength(255, {
        message: 'locationName should be maximum 255 character',
    })
    public locationName: string;
}
