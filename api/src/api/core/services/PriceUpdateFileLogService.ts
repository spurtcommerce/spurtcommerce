/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { PriceUpdateFileLog } from '../models/PriceUpdateFileLog';
import { PriceUpdateFileLogRepository } from '../repositories/PriceUpdateFileLogRepository';
import { Like } from 'typeorm';

@Service()
export class PriceUpdateFileLogService {
    constructor(
        private priceUpdateFileLogRepository: PriceUpdateFileLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(Data: any): Promise<PriceUpdateFileLog> {
        this.log.info('create method called');
        return this.priceUpdateFileLogRepository.repository.save(Data);
    }

    public findOne(id: number): Promise<PriceUpdateFileLog> {
        this.log.info('findOne method called');
        return this.priceUpdateFileLogRepository.repository.findOne({ where: { id } });
    }

    public findAll(productSpecial: any): Promise<PriceUpdateFileLog[]> {
        this.log.info('findAll method called');
        return this.priceUpdateFileLogRepository.repository.find(productSpecial);
    }

    public find(): Promise<PriceUpdateFileLog[]> {
        this.log.info('find method called');
        return this.priceUpdateFileLogRepository.repository.find();
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        return await this.priceUpdateFileLogRepository.repository.delete(id);
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
            return this.priceUpdateFileLogRepository.repository.count(condition);
        } else {
            return this.priceUpdateFileLogRepository.repository.find(condition);
        }
    }
}
