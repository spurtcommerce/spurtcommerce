/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductVideo } from '../models/ProductVideo';
import { ProductVideoRepository } from '../repositories/ProductVideoRepository';
import { Like } from 'typeorm';

@Service()
export class ProductVideoService {

    constructor(
        @OrmRepository() private productVideoRepository: ProductVideoRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(data: any): Promise<any> {
        return this.productVideoRepository.findOne(data);
    }

    // find all
    public findAll(data: any): Promise<any> {
        this.log.info('Find all');
        return this.productVideoRepository.find(data);
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
            return this.productVideoRepository.count(condition);
        } else {
            return this.productVideoRepository.find(condition);
        }
    }

    // create
    public async create(productVideo: ProductVideo): Promise<ProductVideo> {
        const newVarient = await this.productVideoRepository.save(productVideo);
        return newVarient;
    }

    // update
    public update(id: any, productVideo: ProductVideo): Promise<ProductVideo> {
        this.log.info('Update a product video');
        productVideo.id = id;
        return this.productVideoRepository.save(productVideo);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product video');
        const newVideo = await this.productVideoRepository.delete(id);
        return newVideo;
    }
}
