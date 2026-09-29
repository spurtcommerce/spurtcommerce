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
import { Widget } from '../../core/models/Widget';

@Service()
export class WidgetRepository {
    public repository: Repository<Widget>;
    constructor() {
        this.repository = getDataSource().getRepository(Widget);
    }
    public async widgetSlug(title: string, id: number, tenantId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(Widget, 'widget');
        query.select(['widget.widget_id as widgetId', 'widget.widget_slug_name as widgetSlugName', 'widget.widget_title as widgetTitle', 'widget.tenant_id as tenantId']);
        query.where('widget.widget_title = :title', { title });
        query.andWhere('widget.tenant_id = :tenantId', { tenantId });
        if (id !== 0) {
            query.andWhere('widget.widget_id != :id', { id });
        }
        return query.getRawMany();
    }
}
