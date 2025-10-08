/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { ProductSpecial } from '../models/ProductSpecial';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class ProductSpecialRepository {
    public repository: Repository<ProductSpecial>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductSpecial);
    }

    public async findSpecialPrice(productId: number, todaydate: string): Promise<any> {

        const query: any = await this.repository.createQueryBuilder('productSpecial');
        query.select(['productSpecial.price as price', 'productSpecial.dateStart as dateStart', 'productSpecial.dateEnd as dateEnd']);
        query.where('productSpecial.productId = ' + productId);
        query.andWhere('(productSpecial.dateStart <= :todaydate AND productSpecial.dateEnd >= :todaydate)', { todaydate });
        query.orderBy('productSpecial.priority', 'ASC');
        query.addOrderBy('productSpecial.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }

    public async findSpecialPriceWithSku(productId: number, skuId: number, todaydate: string): Promise<any> {

        const query: any = await this.repository.createQueryBuilder('productSpecial');
        query.select(['productSpecial.price as price', 'productSpecial.dateStart as dateStart', 'productSpecial.dateEnd as dateEnd', 'productSpecial.skuId as skuId']);
        query.where('productSpecial.productId = ' + productId);
        query.andWhere('productSpecial.skuId = ' + skuId);
        query.andWhere('(productSpecial.dateStart <= :todaydate AND productSpecial.dateEnd >= :todaydate)', { todaydate });
        query.orderBy('productSpecial.priority', 'ASC');
        query.addOrderBy('productSpecial.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }
}
