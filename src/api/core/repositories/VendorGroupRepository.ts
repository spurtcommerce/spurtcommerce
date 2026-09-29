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
import { VendorGroup } from '../models/VendorGroup';

@Service()
export class VendorGroupRepository {
    public repository: Repository<VendorGroup>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorGroup);
    }
    public async getVendorCount(id: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(VendorGroup, 'vendorGroup');
        query.select(['vendorGroup.groupId as vendorCount']);
        query.where('vendorGroup.id = :value', { value: id });
        query.innerJoin('vendorGroup.vendor', 'vendor');
        return query.getCount();
    }
}
