/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { PluginRepository } from '../repositories/PluginRepository';
import { Like } from 'typeorm/index';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
@Service()
export class PluginService {

    constructor(
        private pluginRepository: PluginRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // --
    }

    public async create(product: any): Promise<any> {
        this.log.info('create method called');
        return await this.pluginRepository.repository.save(product);
    }

    public async findAll(plugins: any): Promise<any> {
        this.log.info('findAll method called');
        return await this.pluginRepository.repository.find(plugins);
    }

    public findOne(plugins: any): Promise<any> {
        this.log.info('findOne method called');
        return this.pluginRepository.repository.findOne(plugins);
    }

    public async pluginList(limit: number, offset: number, count: number | boolean): Promise<any> {
        this.log.info('pluginList method called');
        return this.pluginRepository.pluginList(limit, offset, count);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            this.log.info('list method - count query');
            return this.pluginRepository.repository.count(condition);
        } else {
            this.log.info('list method - find query');
            return this.pluginRepository.repository.find(condition);
        }
    }
    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        return await this.pluginRepository.repository.delete(id);
    }
}
