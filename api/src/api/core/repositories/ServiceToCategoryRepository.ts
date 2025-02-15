/*
 * spurtcommerce API
 * version 5.1.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { ServiceToCategory } from '../models/ServiceToCategory';

@EntityRepository(ServiceToCategory)
export class ServiceToCategoryRepository extends Repository<ServiceToCategory>  {

}
