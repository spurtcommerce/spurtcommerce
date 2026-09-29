/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ContactRepository } from '../repositories/ContactRepository';

@Service()
export class ContactService {

    constructor(
        private contactRepository: ContactRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(customer: any): Promise<any> {
        this.log.info('create method called');
        return this.contactRepository.repository.save(customer);
    }
}
