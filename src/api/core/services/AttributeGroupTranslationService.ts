/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { AttributeGroupTranslationRepository } from '../repositories/AttributeGroupTranslationRepository';
import { FindManyOptions, FindOneOptions } from 'typeorm/index';
import { AttributeGroupTranslation } from '../models/AttributeGroupTranslation';

@Service()
export class AttributeGroupTranslationService {

    constructor(
        private attributeGroupTranslationRepository: AttributeGroupTranslationRepository
    ) {
        // --
    }

    public async save(attribute: AttributeGroupTranslation): Promise<AttributeGroupTranslation> {
        return this.attributeGroupTranslationRepository.repository.save(attribute);
    }

    public async bulkSave(attribute: AttributeGroupTranslation[]): Promise<AttributeGroupTranslation[]> {
        return this.attributeGroupTranslationRepository.repository.save(attribute);
    }

    public findOne(data: FindOneOptions<AttributeGroupTranslation>): Promise<AttributeGroupTranslation> {
        return this.attributeGroupTranslationRepository.repository.findOne(data);
    }

    public update(id: number, attributeGroupTrans: AttributeGroupTranslation): Promise<any> {
        return this.attributeGroupTranslationRepository.repository.update(id, attributeGroupTrans);
    }

    public list(limit: number, offset: number, select: any = [], search: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.attributeGroupTranslationRepository.repository.count(condition);
        } else {
            return this.attributeGroupTranslationRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        return this.attributeGroupTranslationRepository.repository.delete(id);
    }

    public find(attribute: FindManyOptions<AttributeGroupTranslation>): Promise<AttributeGroupTranslation[]> {
        return this.attributeGroupTranslationRepository.repository.find(attribute);
    }
}
