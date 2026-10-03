/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorPluginRepository } from '../repositories/VendorPluginRepository';
import { VendorPlugin } from '../models/VendorPlugin';

@Service()
export class VendorPluginService {

    constructor(
        private vendorPluginRepository: VendorPluginRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async save(vendorPlugin: any): Promise<VendorPlugin> {
        this.log.info('save method called');
        return this.vendorPluginRepository.repository.save(vendorPlugin);
    }

    public async find(vendorPlugin: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorPluginRepository.repository.find(vendorPlugin);
    }

    public findOne(vendorPlugin: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorPluginRepository.repository.findOne(vendorPlugin);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.vendorPluginRepository.repository.delete(id);
    }

    public async pluginList(limit: number, offset: number, count: number | boolean, vendorId: number): Promise<any> {
        this.log.info('pluginList method called');
        return this.vendorPluginRepository.pluginList(limit, offset, count, vendorId);
    }
}
