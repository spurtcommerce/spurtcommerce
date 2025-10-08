/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { CategoryPath } from '../models/CategoryPath';
import { VendorCategory } from '../models/VendorCategory';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class VendorCategoryRepository {
    public repository: Repository<VendorCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorCategory);
    }

    public async queryCategoryList(limit: number, offset: number, vendorId: number, keyword: string, count: number | boolean): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(CategoryPath, 'CategoryPath');
        query.select([
            'vendorCategory.vendorCategoryId as vendorCategoryId',
            'vendorCategory.vendorId as vendorId',
            'vendorCategory.categoryId as categoryId',
            'vendorCategory.vendorCategoryCommission as vendorCategoryCommission',
            'category.name as categoryName',
            'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
        ]);
        query.leftJoin('CategoryPath.path', 'path');
        query.leftJoin('CategoryPath.category', 'category');
        query.leftJoin('category.vendorCategory', 'vendorCategory');
        query.where('vendorCategory.vendorId = :id', { id: vendorId });
        query.groupBy('CategoryPath.category_id');
        if (keyword) {
            query.andWhere('category.name LIKE ' + "'%" + keyword + "%'" + ' ');
        }
        query.limit(limit);
        query.offset(offset);
        if (count) {
            return query.getCount();
        }
        return query.getRawMany();
    }

    public async vendorCategoryCount(id: number): Promise<any> {
        const query: any = await this.repository.createQueryBuilder('vendorCategory');
        query.select(['vendorCategory.vendorId as vendorCategoryCount']);
        query.where('vendorCategory.vendor_id = :value', { value: id });
        query.innerJoin('vendorCategory.vendor', 'vendor');
        return query.getCount();
    }
}
