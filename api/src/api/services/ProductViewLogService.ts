/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {Like} from 'typeorm/index';
import {ProductViewLogRepository} from '../repositories/ProductViewLogRepository';
import {ProductViewLog} from '../models/productViewLog';

@Service()
export class ProductViewLogService {

    constructor(@OrmRepository() private productViewLogRepository: ProductViewLogRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create view log
    public async create(productViewLog: any): Promise <ProductViewLog> {
        this.log.info('Create a new view log ');
        return this.productViewLogRepository.save(productViewLog);
    }

    // find Condition
    public findOne(zone: any): Promise<any> {
        return this.productViewLogRepository.findOne(zone);
    }

    // update view log
    public update(id: any, productViewLog: ProductViewLog): Promise<any> {
        productViewLog.id = id;
        return this.productViewLogRepository.save(productViewLog);
    }

    // view log List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], relation: any= [], count: number|boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

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
            id: 'DESC',
        };        if (count) {
            return this.productViewLogRepository.count(condition);
        } else {
            return this.productViewLogRepository.find(condition);
        }
    }
    // delete view log
    public async delete(id: number): Promise<any> {
        return await this.productViewLogRepository.delete(id);
    }
}
