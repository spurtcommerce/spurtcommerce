import { Service } from 'typedi';
import { AttributeToGroupRepository } from '../repositories/AttributeToGroupRepository';
import { AttributeToGroup } from '../models/AttributeToGroup';
import { DeleteResult, FindOptionsWhere, FindManyOptions, FindOneOptions } from 'typeorm';

@Service()
export class AttributeToGroupService {
    constructor(
        private attributeToGroupService: AttributeToGroupRepository
    ) {
        // --
    }

    public async create(specification: AttributeToGroup): Promise<AttributeToGroup> {
        return this.attributeToGroupService.repository.save(specification);
    }

    public async bulkCreate(specification: AttributeToGroup[]): Promise<AttributeToGroup[]> {
        return this.attributeToGroupService.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<AttributeToGroup>): Promise<AttributeToGroup> {
        return this.attributeToGroupService.repository.findOne(condition);
    }

    public delete(condition: FindOptionsWhere<AttributeToGroup>): Promise<DeleteResult> {
        return this.attributeToGroupService.repository.delete(condition);
    }

    public find(condition: FindManyOptions<AttributeToGroup>): Promise<AttributeToGroup[]> {
        return this.attributeToGroupService.repository.find(condition);
    }

    public findAttributeDistinct(attributeGroupId: number): Promise<Array<{ attribute_id: number }>> {
        return this.attributeToGroupService.repository.createQueryBuilder().select('DISTINCT(AttributeToGroup.attributeId)')
            .where('AttributeToGroup.attributeGroupId = :attributeGroupId', { attributeGroupId }).getRawMany();
    }
}
