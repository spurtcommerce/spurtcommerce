/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty} from 'class-validator';

export class OrderCancelRequest {

    @IsNotEmpty()
    public reasonId: number;

    @IsNotEmpty()
    public orderProductId: number;

    public description: string;

}
