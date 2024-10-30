/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { LiveAddressRepository } from '../repositories/LiveAddressRepository';
import { LiveAddress } from '../models/LiveAddress';
import { DeleteResult } from 'typeorm';

@Service()
export class LiveAddressService {

    constructor(
        @OrmRepository() private liveAddressRepository: LiveAddressRepository
    ) {
    }

    // create address
    public async create(address: LiveAddress): Promise<LiveAddress> {
        return this.liveAddressRepository.save(address);
    }

    // find Condition
    public findOne(address: any): Promise<LiveAddress> {
        return this.liveAddressRepository.findOne(address);
    }
    // update address
    public update(id: number, address: LiveAddress): Promise<LiveAddress> {
        address.id = id;
        return this.liveAddressRepository.save(address);
    }

    // delete address
    public async delete(address: Partial<LiveAddress>): Promise<DeleteResult> {
        return await this.liveAddressRepository.delete(address);
    }

    // find Customer addresses
    public find(address: any): Promise<LiveAddress[]> {
        return this.liveAddressRepository.find(address);
    }

    // address List
    public list(limit: number, offset: number, whereConditions: any = [], count: number | boolean): Promise<LiveAddress[] | number> {
        const condition: any = {};

        condition.where = {};

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
            return this.liveAddressRepository.count(condition);
        } else {
            return this.liveAddressRepository.find(condition);
        }
    }

}
