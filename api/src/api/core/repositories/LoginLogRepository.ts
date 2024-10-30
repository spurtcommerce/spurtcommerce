/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';

import { LoginLog } from '../models/LoginLog';

@EntityRepository(LoginLog)
export class LoginLogRepository extends Repository<LoginLog> {
    public async logList(limit: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(LoginLog, 'LoginLog');
        query.select(['COUNT(LoginLog.id) as logcount', 'DATE(created_date) as createdDate']);
        query.groupBy('createdDate');
        query.orderBy('createdDate', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }

    public async customerVisitList( month: number, year: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(LoginLog, 'loginLog');
        query.select(['COUNT(loginLog.id) as visitCount', 'MAX(DAYOFMONTH(created_date)) as dayOfMonth', 'MAX(MONTH(created_date)) as month', 'MAX(YEAR(created_date)) as year']);
        if (month && year) {
            query.andWhere('MONTH(loginLog.created_date) = :month AND YEAR(loginLog.created_date) = :year', {month, year});
        }
        query.groupBy('DATE(created_date)');
        query.orderBy('DATE(created_date)', 'ASC');
        return query.getRawMany();
    }
}
