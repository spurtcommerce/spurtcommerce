/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { LiveAddressRepository } from '../repositories/LiveAddressRepository';
import { LiveAddress } from '../models/LiveAddress';
import { DeleteResult } from 'typeorm';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
@Service()
export class LiveAddressService {

    constructor(
        private liveAddressRepository: LiveAddressRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
    }

    public async create(address: LiveAddress): Promise<LiveAddress> {
        this.log.info('create method called');
        return this.liveAddressRepository.repository.save(address);
    }

    public findOne(address: any): Promise<LiveAddress> {
        this.log.info('findOne method called');
        return this.liveAddressRepository.repository.findOne(address);
    }

    public update(id: number, address: LiveAddress): Promise<LiveAddress> {
        this.log.info('update method called');
        address.id = id;
        return this.liveAddressRepository.repository.save(address);
    }

    public async delete(address: any): Promise<DeleteResult> {
        this.log.info('delete method called');
        return await this.liveAddressRepository.repository.delete(address);
    }

    public find(address: any): Promise<LiveAddress[]> {
        this.log.info('find method called');
        return this.liveAddressRepository.repository.find(address);
    }

    public list(limit: number, offset: number, whereConditions: any = [], count: number | boolean): Promise<LiveAddress[] | number> {
        this.log.info('list method called');
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
            return this.liveAddressRepository.repository.count(condition);
        } else {
            return this.liveAddressRepository.repository.find(condition);
        }
    }
}
