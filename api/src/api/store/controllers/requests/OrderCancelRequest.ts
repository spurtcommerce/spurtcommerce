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
import { IsNotEmpty} from 'class-validator';

export class OrderCancelRequest {

    @IsNotEmpty()
    public reasonId: number;

    @IsNotEmpty()
    public orderProductId: number;

    public description: string;

}
