import { Service } from 'typedi';
import { DeleteResult, FindOptionsWhere, FindOneOptions } from 'typeorm';
import { ProductSpecAttrGrpToAttrRepository } from '../repositories/ProductSpecAttrGrpToAttrRepository';
import { ProductSpecAttrGrouptoAttr } from '../models/ProductSpecAttrGrpToAttribute';

@Service()
export class ProductSpecAttrGrptoAttrService {
    constructor(
        private prdSpecAttrGrpAttrRepository: ProductSpecAttrGrpToAttrRepository
    ) {
        // --
    }

    public async create(specification: ProductSpecAttrGrouptoAttr): Promise<ProductSpecAttrGrouptoAttr> {
        return this.prdSpecAttrGrpAttrRepository.repository.save(specification);
    }

    public async bulkCreate(specification: ProductSpecAttrGrouptoAttr[]): Promise<ProductSpecAttrGrouptoAttr[]> {
        return this.prdSpecAttrGrpAttrRepository.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<ProductSpecAttrGrouptoAttr>): Promise<ProductSpecAttrGrouptoAttr> {
        return this.prdSpecAttrGrpAttrRepository.repository.findOne(condition);
    }

    public find(condition: FindOneOptions<ProductSpecAttrGrouptoAttr>): Promise<ProductSpecAttrGrouptoAttr[]> {
        return this.prdSpecAttrGrpAttrRepository.repository.find(condition);
    }

    public async delete(specification: FindOptionsWhere<ProductSpecAttrGrouptoAttr>): Promise<DeleteResult> {
        return this.prdSpecAttrGrpAttrRepository.repository.delete(specification);
    }
}
