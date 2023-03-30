/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { EntityRepository, Repository } from 'typeorm';
import { OrderProductLog } from '../models/OrderProductLog';

@EntityRepository(OrderProductLog)
export class OrderProductLogRepository extends Repository<OrderProductLog>  {

}
