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
import { Brackets } from 'typeorm/index';
import { CurrencyRepository } from '../repositories/CurrencyRepository';

@Service()
export class CurrencyService {

    constructor(
        @OrmRepository() private currencyRepository: CurrencyRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create Currency
    public async create(currency: any): Promise<any> {
        this.log.info('Create a new currency ');
        return this.currencyRepository.save(currency);
    }

    // findCondition
    public findOne(country: any): Promise<any> {
        return this.currencyRepository.findOne(country);
    }

    // update currency
    public update(id: any, currency: any): Promise<any> {
        currency.currencyId = id;
        return this.currencyRepository.save(currency);
    }

    // currency List
    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], searchCondition: any[], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = (qb: { where: (arg0: string) => void; notWhere: (arg0: string) => void; andWhere: (arg0: string | Brackets) => void; orWhere: (arg0: string) => void; }) => {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((item: any) => {
                    if (item.op === 'where') {
                        qb.where(`${item.name} = ${item.value}`);
                    } else if (item.op === 'and') {
                        qb.andWhere(`${item.name} = ${item.value}`);
                    } else if (item.op === 'or') {
                        qb.orWhere(`${item.name} = ${item.value}`);
                    } else if (item.op === 'In') {
                        qb.andWhere(`${item.name} IN (${item.value})`);
                    } else if (item.op === 'raw') {
                        qb.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                });
            }
            if (searchCondition?.length > 0) {
                searchCondition.forEach((table: any) => {
                    if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            qb.andWhere(new Brackets(subqb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value: string | number, subIndex: number) => {
                                    if (subIndex === 0) {
                                        subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                        return;
                                    }
                                    subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                });
                            }));
                        });
                    } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                        qb.andWhere(new Brackets(subqb => {
                            const namesArray = table.name;
                            namesArray.forEach((name: string, index: number) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                            });
                        }));
                    } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                        qb.andWhere(new Brackets(subqb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, index: number) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    }
                });
            }
        };
        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.currencyRepository.count(condition);
        } else {
            return this.currencyRepository.find(condition);
        }

    }

    // delete currency
    public async delete(id: number): Promise<any> {
        await this.currencyRepository.delete(id);
        return;
    }
}
