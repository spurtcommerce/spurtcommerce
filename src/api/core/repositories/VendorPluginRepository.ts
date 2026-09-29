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
import { VendorPlugin } from '../models/VendorPlugin';

@Service()
export class VendorPluginRepository {
    public repository: Repository<VendorPlugin>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorPlugin);
    }
    public async pluginList(limit: number, offset: number, count: number | boolean, vendorId: number): Promise<any> {
        const query = await this.repository.manager.createQueryBuilder(VendorPlugin, 'vendorPlugin');
        query.select(['plugins.pluginName as pluginName', 'plugins.pluginType as pluginType', 'plugins.pluginStatus as pluginStatus', 'plugins.slugName as slugName', 'vendorPlugin.isActive as isActive', 'vendorPlugin.pluginAdditionalInfo as pluginAdditionalInfo']);
        query.where('plugins.pluginType NOT IN (:names)', { names: ['Payment'] }); // 'Oauth'
        query.andWhere('vendorPlugin.vendorId = :vendorId', { vendorId });
        query.andWhere('plugins.pluginStatus = 1');
        query.leftJoin('vendorPlugin.plugins', 'plugins');

        if (limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        if (count) {
            return query.getCount();
        }
        return query.getRawMany();
    }
}
