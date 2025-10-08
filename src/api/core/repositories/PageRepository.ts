/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Page } from '../models/Page';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class PageRepository {
    public repository: Repository<Page>;
    constructor() {
        this.repository = getDataSource().getRepository(Page);
    }

    public async pageSlug(data: string): Promise<any> {
        const query: any = await this.repository.createQueryBuilder('page');
        query.where('page.title = :value', { value: data });
        return query.getMany();
    }

    public async checkSlugData(slug: string, id: number): Promise<number> {
        const query = await this.repository.createQueryBuilder('page');
        query.where('page.slug_name = :slug', { slug });
        if (id > 0) {
            query.andWhere('page.page_id != :id', { id });
        }
        return query.getCount();
    }
}
