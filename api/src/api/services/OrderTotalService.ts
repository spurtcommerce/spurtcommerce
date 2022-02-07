/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
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
