/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Country } from '../models/Country';
import { CountryRepository } from '../repositories/CountryRepository';
import { Like } from 'typeorm/index';

@Service()
export class CountryService {

    constructor(
        @OrmRepository() private countryRepository: CountryRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create Country
    public async create(country: any): Promise<Country> {
        this.log.info('Create a new country ');
        return this.countryRepository.save(country);
    }

    // findCondition
    public findOne(country: any): Promise<any> {
        return this.countryRepository.findOne(country);
    }

    // update country
    public update(id: any, country: Country): Promise<any> {
        country.countryId = id;
        return this.countryRepository.save(country);
    }

    // country List
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
            name: 'ASC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.countryRepository.count(condition);
        } else {
            return this.countryRepository.find(condition);
        }
    }

    // delete Country
    public async delete(id: number): Promise<any> {
        return await this.countryRepository.delete(id);
    }
}
