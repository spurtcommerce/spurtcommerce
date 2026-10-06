/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { PageRepository } from '../repositories/PageRepository';
import { Page } from '../models/Page';
import { Brackets } from 'typeorm/index';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Service()
export class PageService {

    constructor(
        private pageRepository: PageRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(page: any): Promise<any> {
        this.log.info('create method called');
        return this.pageRepository.repository.save(page);
    }

    public async findOne(condition: any): Promise<Page | null> {
        this.log.info('findOne method called');
        return this.pageRepository.repository.findOne({
            where: condition,
        });
    }

    public async findOneBy(condition: any): Promise<Page | null> {
        this.log.info('findOne method called');
        return this.pageRepository.repository.findOne(condition);
    }

    public findAll(page: any): Promise<any> {
        this.log.info('findAll method called');
        return this.pageRepository.repository.find(page);
    }

    public update(id: any, page: Page): Promise<any> {
        this.log.info(`update method called for id=${id}`);
        page.pageId = id;
        return this.pageRepository.repository.save(page);
    }

    public updates(
        id: any,
        page: QueryDeepPartialEntity<Page>
    ): Promise<any> {
        this.log.info(`update method called for id=${id}`);
        return this.pageRepository.repository.update(id, page);
    }

    public async deleteByCondition(condition: any): Promise<any> {
        this.log.info('deleteByCondition method called');
        return this.pageRepository.repository.delete(condition);
    }

    public list(limit: any, offset: any, select: any = [], relations: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relations && relations.length > 0) {
            condition.relations = relations;
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
            return this.pageRepository.repository.count(condition);
        } else {
            return this.pageRepository.repository.find(condition);
        }
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
        : Promise<Page[] | any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(Page).createQueryBuilder('page');
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                } else {
                    query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                }
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

    public async delete(id: number): Promise<any> {
        this.log.info(`delete method called for id=${id}`);
        return await this.pageRepository.repository.delete(id);
    }

    public async slugData(data: string): Promise<any> {
        this.log.info(`slugData method called for slug="${data}"`);
        return await this.pageRepository.pageSlug(data);
    }

    public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
        if (count > 0) {
            slug = slug + count;
        }
        this.log.info(`checkSlug method called with slug="${slug}" and id=${id}`);
        return await this.pageRepository.checkSlugData(slug, id);
    }
}
