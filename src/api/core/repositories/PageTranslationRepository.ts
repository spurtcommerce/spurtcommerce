/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { PageTranslation } from '../models/PageTranslation';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class PageTranslationRepository {
    public repository: Repository<PageTranslation>;
    constructor() {
        this.repository = getDataSource().getRepository(PageTranslation);
    }
}
