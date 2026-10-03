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
import { VendorOrders } from '../models/VendorOrders';
import { VendorOrdersRepository } from '../repositories/VendorOrdersRepository';
import { Like, Brackets } from 'typeorm';

@Service()
export class VendorOrdersService {

    constructor(
        private vendorOrdersRepository: VendorOrdersRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorOrdersRepository.repository.findOne(findCondition);
    }

    public list(limit: any, offset: any, select: any = [], relation: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && (table.value !== undefined || table.value !== '')) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
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
            return this.vendorOrdersRepository.repository.count(condition);
        }
        return this.vendorOrdersRepository.repository.find(condition);
    }

    public async create(vendorOrders: VendorOrders): Promise<VendorOrders> {
        this.log.info('create method called');
        const newVendorCategory = await this.vendorOrdersRepository.repository.save(vendorOrders);
        return newVendorCategory;
    }

    public update(id: any, vendorOrders: VendorOrders): Promise<VendorOrders> {
        this.log.info('update method called');
        vendorOrders.vendorOrderId = id;
        return this.vendorOrdersRepository.repository.save(vendorOrders);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const deleteVendor = await this.vendorOrdersRepository.repository.delete(id);
        return deleteVendor;
    }

    public findAll(condition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.vendorOrdersRepository.repository.find(condition);
    }

    public async searchOrderList(id: number, orderDate: string, startDate: string, endDate: string, keyword: string, deliverylist: number): Promise<VendorOrders[]> {
        this.log.info('searchOrderList method called');
        const recentOrder = await this.vendorOrdersRepository.searchOrderList(id, orderDate, startDate, endDate, keyword, deliverylist);
        return recentOrder;
    }

    public async searchOrderListt(id: number, deliverylist: number): Promise<VendorOrders> {
        this.log.info('searchOrderListt method called');
        return await this.vendorOrdersRepository.searchOrderListt(id, deliverylist);
    }

    public async findVendorTodayOrderCount(id: number, todaydate: string): Promise<any> {
        this.log.info('findVendorTodayOrderCount method called');
        return await this.vendorOrdersRepository.findVendorTodayOrderCount(id, todaydate);
    }

    public async getBuyersCount(id: number): Promise<any> {
        this.log.info('getBuyersCount method called');
        return await this.vendorOrdersRepository.getTotalBuyers(id);
    }

    public async findVendorCount(id: number): Promise<any> {
        this.log.info('findVendorCount method called');
        return await this.vendorOrdersRepository.findVendorCount(id);
    }

    public async findVendors(id: number): Promise<any> {
        this.log.info('findVendors method called');
        return await this.vendorOrdersRepository.findVendors(id);
    }

    // getting each product revenue including commission
    public async getEachProductRevenue(productId: number, vendorId: number): Promise<any> {
        this.log.info('getEachProductRevenue method called');
        return await this.vendorOrdersRepository.getEachProductRevenue(productId, vendorId);
    }

    // getting each vendor revenue including commission
    public async getTotalVendorRevenue(vendorId: number): Promise<any> {
        this.log.info('getTotalVendorRevenue method called');
        return await this.vendorOrdersRepository.getTotalVendorRevenue(vendorId);
    }

    // getting total amount for each order
    public async findSumOfAmount(orderId: number, vendorId: number): Promise<any> {
        this.log.info('findSumOfAmount method called');
        return await this.vendorOrdersRepository.findSumOfAmount(orderId, vendorId);
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
        count: boolean | number,
        rawQuery: boolean = false)
        : Promise<VendorOrders[] | number> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(VendorOrders).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'cond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
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

    // getting order count based status
    public async findOrderCountBasedStatus(vendorId: number, duration: number, statusId: number): Promise<any> {
        this.log.info('findOrderCountBasedStatus method called');
        return await this.vendorOrdersRepository.findOrderCountBasedStatus(vendorId, duration, statusId);
    }

    // getting order count based duration
    public async findOrderCountBasedDuration(vendorId: number, duration: number): Promise<any> {
        this.log.info('findOrderCountBasedDuration method called');
        return await this.vendorOrdersRepository.findOrderCountBasedDuration(vendorId, duration);
    }

    // finding product sold based in duration
    public async productSoldBasedOnDuration(vendorId: number, duration: number): Promise<any> {
        this.log.info('productSoldBasedOnDuration method called');
        return await this.vendorOrdersRepository.productSoldBasedOnDuration(vendorId, duration);
    }

    // finding delivered order based in duration
    public async deliveredOrderBasedOnDuration(vendorId: number, duration: number): Promise<any> {
        this.log.info('deliveredOrderBasedOnDuration method called');
        return await this.vendorOrdersRepository.deliveredOrderBasedOnDuration(vendorId, duration);
    }

    public async revenueOverview(vendorId: number, duration: number): Promise<any> {
        return await this.vendorOrdersRepository.revenueOverview(vendorId, duration);
    }

    public async getCurrentMonthOrderCount(vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getCurrentMonthOrderCount(vendorId);
    }

    public async getLastMonthOrderCount(vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getLastMonthOrderCount(vendorId);
    }

    public async getCurrentMonthSalesCount(vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getCurrentMonthSalesCount(vendorId);
    }

    public async getLastMonthSalesCount(vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getLastMonthSalesCount(vendorId);
    }

    public async getCurrentMonthRevenue(vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getCurrentMonthRevenue(vendorId);
    }

    public async getLastMonthRevenue(vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getLastMonthRevenue(vendorId);
    }
}
