/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Plugins } from '../models/Plugin';

@EntityRepository(Plugins)
export class PluginRepository extends Repository<Plugins> {
    public async pluginList(limit: number, offset: number, count: number | boolean): Promise<any> {
        const query = await this.manager.createQueryBuilder(Plugins, 'plugins');
        query.select(['plugins.pluginName', 'plugins.pluginType', 'plugins.pluginStatus', 'plugins.slugName', 'plugins.pluginAdditionalInfo']);
        query.where('plugins.pluginType NOT IN (:names)', { names: ['Payment'] }); // 'Oauth'

        if (limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        if (count) {
            return query.getCount();
        }
        return query.getMany();
    }
}
