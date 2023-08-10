/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { ProductViewLog } from '../models/productViewLog';

@EntityRepository(ProductViewLog)
export class ProductViewLogRepository extends Repository<ProductViewLog>  {

}
