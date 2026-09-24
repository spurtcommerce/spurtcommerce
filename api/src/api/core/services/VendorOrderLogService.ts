/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorOrderLog } from '../models/VendorOrderLog';
import { VendorOrderLogRepository } from '../repositories/VendorOrderLogRepository';
import { Like } from 'typeorm';

@Service()
export class VendorOrderLogService {

    constructor(
        private vendorOrderLogRepository: VendorOrderLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorOrderLogRepository.repository.findOne(findCondition);
    }

    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }
        condition.order = { createdDate: 'DESC' };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorOrderLogRepository.repository.count(condition);
        }
        return this.vendorOrderLogRepository.repository.find(condition);
    }

    public async create(vendorOrderLog: VendorOrderLog): Promise<VendorOrderLog> {
        this.log.info('create method called');
        const newVendorOrderLog = await this.vendorOrderLogRepository.repository.save(vendorOrderLog);
        return newVendorOrderLog;
    }

    public update(id: any, vendorOrderLog: VendorOrderLog): Promise<VendorOrderLog> {
        this.log.info('update method called');
        vendorOrderLog.vendorOrderLogId = id;
        return this.vendorOrderLogRepository.repository.save(vendorOrderLog);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const deleteVendorOrderLog = await this.vendorOrderLogRepository.repository.delete(id);
        return deleteVendorOrderLog;
    }

    public find(data: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorOrderLogRepository.repository.find(data);
    }
}
