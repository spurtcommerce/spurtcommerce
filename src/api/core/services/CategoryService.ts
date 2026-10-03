/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Category } from '../models/CategoryModel';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { Brackets, Like } from 'typeorm/index';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class CategoryService {

    constructor(
        private categoryRepository: CategoryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(category: any): Promise<Category> {
        this.log.info('create method called');
        return this.categoryRepository.repository.save(category);
    }

    public findOne(category: any): Promise<any> {
        this.log.info('findOne method called');
        return this.categoryRepository.repository.findOne(category);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        await this.categoryRepository.repository.delete(id);
        return;
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], relation: any[] = [], sortOrder: number, count: number | boolean): Promise<any> {

        this.log.info('list method called');

        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR', 'variant'].includes(item.sign)) {
                    return;
                }
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
            return this.categoryRepository.repository.count(condition);
        }
        return this.categoryRepository.repository.find(condition);
    }

    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: boolean | number = false,
        rawQuery: boolean = false)
        : Promise<Category[] | any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(Category).createQueryBuilder('Category');
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                query.leftJoin(joinTb.tableName, joinTb.aliasName);
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR', 'variant'].includes(item.sign)) {
                    return;
                }
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(`${item.name} IN (:...filterValues_${index})`, { [`filterValues_${index}`]: Array.isArray(item.value) ? item.value : [item.value] });
                }
            });
        }
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                                    return;
                                }
                                qb.orWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                            });
                        }));
                    });
                } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                                return;
                            }
                            qb.orWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                        });
                    }));
                } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
                                return;
                            }
                            qb.orWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
                        });
                    }));
                }
            });
        }
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item: any) => {
                if (i === 0) {
                    query.groupBy(item.name);
                } else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
                const direction = typeof item.order === 'string' ? item.order.toUpperCase() : '';

                if (direction === 'ASC' || direction === 'DESC') {

                    query.orderBy(item.name, direction);

                }
            });
        }
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        } else {
            return query.getCount();
        }
    }

    public find(category: any): Promise<any> {
        this.log.info('find method called');
        return this.categoryRepository.repository.find(category);
    }

    public async slugData(data: string): Promise<any> {
        this.log.info('slugData method called');
        return await this.categoryRepository.categorySlug(data);
    }

    public findAll(): Promise<any> {
        this.log.info('findAll method called');
        return this.categoryRepository.repository.find();
    }

    public async slug(data: string): Promise<any> {
        this.log.info('slug method called');
        return await this.categoryRepository.categorySlugData(data);
    }

    public async categoryCount(limit: number, offset: number, keyword: string, sortOrder: number, status: string): Promise<any> {
        this.log.info('categoryCount method called');
        return await this.categoryRepository.categoryCount(limit, offset, keyword, sortOrder, status);
    }

    public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
        this.log.info('checkSlug method called');
        if (count > 0) {
            slug = slug + count;
        }
        return await this.categoryRepository.checkSlugData(slug, id);
    }

    public async findCategory(categoryName: string, parentId: number, tenantId: number): Promise<any> {
        this.log.info('findCategory method called');
        return await this.categoryRepository.findCategory(categoryName, parentId, tenantId);
    }

    public async escapeChar(data: string): Promise<any> {
        this.log.info('escapeChar method called');
        const val = data
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/,/g, '&sbquo;')
            .replace(/=/g, '&#61;')
            .replace(/-/g, '&#45;')
            .replace(/…/g, '&hellip;')
            .replace(/@/g, '&commat;')
            .replace(/©/g, '&copy;')
            .replace(/#/g, '&#35;')
            .replace(/“/g, '&ldquo;')
            .replace(/’/g, '&rsquo;')
            .replace(/‘/g, '&lsquo;')
            .replace(/™/g, '&trade;')
            .replace(/®/g, '&reg;')
            .replace(/–/g, '&ndash;')
            .replace(/é/g, '&eacute;')
            .replace(/€/g, '&euro;')
            .replace(/£/g, '&pound;');
        return val;
    }

    public async checkSlugData(slug: string, id: number, count: number, tenantId: number): Promise<number> {
        this.log.info('checkSlugData method called');
        if (count > 0) {
            slug = slug + count;
        }
        const query: any = await getDataSource().getRepository(Category).createQueryBuilder('category');
        query.where('category.category_slug = :slug', { slug });
        query.andWhere('category.tenantId = :tenantId', { tenantId });
        if (id > 0) {
            query.andWhere('category.categoryId != :id', { id });
        }
        return query.getCount();
    }

    public async bulkFamilyUpdate(ids: number[], familyId: number): Promise<any> {
        this.log.info('bulkFamilyUpdate method called');
        return await this.categoryRepository.updateFamily(ids, familyId);
    }
}
