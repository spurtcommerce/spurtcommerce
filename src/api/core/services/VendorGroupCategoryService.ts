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
    ) { }

    public create(vendorGroupCategory: VendorGroupCategory): Promise<VendorGroupCategory> {
        this.log.info('create method called');
        return this.vendorGrpCategoryRepository.repository.save(vendorGroupCategory);
    }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorGrpCategoryRepository.repository.findOne(findCondition);
    }

    public findAll(findCondition: any): Promise<any> {
        this.log.info('findAll method called');
        return this.vendorGrpCategoryRepository.repository.find(findCondition);
    }

    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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

    public update(id: any, vendorGroupCategory: VendorGroupCategory): Promise<VendorGroupCategory> {
        this.log.info('update method called');
        vendorGroupCategory.id = id;
        return this.vendorGrpCategoryRepository.repository.save(vendorGroupCategory);
    }

    public async delete(vendorGroupCategory: any): Promise<any> {
        this.log.info('delete method called');
        const deleteVendor = await this.vendorGrpCategoryRepository.repository.delete(vendorGroupCategory);
        return deleteVendor;
    }

    public async groupCategoryCount(id: number): Promise<any> {
        this.log.info('groupCategoryCount method called');
        return await this.vendorGrpCategoryRepository.groupCategoryCount(id);
    }
}
