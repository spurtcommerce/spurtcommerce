/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { SiteFilterCategory } from '../models/SiteFilterCategory';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class SiteFilterCategoryRepository {
    public repository: Repository<SiteFilterCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(SiteFilterCategory);
    }

    public async findDuplicateCategory(id: number, filterId: number): Promise<any> {
        const query: any = await this.repository.createQueryBuilder('siteFilterCategory');
        query.where('siteFilterCategory.categoryId = :id', { id });
        query.andWhere('siteFilterCategory.filterId != :filterId', { filterId });
        return query.getRawOne();
    }
}
