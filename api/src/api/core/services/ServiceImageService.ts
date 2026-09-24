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
import { Like } from 'typeorm/index';
import { ServiceImageRepository } from '../repositories/ServiceImageRepository';
import { ServiceImage } from '../models/ServiceImage';

@Service()
export class ServiceImageService {
    constructor(
        private serviceImageRepository: ServiceImageRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // --
    }

    public async create(serviceImage: ServiceImage): Promise<any> {
        this.log.info('create method called');
        return this.serviceImageRepository.repository.save(serviceImage);
    }

    public findOne(serviceImage: any): Promise<any> {
        this.log.info('findOne method called');
        return this.serviceImageRepository.repository.findOne(serviceImage);
    }

    public findAll(serviceImage: any): Promise<any> {
        this.log.info('findAll method called');
        return this.serviceImageRepository.repository.find(serviceImage);
    }

    public update(id: any, serviceImage: ServiceImage): Promise<ServiceImage> {
        this.log.info('update method called');
        return this.serviceImageRepository.repository.save(serviceImage);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.serviceImageRepository.repository.count(condition);
        } else {
            return this.serviceImageRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        return await this.serviceImageRepository.repository.delete(id);
    }

    public async deleteProduct(id: number): Promise<any> {
        this.log.info('deleteProduct method called');
        return await this.serviceImageRepository.repository.delete({ serviceId: id });
    }
}
