/*
 * Spurtcommerce PRO
 * version 4.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { WidgetItem } from '../models/WidgetItem';

@EntityRepository(WidgetItem)
export class WidgetItemRepository extends Repository<WidgetItem>  {

    public async findProduct(productId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(WidgetItem, 'widgetItem');
        query.select(['widgetItem.id as id']);
        query.innerJoin('widgetItem.widget', 'widget');
        query.where('widgetItem.refId = :productId', { productId });
        query.andWhere('widget.widgetLinkType = :value1', { value1: 2 });
        return query.getRawMany();
    }

    public async findCategory(categoryId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(WidgetItem, 'widgetItem');
        query.select(['widgetItem.id as id']);
        query.innerJoin('widgetItem.widget', 'widget');
        query.where('widgetItem.refId = :categoryId', { categoryId });
        query.andWhere('widget.widgetLinkType = :value1', { value1: 1 });
        return query.getRawMany();
    }

}
