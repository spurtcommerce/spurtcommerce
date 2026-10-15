import { Service } from 'typedi';
import { DeleteResult, FindOptionsWhere, FindOneOptions } from 'typeorm';
import { SpecificationAttrGrpToAttributeRepository } from '../repositories/SpecAttrGrpToAttributeRepository';
import { SpecificationAttrGrpToAttribute } from '../models/SpecificationAttributeGrpToAttribute';

@Service()
export class SpecificationAttrGrpToAttributeService {
    constructor(
        private specificationAttrGrpToAttributeRepository: SpecificationAttrGrpToAttributeRepository
    ) {
        // --
    }

    public async create(specification: SpecificationAttrGrpToAttribute): Promise<SpecificationAttrGrpToAttribute> {
        return this.specificationAttrGrpToAttributeRepository.repository.save(specification);
    }

    public async bulkCreate(specification: SpecificationAttrGrpToAttribute[]): Promise<SpecificationAttrGrpToAttribute[]> {
        return this.specificationAttrGrpToAttributeRepository.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<SpecificationAttrGrpToAttribute>): Promise<SpecificationAttrGrpToAttribute> {
        return this.specificationAttrGrpToAttributeRepository.repository.findOne(condition);
    }

    public delete(condition: FindOptionsWhere<SpecificationAttrGrpToAttribute>): Promise<DeleteResult> {
        return this.specificationAttrGrpToAttributeRepository.repository.delete(condition);
    }

    public find(condition: FindOneOptions<SpecificationAttrGrpToAttribute>): Promise<SpecificationAttrGrpToAttribute[]> {
        return this.specificationAttrGrpToAttributeRepository.repository.find(condition);
    }

}
