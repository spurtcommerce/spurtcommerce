/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Document } from '../models/Document';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class DocumentRepository {
    public repository: Repository<Document>;
    constructor() {
        this.repository = getDataSource().getRepository(Document);
    }
}
