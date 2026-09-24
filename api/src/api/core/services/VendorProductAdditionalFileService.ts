/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorProductAdditionalFileRepository } from '../repositories/VendorProductAdditonalFileRepository';
import { VendorProductAdditionalFile } from '../models/VendorProductAdditionalFileModel';

@Service()
export class VendorProductAdditionalFileService {
    constructor(
        private vendorProductAdditionalFileRepository: VendorProductAdditionalFileRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(vendorProductAdditionalFile: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorProductAdditionalFileRepository.repository.findOne(vendorProductAdditionalFile);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        await this.vendorProductAdditionalFileRepository.repository.delete(id);
        return;
    }

    public async create(vendorProductAdditionalFile: any): Promise<VendorProductAdditionalFile> {
        this.log.info('create method called');
        return this.vendorProductAdditionalFileRepository.repository.save(vendorProductAdditionalFile);
    }
}
