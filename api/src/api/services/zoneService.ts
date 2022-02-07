/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {Like} from 'typeorm/index';
import {ZoneRepository} from '../repositories/ZoneRepository';
import {Zone} from '../models/Zone';

@Service()
export class ZoneService {

    constructor(@OrmRepository() private zoneRepository: ZoneRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create zone
    public async create(zone: any): Promise <Zone> {
        this.log.info('Create a new zone ');
        return this.zoneRepository.save(zone);
    }

    // find Condition
    public findOne(zone: any): Promise<any> {
        return this.zoneRepository.findOne(zone);
    }

    // update zone
    public update(id: any, zone: Zone): Promise<any> {
        zone.zoneId = id;
        return this.zoneRepository.save(zone);
    }

    // zone List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], relation: any= [], count: number|boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.zoneRepository.count(condition);
        } else {
            return this.zoneRepository.find(condition);
        }
    }
    // delete Zone
    public async delete(id: number): Promise<any> {
       return await this.zoneRepository.delete(id);
    }
}
