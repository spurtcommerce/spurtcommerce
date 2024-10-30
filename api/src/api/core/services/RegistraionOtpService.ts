/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { RegistrationOtp } from '../models/RegistrationOtpModel';
import { RegistrationOtpRepository } from '../repositories/RegistrationUserRepository';
import { Brackets, FindOneOptions, Like } from 'typeorm';

@Service()
export class RegistrationOtpService {

    constructor(
        @OrmRepository() private registrationOtpRepository: RegistrationOtpRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find userOtp
    public findOne(findCondition: FindOneOptions<RegistrationOtp>): Promise<RegistrationOtp> {
        this.log.info('Find all userOtp');
        return this.registrationOtpRepository.findOne(findCondition);
    }

    // userOtp list
    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], searchCondition: any = [], keyword: string, count: number | boolean): Promise<any> {
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
            return this.registrationOtpRepository.count(condition);
        } else {
            return this.registrationOtpRepository.find(condition);
        }

    }

    // create userOtp
    public async create(userOtp: RegistrationOtp): Promise<RegistrationOtp> {
        this.log.info('Create a new userOtp => ', userOtp.toString());
        const newUserOtp = await this.registrationOtpRepository.save(userOtp);
        return newUserOtp;
    }

    // update userOtp
    public update(id: any, userOtp: RegistrationOtp): Promise<RegistrationOtp> {
        this.log.info('Update a userOtp');
        userOtp.id = id;
        return this.registrationOtpRepository.save(userOtp);
    }

    // delete userOtp
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a userOtp');
        return await this.registrationOtpRepository.delete(id);
    }

    // find userOtp
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all userOtp');
        return this.registrationOtpRepository.find(findCondition);
    }
}
