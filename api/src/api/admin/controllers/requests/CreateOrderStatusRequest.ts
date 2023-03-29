/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export class CreateOrderStatus {
    @MaxLength(32, {
        message: 'Name should be maximum 32 character',
    })
    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;
    @MaxLength(255, {
        message: 'Name should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'colorCode is required',
    })
    public colorCode: string;

    public priority: number;

    @IsNotEmpty({
        message: 'status is required',
    })
    public status: number;
    public parentId: number;
    public isAdmin: number;
    public isBuyer: number;
    public isApi: number;

}
