/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { BlogCategoryPath } from '../../core/models/BlogCategoryPath';

@Service()
export class BlogCategoryPathRepository {
    public repository: Repository<BlogCategoryPath>;
    constructor() {
        this.repository = getDataSource().getRepository(BlogCategoryPath);
    }
    public async findOneCategoryLevel(categorySlug: string): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(BlogCategoryPath, 'blogCategoryPath');
        query.select(['GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'blogCategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels']);
        query.leftJoin('blogCategoryPath.blogCategory', 'blogCategory');
        query.leftJoin('blogCategoryPath.path', 'path');
        query.andWhere('blogCategoryPath.category_slug = ' + "'" + categorySlug + "'" + ' ');
        query.groupBy('blogCategoryPath.blog_category_id');
        return query.getRawOne();
    }
}
