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
import { VendorOrders } from '../models/VendorOrders';
import { VendorOrdersRepository } from '../repositories/VendorOrdersRepository';
import { Like, Brackets, getConnection } from 'typeorm';

@Service()
export class VendorOrdersService {

    constructor(
        @OrmRepository() private vendorOrdersRepository: VendorOrdersRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Role
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.vendorOrdersRepository.findOne(findCondition);
    }
    // Role list
    public list(limit: any, offset: any, select: any = [], relation: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.vendorOrdersRepository.count(condition);
        }
        return this.vendorOrdersRepository.find(condition);
    }

    // create role
    public async create(vendorOrders: VendorOrders): Promise<VendorOrders> {
        const newVendorCategory = await this.vendorOrdersRepository.save(vendorOrders);
        return newVendorCategory;
    }

    // update role
    public update(id: any, vendorOrders: VendorOrders): Promise<VendorOrders> {
        this.log.info('Update a vendorOrders');
        vendorOrders.vendorOrderId = id;
        return this.vendorOrdersRepository.save(vendorOrders);
    }

    // delete role
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a vendorOrders');
        const deleteVendor = await this.vendorOrdersRepository.delete(id);
        return deleteVendor;
    }

    // find Services
    public findAll(data: any): Promise<any> {
        return this.vendorOrdersRepository.find(data);
    }

    // create role
    public async searchOrderList(id: number, orderDate: string, startDate: string, endDate: string, keyword: string, deliverylist: number): Promise<VendorOrders> {
        const recentOrder = await this.vendorOrdersRepository.searchOrderList(id, orderDate, startDate, endDate, keyword, deliverylist);
        return recentOrder;
    }

    public async searchOrderListt(id: number, deliverylist: number): Promise<VendorOrders> {
        const Order = await this.vendorOrdersRepository.searchOrderListt(id, deliverylist);
        return Order;
    }

    // find today orders count
    public async findVendorTodayOrderCount(id: number, todaydate: string): Promise<any> {
        return await this.vendorOrdersRepository.findVendorTodayOrderCount(id, todaydate);
    }

    // find buyer count and sales count
    public async getBuyersCount(id: number): Promise<any> {
        return await this.vendorOrdersRepository.getTotalBuyers(id);
    }

    // find vendor count
    public async findVendorCount(id: number): Promise<any> {
        return await this.vendorOrdersRepository.findVendorCount(id);
    }

    // find vendors
    public async findVendors(id: number): Promise<any> {
        return await this.vendorOrdersRepository.findVendors(id);
    }

    // getting each product revenue including commission
    public async getEachProductRevenue(productId: number, vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getEachProductRevenue(productId, vendorId);
    }

    // getting each vendor revenue including commission
    public async getTotalVendorRevenue(vendorId: number): Promise<any> {
        return await this.vendorOrdersRepository.getTotalVendorRevenue(vendorId);
    }

    // getting total amount for each order
    public async findSumOfAmount(orderId: number, vendorId: number): Promise<any> {
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

        const query: any = await getConnection().getRepository(VendorOrders).createQueryBuilder();
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
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

    // getting order count based status
    public async findOrderCountBasedStatus(vendorId: number, duration: number, statusId: number): Promise<any> {
        return await this.vendorOrdersRepository.findOrderCountBasedStatus(vendorId, duration, statusId);
    }

    // getting order count based duration
    public async findOrderCountBasedDuration(vendorId: number, duration: number): Promise<any> {
        return await this.vendorOrdersRepository.findOrderCountBasedDuration(vendorId, duration);
    }

    // finding product sold based in duration
    public async productSoldBasedOnDuration(vendorId: number, duration: number): Promise<any> {
        return await this.vendorOrdersRepository.productSoldBasedOnDuration(vendorId, duration);
    }

    // finding delivered order based in duration
    public async deliveredOrderBasedOnDuration(vendorId: number, duration: number): Promise<any> {
        return await this.vendorOrdersRepository.deliveredOrderBasedOnDuration(vendorId, duration);
    }
}
