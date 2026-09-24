/*
 * spurtcommerce API
 * version 1.0.0
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

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorDocumentLogRepository.repository.findOne(findCondition);
    }

    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
        this.log.info('list method called');
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

    public async create(vendorDocLog: VendorDocumentLog): Promise<VendorDocumentLog> {
        this.log.info('create method called');
        const newVendorDocumentLog = await this.vendorDocumentLogRepository.repository.save(vendorDocLog);
        return newVendorDocumentLog;
    }

    public update(id: any, vendorDocLog: VendorDocumentLog): Promise<VendorDocumentLog> {
        this.log.info('update method called');
        vendorDocLog.id = id;
        return this.vendorDocumentLogRepository.repository.save(vendorDocLog);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const newVendorDocumentLog = await this.vendorDocumentLogRepository.repository.delete(id);
        return newVendorDocumentLog;
    }

    public findAll(findCondition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.vendorDocumentLogRepository.repository.find(findCondition);
    }
}
