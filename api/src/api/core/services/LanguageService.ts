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
import { LanguageRepository } from '../repositories/LanguageRepository';
import { Like } from 'typeorm/index';
import { Language } from '../models/Language';

@Service()
export class LanguageService {

    constructor(
        @OrmRepository() private languageRepository: LanguageRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create language
    public async create(language: any): Promise<any> {
        this.log.info('Create a new language ');
        return this.languageRepository.save(language);
    }

    // find Condition
    public findOne(orderStatus: any): Promise<any> {
        return this.languageRepository.findOne(orderStatus);
    }

    // update language
    public update(id: any, language: Language): Promise<any> {
        language.languageId = id;
        return this.languageRepository.save(language);
    }

    // language List
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
            sortOrder: 'ASC',
        };

        if (count) {
            return this.languageRepository.count(condition);
        } else {
            return this.languageRepository.find(condition);
        }
    }

    // delete language
    public async delete(id: number): Promise<any> {
        return await this.languageRepository.delete(id);
    }
}
