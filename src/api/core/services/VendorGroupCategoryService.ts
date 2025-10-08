import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Service } from 'typedi';
import { VendorGroupCategory } from '../models/VendorGroupCategory';
import { VendorGroupCategoryRepository } from '../repositories/VendorGroupCategoryRepository';
import { Like } from 'typeorm';

@Service()
export class VendorGroupCategoryService {
    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private vendorGrpCategoryRepository: VendorGroupCategoryRepository
    ) {}

    // create
    public create(vendorGroupCategory: VendorGroupCategory): Promise<VendorGroupCategory> {
        this.log.info('create new vendor group category');
        return this.vendorGrpCategoryRepository.repository.save(vendorGroupCategory);
    }

    // find
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find group');
        return this.vendorGrpCategoryRepository.repository.findOne(findCondition);
    }

    // find All
    public findAll(findCondition: any): Promise<any> {
        return this.vendorGrpCategoryRepository.repository.find(findCondition);
    }
    // Group list
    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorGrpCategoryRepository.repository.count(condition);
        }
        return this.vendorGrpCategoryRepository.repository.find(condition);
    }

    // update
    public update(id: any, vendorGroupCategory: VendorGroupCategory): Promise<VendorGroupCategory> {
        this.log.info('Update a group category');
        vendorGroupCategory.id = id;
        return this.vendorGrpCategoryRepository.repository.save(vendorGroupCategory);
    }

    // delete
    public async delete(vendorGroupCategory: any): Promise<any> {
        this.log.info('Delete a group category');
        const deleteVendor = await this.vendorGrpCategoryRepository.repository.delete(vendorGroupCategory);
        return deleteVendor;
    }

    public async groupCategoryCount(id: number): Promise<any> {
        return await this.vendorGrpCategoryRepository.groupCategoryCount(id);
    }
}
