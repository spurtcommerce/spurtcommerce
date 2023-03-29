/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { EntityRepository, Repository } from 'typeorm';
import { Widget } from '../models/Widget';

@EntityRepository(Widget)
export class WidgetRepository extends Repository<Widget>  {

    public async widgetSlug(data: string, id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Widget, 'widget');
        query.select(['widget.widget_id as widgetId', 'widget.widget_slug_name as widgetSlugName', 'widget.widget_title as widgetTitle']);
        query.where('widget.widget_title = :value', { value: data });
        if (id !== 0) {
            query.andWhere('widget.widget_id != :id', { id });
        }
        return query.getRawMany();
    }
}
