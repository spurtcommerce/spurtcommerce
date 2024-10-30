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
import { VendorOrderLog } from '../models/VendorOrderLog';
import { VendorOrderLogRepository } from '../repositories/VendorOrderLogRepository';
import { Like } from 'typeorm';

@Service()
export class VendorOrderLogService {

    constructor(
        @OrmRepository() private vendorOrderLogRepository: VendorOrderLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find one vendorOrderLog
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.vendorOrderLogRepository.findOne(findCondition);
    }
    // vendorOrderLog list
    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.vendorOrderLogRepository.count(condition);
        }
        return this.vendorOrderLogRepository.find(condition);
    }

    // create vendor order log
    public async create(vendorOrderLog: VendorOrderLog): Promise<VendorOrderLog> {
        const newVendorOrderLog = await this.vendorOrderLogRepository.save(vendorOrderLog);
        return newVendorOrderLog;
    }

    // update vendor order log
    public update(id: any, vendorOrderLog: VendorOrderLog): Promise<VendorOrderLog> {
        this.log.info('Update a vendor order log');
        vendorOrderLog.vendorOrderLogId = id;
        return this.vendorOrderLogRepository.save(vendorOrderLog);
    }

    // delete vendor order log
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a vendor order log');
        const deleteVendorOrderLog = await this.vendorOrderLogRepository.delete(id);
        return deleteVendorOrderLog;
    }

    public find(data: any): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorOrderLogRepository.find(data);
    }
}
