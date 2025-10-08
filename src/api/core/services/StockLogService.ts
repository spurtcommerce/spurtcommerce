/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { StockLogRepository } from '../repositories/StockLogRepository';
import { Like } from 'typeorm/index';

@Service()
export class StockLogService {

    constructor(
        private stockLogRepository: StockLogRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create
    public async create(stockLog: any): Promise<any> {
        const newStockLog = await this.stockLogRepository.repository.save(stockLog);
        this.log.info('Create a stockLog');
        return newStockLog;
    }

    // find stock
    public findOne(stockLog: any): Promise<any> {
        return this.stockLogRepository.repository.findOne(stockLog);
    }

    // stock log list
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

        if (count) {
            return this.stockLogRepository.repository.count(condition);
        } else {
            return this.stockLogRepository.repository.find(condition);
        }
    }

    // delete StockLog
    public async delete(id: number): Promise<any> {
        return await this.stockLogRepository.repository.delete(id);
    }
}
