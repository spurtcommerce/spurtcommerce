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
import { VendorProductAdditionalFileRepository } from '../repositories/VendorProductAdditonalFileRepository';
import { VendorProductAdditionalFile } from '../models/VendorProductAdditionalFileModel';

@Service()
export class VendorProductAdditionalFileService {

    constructor(
        @OrmRepository() private vendorProductAdditionalFileRepository: VendorProductAdditionalFileRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(vendorProductAdditionalFile: any): Promise<any> {
        return this.vendorProductAdditionalFileRepository.findOne(vendorProductAdditionalFile);
    }
    // delete token
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a token');
        await this.vendorProductAdditionalFileRepository.delete(id);
        return;
    }
    // create token
    public async create(vendorProductAdditionalFile: any): Promise<VendorProductAdditionalFile> {
        return this.vendorProductAdditionalFileRepository.save(vendorProductAdditionalFile);
    }
}
