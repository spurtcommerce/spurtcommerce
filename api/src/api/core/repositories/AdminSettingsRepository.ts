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
import { AdminSettings } from '../models/AdminSetting';

@Service()
export class AdminSettingsRepository {
  public repository: Repository<AdminSettings>;
  constructor() {
    this.repository = getDataSource('saas-admin').getRepository(AdminSettings);
  }
}
