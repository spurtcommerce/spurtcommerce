import { Service } from 'typedi';

import { SpecificationToAttributeGroupRepository } from '../repositories/SpecificationToAttributeGroupRepository';
import { SpecificationToAttributeGroup } from '../models/SpecificationToAttributeGroup';
import { DeleteResult, FindOptionsWhere, FindOneOptions } from 'typeorm';

@Service()
export class SpecificationToAttributeGroupService {
    constructor(
        private specificationToAttributeGroupRepository: SpecificationToAttributeGroupRepository
    ) {
        // --
    }

    public async create(specification: SpecificationToAttributeGroup): Promise<SpecificationToAttributeGroup> {
        return this.specificationToAttributeGroupRepository.repository.save(specification);
    }

    public async bulkCreate(specification: SpecificationToAttributeGroup[]): Promise<SpecificationToAttributeGroup[]> {
        return this.specificationToAttributeGroupRepository.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<SpecificationToAttributeGroup>): Promise<SpecificationToAttributeGroup> {
        return this.specificationToAttributeGroupRepository.repository.findOne(condition);
    }
    public delete(condition: FindOptionsWhere<SpecificationToAttributeGroup>): Promise<DeleteResult> {
        return this.specificationToAttributeGroupRepository.repository.delete(condition);
    }

    public find(condition: FindOneOptions<SpecificationToAttributeGroup>): Promise<SpecificationToAttributeGroup[]> {
        return this.specificationToAttributeGroupRepository.repository.find(condition);
    }

}
