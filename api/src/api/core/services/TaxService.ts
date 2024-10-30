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
import { Tax } from '../models/Tax';
import { TaxRepository } from '../repositories/TaxRepository';
import { Like } from 'typeorm';

@Service()
export class TaxService {

    constructor(
        @OrmRepository() private taxRepository: TaxRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find tax
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all tax');
        return this.taxRepository.findOne(findCondition);
    }

    // tax list
    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
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
            return this.taxRepository.count(condition);
        } else {
            return this.taxRepository.find(condition);
        }

    }

    // create tax
    public async create(tax: Tax): Promise<Tax> {
        this.log.info('Create a new tax => ', tax.toString());
        const newTax = await this.taxRepository.save(tax);
        return newTax;
    }

    // update tax
    public update(id: any, tax: Tax): Promise<Tax> {
        this.log.info('Update a tax');
        tax.taxId = id;
        return this.taxRepository.save(tax);
    }

    // delete tax
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a tax');
        const newTax = await this.taxRepository.delete(id);
        return newTax;
    }

    // find tax
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all tax');
        return this.taxRepository.find(findCondition);
    }
}
