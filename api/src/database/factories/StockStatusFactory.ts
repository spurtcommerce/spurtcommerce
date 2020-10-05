/*
 * spurtcommerce community API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

 import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { StockStatus } from '../../api/models/stockStatus';
define(StockStatus, (faker: typeof Faker, settings: { role: string }) => {
    const stockStatus = new StockStatus();
    return stockStatus;
});
