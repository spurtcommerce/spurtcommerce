/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Document } from '../models/Document';

@Service()
export class DocumentRepository {
  public repository: Repository<Document>;
  constructor() {
    this.repository = getDataSource().getRepository(Document);
  }
}
