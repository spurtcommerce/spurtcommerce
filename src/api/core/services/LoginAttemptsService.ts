/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { LoginAttemptsRepository } from '../repositories/LoginAttemptsRepository';
import { LoginAttemptsModel } from '../models/LoginAttemptsModel';

@Service()
export class LoginAttemptsService {

    constructor(
        private loginAttemptsRepository: LoginAttemptsRepository ) {
    }

    public find(attempts: any): Promise<any> {
        return this.loginAttemptsRepository.repository.find(attempts);
    }

    public findOne(accessToken: any): Promise<any> {
        return this.loginAttemptsRepository.repository.findOne(accessToken);
    }
    // delete token
    public async delete(id: number): Promise<any> {
    await this.loginAttemptsRepository.repository.delete(id);
        return;
    }
    // create token
    public async create(loginAttempts: any): Promise<LoginAttemptsModel> {
        return this.loginAttemptsRepository.repository.save(loginAttempts);
    }
}
