/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductRating } from '../models/ProductRating';
import { RatingRepository } from '../repositories/RatingRepository';
import { Brackets, Like } from 'typeorm';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class ProductRatingService {

    constructor(
        private ratingRepository: RatingRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public find(rating: any): Promise<any> {
        return this.ratingRepository.repository.find(rating);
    }

    // find one condition
    public findOne(rating: any): Promise<any> {
        return this.ratingRepository.repository.findOne(rating);
    }

    public findAll(rating: any): Promise<any> {
        this.log.info('Find all rating');
        return this.ratingRepository.repository.find(rating);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
                const operator: string = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;

        }
        if (count) {
            return this.ratingRepository.repository.count(condition);
        } else {
            return this.ratingRepository.repository.find(condition);
        }
    }

    public async create(productRating: ProductRating): Promise<ProductRating> {
        const newRating = await this.ratingRepository.repository.save(productRating);
        return newRating;
    }

    public update(id: any, productRating: ProductRating): Promise<ProductRating> {
        this.log.info('Update a rating');
        productRating.ratingId = id;
        return this.ratingRepository.repository.save(productRating);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('Delete a rating');
        const newRating = await this.ratingRepository.repository.delete(id);
        return newRating;
    }

    public async consolidateRating(id: number): Promise<any> {
        return await this.ratingRepository.ratingConsolidate(id);
    }

    public async consolidateRatingForVendor(id: number): Promise<any> {
        return await this.ratingRepository.ratingConsolidateForVendor(id);
    }

    public async ratingStatistics(skuId: any): Promise<any> {
        return await this.ratingRepository.ratingStatistics(skuId);
    }

    public async getReviewCount(skuId: any): Promise<any> {
        return await this.ratingRepository.getReviewCount(skuId);
    }

    public async ratingReviewList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        return await this.ratingRepository.productRatingList(limit, offset, select, searchConditions, whereConditions, count);
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
        count: number | boolean = false,
        rawQuery: boolean = false)
        : Promise<ProductRating[] | any> {

        const query: any = await getDataSource().getRepository(ProductRating).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                query.innerJoin(joinTb.tableName, joinTb.aliasName);
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                } else if (item.op === 'NOT' && item.sign === undefined) {
                    query.andWhere('NOT (' + 'ISNULL (' + item.name + ')' + ')');
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
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    });
                } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
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
                query.orderBy('' + item.name + '', '' + item.order + '');
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
