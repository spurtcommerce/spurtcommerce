/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { AccessToken } from '../models/AccessTokenModel';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class AccessTokenRepository {
  public repository: Repository<AccessToken>;
  constructor() {
    this.repository = getDataSource().getRepository(AccessToken);
  }
}
