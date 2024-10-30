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
import { OrderProduct } from '../models/OrderProduct';
import { OrderProductRepository } from '../repositories/OrderProductRepository';
import { getConnection, Brackets } from 'typeorm';

@Service()
export class OrderProductService {
    constructor(
        @OrmRepository() private orderProductRepository: OrderProductRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createData(checkoutdata: any): Promise<OrderProduct> {
        this.log.info('create a order product data');
        return this.orderProductRepository.save(checkoutdata);
    }
    public async findData(productid: number, orderid: number, orderProductid: number): Promise<any> {
        this.log.info('find a order product data');
        return this.orderProductRepository.find({ where: { productId: productid, orderId: orderid, orderProductId: orderProductid } });

    }

    public find(order: any): Promise<any> {
        return this.orderProductRepository.find(order);
    }

    public findOne(productData: any): Promise<any> {
        return this.orderProductRepository.findOne(productData);
    }

    // findAll
    public findAll(orderProduct: any): Promise<any> {
        return this.orderProductRepository.find(orderProduct);
    }

    // order list
    public List(limit: number): Promise<any> {
        return this.orderProductRepository.List(limit);
    }

    // order count
    public findAndCount(where: any): Promise<any> {
        return this.orderProductRepository.findAndCount(where);
    }

    // getting earnings
    public async getEarnings(id: number): Promise<any> {
        return await this.orderProductRepository.getEarnings(id);
    }

    // getting product without order
    public async productPaymentProcess(id: number): Promise<any> {
        return await this.orderProductRepository.productPaymentProcess(id);
    }

    // getting buyed count
    public async buyedCount(id: number, customerId: number): Promise<any> {
        return await this.orderProductRepository.buyedCount(id, customerId);
    }

    // count
    public count(productData: any): Promise<any> {
        return this.orderProductRepository.count(productData);
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
        : Promise<OrderProduct[] | any> {

        const query: any = await getConnection().getRepository(OrderProduct).createQueryBuilder();
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'left-cond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
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
                } else if (item.op === 'not' && item.sign === undefined) {
                    query.andWhere(item.name + ' != ' + item.value);
                } else if (item.op === 'cancel' && item.sign === undefined) {
                    query.andWhere(item.name + ' != ' + item.value);
                } else if (item.op === 'andWhere' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + ' \'' + item.value + '\'');
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

    public update(id: any, orderProduct: OrderProduct): Promise<OrderProduct> {
        this.log.info('Update a order produts');
        orderProduct.orderProductId = id;
        return this.orderProductRepository.save(orderProduct);
    }

    //  find Product varient
    public async productVarientPaymentProcess(sku: string): Promise<any> {
        return await this.orderProductRepository.productVarientPaymentProcess(sku);
    }
    // top performing products
    public async topPerformingProducts(limit: number, offset: number, count: number | boolean, duration: number): Promise<any> {
        return await this.orderProductRepository.topPerformingProduct(limit, offset, count, duration);
    }
    // sales list
    public async salesGraphList(year: string, month: string): Promise<any> {
        return await this.orderProductRepository.salesGraphList(year, month);
    }
    public async topTenWeeklySalesList(productId: any): Promise<any> {
        return await this.orderProductRepository.topTenWeeklySales(productId);
    }
    // getting sum of total from order products
    public async dashboardOrderProductsTotal(duration: number): Promise<any> {
        return await this.orderProductRepository.dashboardOrderProductsTotal(duration);
    }

    public async findVariantSku(skuName: string): Promise<any> {
        return await this.orderProductRepository.checkSkuForVariant(skuName);
    }
}
