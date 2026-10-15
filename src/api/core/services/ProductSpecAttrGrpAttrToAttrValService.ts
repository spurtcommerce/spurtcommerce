import { Service } from 'typedi';
import { DeleteResult, FindOptionsWhere, FindOneOptions } from 'typeorm';
import { ProductSpecAttrGrpAttrToAttrValRepository } from '../repositories/ProductSpecAttrGrpAttrToAttrValRepository';
import { ProductSpecAttrGrpAttrToAttrVal } from '../models/ProductSpecAttrGrpAttrtoAttrVal';

@Service()
export class ProductSpecAttrGrpAttrToAttrValService {
    constructor(
        private productSpecAttrGrpAttrToAttrValRepository: ProductSpecAttrGrpAttrToAttrValRepository
    ) {
        // --
    }

    public async create(specification: ProductSpecAttrGrpAttrToAttrVal): Promise<ProductSpecAttrGrpAttrToAttrVal> {
        return this.productSpecAttrGrpAttrToAttrValRepository.repository.save(specification);
    }

    public async bulkCreate(specification: ProductSpecAttrGrpAttrToAttrVal[]): Promise<ProductSpecAttrGrpAttrToAttrVal[]> {
        return this.productSpecAttrGrpAttrToAttrValRepository.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<ProductSpecAttrGrpAttrToAttrVal>): Promise<ProductSpecAttrGrpAttrToAttrVal> {
        return this.productSpecAttrGrpAttrToAttrValRepository.repository.findOne(condition);
    }

    public find(condition: FindOneOptions<ProductSpecAttrGrpAttrToAttrVal>): Promise<ProductSpecAttrGrpAttrToAttrVal[]> {
        return this.productSpecAttrGrpAttrToAttrValRepository.repository.find(condition);
    }

    public async delete(specification: FindOptionsWhere<ProductSpecAttrGrpAttrToAttrVal>): Promise<DeleteResult> {
        return this.productSpecAttrGrpAttrToAttrValRepository.repository.delete(specification);
    }
}
