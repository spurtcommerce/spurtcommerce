/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Services } from '../models/Service';
import { ServiceToCategory } from '../models/ServiceToCategory';

@EntityRepository(Services)
export class ServiceRepository extends Repository<Services>  {
    public async serviceList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], count: number | boolean): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Services, 'service');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    query.where(table.name + ' = ' + table.value);
                } else if (operator === 'and' && table.value !== '') {
                    query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'or' && table.value !== '') {
                    query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                    query.andWhere(table.name + ' = ' + table.value);
                }

            });
        }
        // Keyword Search
        if (categoryId) {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((table: any) => {
                    const operator: string = table.op;
                    if (operator === 'inraw' && table.value !== undefined) {
                        const subQb = this.manager
                            .getRepository(ServiceToCategory)
                            .createQueryBuilder('serviceToCategory')
                            .select('service_id')
                            .where('service_category_id = ' + table.value);
                        query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                });
            }
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (count) {
            return query.getCount();
        }
        return query.getRawMany();
    }
}
