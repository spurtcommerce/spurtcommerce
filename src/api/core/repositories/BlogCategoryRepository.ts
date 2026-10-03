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
import { BlogCategory } from '../models/BlogCategory';

@Service()
export class BlogCategoryRepository {
    public repository: Repository<BlogCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(BlogCategory);
    }
    public async checkSlugData(slug: string, id: number): Promise<number> {
        const query = await this.repository.manager.createQueryBuilder(BlogCategory, 'blogCategory');
        query.where('blogCategory.categorySlug = :slug', { slug });
        if (id > 0) {
            query.andWhere('blogCategory.categoryId != :id', { id });
        }
        return query.getCount();
    }

    public async categoryCount(limit: number, offset: number, keyword: string, sortOrder: number, status: string, tenantId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(BlogCategory, 'category');
        query.select('COUNT(category.blogCategoryId) as categoryCount');
        if (status !== '') {
            query.where('category.is_Active = :value', { value: status });
        }
        if (keyword && keyword !== '') {
            query.andWhere('category.name LIKE :keyword', { keyword: `%${keyword}%` });
        }
        if (tenantId) {
            query.where('category.tenant_id = :value', { value: tenantId });
        }
        query.orderBy('category.created_date', 'DESC');
        query.limit(limit);
        query.offset(offset);
        return query.getRawOne();
    }
}
