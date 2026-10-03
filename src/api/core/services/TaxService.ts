/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Tax } from '../models/Tax';
import { TaxRepository } from '../repositories/TaxRepository';
import { Like } from 'typeorm';

@Service()
export class TaxService {

    constructor(
        private taxRepository: TaxRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.taxRepository.repository.findOne(findCondition);
    }

    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
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
        if (keyword) {
            condition.where = {
                taxName: Like('%' + keyword + '%'),
            };
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.taxRepository.repository.count(condition);
        } else {
            return this.taxRepository.repository.find(condition);
        }

    }

    public async create(tax: Tax): Promise<Tax> {
        this.log.info('create method called');
        return await this.taxRepository.repository.save(tax);
    }

    public update(id: any, tax: Tax): Promise<Tax> {
        this.log.info('update method called');
        tax.taxId = id;
        return this.taxRepository.repository.save(tax);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const newTax = await this.taxRepository.repository.delete(id);
        return newTax;
    }

    public findAll(findCondition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.taxRepository.repository.find(findCondition);
    }
}
