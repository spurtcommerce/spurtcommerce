/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { PromotionalBanner } from '../models/PromotionalBanner';

@EntityRepository(PromotionalBanner)
export class PromotionalBannerRepository extends Repository<PromotionalBanner>  {

}
