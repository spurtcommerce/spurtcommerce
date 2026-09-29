/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { FindManyOptions, Like } from 'typeorm';
import { VendorMediaRepository } from '../repositories/VendorMediaRepository';
import { VendorMedia } from '../models/VendorMedia';

@Service()
export class VendorMediaService {

    constructor(
        private vendorMediaRepository: VendorMediaRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(data: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorMediaRepository.repository.findOne(data);
    }

    public findAll(data: FindManyOptions<VendorMedia>): Promise<any> {
        this.log.info('findAll method called');
        return this.vendorMediaRepository.repository.find(data);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
                const operator: string = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = Like('%' + item.value + '%');
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
            return this.vendorMediaRepository.repository.count(condition);
        } else {
            return this.vendorMediaRepository.repository.find(condition);
        }
    }

    public async create(mediaData: VendorMedia): Promise<VendorMedia> {
        this.log.info('create method called');
        return await this.vendorMediaRepository.repository.save(mediaData);
    }

    public update(id: any, mediaData: VendorMedia): Promise<VendorMedia> {
        this.log.info('update method called');
        mediaData.id = id;
        return this.vendorMediaRepository.repository.save(mediaData);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const newVideo = await this.vendorMediaRepository.repository.delete(id);
        return newVideo;
    }
}
