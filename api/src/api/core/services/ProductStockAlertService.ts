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
import { ProductStockAlertRepository } from '../repositories/ProductStockAlertRepository';
import { Like } from 'typeorm/index';

@Service()
export class ProductStockAlertService {

    constructor(
        @OrmRepository() private productStockAlertRepository: ProductStockAlertRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create
    public async create(stockAlert: any): Promise<any> {
        const newStockAlert = await this.productStockAlertRepository.save(stockAlert);
        this.log.info('Create a stockAlert');
        return newStockAlert;
    }

    // find stock
    public findOne(stockAlert: any): Promise<any> {
        return this.productStockAlertRepository.findOne(stockAlert);
    }

    // list
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
            return this.productStockAlertRepository.count(condition);
        } else {
            return this.productStockAlertRepository.find(condition);
        }
    }

    // delete
    public async delete(id: number): Promise<any> {
        return await this.productStockAlertRepository.delete(id);
    }
}
