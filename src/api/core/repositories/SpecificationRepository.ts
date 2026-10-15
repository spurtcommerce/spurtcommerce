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
import { Specification } from '../models/Specification';

@Service()
export class SpecificationRepository {
    public repository: Repository<Specification>;
    constructor() {
        this.repository = getDataSource().getRepository(Specification);
    }

    public async checkSlugData(slug: string, id: number): Promise<number> {
        const query = await this.repository.manager.createQueryBuilder(Specification, 'specification');
        query.where('specification.slug = :slug', { slug });
        if (id > 0) {
            query.andWhere('specification.id != :id', { id });
        }
        return query.getCount();
    }
}
