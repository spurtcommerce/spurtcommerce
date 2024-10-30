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
import { PriceUpdateFileLog } from '../models/PriceUpdateFileLog';
import { PriceUpdateFileLogRepository } from '../repositories/PriceUpdateFileLogRepository';
import { Like } from 'typeorm';

@Service()
export class PriceUpdateFileLogService {
    constructor(
        @OrmRepository() private priceUpdateFileLogRepository: PriceUpdateFileLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // create a data
    public async create(Data: any): Promise<PriceUpdateFileLog> {
        this.log.info('create a data');
        return this.priceUpdateFileLogRepository.save(Data);
    }
    // findone a data
    public findOne(id: number): Promise<PriceUpdateFileLog> {
        this.log.info('Find a data');
        return this.priceUpdateFileLogRepository.findOne(id);
    }
    // find a data
    public findAll(productSpecial: any): Promise<PriceUpdateFileLog[]> {
        this.log.info('Find a data');
        return this.priceUpdateFileLogRepository.find(productSpecial);
    }

    // find a data
    public find(): Promise<PriceUpdateFileLog[]> {
        this.log.info('Find a data');
        return this.priceUpdateFileLogRepository.find();
    }
    // delete product option
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product option value');
        const deleteProductOptionValue = await this.priceUpdateFileLogRepository.delete(id);
        return deleteProductOptionValue;
    }

    // country List
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
            return this.priceUpdateFileLogRepository.count(condition);
        } else {
            return this.priceUpdateFileLogRepository.find(condition);
        }
    }

}
