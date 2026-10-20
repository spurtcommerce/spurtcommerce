/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';

import { Variant } from '../models/Variant';
import { VariantRepository } from '../repositories/VariantRepository';
import { Like } from 'typeorm';

@Service()
export class VariantService {
    constructor(
        private variantRepository: VariantRepository
    ) {
        // --
    }

    public async create(Data: any): Promise<Variant> {
        return this.variantRepository.repository.save(Data);
    }
    public findOne(id: any): Promise<Variant> {
        return this.variantRepository.repository.findOne(id);
    }

    public find(option: any): Promise<Variant[]> {
        return this.variantRepository.repository.find(option);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};
        condition.where = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                const op: string = item.op;
                if (op === 'like') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                } else {
                    condition.where[item.name] = item.value;
                }
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
            return this.variantRepository.repository.count(condition);
        } else {
            return this.variantRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        return await this.variantRepository.repository.delete(id);
    }
}
