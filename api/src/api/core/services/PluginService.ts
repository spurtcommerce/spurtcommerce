/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { PluginRepository } from '../repositories/PluginRepository';
import { Like } from 'typeorm/index';

@Service()
export class PluginService {

    constructor(@OrmRepository() private pluginRepository: PluginRepository) {
    }

    // create related product
    public async create(product: any): Promise<any> {
        const newProduct = await this.pluginRepository.save(product);
        return newProduct;
    }

    // find plugins
    public async findAll(plugins: any): Promise<any> {
        return await this.pluginRepository.find(plugins);
    }

    // country List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
            return this.pluginRepository.count(condition);
        } else {
            return this.pluginRepository.find(condition);
        }
    }
    // delete plugin
    public async delete(id: any): Promise<any> {
        const newProduct = await this.pluginRepository.delete(id);
        return newProduct;
    }

    // find one plugin
    public findOne(plugins: any): Promise<any> {
        return this.pluginRepository.findOne(plugins);
    }

    // Plugin list
    public async pluginList( limit: number, offset: number, count: number|boolean): Promise<any> {
        return this.pluginRepository.pluginList(limit, offset, count);
    }
}
