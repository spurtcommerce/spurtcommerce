/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { VendorInvoice } from '../models/VendorInvoice';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class VendorInvoiceRepository {
    public repository: Repository<VendorInvoice>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorInvoice);
    }
}
