import { Repository } from 'typeorm';
import { VendorGroupCategory } from '../models/VendorGroupCategory';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class VendorGroupCategoryRepository {
    public repository: Repository<VendorGroupCategory>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorGroupCategory);
    }
    public async groupCategoryCount(id: number): Promise<any> {
        const query: any = await this.repository.createQueryBuilder('vendorCategory');
        query.select(['vendorCategory.groupId as vendorCategoryCount']);
        query.where('vendorCategory.vendor_group_id = :value', { value: id });
        query.innerJoin('vendorCategory.category', 'vendorGroupCategory');
        return query.getCount();
    }
}
