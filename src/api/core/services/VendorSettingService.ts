/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { VendorGlobalSettingRepository } from '../repositories/VendorSettingRepository';
import { VendorGlobalSetting } from '../models/VendorGlobalSettings';

@Service()
export class VendorGlobalSettingService {

    constructor(
        private vendorGlobalSettingRepository: VendorGlobalSettingRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create page
    public async create(setting: any): Promise<any> {
        this.log.info('Create a new page ');
        return this.vendorGlobalSettingRepository.repository.save(setting);
    }

    // find one page
    public findOne(): Promise<any> {
        return this.vendorGlobalSettingRepository.repository.findOne({});
    }

    // find one page
    public findOneData(data: any): Promise<any> {
        return this.vendorGlobalSettingRepository.repository.findOne(data);
    }

    // update page
    public update(id: any, vendorGlobalSetting: VendorGlobalSetting): Promise<any> {
        this.log.info('Update a page');
        vendorGlobalSetting.settingId = id;
        return this.vendorGlobalSettingRepository.repository.save(vendorGlobalSetting);
    }

    // page List
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
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        condition.order = { createdDate: 'DESC' };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorGlobalSettingRepository.repository.count(condition);
        } else {
            return this.vendorGlobalSettingRepository.repository.find(condition);
        }
    }

    // delete page
    public async delete(id: number): Promise<any> {
        return await this.vendorGlobalSettingRepository.repository.delete(id);
    }
}
