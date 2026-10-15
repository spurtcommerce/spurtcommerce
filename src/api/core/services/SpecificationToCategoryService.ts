import { Service } from 'typedi';
import { DeleteResult, FindOptionsWhere, FindManyOptions, FindOneOptions } from 'typeorm';
import { SpecificationToCategoryRepository } from '../repositories/SpecificationToCategoryRepository';
import { SpecificationToCategory } from '../models/SpecificationToCategory';

@Service()
export class SpecificationToCategoryService {
    constructor(
        private specificationToCategoryService: SpecificationToCategoryRepository
    ) {
        // --
    }

    public async create(specification: SpecificationToCategory): Promise<SpecificationToCategory> {
        return this.specificationToCategoryService.repository.save(specification);
    }

    public async bulkCreate(specification: SpecificationToCategory[]): Promise<SpecificationToCategory[]> {
        return this.specificationToCategoryService.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<SpecificationToCategory>): Promise<SpecificationToCategory> {
        return this.specificationToCategoryService.repository.findOne(condition);
    }

    public find(condition: FindManyOptions<SpecificationToCategory>): Promise<SpecificationToCategory[]> {
        return this.specificationToCategoryService.repository.find(condition);
    }

    public delete(condition: FindOptionsWhere<SpecificationToCategory>): Promise<DeleteResult> {
        return this.specificationToCategoryService.repository.delete(condition);
    }

}
