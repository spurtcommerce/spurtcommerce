/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { PageTranslationRepository } from '../repositories/PageTranslationRepository';

@Service()
export class PageTranslationService {

    constructor(
        private pageTranslationRepository: PageTranslationRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create page translation
    public async create(page: any): Promise<any> {
        this.log.info('Create a new page translation');
        return this.pageTranslationRepository.repository.save(page);
    }

    // find one page translation
    public findOne(page: any): Promise<any> {
        return this.pageTranslationRepository.repository.findOne(page);
    }

    // find one page translation
    public find(page: any): Promise<any> {
        return this.pageTranslationRepository.repository.find(page);
    }

    // page translation list
    public list(limit: any, offset: any, select: any = [], relations: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relations && relations.length > 0) {
            condition.relations = relations;
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

        condition.order = { createdDate: 'DESC' };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.pageTranslationRepository.repository.count(condition);
        } else {
            return this.pageTranslationRepository.repository.find(condition);
        }
    }

    // delete page translation
    public async delete(id: number): Promise<any> {
        return await this.pageTranslationRepository.repository.delete(id);
    }

}
