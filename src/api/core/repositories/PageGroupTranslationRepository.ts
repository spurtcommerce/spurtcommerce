/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { PageGroupTranslation } from '../models/PageGroupTranslation';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class PageGroupTranslationRepository {
     public repository: Repository<PageGroupTranslation>;
  constructor() {
    this.repository = getDataSource().getRepository(PageGroupTranslation);
  }
}
