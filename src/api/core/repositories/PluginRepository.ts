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
import { Plugins } from '../models/Plugin';

@Service()
export class PluginRepository {
  public repository: Repository<Plugins>;
  constructor() {
    this.repository = getDataSource().getRepository(Plugins);
  }
  public async pluginList(limit: number, offset: number, count: number | boolean): Promise<any> {
    const query = await this.repository.manager.createQueryBuilder(Plugins, 'plugins');
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
