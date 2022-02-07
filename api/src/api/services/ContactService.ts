/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {ContactRepository} from '../repositories/ContactRepository';

@Service()
export class ContactService {

    constructor(@OrmRepository() private contactRepository: ContactRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create contact info
    public async create(customer: any): Promise<any> {
        this.log.info('Create a Contact customer Infomation ');
        return this.contactRepository.save(customer);
    }
}
