/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorDocumentLog } from '../models/VendorDocumentLog';
import { VendorDocumentLogRepository } from '../repositories/VendorDocumentLogRepository';
import { Like } from 'typeorm';

@Service()
export class VendorDocumentLogService {

    constructor(
        private vendorDocumentLogRepository: VendorDocumentLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find vendorDocLog
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all vendorDocLogs');
        return this.vendorDocumentLogRepository.repository.findOne(findCondition);
    }

    // vendorDocLog list
    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = {
                firstName: Like('%' + keyword + '%'),
            };
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorDocumentLogRepository.repository.count(condition);
        } else {
            return this.vendorDocumentLogRepository.repository.find(condition);
        }

    }

    // create vendorDocLog
    public async create(vendorDocLog: VendorDocumentLog): Promise<VendorDocumentLog> {
        this.log.info('Create a new vendorDocLog => ', vendorDocLog.toString());
        const newVendorDocumentLog = await this.vendorDocumentLogRepository.repository.save(vendorDocLog);
        return newVendorDocumentLog;
    }

    // update vendorDocLog
    public update(id: any, vendorDocLog: VendorDocumentLog): Promise<VendorDocumentLog> {
        this.log.info('Update a vendorDocLog');
        vendorDocLog.id = id;
        return this.vendorDocumentLogRepository.repository.save(vendorDocLog);
    }

    // delete vendorDocLog
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a vendorDocLog');
        const newVendorDocumentLog = await this.vendorDocumentLogRepository.repository.delete(id);
        return newVendorDocumentLog;
    }

    // find vendorDocLog
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all vendorDocLogs');
        return this.vendorDocumentLogRepository.repository.find(findCondition);
    }
}
