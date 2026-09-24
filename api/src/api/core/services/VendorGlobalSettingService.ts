/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { VendorGlobalSettingRepository } from '../repositories/VendorGlobalSettingRepository';
import { VendorGlobalSetting } from '../models/VendorGlobalSettings';

@Service()
export class VendorGlobalSettingService {

    constructor(
        private vendorGlobalSettingRepository: VendorGlobalSettingRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(setting: any): Promise<any> {
        this.log.info('create method called');
        return this.vendorGlobalSettingRepository.repository.save(setting);
    }

    public findOne(data: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorGlobalSettingRepository.repository.findOne(data);
    }

    public findOneData(data: any): Promise<any> {
        this.log.info('findOneData method called');
        return this.vendorGlobalSettingRepository.repository.findOne(data);
    }

    public update(id: any, vendorGlobalSetting: VendorGlobalSetting): Promise<any> {
        this.log.info('update method called');
        vendorGlobalSetting.settingId = id;
        return this.vendorGlobalSettingRepository.repository.save(vendorGlobalSetting);
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

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.vendorGlobalSettingRepository.repository.delete(id);
    }
}
