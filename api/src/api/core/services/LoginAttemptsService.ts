/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { LoginAttemptsRepository } from '../repositories/LoginAttemptsRepository';
import { LoginAttemptsModel } from '../models/LoginAttemptsModel';

@Service()
export class LoginAttemptsService {

    constructor(
        @OrmRepository() private loginAttemptsRepository: LoginAttemptsRepository ) {
    }

    public find(attempts: any): Promise<any> {
        return this.loginAttemptsRepository.find(attempts);
    }

    public findOne(accessToken: any): Promise<any> {
        return this.loginAttemptsRepository.findOne(accessToken);
    }
    // delete token
    public async delete(id: number): Promise<any> {
    await this.loginAttemptsRepository.delete(id);
        return;
    }
    // create token
    public async create(loginAttempts: any): Promise<LoginAttemptsModel> {
        return this.loginAttemptsRepository.save(loginAttempts);
    }
}
