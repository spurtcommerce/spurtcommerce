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
import { Blog } from '../models/Blog';
@Service()
export class BlogRepository {
    public repository: Repository<Blog>;
    constructor() {
        this.repository = getDataSource().getRepository(Blog);
    }
    public async blogSlug(data: string): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(Blog, 'blog');
        query.where('blog.title = :value', { value: data });
        return query.getMany();
    }

    public async checkSlugData(slug: string, id: number): Promise<number> {
        const query = await this.repository.manager.createQueryBuilder(Blog, 'blog');
        query.where('blog.blog_slug = :slug', { slug });
        if (id > 0) {
            query.andWhere('blog.id != :id', { id });
        }
        return query.getCount();
    }
}
