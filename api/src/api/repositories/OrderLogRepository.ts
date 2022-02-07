/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { OrderLog } from '../models/OrderLog';

@EntityRepository(OrderLog)
export class OrderLogRepository extends Repository<OrderLog>  {

}
