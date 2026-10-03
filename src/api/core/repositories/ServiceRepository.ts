/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Services } from '../models/Service';
import { ServiceToCategory } from '../models/ServiceToCategory';

@Service()
export class ServiceRepository {
  public repository: Repository<Services>;
  constructor() {
    this.repository = getDataSource().getRepository(Services);
  }
  public async serviceList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], count: number | boolean): Promise<any> {
    const query: any = await this.repository.manager.createQueryBuilder(Services, 'service');
    // Select
    if (select && select.length > 0) {
      query.select(select);
    }
    // Keyword Search
    if (searchConditions && searchConditions.length > 0) {
      searchConditions.forEach((table: any, index: number) => {
        if (typeof table.name !== 'string' || !/^[A-Za-z_][A-Za-z0-9_.]*$/.test(table.name)) {
          return;
        }
        const operator: string = table.op;
        if (operator === 'where' && table.value !== '') {
          query.where(`${table.name} = :searchValue_${index}`, { [`searchValue_${index}`]: table.value });
        } else if (operator === 'and' && table.value !== '') {
          query.andWhere(`${table.name} LIKE :likeVal`, { likeVal: `%${table.value}%` });
        } else if (operator === 'or' && table.value !== '') {
          query.orWhere(`${table.name} LIKE :likeVal`, { likeVal: `%${table.value}%` });
        } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
          query.andWhere(`${table.name} = :searchValue_${index}`, { [`searchValue_${index}`]: table.value });
        }

      });
    }
    // Keyword Search
    if (categoryId) {
      if (whereConditions && whereConditions.length > 0) {
        whereConditions.forEach((table: any, index: number) => {
          if (typeof table.name !== 'string' || !/^[A-Za-z_][A-Za-z0-9_.]*$/.test(table.name)) {
            return;
          }
          const operator: string = table.op;
          if (operator === 'inraw' && table.value !== undefined) {
            const parameterName = `categoryId_${index}`;
            const subQb = this.repository.manager
              .getRepository(ServiceToCategory)
              .createQueryBuilder('serviceToCategory')
              .select('service_id')
              .where(`service_category_id = :${parameterName}`, { [parameterName]: table.value });
            query.andWhere(`${table.name} IN (${subQb.getQuery()})`);
            query.setParameters(subQb.getParameters());
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
