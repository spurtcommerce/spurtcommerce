/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { CategoryPath } from '../models/CategoryPath';
import { CategoryPathRepository } from '../repositories/CategoryPathRepository';
import {Like} from 'typeorm/index';

@Service()
export class CategoryPathService {

    constructor(@OrmRepository() private categoryPathRepository: CategoryPathRepository
                ) {
    }
    // create CategoryPath
    public async create(categoryPath: any): Promise<CategoryPath> {
        return this.categoryPathRepository.save(categoryPath);
    }
    // findone CategoryPath
    public findOne(categoryPath: any): Promise<any> {
        return this.categoryPathRepository.findOne(categoryPath);
    }
    // delete CategoryPath
    public async delete(id: any): Promise<any> {
        await this.categoryPathRepository.delete(id);
        return;
    }
    // categoryList
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], sortOrder: number , count: number | boolean): Promise<any> {
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

        if (sortOrder && sortOrder === 1) {
            condition.order = {
                sortOrder: 'ASC',
            };
        }
        if (sortOrder && sortOrder === 2) {
            condition.order = {
                sortOrder: 'DESC',
            };
        }

        console.log(condition);
        if (count) {
            return this.categoryPathRepository.count(condition);
        }
        return this.categoryPathRepository.find(condition);
    }

    // find categoryPath
    public find(categoryPath: any): Promise<any> {
        return this.categoryPathRepository.find(categoryPath);
    }
}
