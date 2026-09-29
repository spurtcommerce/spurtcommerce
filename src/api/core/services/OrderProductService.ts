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
import { OrderProduct } from '../models/OrderProduct';
import { OrderProductRepository } from '../repositories/OrderProductRepository';
import { Brackets } from 'typeorm';

@Service()
export class OrderProductService {
    constructor(
        private orderProductRepository: OrderProductRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createData(checkoutdata: any): Promise<OrderProduct> {
        this.log.info('createData method called');
        return this.orderProductRepository.repository.save(checkoutdata);
    }
    public async findData(productid: number, orderid: number, orderProductid: number): Promise<any> {
        this.log.info('findData method called');
        return this.orderProductRepository.repository.find({ where: { productId: productid, orderId: orderid, orderProductId: orderProductid } });

    }

    public find(order: any): Promise<any> {
        this.log.info('find method called');
        return this.orderProductRepository.repository.find(order);
    }

    public findOne(productData: any): Promise<any> {
        this.log.info('findOne method called');
        return this.orderProductRepository.repository.findOne(productData);
    }

    public findAll(orderProduct: any): Promise<any> {
        this.log.info('findOne method called');
        return this.orderProductRepository.repository.find(orderProduct);
    }

    public List(limit: number): Promise<any> {
        this.log.info('List method called');
        return this.orderProductRepository.List(limit);
    }

    public findAndCount(where: any): Promise<any> {
        this.log.info('findAndCount method called');
        return this.orderProductRepository.repository.findAndCount(where);
    }

    public async getEarnings(id: number): Promise<any> {
        this.log.info('getEarnings method called');
        return await this.orderProductRepository.getEarnings(id);
    }

    public async productPaymentProcess(id: number): Promise<any> {
        this.log.info('productPaymentProcess method called');
        return await this.orderProductRepository.productPaymentProcess(id);
    }

    public async buyedCount(id: number, customerId: number): Promise<any> {
        this.log.info('buyedCount method called');
        return await this.orderProductRepository.buyedCount(id, customerId);
    }

    public async buyedCountBySku(sku: string, customerId: number): Promise<any> {
        this.log.info('buyedCountBySku method called');
        return await this.orderProductRepository.buyedCountBySku(sku, customerId);
    }

    public count(productData: any): Promise<any> {
        this.log.info('count method called');
        return this.orderProductRepository.repository.count(productData);
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

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(OrderProduct).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
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
                } else if (item.op === 'raw' && item.sign === undefined) {
                    query.andWhere(item.name);
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

    public update(id: any, orderProduct: OrderProduct): Promise<OrderProduct> {
        this.log.info('update method called');
        orderProduct.orderProductId = id;
        return this.orderProductRepository.repository.save(orderProduct);
    }

    //  find Product varient
    public async productVarientPaymentProcess(sku: string): Promise<any> {
        this.log.info('productVarientPaymentProcess method called');
        return await this.orderProductRepository.productVarientPaymentProcess(sku);
    }

    // top performing products
    public async topPerformingProducts(limit: number, offset: number, count: number | boolean, duration: number): Promise<any> {
        this.log.info('topPerformingProducts method called');
        return await this.orderProductRepository.topPerformingProduct(limit, offset, count, duration);
    }

    public async salesGraphList(year: string, month: string): Promise<any> {
        this.log.info('salesGraphList method called');
        return await this.orderProductRepository.salesGraphList(year, month);
    }

    public async topTenWeeklySalesList(productId: any): Promise<any> {
        this.log.info('topTenWeeklySalesList method called');
        return await this.orderProductRepository.topTenWeeklySales(productId);
    }

    // getting sum of total from order products
    public async dashboardOrderProductsTotal(duration: number): Promise<any> {
        this.log.info('dashboardOrderProductsTotal method called');
        return await this.orderProductRepository.dashboardOrderProductsTotal(duration);
    }

    public async findVariantSku(skuName: string): Promise<any> {
        this.log.info('findVariantSku method called');
        return await this.orderProductRepository.checkSkuForVariant(skuName);
    }

    public async getOrderEarnings(id: number): Promise<any> {
        this.log.info('getOrderEarnings method called');
        const query: any = await getDataSource().getRepository(OrderProduct).createQueryBuilder('orderProduct');
        query.select(['SUM(orderProduct.total + orderProduct.discountAmount) as productPriceTotal', 'COUNT(orderProduct.orderId) as orderCount', 'SUM(orderProduct.quantity) as quantityCount', 'COUNT(DISTINCT(product.customer_id)) as buyerCount']);
        query.innerJoin('orderProduct.product', 'product');
        query.where('orderProduct.productId = :productId', { productId: id });
        query.andWhere('product.paymentStatus = :value1', { value1: 1 });
        return query.getRawOne();
    }
}
