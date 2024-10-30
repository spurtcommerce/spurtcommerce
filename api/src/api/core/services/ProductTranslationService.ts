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
import { FindManyOptions, FindOneOptions, Like } from 'typeorm/index';
import { ProductTranslationRepository } from '../repositories/ProductTranslationRepository';
import { ProductTranslation } from '../models/ProductTranslation';

@Service()
export class ProductTranslationService {

    constructor(
        @OrmRepository() private productTranslationService: ProductTranslationRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create productTranslation
    public async save(productTranslation: ProductTranslation): Promise<ProductTranslation> {
        this.log.info('Create a new productTranslation ');
        return this.productTranslationService.save(productTranslation);
    }

    // create productTranslation
    public async bulkSave(productTranslation: ProductTranslation[]): Promise<ProductTranslation[]> {
        return this.productTranslationService.save(productTranslation);
    }

    // find Condition
    public findOne(productTranslation: FindOneOptions<ProductTranslation>): Promise<ProductTranslation> {
        return this.productTranslationService.findOne(productTranslation);
    }

    public find(productTranslation: FindManyOptions<ProductTranslation>): Promise<ProductTranslation[]> {
        return this.productTranslationService.find(productTranslation);
    }
    // find all product translation
    public findAll(): Promise<ProductTranslation[]> {
        this.log.info('Find all product translation');
        return this.productTranslationService.find();
    }

    // productTranslation List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: FindManyOptions<ProductTranslation> = {};

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
            return this.productTranslationService.count(condition);
        } else {
            return this.productTranslationService.find(condition);
        }
    }

    // delete productTranslation
    public async delete(id: number): Promise<any> {
        return await this.productTranslationService.delete(id);
    }
}
