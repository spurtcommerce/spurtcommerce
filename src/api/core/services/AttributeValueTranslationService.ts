/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { FindOptionsWhere, FindManyOptions, FindOneOptions, Like } from 'typeorm/index';
import { AttributeValueTranslationRepository } from '../repositories/AttributeValueTranslationRepository';
import { AttributeValueTranslation } from '../models/AttributeValueTranslation';

@Service()
export class AttributeValueTranslationService {

    constructor(
        private attributeValueTranslationRepository: AttributeValueTranslationRepository
    ) {
    }

    public async create(data: any): Promise<AttributeValueTranslation> {
        return this.attributeValueTranslationRepository.repository.save(data);
    }

    public async save(data: AttributeValueTranslation): Promise<AttributeValueTranslation> {
        return this.attributeValueTranslationRepository.repository.save(data);
    }

    public findOne(data: FindOneOptions<AttributeValueTranslation>): Promise<AttributeValueTranslation> {
        return this.attributeValueTranslationRepository.repository.findOne(data);
    }

    public update(id: any, attribute: AttributeValueTranslation): Promise<any> {
        attribute.id = id;
        return this.attributeValueTranslationRepository.repository.save(attribute);
    }
    public updateAliases(id: any, attribute: AttributeValueTranslation): Promise<any> {
        attribute.attributeValueId = id;
        return this.attributeValueTranslationRepository.repository.save(attribute);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.attributeValueTranslationRepository.repository.count(condition);
        } else {
            return this.attributeValueTranslationRepository.repository.find(condition);
        }
    }

    public async delete(id: FindOptionsWhere<AttributeValueTranslation>): Promise<any> {
        return await this.attributeValueTranslationRepository.repository.delete(id);
    }

    public find(attribute: FindManyOptions<AttributeValueTranslation>): Promise<AttributeValueTranslation[]> {
        return this.attributeValueTranslationRepository.repository.find(attribute);
    }

}
