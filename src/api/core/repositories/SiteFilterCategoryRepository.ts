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
import { SiteFilterCategory } from '../models/SiteFilterCategory';

@Service()
export class SiteFilterCategoryRepository {
    public repository: Repository<SiteFilterCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(SiteFilterCategory);
    }
    public async findDuplicateCategory(id: number, filterId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(SiteFilterCategory, 'siteFilterCategory');
        query.where('siteFilterCategory.categoryId = :id', { id });
        query.andWhere('siteFilterCategory.filterId != :filterId', { filterId });
        return query.getRawOne();
    }
}
