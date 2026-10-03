/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { WebHook } from '../models/WebHook';

@Service()
export class WebHookRepository {
    public repository: Repository<WebHook>;
    constructor() {
        this.repository = getDataSource().getRepository(WebHook);
    }
}
