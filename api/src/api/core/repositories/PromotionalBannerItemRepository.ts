/*
 * Spurtcommerce PRO
 * version 4.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { PromotionalBannerItem } from '../models/PromotionalBannerItem';

@EntityRepository(PromotionalBannerItem)
export class PromotionalBannerItemRepository extends Repository<PromotionalBannerItem>  {

    public async findProduct(productId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(PromotionalBannerItem, 'promotionalBannerItem');
        query.select(['promotionalBannerItem.id as id']);
        query.innerJoin('promotionalBannerItem.promotionalBanner', 'promotionalBanner');
        query.where('promotionalBannerItem.refId = :productId', { productId });
        query.andWhere('promotionalBanner.bannerLinkType = :value1', { value1: 2 });
        return query.getRawMany();
    }

    public async findCategory(categoryId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(PromotionalBannerItem, 'promotionalBannerItem');
        query.select(['promotionalBannerItem.id as id']);
        query.innerJoin('promotionalBannerItem.promotionalBanner', 'promotionalBanner');
        query.where('promotionalBannerItem.refId = :categoryId', { categoryId });
        query.andWhere('promotionalBanner.bannerLinkType = :value1', { value1: 1 });
        return query.getRawMany();
    }

}
