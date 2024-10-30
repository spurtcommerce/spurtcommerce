/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Brackets, getConnection } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorProducts } from '../models/VendorProducts';
import { VendorProductsRepository } from '../repositories/VendorProductRepository';

@Service()
export class VendorProductService {

    constructor(
        @OrmRepository() private vendorProductsRepository: VendorProductsRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find user
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all users');
        return this.vendorProductsRepository.findOne(findCondition);
    }

    // user list
    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: any, count: number | boolean): Promise<any> {
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
            return this.vendorProductsRepository.count(condition);
        } else {
            return this.vendorProductsRepository.find(condition);
        }

    }

    // create user
    public async create(vendorProducts: VendorProducts): Promise<VendorProducts> {
        this.log.info('Create a new vendorProducts => ', vendorProducts.toString());
        const newVendorProducts = await this.vendorProductsRepository.save(vendorProducts);
        return newVendorProducts;
    }

    // update user
    public update(id: any, vendorProducts: VendorProducts): Promise<VendorProducts> {
        this.log.info('Update a VendorProducts');
        vendorProducts.vendorProductId = id;
        return this.vendorProductsRepository.save(vendorProducts);
    }

    // delete user
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a VendorProducts');
        const vendorProducts = await this.vendorProductsRepository.delete(id);
        return vendorProducts;
    }

    // find user
    public findAll(): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.find();
    }

    // find user
    public find(data: any): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.find(data);
    }

    // find user
    public findVendorActiveProduct(id: number, limit: number, offset: number): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.vendorActiveProduct(id, limit, offset);
    }

    // Top selling product
    public async topProductSelling(id: number, duration: number, limit: number): Promise<any> {
        return await this.vendorProductsRepository.topProductSelling(id, duration, limit);
    }

    // finding category mapped for vendor product
    public async findingProduct(categoryId: number): Promise<any> {
        return await this.vendorProductsRepository.findingProduct(categoryId);
    }

    // finding category mapped for vendor product
    public async vendorProductBasedOnDuration(vendorId: number, duration: number): Promise<any> {
        return await this.vendorProductsRepository.vendorProductBasedOnDuration(vendorId, duration);
    }

    // out of stock for simplified product
    public async outOfStockBasedOnDuration(vendorId: number, duration: number, stock: number): Promise<any> {
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
        rawQuery: boolean = false)
        : Promise<any> {

        const query: any = await getConnection().getRepository(VendorProducts).createQueryBuilder();
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
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
        // Where
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
        // Keyword Search
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
        // GroupBy
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
        // orderBy
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
                query.orderBy('' + item.name + '', '' + item.order + '');
            });
        }
        // Limit & Offset
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

    public async vendorProductsCount(id: number): Promise<any> {
        return await this.vendorProductsRepository.vendorProductsCount(id);
    }

    public async activeVendorProductCount(id: number): Promise<any> {
        return await this.vendorProductsRepository.activeVendorProductCount(id);
    }

    public async vendorCount(id: number): Promise<any> {
        return await this.vendorProductsRepository.vendorCount(id);
    }

    public async vendorCountAndMinPrice(id: number): Promise<any> {
        return await this.vendorProductsRepository.vendorCountAndMinPrice(id);
    }
}
