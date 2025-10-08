/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Payment } from '../models/Payment';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class PaymentRepository {
    public repository: Repository<Payment>;
    constructor() {
        this.repository = getDataSource().getRepository(Payment);
    }
}
