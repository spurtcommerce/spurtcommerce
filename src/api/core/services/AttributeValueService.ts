import { Service } from 'typedi';
import { DeleteResult, FindOptionsWhere, FindManyOptions, FindOneOptions } from 'typeorm';
import { AttributeValueRepository } from '../repositories/AttributeValueRepository';
import { AttributeValue } from '../models/AttributeValue';

@Service()
export class AttributeValueService {
    constructor(
        private attributeValueRepository: AttributeValueRepository
    ) {
        // --
    }

    public async create(specification: AttributeValue): Promise<AttributeValue> {
        return this.attributeValueRepository.repository.save(specification);
    }

    public async find(specification: FindManyOptions<AttributeValue>): Promise<AttributeValue[]> {
        return this.attributeValueRepository.repository.find(specification);
    }

    public async bulkCreate(specification: AttributeValue[]): Promise<AttributeValue[]> {
        return this.attributeValueRepository.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<AttributeValue>): Promise<AttributeValue> {
        return this.attributeValueRepository.repository.findOne(condition);
    }

    public delete(condition: FindOptionsWhere<AttributeValue>): Promise<DeleteResult> {
        return this.attributeValueRepository.repository.delete(condition);
    }

}
