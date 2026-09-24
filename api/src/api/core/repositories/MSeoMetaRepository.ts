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
import { MSeoMeta } from '../../core/models/MSeoMetaModel';

@Service()
export class MSeoMetaRepository {
    public repository: Repository<MSeoMeta>;
    constructor() {
        this.repository = getDataSource().getRepository(MSeoMeta);
    }
}
