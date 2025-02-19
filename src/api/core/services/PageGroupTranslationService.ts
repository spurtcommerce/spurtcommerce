/*
 * spurtcommerce API
 * version 4.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { PageGroupTranslationRepository } from '../repositories/PageGroupTranslationRepository';
import { Like } from 'typeorm';

@Service()
export class PageGroupTranslationService {

    constructor(
        @OrmRepository() private pageGroupTranslationRepository: PageGroupTranslationRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create page group translation
    public async create(page: any): Promise<any> {
        this.log.info('Create a new page group translation');
        return this.pageGroupTranslationRepository.save(page);
    }

    // find one page group translation
    public findOne(page: any): Promise<any> {
        return this.pageGroupTranslationRepository.findOne(page);
    }

    // page group translation list
    public list(limit: number, offset: number, select: any = [], search: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
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
            return this.pageGroupTranslationRepository.count(condition);
        } else {
            return this.pageGroupTranslationRepository.find(condition);
        }
    }

    // delete page group translation
    public async delete(id: number): Promise<any> {
        return await this.pageGroupTranslationRepository.delete(id);
    }
}
