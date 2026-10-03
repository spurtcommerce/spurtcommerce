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
import { VendorGroupCategory } from '../models/VendorGroupCategory';

@Service()
export class VendorGroupCategoryRepository {
    public repository: Repository<VendorGroupCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorGroupCategory);
    }
    public async groupCategoryCount(id: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(VendorGroupCategory, 'vendorCategory');
        query.select(['vendorCategory.groupId as vendorCategoryCount']);
        query.where('vendorCategory.vendor_group_id = :value', { value: id });
        query.innerJoin('vendorCategory.category', 'vendorGroupCategory');
        return query.getCount();
    }
}
