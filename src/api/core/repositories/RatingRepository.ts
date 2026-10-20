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
import { Product } from '../../core/models/ProductModel';
import { ProductRating } from '../models/ProductRating';
@Service()
export class RatingRepository {
    public repository: Repository<ProductRating>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductRating);
    }
    public async ratingConsolidate(id: number): Promise<any> {

        const consolidate = await this.repository.manager.createQueryBuilder(ProductRating, 'rating')
            .select(['AVG(rating.rating) as RatingCount'])
            .where('rating.skuId = :skuId', { skuId: id })
            .andWhere('rating.isActive = :value', { value: 1 })
            .getRawOne();
        return consolidate;
    }

    // rating statistics
    public async ratingStatistics(id: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(ProductRating, 'productRating');
        query.select(['COUNT(productRating.rating) as rating']);
        query.addSelect(['COUNT(productRating.review) as review']);
        query.where('productRating.skuId = :skuId', { skuId: id });
        query.andWhere('productRating.isActive = :value', { value: 1 });
        return query.getRawOne();
    }

    // get review count
    public async getReviewCount(id: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(ProductRating, 'productRating');
        query.select(['COUNT(productRating.review) as review']);
        query.where('productRating.skuId = :skuId', { skuId: id });
        query.andWhere('productRating.isActive = :value', { value: 1 });
        query.andWhere('productRating.review IS NOT NULL');
        return query.getRawOne();
    }

    public async ratingConsolidateForVendor(id: number): Promise<any> {
        const consolidate = await this.repository.manager.createQueryBuilder(ProductRating, 'rating')
            .select(['AVG(rating.rating) as RatingCount', 'COUNT(rating.review) as ReviewCount'])
            .innerJoin('rating.product', 'product')
            .innerJoin('product.vendorProducts', 'vendorProducts')
            .where('vendorProducts.vendorId = :vendorId', { vendorId: id })
            .andWhere('rating.isActive = :value', { value: 1 })
            .getRawOne();
        return consolidate;
    }

    public async productRatingList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(ProductRating, 'rating');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // where condition
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    const subQb = this.repository.manager
                        .getRepository(Product)
                        .createQueryBuilder('product')
                        .select('product_id')
                        .where('name LIKE ' + "'%" + table.value + "%'" + ' ');
                    query.where(table.name + ' IN (' + subQb.getSql() + ')');
                }
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        query.orderBy('rating.rating_id', 'DESC');
        if (count) {
            return query.getCount();
        }
        return query.getMany();
    }
}
