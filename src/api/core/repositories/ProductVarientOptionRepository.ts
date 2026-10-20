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
import { ProductVarientOption } from '../models/ProductVarientOption';

@Service()
export class ProductVarientOptionRepository {
    public repository: Repository<ProductVarientOption>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductVarientOption);
    }
      public async variantCount(id: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(ProductVarientOption, 'productVarientOption');
        query.select(['productVarientOption.id as variantCount']);
        query.innerJoin('productVarientOption.product', 'product');
        query.where('productVarientOption.productId = ' + id);
        query.andWhere('product.isSimplified = 0');
        return query.getCount();
    }

    public async findSkuForProductVarient(productId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(ProductVarientOption, 'productVarientOption');
        query.select(['skuDetail.id as id', 'skuDetail.skuName as skuName', 'skuDetail.price as price', 'skuDetail.enableBackOrders as enableBackOrders', 'skuDetail.backOrderStockLimit as backOrderStockLimit', 'skuDetail.outOfStockThreshold as outOfStockThreshold', 'skuDetail.notifyMinQuantity as notifyMinQuantity', 'skuDetail.minQuantityAllowedCart as minQuantityAllowedCart', 'skuDetail.maxQuantityAllowedCart as maxQuantityAllowedCart',
            '(SELECT pvi.image as image FROM product_varient_option_image pvi WHERE pvi.id = productVarientOption.id AND pvi.default_image = 1 LIMIT 1) as image',
            '(SELECT pvi.container_name as containerName FROM product_varient_option_image pvi WHERE pvi.id = productVarientOption.id AND pvi.default_image = 1 LIMIT 1) as containerName',
        ]);
        query.leftJoin('productVarientOption.product', 'product');
        query.leftJoin('productVarientOption.skuDetail', 'skuDetail');
        query.where('productVarientOption.productId = :id', { id: productId });
        return query.getRawMany();
    }
}
