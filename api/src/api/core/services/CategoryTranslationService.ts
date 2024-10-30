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
import { FindOneOptions, Like } from 'typeorm/index';
import { CategoryTranslationRepository } from '../repositories/CategoryTranslationRepository';
import { CategoryTranslation } from '../models/CategoryTranslation';

@Service()
export class CategoryTranslationService {

    constructor(
        @OrmRepository() private categoryTranslationRepository: CategoryTranslationRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create categoryTranslation
    public async save(categoryTranslation: any): Promise<any> {
        this.log.info('Create a new categoryTranslation ');
        return this.categoryTranslationRepository.save(categoryTranslation);
    }

    public async bulkSave(categoryTranslation: CategoryTranslation[]): Promise<CategoryTranslation[]> {
        return this.categoryTranslationRepository.save(categoryTranslation);
    }

    // find Condition
    public findOne(categoryTranslation: FindOneOptions<CategoryTranslation>): Promise<CategoryTranslation> {
        return this.categoryTranslationRepository.findOne(categoryTranslation);
    }

    // update categoryTranslation
    public update(categoryTranslation: any): Promise<any> {
        return this.categoryTranslationRepository.save(categoryTranslation);
    }

    // categoryTranslation List
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
            position: 'ASC',
            createdDate: 'DESC',
        };

        if (count) {
            return this.categoryTranslationRepository.count(condition);
        } else {
            return this.categoryTranslationRepository.find(condition);
        }
    }

    // delete categoryTranslation
    public async delete(id: number): Promise<any> {
        return await this.categoryTranslationRepository.delete(id);
    }
}
