/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { OrderFullfillmentStatus } from '../models/OrderFullfillmentStatus';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class OrderFulfillmentStatusRepository {
    public repository: Repository<OrderFullfillmentStatus>;
    constructor() {
        this.repository = getDataSource().getRepository(OrderFullfillmentStatus);
    }
}
