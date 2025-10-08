/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { CategoryPath } from '../models/CategoryPath';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class CategoryPathRepository {
    public repository: Repository<CategoryPath>;
    constructor() {
        this.repository = getDataSource().getRepository(CategoryPath);
    }

    public async findOneCategoryLevel(categorySlug: string): Promise<any> {
        const query: any = await this.repository.createQueryBuilder('categoryPath');
        query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'categoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
        query.leftJoin('categoryPath.category', 'category');
        query.leftJoin('categoryPath.path', 'path');
        query.andWhere('category.category_slug = ' + "'" + categorySlug + "'" + ' ');
        query.groupBy('categoryPath.category_id');
        return query.getRawOne();
    }
}
