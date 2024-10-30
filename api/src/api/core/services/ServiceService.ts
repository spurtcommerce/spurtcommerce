/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Services } from '../models/Service';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { Like } from 'typeorm/index';

@Service()
export class ServiceService {
    constructor(
        @OrmRepository() private serviceRepository: ServiceRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }
    // create Services
    public async create(data: any): Promise<Services> {
        this.log.info('Create a new Services => ', data.toString());
        return this.serviceRepository.save(data);
    }
    // findone Services
    public findOne(data: any): Promise<any> {
        return this.serviceRepository.findOne(data);
    }
    // delete Services
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a Services');
        await this.serviceRepository.delete(id);
        return;
    }
    // find Services
    public find(data: any): Promise<any> {
        return this.serviceRepository.find(data);
    }
    // service list
    public async serviceList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], count: number | boolean): Promise<any> {
        return await this.serviceRepository.serviceList(limit, offset, select, searchConditions, whereConditions, categoryId, count);
    }
    // Services List
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], price: number, count: number | boolean): Promise<any> {
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
            return this.serviceRepository.count(condition);
        }
        return this.serviceRepository.find(condition);
    }
}
