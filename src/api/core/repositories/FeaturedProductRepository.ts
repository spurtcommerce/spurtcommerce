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
import { FeaturedProduct } from '../models/FeaturedProduct';

@Service()
export class FeaturedProductRepository {
  public repository: Repository<FeaturedProduct>;
  constructor() {
    this.repository = getDataSource().getRepository(FeaturedProduct);
  }
}
