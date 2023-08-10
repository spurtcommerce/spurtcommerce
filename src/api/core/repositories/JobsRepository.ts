/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Jobs } from '../models/Jobs';

@EntityRepository(Jobs)
export class JobsRepository extends Repository<Jobs>  {

}
