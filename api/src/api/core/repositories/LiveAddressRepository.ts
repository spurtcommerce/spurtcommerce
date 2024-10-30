/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { LiveAddress } from '../models/LiveAddress';

@EntityRepository(LiveAddress)
export class LiveAddressRepository extends Repository<LiveAddress>  {

}
