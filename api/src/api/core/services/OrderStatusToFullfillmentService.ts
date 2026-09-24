/*
 * spurtcommerce API
 * version 1.0.0
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

    public async create(payload: OrderStatusToFullfillment): Promise<any> {
        this.log.info('create method called');
        return this.orderStatusToFullfillmentRepository.repository.save(payload);
    }

    public findOne(payload: any): Promise<any> {
        this.log.info('findOne method called');
        return this.orderStatusToFullfillmentRepository.repository.findOne(payload);
    }

    public findAll(payload: any): Promise<any> {
        this.log.info('findAll method called');
        return this.orderStatusToFullfillmentRepository.repository.find(payload);
    }

    public update(payload: any): Promise<any> {
        this.log.info('update method called');
        return this.orderStatusToFullfillmentRepository.repository.save(payload);
    }

    public async delete(id: FindOptionsWhere<OrderStatusToFullfillment>): Promise<any> {
        this.log.info('delete method called');
        return await this.orderStatusToFullfillmentRepository.repository.delete(id);
    }
}
