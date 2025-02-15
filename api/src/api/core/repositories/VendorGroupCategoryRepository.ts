import { EntityRepository, Repository } from 'typeorm';
import { VendorGroupCategory } from '../models/VendorGroupCategory';

@EntityRepository(VendorGroupCategory)
export class VendorGroupCategoryRepository extends Repository<VendorGroupCategory> {
    public async groupCategoryCount(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorGroupCategory, 'vendorCategory');
        query.select(['vendorCategory.groupId as vendorCategoryCount']);
        query.where('vendorCategory.vendor_group_id = :value', { value: id });
        query.innerJoin('vendorCategory.category', 'vendorGroupCategory');
        return query.getCount();
    }
}
