/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { OrderStatusToFullfillmentRepository } from '../repositories/OrderStatusToFullfillmentRepository';
import { OrderStatusToFullfillment } from '../models/OrderStatusToFullfillment';
import { FindOptionsWhere } from 'typeorm';

@Service()
export class OrderStatusToFullfillmentService {

    constructor(
        private orderStatusToFullfillmentRepository: OrderStatusToFullfillmentRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create payload
    public async create(payload: OrderStatusToFullfillment): Promise<any> {
        this.log.info('Create a new payload ');
        return this.orderStatusToFullfillmentRepository.repository.save(payload);
    }

    // find One payload
    public findOne(payload: any): Promise<any> {
        return this.orderStatusToFullfillmentRepository.repository.findOne(payload);
    }

    // findAll payload
    public findAll(payload: any): Promise<any> {
        return this.orderStatusToFullfillmentRepository.repository.find(payload);
    }

    // update payload
    public update(payload: any): Promise<any> {
        return this.orderStatusToFullfillmentRepository.repository.save(payload);
    }

    // delete payload
    public async delete(id: FindOptionsWhere<OrderStatusToFullfillment>): Promise<any> {
        return await this.orderStatusToFullfillmentRepository.repository.delete(id);
    }
}
