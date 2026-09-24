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
import { ProductDiscount } from '../models/ProductDiscount';

@Service()
export class ProductDiscountRepository {
  public repository: Repository<ProductDiscount>;
  constructor() {
    this.repository = getDataSource().getRepository(ProductDiscount);
  }
      public async findDiscountPrice(productId: number, todaydate: string): Promise<any> {

        const query: any = await this.repository.manager.createQueryBuilder(ProductDiscount, 'productDiscount');
        query.select(['productDiscount.price as price', 'productDiscount.dateStart as dateStart', 'productDiscount.dateEnd as dateEnd']);
        query.where('productDiscount.productId = ' + productId);
        query.andWhere('(productDiscount.dateStart <= :todaydate AND productDiscount.dateEnd >= :todaydate)', {todaydate});
        query.orderBy('productDiscount.priority', 'ASC');
        query.addOrderBy('productDiscount.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }

    public async findDiscountPricewithSku(productId: number, skuId: number, todaydate: string): Promise<any> {

        const query: any = await this.repository.manager.createQueryBuilder(ProductDiscount, 'productDiscount');
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
