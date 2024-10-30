/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { OrderFullfillmentStatus } from '../models/OrderFullfillmentStatus';

@EntityRepository(OrderFullfillmentStatus)
export class OrderFulfillmentStatusRepository extends Repository<OrderFullfillmentStatus> {
    // --
}
