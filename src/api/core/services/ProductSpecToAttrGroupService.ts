import { Service } from 'typedi';
import { DeleteResult, FindOptionsWhere, FindOneOptions } from 'typeorm';
import { ProductToSpecification } from '../models/ProductToSpecification';
import { ProductSpecToAttrGroupRepository } from '../repositories/ProductSpecToAttrGroupRepository';
import { ProductSpecToAttrGroup } from '../models/ProductSpecToAttrGroup';

@Service()
export class ProductSpecToAttrGroupService {
    constructor(
        private prdSpecToAttrgroupRepository: ProductSpecToAttrGroupRepository
    ) {
        // --
    }

    public async create(specification: ProductSpecToAttrGroup): Promise<ProductSpecToAttrGroup> {
        return this.prdSpecToAttrgroupRepository.repository.save(specification);
    }

    public async bulkCreate(specification: ProductToSpecification[]): Promise<ProductSpecToAttrGroup[]> {
        return this.prdSpecToAttrgroupRepository.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<ProductSpecToAttrGroup>): Promise<ProductSpecToAttrGroup> {
        return this.prdSpecToAttrgroupRepository.repository.findOne(condition);
    }

    public find(condition: FindOneOptions<ProductSpecToAttrGroup>): Promise<ProductSpecToAttrGroup[]> {
        return this.prdSpecToAttrgroupRepository.repository.find(condition);
    }

    public async delete(specification: FindOptionsWhere<ProductSpecToAttrGroup>): Promise<DeleteResult> {
        return this.prdSpecToAttrgroupRepository.repository.delete(specification);
    }
}
