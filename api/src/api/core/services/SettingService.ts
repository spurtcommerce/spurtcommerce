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
import { Settings } from '../models/Setting';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { FindConditions, Like, UpdateResult } from 'typeorm';

@Service()
export class SettingService {

    constructor(
        @OrmRepository() private settingsRepository: SettingsRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(condition?: any): Promise<any> {
        return this.settingsRepository.findOne(condition ? condition : {});
    }

    // find all setting
    public findAll(condition?: any): Promise<Settings[]> {
        this.log.info('Find all setting');
        return this.settingsRepository.find(condition ?? {});
    }

    // setting list
    public list(limit: number, select: any = [], relation: any = [], whereConditions: any = []): Promise<any> {
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
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;

        }
        return this.settingsRepository.find(condition);
    }

    // create setting
    public async create(settings: Settings): Promise<Settings> {
        const newSettings = await this.settingsRepository.save(settings);
        return newSettings;
    }

    // update setting
    public update(condition: FindConditions<Settings>, settings: Settings): Promise<UpdateResult> {
        return this.settingsRepository.update(condition, settings);
    }

    // delete setting
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product');
        const newSettings = await this.settingsRepository.delete(id);
        return newSettings;
    }
}
