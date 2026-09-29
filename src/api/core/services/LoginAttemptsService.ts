/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { LoginAttemptsRepository } from '../repositories/LoginAttemptsRepository';
import { LoginAttemptsModel } from '../models/LoginAttemptsModel';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
@Service()
export class LoginAttemptsService {

    constructor(
        private loginAttemptsRepository: LoginAttemptsRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(loginAttempts: any): Promise<LoginAttemptsModel> {
        this.log.info('create method called');
        return this.loginAttemptsRepository.repository.save(loginAttempts);
    }

    public find(attempts: any): Promise<any> {
        this.log.info('find method called');
        return this.loginAttemptsRepository.repository.find(attempts);
    }

    public findOne(accessToken: any): Promise<any> {
        this.log.info('findOne method called');
        return this.loginAttemptsRepository.repository.findOne(accessToken);
    }

    public async delete(id: number): Promise<any> {
        this.log.info(`delete method called for id ${id}`);
        await this.loginAttemptsRepository.repository.delete(id);
        return;
    }
}
