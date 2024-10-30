/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';

import { Category } from '../models/CategoryModel';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>  {

    public async categorySlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Category, 'category');
        query.orWhere('category.name = :name', { name: data });
        return query.getMany();
    }

    public async categorySlugData(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Category, 'category');
        query.select('category_slug');
        query.orWhere('category.name = :name', { name: data });
        return query.getMany();
    }

    public async categoryCount(limit: number, offset: number, keyword: string, sortOrder: number, status: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Category, 'category');
        query.select('COUNT(category.categoryId) as categoryCount');
        if (status !== '') {
            query.where('category.is_Active = :value', { value: status });
        }
        if (keyword !== undefined && keyword !== '') {
            query.andWhere('category.name LIKE ' + "'%" + keyword + "%'" + ' ');
        }
        query.orderBy('category.created_date', 'DESC');
        query.limit(limit);
        query.offset(offset);
        return query.getRawOne();
    }

    public async checkSlugData(slug: string, id: number): Promise<number> {
        const query = await this.manager.createQueryBuilder(Category, 'category');
        query.where('category.category_slug = :slug', { slug });
        if (id > 0) {
            query.andWhere('category.categoryId != :id', { id });
        }
        return query.getCount();
    }

    public async findCategory(categoryName: string, parentId: number): Promise<any> {
        const query = await this.manager.createQueryBuilder(Category, 'category');
        query.where('LOWER(category.name) = :categoryName', {categoryName});
        if (parentId !== 0) {
            query.andWhere('category.parentInt = :parentId', {parentId});
        }
        return query.getOne();
    }
}
