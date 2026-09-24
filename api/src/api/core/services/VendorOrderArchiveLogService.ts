/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorOrderArchiveLog } from '../models/VendorOrderArchiveLog';
import { VendorOrderArchiveLogRepository } from '../repositories/VendorOrderArchiveLogRepository';
import { Like } from 'typeorm';

@Service()
export class VendorOrderArchiveLogService {

    constructor(
        private vendorOrderArchiveLogRepository: VendorOrderArchiveLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorOrderArchiveLogRepository.repository.findOne(findCondition);
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorOrderArchiveLogRepository.repository.count(condition);
        }
        return this.vendorOrderArchiveLogRepository.repository.find(condition);
    }

    public async create(vendorOrderArchiveLog: VendorOrderArchiveLog): Promise<VendorOrderArchiveLog> {
        this.log.info('create method called');
        return await this.vendorOrderArchiveLogRepository.repository.save(vendorOrderArchiveLog);
    }

    public update(id: any, vendorOrderArchiveLog: VendorOrderArchiveLog): Promise<VendorOrderArchiveLog> {
        this.log.info(`update method called for ID ${id}`);
        vendorOrderArchiveLog.vendorOrderArchiveLogId = id;
        return this.vendorOrderArchiveLogRepository.repository.save(vendorOrderArchiveLog);
    }

    public async delete(id: number): Promise<any> {
        this.log.info(`delete method called for ID ${id}`);
        const deleteVendorOrderArchiveLog = await this.vendorOrderArchiveLogRepository.repository.delete(id);
        return deleteVendorOrderArchiveLog;
    }

    public find(data: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorOrderArchiveLogRepository.repository.find(data);
    }
}
