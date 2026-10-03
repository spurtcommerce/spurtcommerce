/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../../src/decorators/Logger';
import { BlogCategoryRepository } from '../repositories/BlogCategoryRepository';
import { Like, Brackets } from 'typeorm/index';
import { BlogCategory } from '../models/BlogCategory';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

@Service()
export class BlogCategoryService {

    constructor(
        private blogCategoryRepository: BlogCategoryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(blogCategory: any): Promise<any> {
        this.log.info('Create a new blog category');
        return this.blogCategoryRepository.repository.save(blogCategory);
    }

    public findOne(blogCategory: any): Promise<any> {
        return this.blogCategoryRepository.repository.findOne(blogCategory);
    }

    public findAll(blogCategory: any): Promise<any> {
        return this.blogCategoryRepository.repository.find(blogCategory);
    }

    public update(blogCategory: any): Promise<any> {
        return this.blogCategoryRepository.repository.save(blogCategory);
    }

    public async list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], sort: any = {}, count: number | boolean): Promise<any> {
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
        if (sort) {
            condition.order = sort;
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
        if (count) {
            return this.blogCategoryRepository.repository.count(condition);
        } else {
            return this.blogCategoryRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        return await this.blogCategoryRepository.repository.delete(id);
    }

    public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
        if (count > 0) {
            slug = slug + count;
        }
        return await this.blogCategoryRepository.checkSlugData(slug, id);
    }
    public async categoryCount(limit: number, offset: number, keyword: string, sortOrder: number, status: string, tenantId: number): Promise<any> {
        return await this.blogCategoryRepository.categoryCount(limit, offset, keyword, sortOrder, status, tenantId);
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
        count: boolean = false,
        rawQuery: boolean = false)
        : Promise<BlogCategory[] | number> {

        const query: any = await getDataSource().getRepository(BlogCategory).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                query.innerJoin(joinTb.tableName, joinTb.aliasName);
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
}
