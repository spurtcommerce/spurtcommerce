/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { SiteFilterCategory } from '../models/SiteFilterCategory';

@EntityRepository(SiteFilterCategory)
export class SiteFilterCategoryRepository extends Repository<SiteFilterCategory>  {

    public async findDuplicateCategory(id: number, filterId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(SiteFilterCategory, 'siteFilterCategory');
        query.where('siteFilterCategory.categoryId = :id', { id });
        query.andWhere('siteFilterCategory.filterId != :filterId', { filterId });
        return query.getRawOne();
    }

}
