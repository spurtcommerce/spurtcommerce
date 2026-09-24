/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Brackets } from 'typeorm';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorProducts } from '../models/VendorProducts';
import { VendorProductsRepository } from '../repositories/VendorProductRepository';

@Service()
export class VendorProductService {

    constructor(
        private vendorProductsRepository: VendorProductsRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorProductsRepository.repository.findOne(findCondition);
    }

    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: any, count: number | boolean): Promise<any> {
        this.log.info('list method called');
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

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorProductsRepository.repository.count(condition);
        } else {
            return this.vendorProductsRepository.repository.find(condition);
        }

    }

    public async create(vendorProducts: VendorProducts): Promise<VendorProducts> {
        this.log.info('create method called');
        const newVendorProducts = await this.vendorProductsRepository.repository.save(vendorProducts);
        return newVendorProducts;
    }

    public update(id: any, vendorProducts: VendorProducts): Promise<VendorProducts> {
        this.log.info('update method called');
        vendorProducts.vendorProductId = id;
        return this.vendorProductsRepository.repository.save(vendorProducts);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const vendorProducts = await this.vendorProductsRepository.repository.delete(id);
        return vendorProducts;
    }

    public findAll(): Promise<any> {
        this.log.info('findAll method called');
        return this.vendorProductsRepository.repository.find();
    }

    public find(data: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorProductsRepository.repository.find(data);
    }

    public findVendorActiveProduct(id: number, limit: number, offset: number): Promise<any> {
        this.log.info('findVendorActiveProduct method called');
        return this.vendorProductsRepository.vendorActiveProduct(id, limit, offset);
    }

    public async topProductSelling(id: number, duration: number, limit: number): Promise<any> {
        this.log.info('topProductSelling method called');
        return await this.vendorProductsRepository.topProductSelling(id, duration, limit);
    }

    public async findingProduct(categoryId: number): Promise<any> {
        this.log.info('findingProduct method called');
        return await this.vendorProductsRepository.findingProduct(categoryId);
    }

    public async vendorProductBasedOnDuration(vendorId: number, duration: number): Promise<any> {
        this.log.info('vendorProductBasedOnDuration method called');
        return await this.vendorProductsRepository.vendorProductBasedOnDuration(vendorId, duration);
    }

    public async outOfStockBasedOnDuration(vendorId: number, duration: number, stock: number): Promise<any> {
        this.log.info('outOfStockBasedOnDuration method called');
        return await this.vendorProductsRepository.outOfStockSBasedOnDuration(vendorId, duration, stock);
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
        rawQuery: boolean = false,
        having: any = [])
        : Promise<any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(VendorProducts).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'inner') {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'leftCond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                }
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
                } else if (item.op === 'IS NULL' && item.sign === undefined) {
                    query.andWhere(item.name + ' IS NULL' + item.value);
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
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\"%' + table.value + '%\"');
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
        if (having && having.length > 0) {
            having.forEach((item: any) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.having(item.name + ' = ' + item.value);
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orHaving(item.name + ' = ' + item.value);
                }
            });
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

    public async vendorProductsCount(id: number): Promise<any> {
        this.log.info('vendorProductsCount method called');
        return await this.vendorProductsRepository.vendorProductsCount(id);
    }

    public async activeVendorProductCount(id: number): Promise<any> {
        this.log.info('activeVendorProductCount method called');
        return await this.vendorProductsRepository.activeVendorProductCount(id);
    }

    public async vendorCount(id: number): Promise<any> {
        this.log.info('vendorCount method called');
        return await this.vendorProductsRepository.vendorCount(id);
    }

    public async vendorCountAndMinPrice(id: number): Promise<any> {
        this.log.info('vendorCountAndMinPrice method called');
        return await this.vendorProductsRepository.vendorCountAndMinPrice(id);
    }
}
