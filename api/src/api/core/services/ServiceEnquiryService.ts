/*
 * spurtcommerce API
 * version 1.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ServiceEnquiry } from '../models/ServiceEnquiry';
import { ServiceEnquiryRepository } from '../repositories/ServiceEnquiryRepository';
import { Like } from 'typeorm/index';

@Service()
export class ServiceEnquiryService {
    constructor(
        private serviceEnquiryRepository: ServiceEnquiryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(enquiry: any): Promise<ServiceEnquiry> {
        this.log.info('create method called');
        return this.serviceEnquiryRepository.repository.save(enquiry);
    }

    public findOne(enquiry: any): Promise<any> {
        this.log.info('findOne method called');
        return this.serviceEnquiryRepository.repository.findOne(enquiry);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        await this.serviceEnquiryRepository.repository.delete(id);
        return;
    }

    public find(enquiry: any): Promise<any> {
        this.log.info('find method called');
        return this.serviceEnquiryRepository.repository.find(enquiry);
    }

    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.serviceEnquiryRepository.repository.count(condition);
        }
        return this.serviceEnquiryRepository.repository.find(condition);
    }
}
