/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { PermissionModule } from '../models/PermissionModule';

@EntityRepository(PermissionModule)
export class PermissionModuleRepository extends Repository<PermissionModule>  {

}
