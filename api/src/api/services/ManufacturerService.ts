/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {Manufacturer} from '../models/ManufacturerModel';
import {ManufacturerRepository} from '../repositories/ManufacturerRepository';
import {Like} from 'typeorm/index';

@Service()
export class ManufacturerService {

    constructor(@OrmRepository() private manufacturerRepository: ManufacturerRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }
    // create Manufacturer
    public async create(manufacturer: any): Promise<Manufacturer> {
        return this.manufacturerRepository.save(manufacturer);
    }

    // find condition
    public findOne(manufacturer: any): Promise<any> {
        return this.manufacturerRepository.findOne(manufacturer);
    }

    // delete Manufacturer
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a manufacturer');
        await this.manufacturerRepository.delete(id);
        return;
    }
    // Manufacturer List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [],  count: number|boolean): Promise<any> {
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
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        condition.order = {createdDate: 'DESC'};

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.manufacturerRepository.count(condition);
        }

        console.log(condition);
        return this.manufacturerRepository.find(condition);
    }
}
