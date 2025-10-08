/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { AddressRepository } from '../repositories/AddressRepository';
import { Address } from '../models/Address';

@Service()
export class AddressService {

    constructor(
        private addressRepository: AddressRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create address
    public async create(address: Address): Promise<any> {
        this.log.info('Create a new address ');
        return this.addressRepository.repository.save(address);
    }

    // find Condition
    public findOne(address: any): Promise<any> {
        return this.addressRepository.repository.findOne(address);
    }
    // update address
    public update(id: number, address: Address): Promise<any> {
        address.addressId = id;
        return this.addressRepository.repository.save(address);
    }

    // address List
    public async list(limit: number, offset: number, select: any = [], relations: any = [], whereConditions: any = [], count: number | boolean): Promise<Address[] | any> {
        const condition: any = {};
        condition.where = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relations && relations.length > 0) {
            condition.relations = relations;
        }

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
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
            return this.addressRepository.repository.count(condition);
        } else {
            return this.addressRepository.repository.find(condition);
        }
    }

    // delete address
    public async delete(id: number): Promise<any> {
        await this.addressRepository.repository.delete(id);
        return 1;
    }

    // find Customer addresses
    public find(address: any): Promise<any> {
        return this.addressRepository.repository.find(address);
    }
}
