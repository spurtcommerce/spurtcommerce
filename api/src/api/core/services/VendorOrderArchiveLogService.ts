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
import { VendorOrderArchiveLog } from '../models/VendorOrderArchiveLog';
import { VendorOrderArchiveLogRepository } from '../repositories/VendorOrderArchiveLogRepository';
import { Like } from 'typeorm';

@Service()
export class VendorOrderArchiveLogService {

    constructor(
        @OrmRepository() private vendorOrderArchiveLogRepository: VendorOrderArchiveLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find one vendorOrderArchiveLog
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.vendorOrderArchiveLogRepository.findOne(findCondition);
    }
    // vendorOrderArchiveLog list
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorOrderArchiveLogRepository.count(condition);
        }
        return this.vendorOrderArchiveLogRepository.find(condition);
    }

    // create vendor order archive log
    public async create(vendorOrderArchiveLog: VendorOrderArchiveLog): Promise<VendorOrderArchiveLog> {
        const newVendorOrderArchiveLog = await this.vendorOrderArchiveLogRepository.save(vendorOrderArchiveLog);
        return newVendorOrderArchiveLog;
    }

    // update vendor order archive log
    public update(id: any, vendorOrderArchiveLog: VendorOrderArchiveLog): Promise<VendorOrderArchiveLog> {
        this.log.info('Update a vendor order archive log');
        vendorOrderArchiveLog.vendorOrderArchiveLogId = id;
        return this.vendorOrderArchiveLogRepository.save(vendorOrderArchiveLog);
    }

    // delete vendor order archive log
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a vendor order archive log');
        const deleteVendorOrderArchiveLog = await this.vendorOrderArchiveLogRepository.delete(id);
        return deleteVendorOrderArchiveLog;
    }

    public find(data: any): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorOrderArchiveLogRepository.find(data);
    }
}
