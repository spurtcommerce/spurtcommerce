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
import { AddressRepository } from '../repositories/AddressRepository';
import { Address } from '../models/Address';
import { Brackets } from 'typeorm';

@Service()
export class AddressService {

    constructor(
        private addressRepository: AddressRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(address: Address): Promise<any> {
        this.log.info('create method called');
        return this.addressRepository.repository.save(address);
    }

    public findOne(address: any): Promise<any> {
        this.log.info('findOne method called');
        return this.addressRepository.repository.findOne(address);
    }

    public update(id: number, address: Address): Promise<any> {
        this.log.info('update method called');
        address.addressId = id;
        return this.addressRepository.repository.save(address);
    }

    public async list(limit: number, offset: number, select: any = [], relations: any = [], whereConditions: any = [], count: number | boolean): Promise<Address[] | any> {
        this.log.info('list method called');
        const condition: any = {};
        condition.where = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relations && relations.length > 0) {
            condition.relations = relations;
        }

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR', 'variant'].includes(item.sign)) {
                    return;
                }
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
            return this.addressRepository.repository.count(condition);
        } else {
            return this.addressRepository.repository.find(condition);
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
        count: boolean | number,
        rawQuery: boolean = false)
        : Promise<Address[] | any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(Address).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left-select') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'left-cond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
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
            sort.forEach((item: any, index: number) => {
                if (index === 0) {
                    const direction = typeof item.order === 'string' ? item.order.toUpperCase() : '';

                    if (direction === 'ASC' || direction === 'DESC') {

                        query.orderBy(item.name, direction);

                    }
                } else {
                    const direction = typeof item.order === 'string' ? item.order.toUpperCase() : '';

                    if (direction === 'ASC' || direction === 'DESC') {

                        query.addOrderBy(item.name, direction);

                    }
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
        this.log.info('delete method called');
        await this.addressRepository.repository.delete(id);
        return 1;
    }

    public find(address: any): Promise<any> {
        this.log.info('find method called');
        return this.addressRepository.repository.find(address);
    }
}
