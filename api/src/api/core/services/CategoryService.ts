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
import { Category } from '../models/CategoryModel';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { Like } from 'typeorm/index';
@Service()
export class CategoryService {

    constructor(
        @OrmRepository() private categoryRepository: CategoryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }
    // create Category
    public async create(category: any): Promise<Category> {
        this.log.info('Create a new category => ', category.toString());
        return this.categoryRepository.save(category);
    }
    // findone category
    public findOne(category: any): Promise<any> {
        return this.categoryRepository.findOne(category);
    }
    // delete Category
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a user');
        await this.categoryRepository.delete(id);
        return;
    }
    // categoryList
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], relation: any[] = [], sortOrder: number, count: number | boolean): Promise<any> {
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

        if (relation?.length) {
            condition.relations = [...relation];
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

        condition.order = { sortOrder: (sortOrder === 2) ? 'DESC' : 'ASC', createdDate: 'DESC' };

        if (count) {
            return this.categoryRepository.count(condition);
        }
        return this.categoryRepository.find(condition);
    }
    // find category
    public find(category: any): Promise<any> {
        return this.categoryRepository.find(category);
    }

    public async slugData(data: string): Promise<any> {
        return await this.categoryRepository.categorySlug(data);
    }

    public findAll(): Promise<any> {
        this.log.info('Find all setting');
        return this.categoryRepository.find();
    }

    public async slug(data: string): Promise<any> {
        return await this.categoryRepository.categorySlugData(data);
    }

    public async categoryCount(limit: number, offset: number, keyword: string, sortOrder: number, status: string): Promise<any> {
        return await this.categoryRepository.categoryCount(limit, offset, keyword, sortOrder, status);
    }

    public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
        if (count > 0) {
            slug = slug + count;
        }
        return await this.categoryRepository.checkSlugData(slug, id);
    }

    public async findCategory(categoryName: string, parentId: number): Promise<any> {
        return await this.categoryRepository.findCategory(categoryName, parentId);
    }
}
