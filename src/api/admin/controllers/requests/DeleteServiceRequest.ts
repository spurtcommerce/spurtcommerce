/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class DeleteService {

    @IsNotEmpty()
    public serviceId: [];
}
