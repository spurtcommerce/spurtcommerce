/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {EntityRepository, Repository} from 'typeorm';

import {LoginLog} from '../models/LoginLog';

@EntityRepository(LoginLog)
export class LoginLogRepository extends Repository<LoginLog> {
    public async logList(limit: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(LoginLog, 'LoginLog');
        query.select(['COUNT(LoginLog.id) as logcount', 'DATE(created_date) as createdDate']);
        query.groupBy('createdDate');
        query.orderBy('createdDate', 'DESC');
        query.limit(limit);
        console.log(query.getQuery());
        return query.getRawMany();
    }
}
