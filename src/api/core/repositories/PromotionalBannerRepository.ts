/*
 * Spurtcommerce PRO
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { PromotionalBanner } from '../models/PromotionalBanner';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class PromotionalBannerRepository {
    public repository: Repository<PromotionalBanner>;
    constructor() {
        this.repository = getDataSource().getRepository(PromotionalBanner);
    }
}
