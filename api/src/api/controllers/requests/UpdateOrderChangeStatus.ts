/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderChangeStatus {

    @IsNotEmpty()
    public orderId: number;

    @IsNotEmpty()
    public orderStatusId: number;
}
