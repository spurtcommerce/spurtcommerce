/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { ProductTirePrice } from '../models/ProductTirePrice';

@EntityRepository(ProductTirePrice)
export class ProductTirePriceRepository extends Repository<ProductTirePrice>  {
    public async findTirePrice(productId: number, skuId: string, quantity: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(ProductTirePrice, 'productTirePrice');
        query.select(['productTirePrice.price as price', 'productTirePrice.quantity as quantity', 'productTirePrice.productId as productId']);
        query.where('productTirePrice.productId = ' + productId);
        query.where('productTirePrice.skuId = ' + skuId);
        query.andWhere('productTirePrice.quantity <= ' + quantity);
        query.orderBy('productTirePrice.quantity', 'DESC');
        query.limit('1');
        return query.getRawOne();
    }
}
