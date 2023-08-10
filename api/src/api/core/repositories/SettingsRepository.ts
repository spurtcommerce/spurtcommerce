/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Settings } from '../models/Setting';

@EntityRepository(Settings)
export class SettingsRepository extends Repository<Settings>  {

}
