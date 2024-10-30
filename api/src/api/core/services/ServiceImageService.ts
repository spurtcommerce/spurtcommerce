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
import { Like } from 'typeorm/index';
import { ServiceImageRepository } from '../repositories/ServiceImageRepository';
import { ServiceImage } from '../models/ServiceImage';

@Service()
export class ServiceImageService {
    constructor(@OrmRepository() private serviceImageRepository: ServiceImageRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }
    // create service
    public async create(serviceImage: ServiceImage): Promise<any> {
        this.log.info('Create a new serviceImage');
        return this.serviceImageRepository.save(serviceImage);
    }
    // find one service image
    public findOne(serviceImage: any): Promise<any> {
        return this.serviceImageRepository.findOne(serviceImage);
    }
    // find all service images
    public findAll(serviceImage: any): Promise<any> {
        return this.serviceImageRepository.find(serviceImage);
    }
    // update service images
    public update(id: any, serviceImage: ServiceImage): Promise<ServiceImage> {
        this.log.info('Update a serviceImage');
        return this.serviceImageRepository.save(serviceImage);
    }
    // service Image List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.serviceImageRepository.count(condition);
        } else {
            return this.serviceImageRepository.find(condition);
        }
    }
    // delete service image
    public async delete(id: any): Promise<any> {
        return await this.serviceImageRepository.delete(id);
    }
    // delete service
    public async deleteProduct(id: number): Promise<any> {
        return await this.serviceImageRepository.delete({ serviceId: id });
    }
}
