/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Settings } from '../models/Setting';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { FindOptionsWhere, Like, UpdateResult } from 'typeorm';

@Service()
export class SettingService {

    constructor(
        private settingsRepository: SettingsRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(condition?: any): Promise<any> {
        this.log.info('findOne method called');
        return this.settingsRepository.repository.findOne(condition ? condition : {});
    }

    public findAll(condition?: any): Promise<Settings[]> {
        this.log.info('findAll method called');
        return this.settingsRepository.repository.find(condition ?? {});
    }

    public async create(settings: Settings): Promise<Settings> {
        this.log.info('create method called');
        return await this.settingsRepository.repository.save(settings);
    }

    public update(condition: FindOptionsWhere<Settings>, settings: Settings): Promise<UpdateResult> {
        this.log.info('update method called');
        return this.settingsRepository.repository.update(condition, settings);
    }

    public list(limit: number, select: any = [], relation: any = [], whereConditions: any = []): Promise<any> {
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
        return this.settingsRepository.repository.find(condition);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const newSettings = await this.settingsRepository.repository.delete(id);
        return newSettings;
    }
}
