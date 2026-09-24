/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderTotal } from '../models/OrderTotal';
import { OrderTotalRepository } from '../repositories/OrderTotalRepository';

@Service()
export class OrderTotalService {
    constructor(
        private orderTotalRepository: OrderTotalRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createOrderTotalData(orderTotalData: any): Promise<OrderTotal> {
        this.log.info('createOrderTotalData method called');
        return this.orderTotalRepository.repository.save(orderTotalData);
    }
}
