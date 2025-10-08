/*
 * spurtcommerce API
 * version 5.2.0
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

    // find one condition
    public findOne(data: any): Promise<any> {
        return this.vendorMediaRepository.repository.findOne(data);
    }

    // find all
    public findAll(data: FindManyOptions<VendorMedia>): Promise<any> {
        this.log.info('Find all');
        return this.vendorMediaRepository.repository.find(data);
    }

    // list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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

    // create
    public async create(mediaData: VendorMedia): Promise<VendorMedia> {
        const newVarient = await this.vendorMediaRepository.repository.save(mediaData);
        return newVarient;
    }

    // update
    public update(id: any, mediaData: VendorMedia): Promise<VendorMedia> {
        this.log.info('Update vendor media');
        mediaData.id = id;
        return this.vendorMediaRepository.repository.save(mediaData);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete vendor media');
        const newVideo = await this.vendorMediaRepository.repository.delete(id);
        return newVideo;
    }
}
