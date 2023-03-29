/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import {EntityRepository, Repository} from 'typeorm';
import {ProductDiscount} from '../models/ProductDiscount';

@EntityRepository(ProductDiscount)
export class ProductDiscountRepository extends Repository<ProductDiscount> {

    public async findDiscountPrice(productId: number, todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(ProductDiscount, 'productDiscount');
        query.select(['productDiscount.price as price', 'productDiscount.dateStart as dateStart', 'productDiscount.dateEnd as dateEnd']);
        query.where('productDiscount.productId = ' + productId);
        query.andWhere('(productDiscount.dateStart <= :todaydate AND productDiscount.dateEnd >= :todaydate)', {todaydate});
        query.orderBy('productDiscount.priority', 'ASC');
        query.addOrderBy('productDiscount.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }

    public async findDiscountPricewithSku(productId: number, skuId: number, todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(ProductDiscount, 'productDiscount');
        query.select(['productDiscount.price as price', 'productDiscount.dateStart as dateStart', 'productDiscount.dateEnd as dateEnd']);
        query.where('productDiscount.productId = ' + productId);
        query.where('productDiscount.skuId = ' + skuId);
        query.andWhere('(productDiscount.dateStart <= :todaydate AND productDiscount.dateEnd >= :todaydate)', {todaydate});
        query.orderBy('productDiscount.priority', 'ASC');
        query.addOrderBy('productDiscount.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }
}
