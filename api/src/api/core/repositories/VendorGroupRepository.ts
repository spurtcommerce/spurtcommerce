/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorGroup } from '../models/VendorGroup';

@EntityRepository(VendorGroup)
export class VendorGroupRepository extends Repository<VendorGroup>  {
    public async getVendorCount(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorGroup, 'vendorGroup');
        query.select(['vendorGroup.groupId as vendorCount']);
        query.where('vendorGroup.id = :value', { value: id });
        query.innerJoin('vendorGroup.vendor', 'vendor');
        return query.getCount();
    }
}
