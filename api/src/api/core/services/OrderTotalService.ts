/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderTotal } from '../models/OrderTotal';
import { OrderTotalRepository } from '../repositories/OrderTotalRepository';

@Service()
export class OrderTotalService {
    constructor(
        @OrmRepository() private orderTotalRepository: OrderTotalRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // create order total data
    public async createOrderTotalData(orderTotalData: any): Promise<OrderTotal> {
        this.log.info('create a order total data');
        return this.orderTotalRepository.save(orderTotalData);
    }
}
