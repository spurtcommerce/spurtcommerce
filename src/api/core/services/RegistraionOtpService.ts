/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { RegistrationOtp } from '../models/RegistrationOtpModel';
import { RegistrationOtpRepository } from '../repositories/RegistrationUserRepository';
import { Brackets, FindOneOptions, Like } from 'typeorm';

@Service()
export class RegistrationOtpService {

    constructor(
        private registrationOtpRepository: RegistrationOtpRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: FindOneOptions<RegistrationOtp>): Promise<RegistrationOtp> {
        this.log.info('findOne method called');
        return this.registrationOtpRepository.repository.findOne(findCondition);
    }

    public async create(userOtp: RegistrationOtp): Promise<RegistrationOtp> {
        this.log.info('create method called');
        return await this.registrationOtpRepository.repository.save(userOtp);
    }

    public update(id: any, userOtp: RegistrationOtp): Promise<RegistrationOtp> {
        this.log.info('update method called');
        userOtp.id = id;
        return this.registrationOtpRepository.repository.save(userOtp);
    }

    public findAll(findCondition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.registrationOtpRepository.repository.find(findCondition);
    }

    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], searchCondition: any = [], keyword: string, count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = {
                userOtpName: Like('%' + keyword + '%'),
            };
        }

        condition.where = (qb: { where: (arg0: string) => void; andWhere: (arg0: string | Brackets) => void; orWhere: (arg0: string) => void; }) => {
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
            return this.registrationOtpRepository.repository.count(condition);
        } else {
            return this.registrationOtpRepository.repository.find(condition);
        }

    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.registrationOtpRepository.repository.delete(id);
    }

    public async deleteByCondition(condition: any): Promise<any> {
        this.log.info('deleteByCondition called', condition);
        return this.registrationOtpRepository.repository.delete(condition);
    }

    public async updateByCondition(condition: any, payload: Partial<RegistrationOtp>): Promise<any> {
        return await this.registrationOtpRepository.repository.update(condition, payload);
    }
}
