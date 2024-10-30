/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorMedia } from '../models/VendorMedia';
@EntityRepository(VendorMedia)
export class VendorMediaRepository extends Repository<VendorMedia> {
    // --
}
