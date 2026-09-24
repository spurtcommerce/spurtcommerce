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
import { Services } from '../models/Service';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { Like } from 'typeorm/index';

@Service()
export class ServiceService {
    constructor(
        private serviceRepository: ServiceRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(data: any): Promise<Services> {
        this.log.info('create method called');
        return this.serviceRepository.repository.save(data);
    }

    public findOne(data: any): Promise<any> {
        this.log.info('findOne method called');
        return this.serviceRepository.repository.findOne(data);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        await this.serviceRepository.repository.delete(id);
        return;
    }

    public find(data: any): Promise<any> {
        this.log.info('find method called');
        return this.serviceRepository.repository.find(data);
    }

    public async serviceList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], count: number | boolean): Promise<any> {
        this.log.info('serviceList method called');
        return await this.serviceRepository.serviceList(limit, offset, select, searchConditions, whereConditions, categoryId, count);
    }

    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], price: number, count: number | boolean): Promise<any> {
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
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }
        if (price) {
            condition.order = { price: (price === 2) ? 'DESC' : 'ASC' };
        } else {
            condition.order = { createdDate: 'DESC' };
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.serviceRepository.repository.count(condition);
        }
        return this.serviceRepository.repository.find(condition);
    }
}
