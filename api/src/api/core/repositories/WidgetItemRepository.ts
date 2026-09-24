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
import { WidgetItem } from '../models/WidgetItem';

@Service()
export class WidgetItemRepository {
    public repository: Repository<WidgetItem>;
    constructor() {
        this.repository = getDataSource().getRepository(WidgetItem);
    }
    public async findProduct(productId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(WidgetItem, 'widgetItem');
        query.select(['widgetItem.id as id']);
        query.innerJoin('widgetItem.widget', 'widget');
        query.where('widgetItem.refId = :productId', { productId });
        query.andWhere('widget.widgetLinkType = :value1', { value1: 2 });
        return query.getRawMany();
    }

    public async findCategory(categoryId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(WidgetItem, 'widgetItem');
        query.select(['widgetItem.id as id']);
        query.innerJoin('widgetItem.widget', 'widget');
        query.where('widgetItem.refId = :categoryId', { categoryId });
        query.andWhere('widget.widgetLinkType = :value1', { value1: 1 });
        return query.getRawMany();
    }
}
