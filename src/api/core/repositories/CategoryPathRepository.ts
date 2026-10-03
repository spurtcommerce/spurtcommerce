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
import { CategoryPath } from '../models/CategoryPath';

@Service()
export class CategoryPathRepository {
    public repository: Repository<CategoryPath>;
    constructor() {
        this.repository = getDataSource().getRepository(CategoryPath);
    }
    public async findOneCategoryLevel(categorySlug: string, tenantId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(CategoryPath, 'categoryPath');
        query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'categoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
        query.leftJoin('categoryPath.category', 'category');
        query.leftJoin('categoryPath.path', 'path');
        query.andWhere('category.category_slug = :categorySlug', { categorySlug });
        query.andWhere('category.tenant_id = :tenantId', { tenantId });
        query.groupBy('categoryPath.category_id');
        return query.getRawOne();
    }

    public async findOneCategoryLevelForAdmin(categorySlug: string): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(CategoryPath, 'categoryPath');
        query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'categoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
        query.leftJoin('categoryPath.category', 'category');
        query.leftJoin('categoryPath.path', 'path');
        query.andWhere('category.category_slug = :categorySlug', { categorySlug });
        query.groupBy('categoryPath.category_id');
        return query.getRawOne();
    }
}
