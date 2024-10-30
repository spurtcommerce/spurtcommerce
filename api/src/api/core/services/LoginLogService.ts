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
import { Like } from 'typeorm/index';
import { LoginLogRepository } from '../repositories/LoginLogRepository';

@Service()
export class LoginLogService {

    constructor(
        @OrmRepository() private loginLogRepository: LoginLogRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create banner
    public async create(loginLog: any): Promise<any> {
        this.log.info('Create a new log ');
        return this.loginLogRepository.save(loginLog);
    }

    // find Condition
    public findOne(loginLog: any): Promise<any> {
        return this.loginLogRepository.findOne(loginLog);
    }

    // update loginlog
    public update(id: any, loginLog: any): Promise<any> {
        loginLog.id = id;
        return this.loginLogRepository.save(loginLog);
    }

    // log List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.loginLogRepository.count(condition);
        } else {
            return this.loginLogRepository.find(condition);
        }
    }

    // delete loginlog
    public async delete(id: number): Promise<any> {
        return await this.loginLogRepository.delete(id);
    }

    // log list query
    public async logList(limit: number): Promise<any> {
        return await this.loginLogRepository.logList(limit);
    }
    // log list query
    public async customerVisitList(month: number, year: number): Promise<any> {
        return await this.loginLogRepository.customerVisitList(month, year);
    }
}
