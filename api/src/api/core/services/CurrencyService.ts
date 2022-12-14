/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { CurrencyRepository } from '../repositories/CurrencyRepository';

@Service()
export class CurrencyService {

    constructor(
        @OrmRepository() private currencyRepository: CurrencyRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create Currency
    public async create(currency: any): Promise<any> {
        this.log.info('Create a new currency ');
        return this.currencyRepository.save(currency);
    }

    // findCondition
    public findOne(country: any): Promise<any> {
        return this.currencyRepository.findOne(country);
    }

    // update currency
    public update(id: any, currency: any): Promise<any> {
        currency.currencyId = id;
        return this.currencyRepository.save(currency);
    }

    // currency List
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

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.currencyRepository.count(condition);
        } else {
            return this.currencyRepository.find(condition);
        }
    }

    // delete currency
    public async delete(id: number): Promise<any> {
        await this.currencyRepository.delete(id);
        return;
    }
}
