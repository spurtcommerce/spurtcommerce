/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';

import { CategoryPath } from '../models/CategoryPath';

@EntityRepository(CategoryPath)
export class CategoryPathRepository extends Repository<CategoryPath>  {

    public async findOneCategoryLevel(categorySlug: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(CategoryPath, 'categoryPath');
        query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'categoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
        query.leftJoin('categoryPath.category', 'category');
        query.leftJoin('categoryPath.path', 'path');
        query.andWhere('category.category_slug = ' + "'" + categorySlug + "'" + ' ');
        query.groupBy('categoryPath.category_id');
        return query.getRawOne();
    }
}
