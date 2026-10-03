/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

/* tslint:disable:no-string-literal */

import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Brackets, Like } from 'typeorm/index';
import { CustomerUserGroupRepository } from '../repositories/CustomerUserGroupRepository';
import { CustomerUserGroup } from '../models/CustomerUserGroup';

@Service()
export class CustomerUserGroupService {

    constructor(
        private customerUserGroupRepository: CustomerUserGroupRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(data: any): Promise<[] | {}> {
        this.log.info('create method called');
        return this.customerUserGroupRepository.repository.save(data);
    }

    public findOne(condition: any): Promise<CustomerUserGroup> {
        this.log.info('findOne method called');
        return this.customerUserGroupRepository.repository.findOne(condition);
    }

    public findAll(): Promise<any> {
        this.log.info('findAll method called');
        return this.customerUserGroupRepository.repository.find();
    }

    public find(condition: any): Promise<any> {
        this.log.info('find method called');
        return this.customerUserGroupRepository.repository.find(condition);
    }

    public update(id: any, obj: any): Promise<CustomerUserGroup> {
        this.log.info('update method called');
        obj.id = id;
        return this.customerUserGroupRepository.repository.save(obj);
    }

    public list(limit: any, offset: any, select: any = [], relations: any = [], whereConditions: any = [], search: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (relations && relations.length > 0) {
            condition.relations = relations;
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

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
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
            return this.customerUserGroupRepository.repository.count(condition);
        }
        return this.customerUserGroupRepository.repository.find(condition);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.customerUserGroupRepository.repository.delete(id);
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
        : Promise<CustomerUserGroup[]> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(CustomerUserGroup).createQueryBuilder('customerUserGroup');
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'leftCond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else if (joinTb.op === 'left-select') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
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
                } else if (item.op === 'allowNull' && item.sign === undefined) {
                    query.andWhere(`(${item.name} IS NULL OR ${item.name} = :value)`, { value: item.value });
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

    public async insertGorupPermissionForNewCustmer(tenantId: number, customerId: number): Promise<any> {
        this.log.info('CustomerUserGroupService: insertGorupPermissionForNewCustmer method called');

        const purchaseManagerPermissions = {
            'view-checkout': true,
            'create-checkout': true,
            'edit-checkout': true,
            'delete-checkout': true,
            'view-customer-address': true,
            'create-customer-address': true,
            'edit-customer-address': true,
            'delete-customer-address': true,
            'view-customer-profile': true,
            'create-customer-profile': true,
            'edit-customer-profile': true,
            'delete-customer-profile': true,
            'view-customer-user': true,
            'create-customer-user': true,
            'edit-customer-user': true,
            'delete-customer-user': true,
            'view-customer-user-role': true,
            'create-customer-user-role': true,
            'edit-customer-user-role': true,
            'delete-customer-user-role': true,
            'view-order-history': true,
            'create-order-history': true,
            'edit-order-history': true,
            'view-quote': true,
            'create-quote': true,
            'view-request-for-quote': true,
            'create-request-for-quote': true,
            'edit-request-for-quote': true,
            'view-shopping-list': true,
            'create-shopping-list': true,
            'edit-shopping-list': true,
            'delete-shopping-list': true,
            'view-shopping-list-line-item': true,
            'edit-shopping-list-line-item': true,
            'delete-shopping-list-line-item': true,
        };

        const buyerPermissions = {
            'view-checkout': true,
            'create-checkout': true,
            'edit-checkout': false,
            'delete-checkout': false,
            'view-customer-address': true,
            'create-customer-address': true,
            'edit-customer-address': true,
            'delete-customer-address': false,
            'view-customer-profile': true,
            'create-customer-profile': false,
            'edit-customer-profile': true,
            'delete-customer-profile': false,
            'view-customer-user': false,
            'create-customer-user': false,
            'edit-customer-user': false,
            'delete-customer-user': false,
            'view-customer-user-role': false,
            'create-customer-user-role': false,
            'edit-customer-user-role': false,
            'delete-customer-user-role': false,
            'view-order-history': true,
            'create-order-history': true,
            'edit-order-history': false,
            'view-quote': true,
            'create-quote': true,
            'view-request-for-quote': true,
            'create-request-for-quote': true,
            'edit-request-for-quote': false,
            'view-shopping-list': true,
            'create-shopping-list': true,
            'edit-shopping-list': true,
            'delete-shopping-list': true,
            'view-shopping-list-line-item': true,
            'edit-shopping-list-line-item': true,
            'delete-shopping-list-line-item': true,
        };

        const guestPermissions = {
            'view-checkout': false,
            'create-checkout': false,
            'edit-checkout': false,
            'delete-checkout': false,
            'view-customer-address': false,
            'create-customer-address': false,
            'edit-customer-address': false,
            'delete-customer-address': false,
            'view-customer-profile': false,
            'create-customer-profile': false,
            'edit-customer-profile': false,
            'delete-customer-profile': false,
            'view-customer-user': false,
            'create-customer-user': false,
            'edit-customer-user': false,
            'delete-customer-user': false,
            'view-customer-user-role': false,
            'create-customer-user-role': false,
            'edit-customer-user-role': false,
            'delete-customer-user-role': false,
            'view-order-history': false,
            'create-order-history': false,
            'edit-order-history': false,
            'view-quote': false,
            'create-quote': false,
            'view-request-for-quote': false,
            'create-request-for-quote': false,
            'edit-request-for-quote': false,
            'view-shopping-list': true,
            'create-shopping-list': false,
            'edit-shopping-list': false,
            'delete-shopping-list': false,
            'view-shopping-list-line-item': true,
            'edit-shopping-list-line-item': true,
            'delete-shopping-list-line-item': true,
        };

        const groupValues: any = [
            {
                name: 'Purchase Manager',
                slug: 'purchase-manager',
                isActive: 1,
                roleType: 1,
                tenantId,
                customerId,
                description: 'Oversees procurement operations, manages supplier relationships, and ensures cost-effective purchasing aligned with company goals.',
                permission: JSON.stringify(purchaseManagerPermissions),
            },
            {
                name: 'Buyer',
                slug: 'buyer',
                isActive: 1,
                roleType: 1,
                tenantId,
                customerId,
                description: 'Handles day-to-day purchasing, negotiates with suppliers, and ensures timely, cost-efficient procurement of goods and services.',
                permission: JSON.stringify(buyerPermissions),
            },
            {
                name: 'Guest',
                slug: 'guest',
                isActive: 1,
                roleType: 1,
                tenantId,
                customerId,
                description: 'Has limited access to view procurement data and monitor activities without making changes or approvals.',
                permission: JSON.stringify(guestPermissions),
            },
        ];

        await this.customerUserGroupRepository.repository.save(groupValues);
    }
}
