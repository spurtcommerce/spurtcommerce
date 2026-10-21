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
import { ProductRelated } from '../models/ProductRelated';

@Service()
export class ProductRelatedRepository {
    public repository: Repository<ProductRelated>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductRelated);
    }
    public async productRelatedCount(id: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(ProductRelated, 'relatedProduct');
        query.select(['relatedProduct.productId']);
        query.where('relatedProduct.productId = :productId', { productId: id });
        return query.getCount();
    }
}
