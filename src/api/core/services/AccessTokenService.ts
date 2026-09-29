/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { AccessTokenRepository } from '../repositories/AccessTokenRepository';
import { AccessToken } from '../models/AccessTokenModel';

@Service()
export class AccessTokenService {

    constructor(
        private accessTokenRepository: AccessTokenRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(accessToken: any): Promise<any> {
        this.log.info('findOne method called');
        return this.accessTokenRepository.repository.findOne(accessToken);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        await this.accessTokenRepository.repository.delete(id);
        return;
    }

    public async create(accessToken: any): Promise<AccessToken> {
        this.log.info('create method called');
        return this.accessTokenRepository.repository.save(accessToken);
    }
}
