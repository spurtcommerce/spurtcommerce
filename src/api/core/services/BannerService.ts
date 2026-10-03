/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { BannerRepository } from '../repositories/BannerRepository';

@Service()
export class BannerService {

    constructor(
        private bannerRepository: BannerRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(banner: any): Promise<any> {
        this.log.info('create method called');
        return this.bannerRepository.repository.save(banner);
    }

    public findOne(banner: any): Promise<any> {
        this.log.info('findOne method called');
        return this.bannerRepository.repository.findOne(banner);
    }

    public update(banner: any): Promise<any> {
        this.log.info('update method called');
        return this.bannerRepository.repository.save(banner);
    }

    public list(limit: any, offset: any, select: any = [], relations: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {

        this.log.info('list method called');

        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.relations = [];

        if (relations && relations.length > 0) {
            relations.forEach((table) => {
                condition.relations.push(table.tableName);
            });
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

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.bannerRepository.repository.count(condition);
        } else {
            return this.bannerRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        this.log.info(`delete method called for id: ${id}`);
        return await this.bannerRepository.repository.delete(id);
    }
}
